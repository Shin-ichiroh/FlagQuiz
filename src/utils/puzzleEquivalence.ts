/**
 * パズルタイルの視覚的等価性（同一絵柄・同色）を高精度Canvasピクセル比較で判定するユーティリティ
 */

interface PieceStats {
  isSolid: boolean;
  avgR: number;
  avgG: number;
  avgB: number;
}

function analyzePiece(data: Uint8ClampedArray, w: number, h: number): PieceStats {
  let rSum = 0;
  let gSum = 0;
  let bSum = 0;
  let innerPixels = 0;

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = (y * w + x) * 4;
      rSum += data[idx];
      gSum += data[idx + 1];
      bSum += data[idx + 2];
      innerPixels++;
    }
  }

  const avgR = rSum / innerPixels;
  const avgG = gSum / innerPixels;
  const avgB = bSum / innerPixels;

  let maxDev = 0;
  let devSum = 0;

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = (y * w + x) * 4;
      const dev =
        Math.abs(data[idx] - avgR) +
        Math.abs(data[idx + 1] - avgG) +
        Math.abs(data[idx + 2] - avgB);
      if (dev > maxDev) maxDev = dev;
      devSum += dev;
    }
  }

  const avgDev = devSum / innerPixels;
  // 単色ピース判定: 内部の平均色偏差が極めて小さく、突出した異色ピクセルがないこと
  const isSolid = avgDev < 5.0 && maxDev < 35;

  return { isSolid, avgR, avgG, avgB };
}

function arePiecesEquivalent(
  d1: Uint8ClampedArray,
  d2: Uint8ClampedArray,
  s1: PieceStats,
  s2: PieceStats,
  w: number,
  h: number
): boolean {
  // 1. 両方が単色（無地）ピースの場合:
  // 平均色（RGB）が人間の目で区別できない差であれば、100%同一無地ピースとして等価
  if (s1.isSolid && s2.isSolid) {
    const colorDiff =
      Math.abs(s1.avgR - s2.avgR) +
      Math.abs(s1.avgG - s2.avgG) +
      Math.abs(s1.avgB - s2.avgB);
    if (colorDiff < 15) {
      return true;
    }
  }

  // 片方だけが単色で片方が模様（星の先端など）の場合、絶対に等価ではない
  if (s1.isSolid !== s2.isSolid) {
    return false;
  }

  // 2. パターンピース同士の場合:
  // エッジ1pxを除外したインナー領域で厳密比較
  let totalDiff = 0;
  let significantPatternPixels = 0;
  let innerPixels = 0;

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = (y * w + x) * 4;
      const diff =
        Math.abs(d1[idx] - d2[idx]) +
        Math.abs(d1[idx + 1] - d2[idx + 1]) +
        Math.abs(d1[idx + 2] - d2[idx + 2]);
      totalDiff += diff;

      if (diff > 50) {
        significantPatternPixels++;
      }
      innerPixels++;
    }
  }

  const avgDiff = totalDiff / (innerPixels * 3);
  return avgDiff < 1.5 && significantPatternPixels <= 3;
}

export const checkEquivalentTiles = (imgUrl: string, size: number): Promise<boolean[][]> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        // 微細な星の先端や模様（1%未満の面積）も確実に検出するため、高解像度でサンプリング
        const sampleW = 48; // ピースごとのサンプリング幅
        const sampleH = 32; // ピースごとのサンプリング高さ
        const canvas = document.createElement("canvas");
        canvas.width = sampleW * size;
        canvas.height = sampleH * size;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          return resolve(createIdentityMatrix(size * size));
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const count = size * size;
        const pieceDataList: Uint8ClampedArray[] = [];
        const pieceStatsList: PieceStats[] = [];

        for (let i = 0; i < count; i++) {
          const col = i % size;
          const row = Math.floor(i / size);
          const imageData = ctx.getImageData(col * sampleW, row * sampleH, sampleW, sampleH);
          pieceDataList.push(imageData.data);
          pieceStatsList.push(analyzePiece(imageData.data, sampleW, sampleH));
        }

        // 行列 matrix[i][j]: ピースiとスロットjの絵柄が等価（純粋な同色または同一パターン）か
        const matrix: boolean[][] = Array.from({ length: count }, () => Array(count).fill(false));

        for (let i = 0; i < count; i++) {
          matrix[i][i] = true;
          for (let j = i + 1; j < count; j++) {
            const isEquiv = arePiecesEquivalent(
              pieceDataList[i],
              pieceDataList[j],
              pieceStatsList[i],
              pieceStatsList[j],
              sampleW,
              sampleH
            );
            matrix[i][j] = isEquiv;
            matrix[j][i] = isEquiv;
          }
        }

        resolve(matrix);
      } catch (err) {
        console.warn("Failed to check tile equivalence, falling back to strict matching:", err);
        resolve(createIdentityMatrix(size * size));
      }
    };

    img.onerror = () => {
      resolve(createIdentityMatrix(size * size));
    };

    img.src = imgUrl;
  });
};

const createIdentityMatrix = (count: number): boolean[][] => {
  return Array.from({ length: count }, (_, i) =>
    Array.from({ length: count }, (_, j) => i === j)
  );
};
