import React, { useMemo } from "react";
import worldGeo from "../data/world_geo.json";

interface CountryMapProps {
  countryCode: string;
  className?: string;
  showSurroundings?: boolean; // 周辺国を表示するかどうか
  highlightColor?: string;
  neighborColor?: string;
  borderColor?: string;
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

function getBBox(geometry: Geometry) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  function processCoords(coords: any) {
    if (typeof coords[0] === "number") {
      const [x, y] = coords;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    } else {
      coords.forEach(processCoords);
    }
  }
  processCoords(geometry.coordinates);
  return { minX, minY, maxX, maxY };
}

function coordsToPath(coords: any[], geomType: string, project: (x: number, y: number) => [number, number]): string {
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
  highlightColor = "#f97316", // ターゲット国: 明るいオレンジ (添付画像風)
  neighborColor = "#f1f5f9",  // 周辺国: 淡いグレー
  borderColor = "#cbd5e1",    // 境界線: 優しい境界線
}) => {
  const code = countryCode.toLowerCase();
  const features = worldGeo as GeoFeature[];

  const targetFeature = useMemo(() => {
    return features.find((f) => f.id === code);
  }, [features, code]);

  const mapData = useMemo(() => {
    if (!targetFeature) return null;

    const targetBBox = getBBox(targetFeature.geom);
    const width = Math.max(1, targetBBox.maxX - targetBBox.minX);
    const height = Math.max(1, targetBBox.maxY - targetBBox.minY);

    // 周辺国を含める場合の余白倍率 (国の幅・高さの60%〜120%分外側まで)
    const marginRatio = showSurroundings ? 0.9 : 0.15;
    const marginX = width * marginRatio;
    const marginY = height * marginRatio;

    let viewMinX = targetBBox.minX - marginX;
    let viewMaxX = targetBBox.maxX + marginX;
    let viewMinY = Math.max(-85, targetBBox.minY - marginY);
    let viewMaxY = Math.min(85, targetBBox.maxY + marginY);

    // アスペクト比を整える (SVGキャンバスを 400x300 とする)
    const svgW = 400;
    const svgH = 280;
    const spanX = viewMaxX - viewMinX;
    const spanY = viewMaxY - viewMinY;

    // 投影関数 (緯度経度 -> SVG座標系)
    // 緯度は上がプラスなので反転
    const project = (lng: number, lat: number): [number, number] => {
      // 経度ラッピング調整
      let adjLng = lng;
      if (adjLng - viewMinX > 180) adjLng -= 360;
      if (viewMaxX - adjLng > 180) adjLng += 360;

      const x = ((adjLng - viewMinX) / spanX) * svgW;
      const y = ((viewMaxY - lat) / spanY) * svgH;
      return [x, y];
    };

    // 周辺国の抽出 (表示領域に被る国)
    const neighbors: { id: string; path: string }[] = [];
    if (showSurroundings) {
      features.forEach((f) => {
        if (f.id === code) return;
        const bbox = getBBox(f.geom);
        // bbox重なり判定
        const overlap =
          !(bbox.maxX < viewMinX || bbox.minX > viewMaxX || bbox.maxY < viewMinY || bbox.minY > viewMaxY);
        if (overlap) {
          const path = coordsToPath(f.geom.coordinates, f.geom.type, project);
          if (path) neighbors.push({ id: f.id, path });
        }
      });
    }

    const targetPath = coordsToPath(targetFeature.geom.coordinates, targetFeature.geom.type, project);

    return {
      svgW,
      svgH,
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

  return (
    <svg
      viewBox={`0 0 ${mapData.svgW} ${mapData.svgH}`}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* 背景（海） */}
      <rect width={mapData.svgW} height={mapData.svgH} fill="#f8fafc" />

      {/* 周辺国 (薄いグレー) */}
      {mapData.neighbors.map((n) => (
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

      {/* 対象国 (オレンジ・ハイライト & 輪郭強調) */}
      <path
        d={mapData.targetPath}
        fill={highlightColor}
        stroke="#ea580c"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="filter drop-shadow-sm"
      />
    </svg>
  );
};
