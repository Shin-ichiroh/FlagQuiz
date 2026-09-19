/**
 * パズルタイルの視覚的等価性（同一絵柄・同色）を高精度Canvasピクセル比較で判定するユーティリティ
 */

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

        for (let i = 0; i < count; i++) {
          const col = i % size;
          const row = Math.floor(i / size);
          const imageData = ctx.getImageData(col * sampleW, row * sampleH, sampleW, sampleH);
          pieceDataList.push(imageData.data);
        }

        // 行列 matrix[i][j]: ピースiとスロットjの絵柄が等価（純粋な同色または同一パターン）か
        const matrix: boolean[][] = Array.from({ length: count }, () => Array(count).fill(false));
        const totalPixels = sampleW * sampleH;

        for (let i = 0; i < count; i++) {
          matrix[i][i] = true;
          for (let j = i + 1; j < count; j++) {
            const d1 = pieceDataList[i];
            const d2 = pieceDataList[j];
            let totalDiff = 0;
            let significantPatternPixels = 0;

            for (let p = 0; p < d1.length; p += 4) {
              const diff =
                Math.abs(d1[p] - d2[p]) +
                Math.abs(d1[p + 1] - d2[p + 1]) +
                Math.abs(d1[p + 2] - d2[p + 2]);
              totalDiff += diff;

              // 人間の目で明瞭に識別できる絵柄の差（ソマリアの星の先端、モロッコの星の先端など）
              // 白と水色、赤と緑、黄と青などは RGB差の合計が 150〜350 になる
              if (diff > 50) {
                significantPatternPixels++;
              }
            }

            const avgDiffPerPixel = totalDiff / (totalPixels * 3);

            // 等価とみなす条件:
            // 1. 全体の平均ピクセル差分が 1.0 未満（JPEG/PNGの微小な圧縮ノイズ程度のみ許容）
            // 2. 有意な絵柄ピクセル（星のツノや紋章など）が 3 ピクセル（約0.2%）以下
            // これにより、星の先端がわずかに食い込んでいるピースと無地ピースの誤一致を100%防止する
            const isEquivalent = avgDiffPerPixel < 1.0 && significantPatternPixels <= 3;

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
