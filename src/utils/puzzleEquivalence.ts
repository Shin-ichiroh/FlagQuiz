/**
 * パズルタイルの視覚的等価性（同一絵柄・同色）をCanvasピクセル比較で判定するユーティリティ
 */

export const checkEquivalentTiles = (imgUrl: string, size: number): Promise<boolean[][]> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const sampleW = 24; // ピースごとのサンプリング幅
        const sampleH = 16; // ピースごとのサンプリング高さ
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

        for (let i = 0; i < count; i++) {
          const col = i % size;
          const row = Math.floor(i / size);
          const imageData = ctx.getImageData(col * sampleW, row * sampleH, sampleW, sampleH);
          pieceDataList.push(imageData.data);
        }

        // 行列 matrix[i][j]: ピースiとスロットjの絵柄が等価（ほぼ同一）か
        const matrix: boolean[][] = Array.from({ length: count }, () => Array(count).fill(false));

        for (let i = 0; i < count; i++) {
          matrix[i][i] = true;
          for (let j = i + 1; j < count; j++) {
            const d1 = pieceDataList[i];
            const d2 = pieceDataList[j];
            let totalDiff = 0;
            const pixelCount = sampleW * sampleH;

            for (let p = 0; p < d1.length; p += 4) {
              totalDiff += Math.abs(d1[p] - d2[p]);     // R
              totalDiff += Math.abs(d1[p + 1] - d2[p + 1]); // G
              totalDiff += Math.abs(d1[p + 2] - d2[p + 2]); // B
              // 早期打ち切り
              if (totalDiff > pixelCount * 3 * 6) {
                break;
              }
            }

            // 1ピクセルあたりRGB平均2.5未満の差なら視覚的に完全に同一とみなす
            const avgDiffPerPixel = totalDiff / (pixelCount * 3);
            const isEquivalent = avgDiffPerPixel < 2.5;

            matrix[i][j] = isEquivalent;
            matrix[j][i] = isEquivalent;
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
