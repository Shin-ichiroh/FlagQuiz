import React, { useMemo } from "react";
import worldGeo from "../data/world_geo.json";

interface CountryMapProps {
  countryCode: string;
  className?: string;
  showSurroundings?: boolean; // 周辺国を表示するかどうか
  highlightColor?: string;
  neighborColor?: string;
  borderColor?: string;
  bgColor?: string;
  targetStrokeColor?: string;
  targetStrokeWidth?: number;
}

interface Geometry {
  type: string;
  coordinates: any[];
}

interface GeoFeature {
  id: string;
  name: string;
  geom: Geometry;
}

// 簡易メルカトル投影（地球の球体を平面に正確な縦横比で投影）
function toMercator(lng: number, lat: number): [number, number] {
  const x = lng;
  const clampedLat = Math.max(-82, Math.min(82, lat));
  const rad = (clampedLat * Math.PI) / 180;
  const y = (Math.log(Math.tan(Math.PI / 4 + rad / 2)) * 180) / Math.PI;
  return [x, y];
}

function getRingAreaAndBBox(ring: [number, number][]) {
  let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity;
  let area = 0;
  for (let i = 0; i < ring.length; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[(i + 1) % ring.length];
    area += (x1 * y2 - x2 * y1);
    if (x1 < minLng) minLng = x1;
    if (x1 > maxLng) maxLng = x1;
    if (y1 < minLat) minLat = y1;
    if (y1 > maxLat) maxLat = y1;
  }
  return { area: Math.abs(area) / 2, minLng, minLat, maxLng, maxLat };
}

// 遠隔の孤島（米国のハワイ、仏領ギアナ等）に引っ張られて国土が極小化するのを防ぎつつ、
// 日本列島（北海道・本州・四国・九州・沖縄・佐渡・八重山等）や近隣島嶼群をすべて美しく内包するクラスタリング境界検出
function getTargetCountryBBox(feature: GeoFeature) {
  const geom = feature.geom;
  if (geom.type === "Polygon") {
    const b = getRingAreaAndBBox(geom.coordinates[0]);
    return { minLng: b.minLng, minLat: b.minLat, maxLng: b.maxLng, maxLat: b.maxLat };
  }

  // MultiPolygonの場合
  const stats = geom.coordinates.map((poly: [number, number][][]) => getRingAreaAndBBox(poly[0]));
  stats.sort((a, b) => b.area - a.area);

  // アメリカ（us）は本土48州（CONUS）を基準として誰もが知る国土形状を美しく切り出す
  if (feature.id === "us") {
    return { minLng: stats[0].minLng, minLat: stats[0].minLat, maxLng: stats[0].maxLng, maxLat: stats[0].maxLat };
  }

  const maxArea = stats[0].area;
  let minLng = stats[0].minLng, minLat = stats[0].minLat, maxLng = stats[0].maxLng, maxLat = stats[0].maxLat;

  // 島伝い（距離5.5度以内、または面積が20%以上かつ12度以内）に連鎖的に領土を吸収
  let added = true;
  const remaining = stats.slice(1);
  while (added && remaining.length > 0) {
    added = false;
    for (let i = remaining.length - 1; i >= 0; i--) {
      const s = remaining[i];
      let dLng = Math.max(0, s.minLng - maxLng, minLng - s.maxLng);
      if (dLng > 180) dLng = 360 - dLng;
      const dLat = Math.max(0, s.minLat - maxLat, minLat - s.maxLat);
      const dist = Math.hypot(dLng, dLat);

      const maxAllowedDist = s.area >= maxArea * 0.2 ? 12.0 : 5.5;

      if (dist < maxAllowedDist) {
        minLng = Math.min(minLng, s.minLng);
        maxLng = Math.max(maxLng, s.maxLng);
        minLat = Math.min(minLat, s.minLat);
        maxLat = Math.max(maxLat, s.maxLat);
        remaining.splice(i, 1);
        added = true;
      }
    }
  }

  return { minLng, minLat, maxLng, maxLat };
}

function getFeatureBBox(geometry: Geometry) {
  let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity;
  function processCoords(coords: any) {
    if (typeof coords[0] === "number") {
      const [lng, lat] = coords;
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    } else {
      coords.forEach(processCoords);
    }
  }
  processCoords(geometry.coordinates);
  return { minLng, minLat, maxLng, maxLat };
}

function coordsToPath(coords: any[], geomType: string, project: (lng: number, lat: number) => [number, number]): string {
  if (geomType === "Polygon") {
    return coords.map((ring: any[]) => {
      return ring.map((pt: [number, number], i: number) => {
        const [x, y] = project(pt[0], pt[1]);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      }).join("") + "Z";
    }).join(" ");
  } else if (geomType === "MultiPolygon") {
    return coords.map((polygon: any[]) => {
      return polygon.map((ring: any[]) => {
        return ring.map((pt: [number, number], i: number) => {
          const [x, y] = project(pt[0], pt[1]);
          return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
        }).join("") + "Z";
      }).join(" ");
    }).join(" ");
  }
  return "";
}

