import React from "react";

export interface FakeFlagVariant {
  id: string;
  isReal: boolean;
  /** ニセモノの理由（正解後やミス時に表示するネタバラシ解説） */
  fakeReason?: string;
  /** SVGを描画する関数 (viewBox="0 0 300 200") */
  renderSvg: () => React.ReactNode;
}

export interface FakeFlagStage {
  id: string;
  countryCode: string;
  countryName: string;
  countryRuby: string;
  difficulty: 1 | 2 | 3;
  hint: string;
  trivia: string;
  variants: FakeFlagVariant[];
}

export const FAKE_FLAG_STAGES: FakeFlagStage[] = [
  // 1. 日本
  {
    id: "jp",
    countryCode: "jp",
    countryName: "日本",
    countryRuby: "にっぽん",
    difficulty: 1,
    hint: "白地のど真ん中に、真っ赤な丸（太陽）があるよ！",
    trivia: "日本の国旗「日章旗（日の丸）」は、白い地に赤い丸がちょうど真ん中に描かれています。",
    variants: [
      {
        id: "jp_real",
        isReal: true,
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#ffffff" />
            <circle cx="150" cy="100" r="60" fill="#bc002d" />
          </>
        ),
      },
      {
        id: "jp_fake_left",
        isReal: false,
        fakeReason: "赤い丸が左にズレている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#ffffff" />
            <circle cx="95" cy="100" r="60" fill="#bc002d" />
          </>
        ),
      },
      {
        id: "jp_fake_square",
        isReal: false,
        fakeReason: "丸じゃなくて四角形になっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#ffffff" />
            <rect x="95" y="45" width="110" height="110" rx="10" fill="#bc002d" />
          </>
        ),
      },
      {
        id: "jp_fake_invert",
        isReal: false,
        fakeReason: "赤と白の色が逆になっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#bc002d" />
            <circle cx="150" cy="100" r="60" fill="#ffffff" />
          </>
        ),
      },
    ],
  },

  // 2. フランス
  {
    id: "fr",
    countryCode: "fr",
    countryName: "フランス",
    countryRuby: "ふらんす",
    difficulty: 1,
    hint: "左から「青・白・赤」の順番にならぶ縦の3色旗だよ！",
    trivia: "フランスのトリコロール（三色旗）は、左（ポール側）から「青・白・赤」の順番です。",
    variants: [
      {
        id: "fr_real",
        isReal: true,
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="100" height="200" fill="#002654" />
            <rect x="100" y="0" width="100" height="200" fill="#ffffff" />
            <rect x="200" y="0" width="100" height="200" fill="#ce1126" />
          </>
        ),
      },
      {
        id: "fr_fake_rev",
        isReal: false,
        fakeReason: "左が赤で右が青（左右が逆）！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="100" height="200" fill="#ce1126" />
            <rect x="100" y="0" width="100" height="200" fill="#ffffff" />
            <rect x="200" y="0" width="100" height="200" fill="#002654" />
          </>
        ),
      },
      {
        id: "fr_fake_horiz",
        isReal: false,
        fakeReason: "縦しまではなく横しまになっている！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="67" fill="#002654" />
            <rect x="0" y="67" width="300" height="66" fill="#ffffff" />
            <rect x="0" y="133" width="300" height="67" fill="#ce1126" />
          </>
        ),
      },
      {
        id: "fr_fake_midred",
        isReal: false,
        fakeReason: "真ん中が白ではなく赤になっている！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="100" height="200" fill="#002654" />
            <rect x="100" y="0" width="100" height="200" fill="#ce1126" />
            <rect x="200" y="0" width="100" height="200" fill="#ffffff" />
          </>
        ),
      },
    ],
  },

  // 3. スイス
  {
    id: "ch",
    countryCode: "ch",
    countryName: "スイス",
    countryRuby: "すいす",
    difficulty: 1,
    hint: "赤い背景の真ん中に、端に届かない太い白い十字があるよ！",
    trivia: "スイスの国旗は、赤地に白い十字（端まで届かないプラスの形）です。白地に赤十字は「赤十字社」のマークです。",
    variants: [
      {
        id: "ch_real",
        isReal: true,
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#d52b1e" />
            <rect x="130" y="40" width="40" height="120" fill="#ffffff" />
            <rect x="90" y="80" width="120" height="40" fill="#ffffff" />
          </>
        ),
      },
      {
        id: "ch_fake_redcross",
        isReal: false,
        fakeReason: "白地に赤い十字（病院・赤十字のマーク）！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#ffffff" />
            <rect x="130" y="40" width="40" height="120" fill="#d52b1e" />
            <rect x="90" y="80" width="120" height="40" fill="#d52b1e" />
          </>
        ),
      },
      {
        id: "ch_fake_full",
        isReal: false,
        fakeReason: "十字が端まで伸びている（デンマーク風）！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#d52b1e" />
            <rect x="130" y="0" width="40" height="200" fill="#ffffff" />
            <rect x="0" y="80" width="300" height="40" fill="#ffffff" />
          </>
        ),
      },
      {
        id: "ch_fake_x",
        isReal: false,
        fakeReason: "十字（＋）ではなく斜め（×）になっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#d52b1e" />
            <g transform="rotate(45 150 100)">
              <rect x="130" y="40" width="40" height="120" fill="#ffffff" />
              <rect x="90" y="80" width="120" height="40" fill="#ffffff" />
            </g>
          </>
        ),
      },
    ],
  },

  // 4. ドイツ
  {
    id: "de",
    countryCode: "de",
    countryName: "ドイツ",
    countryRuby: "どいつ",
    difficulty: 1,
    hint: "上から「黒・赤・黄（金）」の横3色だよ！",
    trivia: "ドイツの国旗は上から「黒・赤・金（黄色）」の横三色旗です。黒・黄・赤の縦縞はベルギーです。",
    variants: [
      {
        id: "de_real",
        isReal: true,
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="67" fill="#000000" />
            <rect x="0" y="67" width="300" height="66" fill="#dd0000" />
            <rect x="0" y="133" width="300" height="67" fill="#ffce00" />
          </>
        ),
      },
      {
        id: "de_fake_order",
        isReal: false,
        fakeReason: "真ん中が黄色で下が赤（順番が違う）！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="67" fill="#000000" />
            <rect x="0" y="67" width="300" height="66" fill="#ffce00" />
            <rect x="0" y="133" width="300" height="67" fill="#dd0000" />
          </>
        ),
      },
      {
        id: "de_fake_vert",
        isReal: false,
        fakeReason: "横しまではなく縦しまになっている！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="100" height="200" fill="#000000" />
            <rect x="100" y="0" width="100" height="200" fill="#dd0000" />
            <rect x="200" y="0" width="100" height="200" fill="#ffce00" />
          </>
        ),
      },
      {
        id: "de_fake_upside",
        isReal: false,
        fakeReason: "上下が逆（上が黄色で下が黒）！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="67" fill="#ffce00" />
            <rect x="0" y="67" width="300" height="66" fill="#dd0000" />
            <rect x="0" y="133" width="300" height="67" fill="#000000" />
          </>
        ),
      },
    ],
  },

  // 5. イタリア
  {
    id: "it",
    countryCode: "it",
    countryName: "イタリア",
    countryRuby: "いたりあ",
    difficulty: 1,
    hint: "ピザのマルゲリータと同じ！左から「緑・白・赤」の縦3色だよ！",
    trivia: "イタリアの国旗は左から「緑（バジル）・白（モッツァレラ）・赤（トマト）」と覚えると忘れません！",
    variants: [
      {
        id: "it_real",
        isReal: true,
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="100" height="200" fill="#009246" />
            <rect x="100" y="0" width="100" height="200" fill="#ffffff" />
            <rect x="200" y="0" width="100" height="200" fill="#ce2b37" />
          </>
        ),
      },
      {
        id: "it_fake_rev",
        isReal: false,
        fakeReason: "左が赤で右が緑（左右が逆）！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="100" height="200" fill="#ce2b37" />
            <rect x="100" y="0" width="100" height="200" fill="#ffffff" />
            <rect x="200" y="0" width="100" height="200" fill="#009246" />
          </>
        ),
      },
      {
        id: "it_fake_horiz",
        isReal: false,
        fakeReason: "横しまになっている（ハンガリー風）！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="67" fill="#ce2b37" />
            <rect x="0" y="67" width="300" height="66" fill="#ffffff" />
            <rect x="0" y="133" width="300" height="67" fill="#009246" />
          </>
        ),
      },
      {
        id: "it_fake_yellow",
        isReal: false,
        fakeReason: "真ん中が白ではなく黄色になっている！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="100" height="200" fill="#009246" />
            <rect x="100" y="0" width="100" height="200" fill="#ffce00" />
            <rect x="200" y="0" width="100" height="200" fill="#ce2b37" />
          </>
        ),
      },
    ],
  },

  // 6. ウクライナ
  {
    id: "ua",
    countryCode: "ua",
    countryName: "ウクライナ",
    countryRuby: "うくらいな",
    difficulty: 1,
    hint: "上は「青い空」、下は「黄金の小麦畑（黄色）」だよ！",
    trivia: "ウクライナの国旗は、上が澄み切った「青空」、下が豊かな「小麦畑（黄色）」を表しています。",
    variants: [
      {
        id: "ua_real",
        isReal: true,
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="100" fill="#0057b7" />
            <rect x="0" y="100" width="300" height="100" fill="#ffd700" />
          </>
        ),
      },
      {
        id: "ua_fake_upside",
        isReal: false,
        fakeReason: "上が黄色で下が青（上下が逆）！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="100" fill="#ffd700" />
            <rect x="0" y="100" width="300" height="100" fill="#0057b7" />
          </>
        ),
      },
      {
        id: "ua_fake_vert",
        isReal: false,
        fakeReason: "横2色ではなく縦2色になっている！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="150" height="200" fill="#0057b7" />
            <rect x="150" y="0" width="150" height="200" fill="#ffd700" />
          </>
        ),
      },
      {
        id: "ua_fake_green",
        isReal: false,
        fakeReason: "下が黄色ではなく緑色になっている！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="100" fill="#0057b7" />
            <rect x="0" y="100" width="300" height="100" fill="#009b3a" />
          </>
        ),
      },
    ],
  },

  // 7. スウェーデン
  {
    id: "se",
    countryCode: "se",
    countryName: "スウェーデン",
    countryRuby: "すうぇーでん",
    difficulty: 2,
    hint: "青い背景に黄色い十字！十字の交点は「少し左寄り」だよ！",
    trivia: "北欧の国旗（スカンジナビア十字）は、十字の交わる部分が中心より「左側」に寄っているのが特徴です。",
    variants: [
      {
        id: "se_real",
        isReal: true,
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#006aa7" />
            <rect x="90" y="0" width="36" height="200" fill="#fecc00" />
            <rect x="0" y="82" width="300" height="36" fill="#fecc00" />
          </>
        ),
      },
      {
        id: "se_fake_inv",
        isReal: false,
        fakeReason: "青と黄色の色が逆になっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#fecc00" />
            <rect x="90" y="0" width="36" height="200" fill="#006aa7" />
            <rect x="0" y="82" width="300" height="36" fill="#006aa7" />
          </>
        ),
      },
      {
        id: "se_fake_right",
        isReal: false,
        fakeReason: "十字の交点が右側に寄っている（左右逆）！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#006aa7" />
            <rect x="174" y="0" width="36" height="200" fill="#fecc00" />
            <rect x="0" y="82" width="300" height="36" fill="#fecc00" />
          </>
        ),
      },
      {
        id: "se_fake_white",
        isReal: false,
        fakeReason: "十字が黄色ではなく白色になっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#006aa7" />
            <rect x="90" y="0" width="36" height="200" fill="#ffffff" />
            <rect x="0" y="82" width="300" height="36" fill="#ffffff" />
          </>
        ),
      },
    ],
  },

  // 8. 中国
  {
    id: "cn",
    countryCode: "cn",
    countryName: "中国",
    countryRuby: "ちゅうごく",
    difficulty: 2,
    hint: "赤地に黄色い星！左上に大きな星1つと、小さな星が4つ並んでいるよ！",
    trivia: "中国の国旗「五星紅旗」は、左上に大きな星が1つと、それを取り囲む4つの小さな黄色い星が描かれています。",
    variants: [
      {
        id: "cn_real",
        isReal: true,
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#de2910" />
            <polygon points="50,25 57,46 79,46 61,59 68,80 50,67 32,80 39,59 21,46 43,46" fill="#ffde00" />
            <circle cx="100" cy="22" r="7" fill="#ffde00" />
            <circle cx="116" cy="40" r="7" fill="#ffde00" />
            <circle cx="116" cy="65" r="7" fill="#ffde00" />
            <circle cx="100" cy="83" r="7" fill="#ffde00" />
          </>
        ),
      },
      {
        id: "cn_fake_right",
        isReal: false,
        fakeReason: "星が左上ではなく右上にある！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#de2910" />
            <polygon points="250,25 257,46 279,46 261,59 268,80 250,67 232,80 239,59 221,46 243,46" fill="#ffde00" />
            <circle cx="200" cy="22" r="7" fill="#ffde00" />
            <circle cx="184" cy="40" r="7" fill="#ffde00" />
            <circle cx="184" cy="65" r="7" fill="#ffde00" />
            <circle cx="200" cy="83" r="7" fill="#ffde00" />
          </>
        ),
      },
      {
        id: "cn_fake_white",
        isReal: false,
        fakeReason: "星の色が黄色ではなく白色になっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#de2910" />
            <polygon points="50,25 57,46 79,46 61,59 68,80 50,67 32,80 39,59 21,46 43,46" fill="#ffffff" />
            <circle cx="100" cy="22" r="7" fill="#ffffff" />
            <circle cx="116" cy="40" r="7" fill="#ffffff" />
            <circle cx="116" cy="65" r="7" fill="#ffffff" />
            <circle cx="100" cy="83" r="7" fill="#ffffff" />
          </>
        ),
      },
      {
        id: "cn_fake_center",
        isReal: false,
        fakeReason: "星が左上ではなく真ん中に集まっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#de2910" />
            <polygon points="150,65 159,91 186,91 164,107 172,133 150,117 128,133 136,107 114,91 141,91" fill="#ffde00" />
            <circle cx="95" cy="60" r="8" fill="#ffde00" />
            <circle cx="205" cy="60" r="8" fill="#ffde00" />
            <circle cx="95" cy="140" r="8" fill="#ffde00" />
            <circle cx="205" cy="140" r="8" fill="#ffde00" />
          </>
        ),
      },
    ],
  },

  // 9. ブラジル
  {
    id: "br",
    countryCode: "br",
    countryName: "ブラジル",
    countryRuby: "ぶらじる",
    difficulty: 2,
    hint: "緑の背景に黄色いひし形、真ん中に青い地球（天球儀）だよ！",
    trivia: "ブラジルの国旗は、緑（森林）の中に黄色（鉱物資源）のひし形、中央に青い天球儀と白い帯が描かれています。",
    variants: [
      {
        id: "br_real",
        isReal: true,
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#009b3a" />
            <polygon points="150,22 274,100 150,178 26,100" fill="#fedf00" />
            <circle cx="150" cy="100" r="42" fill="#002776" />
            <path d="M 110 92 Q 152 80 190 108" stroke="#ffffff" strokeWidth="8" fill="none" />
          </>
        ),
      },
      {
        id: "br_fake_swap",
        isReal: false,
        fakeReason: "緑と黄色の位置が逆になっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#fedf00" />
            <polygon points="150,22 274,100 150,178 26,100" fill="#009b3a" />
            <circle cx="150" cy="100" r="42" fill="#002776" />
            <path d="M 110 92 Q 152 80 190 108" stroke="#ffffff" strokeWidth="8" fill="none" />
          </>
        ),
      },
      {
        id: "br_fake_redcircle",
        isReal: false,
        fakeReason: "真ん中の丸が青ではなく赤色になっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#009b3a" />
            <polygon points="150,22 274,100 150,178 26,100" fill="#fedf00" />
            <circle cx="150" cy="100" r="42" fill="#ce1126" />
            <path d="M 110 92 Q 152 80 190 108" stroke="#ffffff" strokeWidth="8" fill="none" />
          </>
        ),
      },
      {
        id: "br_fake_rect",
        isReal: false,
        fakeReason: "黄色い部分がひし形ではなく四角形になっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#009b3a" />
            <rect x="45" y="35" width="210" height="130" fill="#fedf00" />
            <circle cx="150" cy="100" r="42" fill="#002776" />
            <path d="M 110 92 Q 152 80 190 108" stroke="#ffffff" strokeWidth="8" fill="none" />
          </>
        ),
      },
    ],
  },

  // 10. アメリカ
  {
    id: "us",
    countryCode: "us",
    countryName: "アメリカ",
    countryRuby: "あめりか",
    difficulty: 2,
    hint: "赤と白の横しまに、左上（カントン）に青い四角と白い星があるよ！",
    trivia: "アメリカの星条旗は、左上に青い四角（50個の星）があり、赤と白の横縞が13本並んでいます。",
    variants: [
      {
        id: "us_real",
        isReal: true,
        renderSvg: () => (
          <>
            {[...Array(13)].map((_, i) => (
              <rect
                key={i}
                x="0"
                y={(i * 200) / 13}
                width="300"
                height={200 / 13 + 0.5}
                fill={i % 2 === 0 ? "#b22234" : "#ffffff"}
              />
            ))}
            <rect x="0" y="0" width="130" height={(200 * 7) / 13} fill="#3c3b6e" />
            {[20, 45, 70, 95, 115].map((cx) =>
              [18, 40, 62, 85].map((cy) => (
                <circle key={`${cx}_${cy}`} cx={cx} cy={cy} r="4" fill="#ffffff" />
              ))
            )}
          </>
        ),
      },
      {
        id: "us_fake_right",
        isReal: false,
        fakeReason: "青い星のエリアが左上ではなく「右上」にある！",
        renderSvg: () => (
          <>
            {[...Array(13)].map((_, i) => (
              <rect
                key={i}
                x="0"
                y={(i * 200) / 13}
                width="300"
                height={200 / 13 + 0.5}
                fill={i % 2 === 0 ? "#b22234" : "#ffffff"}
              />
            ))}
            <rect x="170" y="0" width="130" height={(200 * 7) / 13} fill="#3c3b6e" />
            {[190, 215, 240, 265, 285].map((cx) =>
              [18, 40, 62, 85].map((cy) => (
                <circle key={`${cx}_${cy}`} cx={cx} cy={cy} r="4" fill="#ffffff" />
              ))
            )}
          </>
        ),
      },
      {
        id: "us_fake_bluestripe",
        isReal: false,
        fakeReason: "横しまが赤白ではなく青白で、左上が赤になっている！",
        renderSvg: () => (
          <>
            {[...Array(13)].map((_, i) => (
              <rect
                key={i}
                x="0"
                y={(i * 200) / 13}
                width="300"
                height={200 / 13 + 0.5}
                fill={i % 2 === 0 ? "#3c3b6e" : "#ffffff"}
              />
            ))}
            <rect x="0" y="0" width="130" height={(200 * 7) / 13} fill="#b22234" />
            {[20, 45, 70, 95, 115].map((cx) =>
              [18, 40, 62, 85].map((cy) => (
                <circle key={`${cx}_${cy}`} cx={cx} cy={cy} r="4" fill="#ffffff" />
              ))
            )}
          </>
        ),
      },
      {
        id: "us_fake_bottom",
        isReal: false,
        fakeReason: "青い星のエリアが「左下」にある！",
        renderSvg: () => (
          <>
            {[...Array(13)].map((_, i) => (
              <rect
                key={i}
                x="0"
                y={(i * 200) / 13}
                width="300"
                height={200 / 13 + 0.5}
                fill={i % 2 === 0 ? "#b22234" : "#ffffff"}
              />
            ))}
            <rect x="0" y={(200 * 6) / 13} width="130" height={(200 * 7) / 13} fill="#3c3b6e" />
            {[20, 45, 70, 95, 115].map((cx) =>
              [110, 132, 154, 178].map((cy) => (
                <circle key={`${cx}_${cy}`} cx={cx} cy={cy} r="4" fill="#ffffff" />
              ))
            )}
          </>
        ),
      },
    ],
  },

  // 11. トルコ
  {
    id: "tr",
    countryCode: "tr",
    countryName: "トルコ",
    countryRuby: "とるこ",
    difficulty: 2,
    hint: "赤地に白い三日月と星！三日月の開いている右側に星があるよ！",
    trivia: "トルコの国旗「新月旗」は、赤い背景に白い三日月（右向きに開く）と五角星が描かれています。",
    variants: [
      {
        id: "tr_real",
        isReal: true,
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#e30a17" />
            <circle cx="115" cy="100" r="50" fill="#ffffff" />
            <circle cx="128" cy="100" r="40" fill="#e30a17" />
            <polygon points="168,100 183,105 178,120 190,108 205,113 195,100 205,87 190,92 178,80 183,95" fill="#ffffff" />
          </>
        ),
      },
      {
        id: "tr_fake_rev",
        isReal: false,
        fakeReason: "三日月と星の向きが左右逆になっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#e30a17" />
            <circle cx="185" cy="100" r="50" fill="#ffffff" />
            <circle cx="172" cy="100" r="40" fill="#e30a17" />
            <polygon points="132,100 117,105 122,120 110,108 95,113 105,100 95,87 110,92 122,80 117,95" fill="#ffffff" />
          </>
        ),
      },
      {
        id: "tr_fake_yellow",
        isReal: false,
        fakeReason: "三日月と星が白ではなく黄色になっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#e30a17" />
            <circle cx="115" cy="100" r="50" fill="#ffde00" />
            <circle cx="128" cy="100" r="40" fill="#e30a17" />
            <polygon points="168,100 183,105 178,120 190,108 205,113 195,100 205,87 190,92 178,80 183,95" fill="#ffde00" />
          </>
        ),
      },
      {
        id: "tr_fake_whitebg",
        isReal: false,
        fakeReason: "赤と白の色が逆になっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#ffffff" />
            <circle cx="115" cy="100" r="50" fill="#e30a17" />
            <circle cx="128" cy="100" r="40" fill="#ffffff" />
            <polygon points="168,100 183,105 178,120 190,108 205,113 195,100 205,87 190,92 178,80 183,95" fill="#e30a17" />
          </>
        ),
      },
    ],
  },

  // 12. ジャマイカ
  {
    id: "jm",
    countryCode: "jm",
    countryName: "ジャマイカ",
    countryRuby: "じゃまいか",
    difficulty: 2,
    hint: "黄色い斜め十字（×）に、上下が「緑」で左右が「黒」だよ！",
    trivia: "ジャマイカの国旗は世界で唯一「赤・白・青」を1色も使わない国旗の一つ！上下が緑、左右が黒、斜め十字が黄色です。",
    variants: [
      {
        id: "jm_real",
        isReal: true,
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#009b3a" />
            <polygon points="0,0 150,100 0,200" fill="#000000" />
            <polygon points="300,0 150,100 300,200" fill="#000000" />
            <line x1="0" y1="0" x2="300" y2="200" stroke="#fed100" strokeWidth="28" />
            <line x1="300" y1="0" x2="0" y2="200" stroke="#fed100" strokeWidth="28" />
          </>
        ),
      },
      {
        id: "jm_fake_swap",
        isReal: false,
        fakeReason: "緑と黒の位置が逆（上下が黒で左右が緑）！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#000000" />
            <polygon points="0,0 150,100 0,200" fill="#009b3a" />
            <polygon points="300,0 150,100 300,200" fill="#009b3a" />
            <line x1="0" y1="0" x2="300" y2="200" stroke="#fed100" strokeWidth="28" />
            <line x1="300" y1="0" x2="0" y2="200" stroke="#fed100" strokeWidth="28" />
          </>
        ),
      },
      {
        id: "jm_fake_white",
        isReal: false,
        fakeReason: "斜め十字が黄色ではなく白色になっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#009b3a" />
            <polygon points="0,0 150,100 0,200" fill="#000000" />
            <polygon points="300,0 150,100 300,200" fill="#000000" />
            <line x1="0" y1="0" x2="300" y2="200" stroke="#ffffff" strokeWidth="28" />
            <line x1="300" y1="0" x2="0" y2="200" stroke="#ffffff" strokeWidth="28" />
          </>
        ),
      },
      {
        id: "jm_fake_plus",
        isReal: false,
        fakeReason: "斜め（×）ではなく縦横の十字（＋）になっている！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="150" height="100" fill="#009b3a" />
            <rect x="150" y="0" width="150" height="100" fill="#000000" />
            <rect x="0" y="100" width="150" height="100" fill="#000000" />
            <rect x="150" y="100" width="150" height="100" fill="#009b3a" />
            <rect x="135" y="0" width="30" height="200" fill="#fed100" />
            <rect x="0" y="85" width="300" height="30" fill="#fed100" />
          </>
        ),
      },
    ],
  },

  // 13. チェコ
  {
    id: "cz",
    countryCode: "cz",
    countryName: "チェコ",
    countryRuby: "ちぇこ",
    difficulty: 2,
    hint: "上が白、下が赤、そして左側に青い三角形があるよ！",
    trivia: "チェコの国旗は、もともとポーランドと同じ白・赤の2色旗でしたが、区別するために左側に青い三角形を加えました。",
    variants: [
      {
        id: "cz_real",
        isReal: true,
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="100" fill="#ffffff" />
            <rect x="0" y="100" width="300" height="100" fill="#d7141a" />
            <polygon points="0,0 150,100 0,200" fill="#11457e" />
          </>
        ),
      },
      {
        id: "cz_fake_upside",
        isReal: false,
        fakeReason: "上が赤で下が白（上下が逆）！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="100" fill="#d7141a" />
            <rect x="0" y="100" width="300" height="100" fill="#ffffff" />
            <polygon points="0,0 150,100 0,200" fill="#11457e" />
          </>
        ),
      },
      {
        id: "cz_fake_right",
        isReal: false,
        fakeReason: "青い三角形が左側ではなく右側にある！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="100" fill="#ffffff" />
            <rect x="0" y="100" width="300" height="100" fill="#d7141a" />
            <polygon points="300,0 150,100 300,200" fill="#11457e" />
          </>
        ),
      },
      {
        id: "cz_fake_yellow",
        isReal: false,
        fakeReason: "左の三角形が青ではなく黄色になっている！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="100" fill="#ffffff" />
            <rect x="0" y="100" width="300" height="100" fill="#d7141a" />
            <polygon points="0,0 150,100 0,200" fill="#fed100" />
          </>
        ),
      },
    ],
  },

  // 14. イギリス
  {
    id: "gb",
    countryCode: "gb",
    countryName: "イギリス",
    countryRuby: "いぎりす",
    difficulty: 3,
    hint: "青地に、赤と白の「縦横十字（＋）」と「斜め十字（×）」が両方重なっているよ！",
    trivia: "ユニオンジャックは、イングランド（赤＋）、スコットランド（白×）、アイルランド（赤×）の3つの十字が合体した国旗です。",
    variants: [
      {
        id: "gb_real",
        isReal: true,
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#012169" />
            <line x1="0" y1="0" x2="300" y2="200" stroke="#ffffff" strokeWidth="36" />
            <line x1="300" y1="0" x2="0" y2="200" stroke="#ffffff" strokeWidth="36" />
            <line x1="0" y1="0" x2="300" y2="200" stroke="#c8102e" strokeWidth="14" />
            <line x1="300" y1="0" x2="0" y2="200" stroke="#c8102e" strokeWidth="14" />
            <rect x="125" y="0" width="50" height="200" fill="#ffffff" />
            <rect x="0" y="75" width="300" height="50" fill="#ffffff" />
            <rect x="135" y="0" width="30" height="200" fill="#c8102e" />
            <rect x="0" y="85" width="300" height="30" fill="#c8102e" />
          </>
        ),
      },
      {
        id: "gb_fake_nodiag",
        isReal: false,
        fakeReason: "斜めの十字（×）が消えている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#012169" />
            <rect x="125" y="0" width="50" height="200" fill="#ffffff" />
            <rect x="0" y="75" width="300" height="50" fill="#ffffff" />
            <rect x="135" y="0" width="30" height="200" fill="#c8102e" />
            <rect x="0" y="85" width="300" height="30" fill="#c8102e" />
          </>
        ),
      },
      {
        id: "gb_fake_noplus",
        isReal: false,
        fakeReason: "縦横の十字（＋）が消えて斜めだけになっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#012169" />
            <line x1="0" y1="0" x2="300" y2="200" stroke="#ffffff" strokeWidth="38" />
            <line x1="300" y1="0" x2="0" y2="200" stroke="#ffffff" strokeWidth="38" />
            <line x1="0" y1="0" x2="300" y2="200" stroke="#c8102e" strokeWidth="18" />
            <line x1="300" y1="0" x2="0" y2="200" stroke="#c8102e" strokeWidth="18" />
          </>
        ),
      },
      {
        id: "gb_fake_yellow",
        isReal: false,
        fakeReason: "十字の色が赤ではなく黄色になっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#012169" />
            <line x1="0" y1="0" x2="300" y2="200" stroke="#ffffff" strokeWidth="36" />
            <line x1="300" y1="0" x2="0" y2="200" stroke="#ffffff" strokeWidth="36" />
            <line x1="0" y1="0" x2="300" y2="200" stroke="#fed100" strokeWidth="14" />
            <line x1="300" y1="0" x2="0" y2="200" stroke="#fed100" strokeWidth="14" />
            <rect x="125" y="0" width="50" height="200" fill="#ffffff" />
            <rect x="0" y="75" width="300" height="50" fill="#ffffff" />
            <rect x="135" y="0" width="30" height="200" fill="#fed100" />
            <rect x="0" y="85" width="300" height="30" fill="#fed100" />
          </>
        ),
      },
    ],
  },

  // 15. カナダ
  {
    id: "ca",
    countryCode: "ca",
    countryName: "カナダ",
    countryRuby: "かなだ",
    difficulty: 2,
    hint: "両端が赤、真ん中が白、そして真ん中に「赤いカエデの葉」があるよ！",
    trivia: "カナダの国旗「メイプルリーフ旗」は、太平洋と大西洋を表す両端の赤と、中央の雪を表す白地に赤いカエデの葉が描かれています。",
    variants: [
      {
        id: "ca_real",
        isReal: true,
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="75" height="200" fill="#ff0000" />
            <rect x="75" y="0" width="150" height="200" fill="#ffffff" />
            <rect x="225" y="0" width="75" height="200" fill="#ff0000" />
            <path
              d="M150,42 L162,72 L188,66 L174,92 L195,105 L162,115 L168,136 L153,132 L153,162 L147,162 L147,132 L132,136 L138,115 L105,105 L126,92 L112,66 L138,72 Z"
              fill="#ff0000"
            />
          </>
        ),
      },
      {
        id: "ca_fake_greenleaf",
        isReal: false,
        fakeReason: "カエデの葉が赤ではなく緑色になっている！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="75" height="200" fill="#ff0000" />
            <rect x="75" y="0" width="150" height="200" fill="#ffffff" />
            <rect x="225" y="0" width="75" height="200" fill="#ff0000" />
            <path
              d="M150,42 L162,72 L188,66 L174,92 L195,105 L162,115 L168,136 L153,132 L153,162 L147,162 L147,132 L132,136 L138,115 L105,105 L126,92 L112,66 L138,72 Z"
              fill="#009246"
            />
          </>
        ),
      },
      {
        id: "ca_fake_inv",
        isReal: false,
        fakeReason: "赤と白の配色がすべて逆になっている！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="75" height="200" fill="#ffffff" />
            <rect x="75" y="0" width="150" height="200" fill="#ff0000" />
            <rect x="225" y="0" width="75" height="200" fill="#ffffff" />
            <path
              d="M150,42 L162,72 L188,66 L174,92 L195,105 L162,115 L168,136 L153,132 L153,162 L147,162 L147,132 L132,136 L138,115 L105,105 L126,92 L112,66 L138,72 Z"
              fill="#ffffff"
            />
          </>
        ),
      },
      {
        id: "ca_fake_horiz",
        isReal: false,
        fakeReason: "縦しまではなく上下が赤の横しまになっている！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="45" fill="#ff0000" />
            <rect x="0" y="45" width="300" height="110" fill="#ffffff" />
            <rect x="0" y="155" width="300" height="45" fill="#ff0000" />
            <path
              d="M150,52 L160,76 L182,71 L170,92 L188,103 L160,111 L165,128 L152,125 L152,148 L148,148 L148,125 L135,128 L140,111 L112,103 L130,92 L118,71 L140,76 Z"
              fill="#ff0000"
            />
          </>
        ),
      },
    ],
  },

  // 16. 韓国
  {
    id: "kr",
    countryCode: "kr",
    countryName: "韓国",
    countryRuby: "かんこく",
    difficulty: 3,
    hint: "白地に、真ん中の丸は「上が赤・下が青」、四隅に黒い線が並んでいるよ！",
    trivia: "韓国の「太極旗」は、中央の円（太極）の上半分が赤（陽）、下半分が青（陰）で、四隅に黒い線（四卦）があります。",
    variants: [
      {
        id: "kr_real",
        isReal: true,
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#ffffff" />
            {/* 上半分の赤と下半分の青 */}
            <path d="M 105,100 A 45,45 0 0,1 195,100 Z" fill="#cd2e3a" />
            <path d="M 105,100 A 45,45 0 0,0 195,100 Z" fill="#0047a0" />
            <circle cx="127.5" cy="100" r="22.5" fill="#cd2e3a" />
            <circle cx="172.5" cy="100" r="22.5" fill="#0047a0" />
            {/* 四隅の黒い四卦 */}
            <g stroke="#000000" strokeWidth="6" strokeLinecap="butt">
              <line x1="65" y1="45" x2="88" y2="28" />
              <line x1="72" y1="54" x2="95" y2="37" />
              <line x1="79" y1="63" x2="102" y2="46" />

              <line x1="212" y1="28" x2="235" y2="45" />
              <line x1="205" y1="37" x2="228" y2="54" />
              <line x1="198" y1="46" x2="221" y2="63" />

              <line x1="65" y1="155" x2="88" y2="172" />
              <line x1="72" y1="146" x2="95" y2="163" />
              <line x1="79" y1="137" x2="102" y2="154" />

              <line x1="212" y1="172" x2="235" y2="155" />
              <line x1="205" y1="163" x2="228" y2="146" />
              <line x1="198" y1="154" x2="221" y2="137" />
            </g>
          </>
        ),
      },
      {
        id: "kr_fake_upside",
        isReal: false,
        fakeReason: "真ん中の丸の上下が逆（上が青で下が赤）！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#ffffff" />
            <path d="M 105,100 A 45,45 0 0,1 195,100 Z" fill="#0047a0" />
            <path d="M 105,100 A 45,45 0 0,0 195,100 Z" fill="#cd2e3a" />
            <circle cx="127.5" cy="100" r="22.5" fill="#0047a0" />
            <circle cx="172.5" cy="100" r="22.5" fill="#cd2e3a" />
            <g stroke="#000000" strokeWidth="6" strokeLinecap="butt">
              <line x1="65" y1="45" x2="88" y2="28" />
              <line x1="72" y1="54" x2="95" y2="37" />
              <line x1="79" y1="63" x2="102" y2="46" />
              <line x1="212" y1="28" x2="235" y2="45" />
              <line x1="205" y1="37" x2="228" y2="54" />
              <line x1="198" y1="46" x2="221" y2="63" />
              <line x1="65" y1="155" x2="88" y2="172" />
              <line x1="72" y1="146" x2="95" y2="163" />
              <line x1="79" y1="137" x2="102" y2="154" />
              <line x1="212" y1="172" x2="235" y2="155" />
              <line x1="205" y1="163" x2="228" y2="146" />
              <line x1="198" y1="154" x2="221" y2="137" />
            </g>
          </>
        ),
      },
      {
        id: "kr_fake_notrigrams",
        isReal: false,
        fakeReason: "四隅の黒い線（四卦）が消えている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#ffffff" />
            <path d="M 105,100 A 45,45 0 0,1 195,100 Z" fill="#cd2e3a" />
            <path d="M 105,100 A 45,45 0 0,0 195,100 Z" fill="#0047a0" />
            <circle cx="127.5" cy="100" r="22.5" fill="#cd2e3a" />
            <circle cx="172.5" cy="100" r="22.5" fill="#0047a0" />
          </>
        ),
      },
      {
        id: "kr_fake_yellowgreen",
        isReal: false,
        fakeReason: "真ん中の丸が赤と青ではなく「黄と緑」になっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#ffffff" />
            <path d="M 105,100 A 45,45 0 0,1 195,100 Z" fill="#fed100" />
            <path d="M 105,100 A 45,45 0 0,0 195,100 Z" fill="#009b3a" />
            <circle cx="127.5" cy="100" r="22.5" fill="#fed100" />
            <circle cx="172.5" cy="100" r="22.5" fill="#009b3a" />
            <g stroke="#000000" strokeWidth="6" strokeLinecap="butt">
              <line x1="65" y1="45" x2="88" y2="28" />
              <line x1="72" y1="54" x2="95" y2="37" />
              <line x1="79" y1="63" x2="102" y2="46" />
              <line x1="212" y1="28" x2="235" y2="45" />
              <line x1="205" y1="37" x2="228" y2="54" />
              <line x1="198" y1="46" x2="221" y2="63" />
              <line x1="65" y1="155" x2="88" y2="172" />
              <line x1="72" y1="146" x2="95" y2="163" />
              <line x1="79" y1="137" x2="102" y2="154" />
              <line x1="212" y1="172" x2="235" y2="155" />
              <line x1="205" y1="163" x2="228" y2="146" />
              <line x1="198" y1="154" x2="221" y2="137" />
            </g>
          </>
        ),
      },
    ],
  },

  // 17. ギリシャ
  {
    id: "gr",
    countryCode: "gr",
    countryName: "ギリシャ",
    countryRuby: "ぎりしゃ",
    difficulty: 3,
    hint: "青と白の9本の横しまに、左上に青い四角と白い十字（＋）があるよ！",
    trivia: "ギリシャの国旗は、エーゲ海を表す青と白の9本の横縞と、左上の白い十字が描かれています。",
    variants: [
      {
        id: "gr_real",
        isReal: true,
        renderSvg: () => (
          <>
            {[...Array(9)].map((_, i) => (
              <rect
                key={i}
                x="0"
                y={(i * 200) / 9}
                width="300"
                height={200 / 9 + 0.5}
                fill={i % 2 === 0 ? "#0d5eaf" : "#ffffff"}
              />
            ))}
            <rect x="0" y="0" width={(200 * 5) / 9} height={(200 * 5) / 9} fill="#0d5eaf" />
            <rect x={(200 * 2) / 9} y="0" width={200 / 9} height={(200 * 5) / 9} fill="#ffffff" />
            <rect x="0" y={(200 * 2) / 9} width={(200 * 5) / 9} height={200 / 9} fill="#ffffff" />
          </>
        ),
      },
      {
        id: "gr_fake_right",
        isReal: false,
        fakeReason: "十字のマークが左上ではなく「右上」にある！",
        renderSvg: () => (
          <>
            {[...Array(9)].map((_, i) => (
              <rect
                key={i}
                x="0"
                y={(i * 200) / 9}
                width="300"
                height={200 / 9 + 0.5}
                fill={i % 2 === 0 ? "#0d5eaf" : "#ffffff"}
              />
            ))}
            <rect x={300 - (200 * 5) / 9} y="0" width={(200 * 5) / 9} height={(200 * 5) / 9} fill="#0d5eaf" />
            <rect x={300 - (200 * 3) / 9} y="0" width={200 / 9} height={(200 * 5) / 9} fill="#ffffff" />
            <rect x={300 - (200 * 5) / 9} y={(200 * 2) / 9} width={(200 * 5) / 9} height={200 / 9} fill="#ffffff" />
          </>
        ),
      },
      {
        id: "gr_fake_red",
        isReal: false,
        fakeReason: "左上の十字エリアが青ではなく赤色になっている！",
        renderSvg: () => (
          <>
            {[...Array(9)].map((_, i) => (
              <rect
                key={i}
                x="0"
                y={(i * 200) / 9}
                width="300"
                height={200 / 9 + 0.5}
                fill={i % 2 === 0 ? "#0d5eaf" : "#ffffff"}
              />
            ))}
            <rect x="0" y="0" width={(200 * 5) / 9} height={(200 * 5) / 9} fill="#ce1126" />
            <rect x={(200 * 2) / 9} y="0" width={200 / 9} height={(200 * 5) / 9} fill="#ffffff" />
            <rect x="0" y={(200 * 2) / 9} width={(200 * 5) / 9} height={200 / 9} fill="#ffffff" />
          </>
        ),
      },
      {
        id: "gr_fake_x",
        isReal: false,
        fakeReason: "左上の十字が縦横（＋）ではなく斜め（×）になっている！",
        renderSvg: () => (
          <>
            {[...Array(9)].map((_, i) => (
              <rect
                key={i}
                x="0"
                y={(i * 200) / 9}
                width="300"
                height={200 / 9 + 0.5}
                fill={i % 2 === 0 ? "#0d5eaf" : "#ffffff"}
              />
            ))}
            <rect x="0" y="0" width="111" height="111" fill="#0d5eaf" />
            <line x1="0" y1="0" x2="111" y2="111" stroke="#ffffff" strokeWidth="20" />
            <line x1="111" y1="0" x2="0" y2="111" stroke="#ffffff" strokeWidth="20" />
          </>
        ),
      },
    ],
  },

  // 18. ノルウェー
  {
    id: "no",
    countryCode: "no",
    countryName: "ノルウェー",
    countryRuby: "のるうぇー",
    difficulty: 3,
    hint: "赤い背景に、白いふちどりの「青い北欧十字（左寄り）」だよ！",
    trivia: "ノルウェーの国旗は「赤地に白ふちの青い十字」です。逆に「青地に白ふちの赤い十字」はアイスランドです！",
    variants: [
      {
        id: "no_real",
        isReal: true,
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#ba0c2f" />
            <rect x="80" y="0" width="50" height="200" fill="#ffffff" />
            <rect x="0" y="75" width="300" height="50" fill="#ffffff" />
            <rect x="92" y="0" width="26" height="200" fill="#00205b" />
            <rect x="0" y="87" width="300" height="26" fill="#00205b" />
          </>
        ),
      },
      {
        id: "no_fake_iceland",
        isReal: false,
        fakeReason: "青と赤が逆（アイスランドの国旗）になっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#00205b" />
            <rect x="80" y="0" width="50" height="200" fill="#ffffff" />
            <rect x="0" y="75" width="300" height="50" fill="#ffffff" />
            <rect x="92" y="0" width="26" height="200" fill="#ba0c2f" />
            <rect x="0" y="87" width="300" height="26" fill="#ba0c2f" />
          </>
        ),
      },
      {
        id: "no_fake_right",
        isReal: false,
        fakeReason: "十字の交点が左寄りではなく右寄りになっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#ba0c2f" />
            <rect x="170" y="0" width="50" height="200" fill="#ffffff" />
            <rect x="0" y="75" width="300" height="50" fill="#ffffff" />
            <rect x="182" y="0" width="26" height="200" fill="#00205b" />
            <rect x="0" y="87" width="300" height="26" fill="#00205b" />
          </>
        ),
      },
      {
        id: "no_fake_yellow",
        isReal: false,
        fakeReason: "内側の十字が青ではなく黄色になっている！",
        renderSvg: () => (
          <>
            <rect width="300" height="200" fill="#ba0c2f" />
            <rect x="80" y="0" width="50" height="200" fill="#ffffff" />
            <rect x="0" y="75" width="300" height="50" fill="#ffffff" />
            <rect x="92" y="0" width="26" height="200" fill="#fed100" />
            <rect x="0" y="87" width="300" height="26" fill="#fed100" />
          </>
        ),
      },
    ],
  },

  // 19. チリ
  {
    id: "cl",
    countryCode: "cl",
    countryName: "チリ",
    countryRuby: "ちり",
    difficulty: 3,
    hint: "上半分は「左に青い四角＋白い星、右に白」、下半分はすべて「赤」だよ！",
    trivia: "チリの国旗は、左上の青い四角の中に白い星が1つあり、上半分が白、下半分が赤です（青い部分が下まで伸びているのはテキサス州旗！）。",
    variants: [
      {
        id: "cl_real",
        isReal: true,
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="100" fill="#ffffff" />
            <rect x="0" y="100" width="300" height="100" fill="#d52b1e" />
            <rect x="0" y="0" width="100" height="100" fill="#0039a6" />
            <polygon points="50,22 57,43 79,43 61,56 68,77 50,64 32,77 39,56 21,43 43,43" fill="#ffffff" />
          </>
        ),
      },
      {
        id: "cl_fake_texas",
        isReal: false,
        fakeReason: "左の青い帯が下まで伸びている（テキサス風）！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="100" fill="#ffffff" />
            <rect x="0" y="100" width="300" height="100" fill="#d52b1e" />
            <rect x="0" y="0" width="100" height="200" fill="#0039a6" />
            <polygon points="50,72 57,93 79,93 61,106 68,127 50,114 32,127 39,106 21,93 43,93" fill="#ffffff" />
          </>
        ),
      },
      {
        id: "cl_fake_swap",
        isReal: false,
        fakeReason: "上が赤で下が白（白と赤が上下逆）！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="100" fill="#d52b1e" />
            <rect x="0" y="100" width="300" height="100" fill="#ffffff" />
            <rect x="0" y="0" width="100" height="100" fill="#0039a6" />
            <polygon points="50,22 57,43 79,43 61,56 68,77 50,64 32,77 39,56 21,43 43,43" fill="#ffffff" />
          </>
        ),
      },
      {
        id: "cl_fake_right",
        isReal: false,
        fakeReason: "青い星の四角が左上ではなく右上にある！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="100" fill="#ffffff" />
            <rect x="0" y="100" width="300" height="100" fill="#d52b1e" />
            <rect x="200" y="0" width="100" height="100" fill="#0039a6" />
            <polygon points="250,22 257,43 279,43 261,56 268,77 250,64 232,77 239,56 221,43 243,43" fill="#ffffff" />
          </>
        ),
      },
    ],
  },

  // 20. 南アフリカ
  {
    id: "za",
    countryCode: "za",
    countryName: "南アフリカ",
    countryRuby: "みなみあふりか",
    difficulty: 3,
    hint: "左から右へ伸びる緑のY字！上は「赤」、下は「青」、左端は「黒」だよ！",
    trivia: "南アフリカの国旗は6色を使ったカラフルなデザイン。上が赤、下が青、中央に緑のY字、左端に黒と黄色の三角形があります。",
    variants: [
      {
        id: "za_real",
        isReal: true,
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="100" fill="#e03c31" />
            <rect x="0" y="100" width="300" height="100" fill="#001489" />
            <polygon points="0,0 145,100 0,200" fill="#ffffff" />
            <rect x="0" y="68" width="300" height="64" fill="#ffffff" />
            <polygon points="0,12 128,100 0,188" fill="#007749" />
            <rect x="0" y="78" width="300" height="44" fill="#007749" />
            <polygon points="0,28 104,100 0,172" fill="#ffb81c" />
            <polygon points="0,42 84,100 0,158" fill="#000000" />
          </>
        ),
      },
      {
        id: "za_fake_upside",
        isReal: false,
        fakeReason: "上が青で下が赤（赤と青が上下逆）！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="100" fill="#001489" />
            <rect x="0" y="100" width="300" height="100" fill="#e03c31" />
            <polygon points="0,0 145,100 0,200" fill="#ffffff" />
            <rect x="0" y="68" width="300" height="64" fill="#ffffff" />
            <polygon points="0,12 128,100 0,188" fill="#007749" />
            <rect x="0" y="78" width="300" height="44" fill="#007749" />
            <polygon points="0,28 104,100 0,172" fill="#ffb81c" />
            <polygon points="0,42 84,100 0,158" fill="#000000" />
          </>
        ),
      },
      {
        id: "za_fake_right",
        isReal: false,
        fakeReason: "Y字の向きが左右逆になっている！",
        renderSvg: () => (
          <g transform="scale(-1, 1) translate(-300, 0)">
            <rect x="0" y="0" width="300" height="100" fill="#e03c31" />
            <rect x="0" y="100" width="300" height="100" fill="#001489" />
            <polygon points="0,0 145,100 0,200" fill="#ffffff" />
            <rect x="0" y="68" width="300" height="64" fill="#ffffff" />
            <polygon points="0,12 128,100 0,188" fill="#007749" />
            <rect x="0" y="78" width="300" height="44" fill="#007749" />
            <polygon points="0,28 104,100 0,172" fill="#ffb81c" />
            <polygon points="0,42 84,100 0,158" fill="#000000" />
          </g>
        ),
      },
      {
        id: "za_fake_yellowy",
        isReal: false,
        fakeReason: "真ん中のY字が緑ではなく黄色になっている！",
        renderSvg: () => (
          <>
            <rect x="0" y="0" width="300" height="100" fill="#e03c31" />
            <rect x="0" y="100" width="300" height="100" fill="#001489" />
            <polygon points="0,0 145,100 0,200" fill="#ffffff" />
            <rect x="0" y="68" width="300" height="64" fill="#ffffff" />
            <polygon points="0,12 128,100 0,188" fill="#ffb81c" />
            <rect x="0" y="78" width="300" height="44" fill="#ffb81c" />
            <polygon points="0,28 104,100 0,172" fill="#007749" />
            <polygon points="0,42 84,100 0,158" fill="#000000" />
          </>
        ),
      },
    ],
  },
];
