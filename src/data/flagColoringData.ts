export interface ColoringElement {
  id: string;
  name: string;
  type: "rect" | "circle" | "polygon" | "path";
  props: Record<string, number | string>;
  correctColor: string;
}

export interface ColoringFlag {
  id: string;
  countryCode: string;
  countryName: string;
  countryRuby: string;
  aspectRatio: string;
  viewBox: string;
  elements: ColoringElement[];
  palette: string[];
  trivia: string;
}

export const COLORING_FLAGS: ColoringFlag[] = [
  {
    "id": "jp",
    "countryCode": "jp",
    "countryName": "日本",
    "countryRuby": "にっぽん",
    "aspectRatio": "3 / 2",
    "viewBox": "0 0 300 200",
    "elements": [
      {
        "id": "bg",
        "name": "白い地",
        "type": "rect",
        "props": {
          "x": 0,
          "y": 0,
          "width": 300,
          "height": 200
        },
        "correctColor": "#ffffff"
      },
      {
        "id": "sun",
        "name": "日の丸（太陽）",
        "type": "circle",
        "props": {
          "cx": 150,
          "cy": 100,
          "r": 60
        },
        "correctColor": "#bc002d"
      }
    ],
    "palette": [
      "#ffffff",
      "#bc002d",
      "#002654",
      "#ffce00",
      "#009246",
      "#000000"
    ],
    "trivia": "日本の日の丸は、真ん中の赤い丸が東からのぼる太陽をあらわしています。"
  },
  {
    "id": "fr",
    "countryCode": "fr",
    "countryName": "フランス",
    "countryRuby": "ふらんす",
    "aspectRatio": "3 / 2",
    "viewBox": "0 0 300 200",
    "elements": [
      {
        "id": "left",
        "name": "左のしま",
        "type": "rect",
        "props": {
          "x": 0,
          "y": 0,
          "width": 100,
          "height": 200
        },
        "correctColor": "#002654"
      },
      {
        "id": "mid",
        "name": "中央のしま",
        "type": "rect",
        "props": {
          "x": 100,
          "y": 0,
          "width": 100,
          "height": 200
        },
        "correctColor": "#ffffff"
      },
      {
        "id": "right",
        "name": "右のしま",
        "type": "rect",
        "props": {
          "x": 200,
          "y": 0,
          "width": 100,
          "height": 200
        },
        "correctColor": "#ed2939"
      }
    ],
    "palette": [
      "#002654",
      "#ffffff",
      "#ed2939",
      "#ffce00",
      "#009246",
      "#000000"
    ],
    "trivia": "フランスの三色旗（トリコロール）は、青が自由、白が平等、赤が博愛をあらわしています。"
  },
  {
    "id": "de",
    "countryCode": "de",
    "countryName": "ドイツ",
    "countryRuby": "どいつ",
    "aspectRatio": "5 / 3",
    "viewBox": "0 0 300 180",
    "elements": [
      {
        "id": "top",
        "name": "上のしま",
        "type": "rect",
        "props": {
          "x": 0,
          "y": 0,
          "width": 300,
          "height": 60
        },
        "correctColor": "#000000"
      },
      {
        "id": "mid",
        "name": "中央のしま",
        "type": "rect",
        "props": {
          "x": 0,
          "y": 60,
          "width": 300,
          "height": 60
        },
        "correctColor": "#dd0000"
      },
      {
        "id": "bottom",
        "name": "下のしま",
        "type": "rect",
        "props": {
          "x": 0,
          "y": 120,
          "width": 300,
          "height": 60
        },
        "correctColor": "#ffce00"
      }
    ],
    "palette": [
      "#000000",
      "#dd0000",
      "#ffce00",
      "#002654",
      "#ffffff",
      "#009246"
    ],
    "trivia": "ドイツ国旗の黒・赤・金（黄）は、かつての自由と統一をめざした戦士たちの制服の色に由来します。"
  },
  {
    "id": "it",
    "countryCode": "it",
    "countryName": "イタリア",
    "countryRuby": "いたりあ",
    "aspectRatio": "3 / 2",
    "viewBox": "0 0 300 200",
    "elements": [
      {
        "id": "left",
        "name": "左のしま",
        "type": "rect",
        "props": {
          "x": 0,
          "y": 0,
          "width": 100,
          "height": 200
        },
        "correctColor": "#009246"
      },
      {
        "id": "mid",
        "name": "中央のしま",
        "type": "rect",
        "props": {
          "x": 100,
          "y": 0,
          "width": 100,
          "height": 200
        },
        "correctColor": "#ffffff"
      },
      {
        "id": "right",
        "name": "右のしま",
        "type": "rect",
        "props": {
          "x": 200,
          "y": 0,
          "width": 100,
          "height": 200
        },
        "correctColor": "#ce2b37"
      }
    ],
    "palette": [
      "#009246",
      "#ffffff",
      "#ce2b37",
      "#002654",
      "#ffce00",
      "#000000"
    ],
    "trivia": "イタリアの三色旗は、緑が美しい大地、白がアルプスの雪、赤が愛国の情熱をあらわしています。"
  },
  {
    "id": "ua",
    "countryCode": "ua",
    "countryName": "ウクライナ",
    "countryRuby": "うくらいな",
    "aspectRatio": "3 / 2",
    "viewBox": "0 0 300 200",
    "elements": [
      {
        "id": "top",
        "name": "上のしま",
        "type": "rect",
        "props": {
          "x": 0,
          "y": 0,
          "width": 300,
          "height": 100
        },
        "correctColor": "#0057b7"
      },
      {
        "id": "bottom",
        "name": "下のしま",
        "type": "rect",
        "props": {
          "x": 0,
          "y": 100,
          "width": 300,
          "height": 100
        },
        "correctColor": "#ffd700"
      }
    ],
    "palette": [
      "#0057b7",
      "#ffd700",
      "#ffffff",
      "#ed2939",
      "#009246",
      "#000000"
    ],
    "trivia": "ウクライナの青と黄色は、どこまでも広がる青い青空と、一面に実った黄金の小麦畑をあらわしています。"
  },
  {
    "id": "ch",
    "countryCode": "ch",
    "countryName": "スイス",
    "countryRuby": "すいす",
    "aspectRatio": "1 / 1",
    "viewBox": "0 0 200 200",
    "elements": [
      {
        "id": "bg",
        "name": "赤い地",
        "type": "rect",
        "props": {
          "x": 0,
          "y": 0,
          "width": 200,
          "height": 200
        },
        "correctColor": "#ff0000"
      },
      {
        "id": "cross_v",
        "name": "十字のたて棒",
        "type": "rect",
        "props": {
          "x": 82,
          "y": 35,
          "width": 36,
          "height": 130
        },
        "correctColor": "#ffffff"
      },
      {
        "id": "cross_h",
        "name": "十字のよこ棒",
        "type": "rect",
        "props": {
          "x": 35,
          "y": 82,
          "width": 130,
          "height": 36
        },
        "correctColor": "#ffffff"
      }
    ],
    "palette": [
      "#ff0000",
      "#ffffff",
      "#002654",
      "#009246",
      "#ffce00",
      "#000000"
    ],
    "trivia": "スイスの国旗は世界でもめずらしい正方形（1:1）！赤十字マークの元にもなりました。"
  },
  {
    "id": "se",
    "countryCode": "se",
    "countryName": "スウェーデン",
    "countryRuby": "すうぇーでん",
    "aspectRatio": "8 / 5",
    "viewBox": "0 0 320 200",
    "elements": [
      {
        "id": "bg",
        "name": "青い地",
        "type": "rect",
        "props": {
          "x": 0,
          "y": 0,
          "width": 320,
          "height": 200
        },
        "correctColor": "#006aa7"
      },
      {
        "id": "cross_v",
        "name": "黄色の十字（たて）",
        "type": "rect",
        "props": {
          "x": 100,
          "y": 0,
          "width": 40,
          "height": 200
        },
        "correctColor": "#fecc00"
      },
      {
        "id": "cross_h",
        "name": "黄色の十字（よこ）",
        "type": "rect",
        "props": {
          "x": 0,
          "y": 80,
          "width": 320,
          "height": 40
        },
        "correctColor": "#fecc00"
      }
    ],
    "palette": [
      "#006aa7",
      "#fecc00",
      "#ffffff",
      "#ed2939",
      "#000000",
      "#009246"
    ],
    "trivia": "スウェーデンの金十字旗はスカンジナビア十字と呼ばれ、青い空と黄金の十字架をあらわしています。"
  },
  // 8. アメリカ
  {
    "id": "us",
    "countryCode": "us",
    "countryName": "アメリカ",
    "countryRuby": "あめりか",
    "aspectRatio": "19 / 10",
    "viewBox": "0 0 380 200",
    "elements": [
      { "id": "stripe_1", "name": "1本目の赤しま", "type": "rect", "props": { "x": 152, "y": 0, "width": 228, "height": 15.38 }, "correctColor": "#b22234" },
      { "id": "stripe_2", "name": "2本目の白しま", "type": "rect", "props": { "x": 152, "y": 15.38, "width": 228, "height": 15.38 }, "correctColor": "#ffffff" },
      { "id": "stripe_3", "name": "3本目の赤しま", "type": "rect", "props": { "x": 152, "y": 30.77, "width": 228, "height": 15.38 }, "correctColor": "#b22234" },
      { "id": "stripe_4", "name": "4本目の白しま", "type": "rect", "props": { "x": 152, "y": 46.15, "width": 228, "height": 15.38 }, "correctColor": "#ffffff" },
      { "id": "stripe_5", "name": "5本目の赤しま", "type": "rect", "props": { "x": 152, "y": 61.54, "width": 228, "height": 15.38 }, "correctColor": "#b22234" },
      { "id": "stripe_6", "name": "6本目の白しま", "type": "rect", "props": { "x": 152, "y": 76.92, "width": 228, "height": 15.38 }, "correctColor": "#ffffff" },
      { "id": "stripe_7", "name": "7本目の赤しま", "type": "rect", "props": { "x": 152, "y": 92.31, "width": 228, "height": 15.38 }, "correctColor": "#b22234" },
      { "id": "stripe_8", "name": "8本目の白しま", "type": "rect", "props": { "x": 0, "y": 107.69, "width": 380, "height": 15.38 }, "correctColor": "#ffffff" },
      { "id": "stripe_9", "name": "9本目の赤しま", "type": "rect", "props": { "x": 0, "y": 123.08, "width": 380, "height": 15.38 }, "correctColor": "#b22234" },
      { "id": "stripe_10", "name": "10本目の白しま", "type": "rect", "props": { "x": 0, "y": 138.46, "width": 380, "height": 15.38 }, "correctColor": "#ffffff" },
      { "id": "stripe_11", "name": "11本目の赤しま", "type": "rect", "props": { "x": 0, "y": 153.85, "width": 380, "height": 15.38 }, "correctColor": "#b22234" },
      { "id": "stripe_12", "name": "12本目の白しま", "type": "rect", "props": { "x": 0, "y": 169.23, "width": 380, "height": 15.38 }, "correctColor": "#ffffff" },
      { "id": "stripe_13", "name": "13本目の赤しま", "type": "rect", "props": { "x": 0, "y": 184.62, "width": 380, "height": 15.38 }, "correctColor": "#b22234" },
      { "id": "canton", "name": "左上の青い四角", "type": "rect", "props": { "x": 0, "y": 0, "width": 152, "height": 107.69 }, "correctColor": "#00205b" },
      {
        "id": "canton_star",
        "name": "青い四角の星",
        "type": "polygon",
        "props": { "points": "76,26 82.3,45 102.6,45 86.2,57 92.5,80 76,65 59.5,80 65.8,57 49.4,45 69.7,45" },
        "correctColor": "#ffffff"
      }
    ],
    "palette": ["#b22234", "#ffffff", "#00205b", "#ffce00", "#009246", "#000000"],
    "trivia": "アメリカの国旗は「星条旗」。13本の赤白のしまは独立当時の13州を表しています。"
  },
  // 9. イギリス
  {
    "id": "gb",
    "countryCode": "gb",
    "countryName": "イギリス",
    "countryRuby": "いぎりす",
    "aspectRatio": "2 / 1",
    "viewBox": "0 0 300 150",
    "elements": [
      { "id": "bg", "name": "青い地", "type": "rect", "props": { "x": 0, "y": 0, "width": 300, "height": 150 }, "correctColor": "#012169" },
      {
        "id": "saltire_w",
        "name": "白い斜め十字",
        "type": "path",
        "props": { "d": "M0 0 L36 0 L300 132 L300 150 L264 150 L0 18 Z M300 0 L264 0 L0 132 L0 150 L36 150 L300 18 Z" },
        "correctColor": "#ffffff"
      },
      {
        "id": "saltire_r",
        "name": "赤い斜め十字",
        "type": "path",
        "props": { "d": "M0 0 L18 0 L300 141 L300 150 L282 150 L0 9 Z M300 0 L282 0 L0 141 L0 150 L18 150 L300 9 Z" },
        "correctColor": "#c8102e"
      },
      { "id": "cross_w_v", "name": "白い十字（たて）", "type": "rect", "props": { "x": 120, "y": 0, "width": 60, "height": 150 }, "correctColor": "#ffffff" },
      { "id": "cross_w_h", "name": "白い十字（よこ）", "type": "rect", "props": { "x": 0, "y": 45, "width": 300, "height": 60 }, "correctColor": "#ffffff" },
      { "id": "cross_r_v", "name": "赤い十字（たて）", "type": "rect", "props": { "x": 132, "y": 0, "width": 36, "height": 150 }, "correctColor": "#c8102e" },
      { "id": "cross_r_h", "name": "赤い十字（よこ）", "type": "rect", "props": { "x": 0, "y": 57, "width": 300, "height": 36 }, "correctColor": "#c8102e" }
    ],
    "palette": ["#012169", "#c8102e", "#ffffff", "#ffce00", "#009246", "#000000"],
    "trivia": "イギリスの国旗「ユニオンジャック」は、イングランド・スコットランド・アイルランドの3つの十字架が合体したデザインです！"
  },
  // 10. カナダ
  {
    "id": "ca",
    "countryCode": "ca",
    "countryName": "カナダ",
    "countryRuby": "かなだ",
    "aspectRatio": "2 / 1",
    "viewBox": "0 0 400 200",
    "elements": [
      { "id": "left", "name": "左の赤い帯", "type": "rect", "props": { "x": 0, "y": 0, "width": 100, "height": 200 }, "correctColor": "#d80621" },
      { "id": "mid", "name": "中央の白い地", "type": "rect", "props": { "x": 100, "y": 0, "width": 200, "height": 200 }, "correctColor": "#ffffff" },
      { "id": "right", "name": "右の赤い帯", "type": "rect", "props": { "x": 300, "y": 0, "width": 100, "height": 200 }, "correctColor": "#d80621" },
      {
        "id": "leaf",
        "name": "メイプル（サトウカエデ）の葉",
        "type": "path",
        "props": {
          "d": "M 203.75 184.58 l -1.88 -35.96 a 3.96 3.96 0 0 1 4.63 -4.08 l 35.79 6.29 -4.83 -13.33 a 2.71 2.71 0 0 1 0.83 -3.04 l 39.21 -31.75 -8.83 -4.13 a 2.71 2.71 0 0 1 -1.42 -3.29 l 7.75 -23.83 -22.58 4.79 a 2.71 2.71 0 0 1 -3.04 -1.58 l -4.38 -10.29 -17.63 18.92 a 2.71 2.71 0 0 1 -4.63 -2.38 l 8.50 -43.83 -13.63 7.88 a 2.71 2.71 0 0 1 -3.79 -1.13 l -13.83 -27.17 -13.83 27.17 a 2.71 2.71 0 0 1 -3.79 1.13 l -13.63 -7.88 8.50 43.83 a 2.71 2.71 0 0 1 -4.63 2.38 l -17.63 -18.92 -4.38 10.29 a 2.71 2.71 0 0 1 -3.04 1.58 l -22.58 -4.79 7.75 23.83 a 2.71 2.71 0 0 1 -1.42 3.29 l -8.83 4.13 39.21 31.75 a 2.71 2.71 0 0 1 0.83 3.04 l -4.83 13.33 35.79 -6.29 a 3.96 3.96 0 0 1 4.63 4.08 l -1.88 35.96 z"
        },
        "correctColor": "#d80621"
      }
    ],
    "palette": ["#d80621", "#ffffff", "#002654", "#ffce00", "#009246", "#000000"],
    "trivia": "カナダの国旗の真ん中にあるのは「サトウカエデ（メイプル）」の葉っぱ！メイプルシロップでも有名です。"
  },
  // 11. ブラジル
  {
    "id": "br",
    "countryCode": "br",
    "countryName": "ブラジル",
    "countryRuby": "ぶらじる",
    "aspectRatio": "10 / 7",
    "viewBox": "0 0 300 210",
    "elements": [
      { "id": "bg", "name": "緑の地", "type": "rect", "props": { "x": 0, "y": 0, "width": 300, "height": 210 }, "correctColor": "#009b3a" },
      {
        "id": "diamond",
        "name": "黄色のひし形",
        "type": "polygon",
        "props": { "points": "150,20 276,105 150,190 24,105" },
        "correctColor": "#fedf01"
      },
      { "id": "globe", "name": "青い丸（天球儀）", "type": "circle", "props": { "cx": 150, "cy": 105, "r": 52.5 }, "correctColor": "#002776" },
      {
        "id": "band",
        "name": "白い帯",
        "type": "path",
        "props": { "d": "M 98.5 110 Q 150 95 201.5 105 A 52.5 52.5 0 0 0 98.5 110 Z" },
        "correctColor": "#ffffff"
      }
    ],
    "palette": ["#009b3a", "#fedf01", "#002776", "#ffffff", "#c8102e", "#000000"],
    "trivia": "ブラジルの国旗は、緑が広大なアマゾンの森林、黄色が豊かな鉱物、青い天球儀には美しい南十字星などの星座が輝いています。"
  },
  // 12. 韓国
  {
    "id": "kr",
    "countryCode": "kr",
    "countryName": "韓国",
    "countryRuby": "かんこく",
    "aspectRatio": "3 / 2",
    "viewBox": "0 0 300 200",
    "elements": [
      { "id": "bg", "name": "白い地", "type": "rect", "props": { "x": 0, "y": 0, "width": 300, "height": 200 }, "correctColor": "#ffffff" },
      {
        "id": "taegeuk_top",
        "name": "太極円の上（赤）",
        "type": "path",
        "props": { "d": "M 110 100 A 40 40 0 0 1 190 100 A 20 20 0 0 1 150 100 A 20 20 0 0 0 110 100 Z" },
        "correctColor": "#cd2e3a"
      },
      {
        "id": "taegeuk_bot",
        "name": "太極円の下（青）",
        "type": "path",
        "props": { "d": "M 110 100 A 40 40 0 0 0 190 100 A 20 20 0 0 1 150 100 A 20 20 0 0 0 110 100 Z" },
        "correctColor": "#0047a0"
      },
      { "id": "trigram_tl", "name": "左上の卦（乾・天）", "type": "rect", "props": { "x": 50, "y": 35, "width": 32, "height": 20 }, "correctColor": "#000000" },
      { "id": "trigram_tr", "name": "右上の卦（坎・水）", "type": "rect", "props": { "x": 218, "y": 35, "width": 32, "height": 20 }, "correctColor": "#000000" },
      { "id": "trigram_bl", "name": "左下の卦（離・火）", "type": "rect", "props": { "x": 50, "y": 145, "width": 32, "height": 20 }, "correctColor": "#000000" },
      { "id": "trigram_br", "name": "右下の卦（坤・地）", "type": "rect", "props": { "x": 218, "y": 145, "width": 32, "height": 20 }, "correctColor": "#000000" }
    ],
    "palette": ["#ffffff", "#cd2e3a", "#0047a0", "#000000", "#ffce00", "#009b3a"],
    "trivia": "韓国の国旗「太極旗」の中央の円は宇宙の調和（陰陽）を、四隅の黒い棒は天・地・水・火を表しています。"
  },
  // 13. 中国
  {
    "id": "cn",
    "countryCode": "cn",
    "countryName": "中国",
    "countryRuby": "ちゅうごく",
    "aspectRatio": "3 / 2",
    "viewBox": "0 0 300 200",
    "elements": [
      { "id": "bg", "name": "赤い地", "type": "rect", "props": { "x": 0, "y": 0, "width": 300, "height": 200 }, "correctColor": "#de2910" },
      {
        "id": "star_main",
        "name": "大きな星",
        "type": "polygon",
        "props": { "points": "50,20 56.8,40.7 78.5,40.7 61,53.4 67.6,74.3 50,61.5 32.4,74.3 39,53.4 21.5,40.7 43.2,40.7" },
        "correctColor": "#ffde00"
      },
      {
        "id": "star_1",
        "name": "1つ目の小星",
        "type": "polygon",
        "props": { "points": "100,10 102.2,16.9 109.5,16.9 103.7,21.1 105.9,28.1 100,23.8 94.1,28.1 96.3,21.1 90.5,16.9 97.8,16.9" },
        "correctColor": "#ffde00"
      },
      {
        "id": "star_2",
        "name": "2つ目の小星",
        "type": "polygon",
        "props": { "points": "120,30 122.2,36.9 129.5,36.9 123.7,41.1 125.9,48.1 120,43.8 114.1,48.1 116.3,41.1 110.5,36.9 117.8,36.9" },
        "correctColor": "#ffde00"
      },
      {
        "id": "star_3",
        "name": "3つ目の小星",
        "type": "polygon",
        "props": { "points": "120,60 122.2,66.9 129.5,66.9 123.7,71.1 125.9,78.1 120,73.8 114.1,78.1 116.3,71.1 110.5,66.9 117.8,66.9" },
        "correctColor": "#ffde00"
      },
      {
        "id": "star_4",
        "name": "4つ目の小星",
        "type": "polygon",
        "props": { "points": "100,80 102.2,86.9 109.5,86.9 103.7,91.1 105.9,98.1 100,93.8 94.1,98.1 96.3,91.1 90.5,86.9 97.8,86.9" },
        "correctColor": "#ffde00"
      }
    ],
    "palette": ["#de2910", "#ffde00", "#ffffff", "#002654", "#009246", "#000000"],
    "trivia": "中国の国旗「五星紅旗」は、赤が情熱、大きな星が指導者、4つの小さな星が国民の固い結束を表しています。"
  },
  // 14. ベトナム
  {
    "id": "vn",
    "countryCode": "vn",
    "countryName": "ベトナム",
    "countryRuby": "べとなむ",
    "aspectRatio": "3 / 2",
    "viewBox": "0 0 300 200",
    "elements": [
      { "id": "bg", "name": "赤い地", "type": "rect", "props": { "x": 0, "y": 0, "width": 300, "height": 200 }, "correctColor": "#da251d" },
      {
        "id": "star",
        "name": "金色の大きな星",
        "type": "polygon",
        "props": { "points": "150,40 163.5,81.4 207.1,81.5 171.9,107.1 185.3,157.1 150,123 114.7,157.1 128.1,107.1 92.9,81.5 136.5,81.4" },
        "correctColor": "#ffff00"
      }
    ],
    "palette": ["#da251d", "#ffff00", "#ffffff", "#002654", "#009246", "#000000"],
    "trivia": "ベトナムの「金星紅旗」の中央に輝く星の5つの角は、労働者や農民などすべての国民の団結を表しています。"
  },
  // 15. ソマリア
  {
    "id": "so",
    "countryCode": "so",
    "countryName": "ソマリア",
    "countryRuby": "そまりあ",
    "aspectRatio": "3 / 2",
    "viewBox": "0 0 300 200",
    "elements": [
      { "id": "bg", "name": "水色の地", "type": "rect", "props": { "x": 0, "y": 0, "width": 300, "height": 200 }, "correctColor": "#4189dd" },
      {
        "id": "star",
        "name": "白い五角星",
        "type": "polygon",
        "props": { "points": "150,42 163,82 205.2,82 171.1,106.8 184.1,155.2 150,122.2 115.9,155.2 128.9,106.8 94.8,82 137,82" },
        "correctColor": "#ffffff"
      }
    ],
    "palette": ["#4189dd", "#ffffff", "#da251d", "#ffff00", "#009246", "#000000"],
    "trivia": "ソマリアの国旗は澄みきった青空と海の水色に、自由と平和を表す白い星が描かれています。"
  },
  // 16. オランダ
  {
    "id": "nl",
    "countryCode": "nl",
    "countryName": "オランダ",
    "countryRuby": "おらんだ",
    "aspectRatio": "3 / 2",
    "viewBox": "0 0 300 200",
    "elements": [
      { "id": "top", "name": "上の赤しま", "type": "rect", "props": { "x": 0, "y": 0, "width": 300, "height": 66.67 }, "correctColor": "#c8102e" },
      { "id": "mid", "name": "中央の白しま", "type": "rect", "props": { "x": 0, "y": 66.67, "width": 300, "height": 66.67 }, "correctColor": "#ffffff" },
      { "id": "bot", "name": "下の青しま", "type": "rect", "props": { "x": 0, "y": 133.34, "width": 300, "height": 66.67 }, "correctColor": "#003da5" }
    ],
    "palette": ["#c8102e", "#ffffff", "#003da5", "#ff8200", "#009246", "#000000"],
    "trivia": "オランダの三色旗は世界で最も歴史ある三色旗のひとつで、ロシアやフランスの国旗のお手本にもなりました。"
  },
  // 17. オーストリア
  {
    "id": "at",
    "countryCode": "at",
    "countryName": "オーストリア",
    "countryRuby": "おーすとりあ",
    "aspectRatio": "3 / 2",
    "viewBox": "0 0 300 200",
    "elements": [
      { "id": "top", "name": "上の赤しま", "type": "rect", "props": { "x": 0, "y": 0, "width": 300, "height": 66.67 }, "correctColor": "#ed2939" },
      { "id": "mid", "name": "中央の白しま", "type": "rect", "props": { "x": 0, "y": 66.67, "width": 300, "height": 66.67 }, "correctColor": "#ffffff" },
      { "id": "bot", "name": "下の赤しま", "type": "rect", "props": { "x": 0, "y": 133.34, "width": 300, "height": 66.67 }, "correctColor": "#ed2939" }
    ],
    "palette": ["#ed2939", "#ffffff", "#002654", "#ffce00", "#009246", "#000000"],
    "trivia": "オーストリアの赤白赤の旗は800年以上前からの伝統を持つ世界最古級の国旗です。"
  },
  // 18. ポーランド
  {
    "id": "pl",
    "countryCode": "pl",
    "countryName": "ポーランド",
    "countryRuby": "ぽーらんど",
    "aspectRatio": "8 / 5",
    "viewBox": "0 0 320 200",
    "elements": [
      { "id": "top", "name": "上の白しま", "type": "rect", "props": { "x": 0, "y": 0, "width": 320, "height": 100 }, "correctColor": "#ffffff" },
      { "id": "bot", "name": "下の赤しま", "type": "rect", "props": { "x": 0, "y": 100, "width": 320, "height": 100 }, "correctColor": "#dc143c" }
    ],
    "palette": ["#ffffff", "#dc143c", "#002654", "#ffce00", "#009246", "#000000"],
    "trivia": "ポーランドの国旗は上が白で下が赤。白は国のシンボルである白鷲、赤は自由への熱い情熱を表しています。"
  },
  // 19. モナコ
  {
    "id": "mc",
    "countryCode": "mc",
    "countryName": "モナコ",
    "countryRuby": "もなこ",
    "aspectRatio": "5 / 4",
    "viewBox": "0 0 250 200",
    "elements": [
      { "id": "top", "name": "上の赤しま", "type": "rect", "props": { "x": 0, "y": 0, "width": 250, "height": 100 }, "correctColor": "#ce1126" },
      { "id": "bot", "name": "下の白しま", "type": "rect", "props": { "x": 0, "y": 100, "width": 250, "height": 100 }, "correctColor": "#ffffff" }
    ],
    "palette": ["#ce1126", "#ffffff", "#002654", "#ffce00", "#009246", "#000000"],
    "trivia": "モナコの国旗は上が赤、下が白。ポーランドの国旗と上下がちょうど逆になっています！"
  },
  // 20. フィンランド
  {
    "id": "fi",
    "countryCode": "fi",
    "countryName": "フィンランド",
    "countryRuby": "ふぃんらんど",
    "aspectRatio": "18 / 11",
    "viewBox": "0 0 360 220",
    "elements": [
      { "id": "bg", "name": "白い地", "type": "rect", "props": { "x": 0, "y": 0, "width": 360, "height": 220 }, "correctColor": "#ffffff" },
      { "id": "cross_v", "name": "青い十字（たて）", "type": "rect", "props": { "x": 100, "y": 0, "width": 60, "height": 220 }, "correctColor": "#002f6c" },
      { "id": "cross_h", "name": "青い十字（よこ）", "type": "rect", "props": { "x": 0, "y": 80, "width": 360, "height": 60 }, "correctColor": "#002f6c" }
    ],
    "palette": ["#ffffff", "#002f6c", "#ed2939", "#ffce00", "#009246", "#000000"],
    "trivia": "フィンランドの国旗の白は大地を包む純白の雪、青は数千もの美しい湖と青空を表しています。"
  },
  // 21. ノルウェー
  {
    "id": "no",
    "countryCode": "no",
    "countryName": "ノルウェー",
    "countryRuby": "のるうぇー",
    "aspectRatio": "22 / 16",
    "viewBox": "0 0 330 240",
    "elements": [
      { "id": "bg", "name": "赤色の地", "type": "rect", "props": { "x": 0, "y": 0, "width": 330, "height": 240 }, "correctColor": "#ba0c2f" },
      { "id": "cross_w_v", "name": "白い十字（たて）", "type": "rect", "props": { "x": 90, "y": 0, "width": 60, "height": 240 }, "correctColor": "#ffffff" },
      { "id": "cross_w_h", "name": "白い十字（よこ）", "type": "rect", "props": { "x": 0, "y": 90, "width": 330, "height": 60 }, "correctColor": "#ffffff" },
      { "id": "cross_b_v", "name": "青い十字（たて）", "type": "rect", "props": { "x": 105, "y": 0, "width": 30, "height": 240 }, "correctColor": "#00205b" },
      { "id": "cross_b_h", "name": "青い十字（よこ）", "type": "rect", "props": { "x": 0, "y": 105, "width": 330, "height": 30 }, "correctColor": "#00205b" }
    ],
    "palette": ["#ba0c2f", "#ffffff", "#00205b", "#ffce00", "#009246", "#000000"],
    "trivia": "ノルウェーの国旗は赤地に白と青の十字架。赤白青の3色は自由のシンボルです。"
  },
  // 22. アルゼンチン
  {
    "id": "ar",
    "countryCode": "ar",
    "countryName": "アルゼンチン",
    "countryRuby": "あるぜんちん",
    "aspectRatio": "8 / 5",
    "viewBox": "0 0 320 200",
    "elements": [
      { "id": "top", "name": "上の水色しま", "type": "rect", "props": { "x": 0, "y": 0, "width": 320, "height": 66.67 }, "correctColor": "#74acdf" },
      { "id": "mid", "name": "中央の白しま", "type": "rect", "props": { "x": 0, "y": 66.67, "width": 320, "height": 66.67 }, "correctColor": "#ffffff" },
      { "id": "bot", "name": "下の水色しま", "type": "rect", "props": { "x": 0, "y": 133.34, "width": 320, "height": 66.67 }, "correctColor": "#74acdf" },
      { "id": "sun", "name": "五月の太陽", "type": "circle", "props": { "cx": 160, "cy": 100, "r": 24 }, "correctColor": "#f6b40e" }
    ],
    "palette": ["#74acdf", "#ffffff", "#f6b40e", "#85340a", "#002654", "#000000"],
    "trivia": "アルゼンチンの国旗は澄んだ空と雲、中央には独立の光を象徴する「五月の太陽」が輝いています。"
  },
  // 23. パラオ
  {
    "id": "pw",
    "countryCode": "pw",
    "countryName": "パラオ",
    "countryRuby": "ぱらお",
    "aspectRatio": "8 / 5",
    "viewBox": "0 0 320 200",
    "elements": [
      { "id": "bg", "name": "青い海", "type": "rect", "props": { "x": 0, "y": 0, "width": 320, "height": 200 }, "correctColor": "#0099cc" },
      { "id": "moon", "name": "黄色い満月", "type": "circle", "props": { "cx": 140, "cy": 100, "r": 60 }, "correctColor": "#ffce00" }
    ],
    "palette": ["#0099cc", "#ffce00", "#ffffff", "#c8102e", "#009246", "#000000"],
    "trivia": "太平洋の島国パラオの国旗は、青い太平洋の海に浮かぶ黄色い満月を表しています。"
  },
  // 24. バングラデシュ
  {
    "id": "bd",
    "countryCode": "bd",
    "countryName": "バングラデシュ",
    "countryRuby": "ばんぐらでしゅ",
    "aspectRatio": "5 / 3",
    "viewBox": "0 0 300 180",
    "elements": [
      { "id": "bg", "name": "緑の地", "type": "rect", "props": { "x": 0, "y": 0, "width": 300, "height": 180 }, "correctColor": "#006a4e" },
      { "id": "sun", "name": "昇る赤い太陽", "type": "circle", "props": { "cx": 135, "cy": 90, "r": 60 }, "correctColor": "#f42a41" }
    ],
    "palette": ["#006a4e", "#f42a41", "#ffffff", "#002654", "#ffce00", "#000000"],
    "trivia": "バングラデシュの国旗は豊かな緑の大地と、独立を祝福して昇る赤い太陽を表しています。"
  },
  // 25. ギリシャ
  {
    "id": "gr",
    "countryCode": "gr",
    "countryName": "ギリシャ",
    "countryRuby": "ぎりしゃ",
    "aspectRatio": "3 / 2",
    "viewBox": "0 0 300 200",
    "elements": [
      { "id": "s1", "name": "1本目の青しま", "type": "rect", "props": { "x": 111.11, "y": 0, "width": 188.89, "height": 22.22 }, "correctColor": "#0d5eaf" },
      { "id": "s2", "name": "2本目の白しま", "type": "rect", "props": { "x": 111.11, "y": 22.22, "width": 188.89, "height": 22.22 }, "correctColor": "#ffffff" },
      { "id": "s3", "name": "3本目の青しま", "type": "rect", "props": { "x": 111.11, "y": 44.44, "width": 188.89, "height": 22.22 }, "correctColor": "#0d5eaf" },
      { "id": "s4", "name": "4本目の白しま", "type": "rect", "props": { "x": 111.11, "y": 66.67, "width": 188.89, "height": 22.22 }, "correctColor": "#ffffff" },
      { "id": "s5", "name": "5本目の青しま", "type": "rect", "props": { "x": 111.11, "y": 88.89, "width": 188.89, "height": 22.22 }, "correctColor": "#0d5eaf" },
      { "id": "s6", "name": "6本目の白しま", "type": "rect", "props": { "x": 0, "y": 111.11, "width": 300, "height": 22.22 }, "correctColor": "#ffffff" },
      { "id": "s7", "name": "7本目の青しま", "type": "rect", "props": { "x": 0, "y": 133.33, "width": 300, "height": 22.22 }, "correctColor": "#0d5eaf" },
      { "id": "s8", "name": "8本目の白しま", "type": "rect", "props": { "x": 0, "y": 155.56, "width": 300, "height": 22.22 }, "correctColor": "#ffffff" },
      { "id": "s9", "name": "9本目の青しま", "type": "rect", "props": { "x": 0, "y": 177.78, "width": 300, "height": 22.22 }, "correctColor": "#0d5eaf" },
      { "id": "canton", "name": "左上の青い正方形", "type": "rect", "props": { "x": 0, "y": 0, "width": 111.11, "height": 111.11 }, "correctColor": "#0d5eaf" },
      { "id": "cross_v", "name": "十字架（たて）", "type": "rect", "props": { "x": 44.44, "y": 0, "width": 22.22, "height": 111.11 }, "correctColor": "#ffffff" },
      { "id": "cross_h", "name": "十字架（よこ）", "type": "rect", "props": { "x": 0, "y": 44.44, "width": 111.11, "height": 22.22 }, "correctColor": "#ffffff" }
    ],
    "palette": ["#0d5eaf", "#ffffff", "#ed2939", "#ffce00", "#009246", "#000000"],
    "trivia": "ギリシャの国旗は青と白の美しい海と空！9本のしま模様は「自由か死か」というギリシャ語の9つの音節を表しています。"
  }
];
