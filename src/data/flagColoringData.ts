export interface ColoringElement {
  id: string;
  name: string;
  type: "rect" | "circle" | "polygon";
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
  }
];