export const CountryMap: React.FC<CountryMapProps> = ({
  countryCode,
  className = "w-full h-full",
  showSurroundings = true,
  highlightColor = "#f97316", // ターゲット国: 明るいオレンジ
  neighborColor = "#f1f5f9",  // 周辺国: 淡いグレー
  borderColor = "#cbd5e1",    // 境界線: 優しい境界線
  bgColor,
  targetStrokeColor = "#ea580c",
  targetStrokeWidth = 2,
}) => {
  const code = countryCode.toLowerCase();
  const features = worldGeo as GeoFeature[];

  const targetFeature = useMemo(() => {
    return features.find((f) => f.id === code);
  }, [features, code]);

  const mapData = useMemo(() => {
    if (!targetFeature) return null;

    // 1. 本土主要部分の境界を取得
    const targetBBox = getTargetCountryBBox(targetFeature);

    // メルカトル座標系に変換
    const [tMinX, tMinY] = toMercator(targetBBox.minLng, targetBBox.minLat);
    const [tMaxX, tMaxY] = toMercator(targetBBox.maxLng, targetBBox.maxLat);

    const mWidth = Math.max(0.5, tMaxX - tMinX);
    const mHeight = Math.max(0.5, tMaxY - tMinY);

    // 2. 余白の設定 (周辺国を表示する場合は約65%、単体シルエット時は約12%)
    const marginRatio = showSurroundings ? 0.65 : 0.12;
    const marginX = mWidth * marginRatio;
    const marginY = mHeight * marginRatio;

    let viewMinX = tMinX - marginX;
    let viewMaxX = tMaxX + marginX;
    let viewMinY = tMinY - marginY;
    let viewMaxY = tMaxY + marginY;

    // 3. 縦横比を完全に 1:1（正方形アスペクト比）で等倍にする
    const canvasW = 400;
    const canvasH = 280;
    const canvasAspect = canvasW / canvasH;

    let spanX = viewMaxX - viewMinX;
    let spanY = viewMaxY - viewMinY;
    const contentAspect = spanX / spanY;

    if (contentAspect > canvasAspect) {
      // 横長すぎる場合: 縦（Y）を広げて等倍アスペクト比を維持
      const targetSpanY = spanX / canvasAspect;
      const diffY = targetSpanY - spanY;
      viewMinY -= diffY / 2;
      viewMaxY += diffY / 2;
      spanY = targetSpanY;
    } else {
      // 縦長すぎる場合: 横（X）を広げて等倍アスペクト比を維持
      const targetSpanX = spanY * canvasAspect;
      const diffX = targetSpanX - spanX;
      viewMinX -= diffX / 2;
      viewMaxX += diffX / 2;
      spanX = targetSpanX;
    }

    // 4. 正確な等角・等縮尺メルカトル投影関数
    const project = (lng: number, lat: number): [number, number] => {
      let adjLng = lng;
      // 経度180度またぎのラッピング
      if (adjLng - targetBBox.minLng > 180) adjLng -= 360;
      if (targetBBox.maxLng - adjLng > 180) adjLng += 360;

      const [mx, my] = toMercator(adjLng, lat);
      const x = ((mx - viewMinX) / spanX) * canvasW;
      const y = ((viewMaxY - my) / spanY) * canvasH;
      return [x, y];
    };

    // 5. 表示範囲内に入る周辺国の抽出
    const neighbors: { id: string; path: string }[] = [];
    if (showSurroundings) {
      features.forEach((f) => {
        if (f.id === code) return;
        const bbox = getFeatureBBox(f.geom);
        const [fMinX, fMinY] = toMercator(bbox.minLng, bbox.minLat);
        const [fMaxX, fMaxY] = toMercator(bbox.maxLng, bbox.maxLat);

        const overlap =
          !(fMaxX < viewMinX || fMinX > viewMaxX || fMaxY < viewMinY || fMinY > viewMaxY);
        if (overlap) {
          const path = coordsToPath(f.geom.coordinates, f.geom.type, project);
          if (path) neighbors.push({ id: f.id, path });
        }
      });
    }

    // ターゲット国の全領土を描画
    const targetPath = coordsToPath(targetFeature.geom.coordinates, targetFeature.geom.type, project);

    return {
      canvasW,
      canvasH,
      targetPath,
      neighbors,
    };
  }, [targetFeature, showSurroundings, features, code]);

  if (!targetFeature || !mapData) {
    return (
      <div className={`flex items-center justify-center bg-slate-50 text-slate-400 text-xs font-bold ${className}`}>
        地図データを読み込み中...
      </div>
    );
  }

  const effectiveBg = bgColor ?? (showSurroundings ? "#f8fafc" : "transparent");

  return (
    <svg
      viewBox={`0 0 ${mapData.canvasW} ${mapData.canvasH}`}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* 背景（海または透明） */}
      {effectiveBg !== "transparent" && (
        <rect width={mapData.canvasW} height={mapData.canvasH} fill={effectiveBg} />
      )}

      {/* 周辺国 (淡いグレー) */}
      {showSurroundings &&
        mapData.neighbors.map((n) => (
          <path
            key={n.id}
            d={n.path}
            fill={neighborColor}
            stroke={borderColor}
            strokeWidth="1.2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}

      {/* 対象国 */}
      <path
        d={mapData.targetPath}
        fill={highlightColor}
        stroke={targetStrokeColor}
        strokeWidth={targetStrokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        className="filter drop-shadow-sm"
      />
    </svg>
  );
};
