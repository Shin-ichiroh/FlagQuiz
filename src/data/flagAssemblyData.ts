export interface AssemblyPart {
  id: string;
  name: string;
  ruby: string;
  icon: string;
  svgContent?: string;
  targetSlotId: string;
}

export interface AssemblySlot {
  id: string;
  name: string;
  xPercent: number;
  yPercent: number;
  widthPercent: number;
  heightPercent: number;
  requiredPartId: string;
}

export interface AssemblyFlagStage {
  id: string;
  countryCode: string;
  countryName: string;
  countryRuby: string;
  aspectRatio: string;
  baseBgColor: string;
  baseElementsSvg?: string;
  slots: AssemblySlot[];
  availableParts: AssemblyPart[];
  hint: string;
  trivia: string;
}

export const ASSEMBLY_STAGES: AssemblyFlagStage[] = [
  {
    "id": "jp",
    "countryCode": "jp",
    "countryName": "日本",
    "countryRuby": "にっぽん",
    "aspectRatio": "3 / 2",
    "baseBgColor": "#ffffff",
    "slots": [
      {
        "id": "sun_slot",
        "name": "真ん中",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 40,
        "heightPercent": 60,
        "requiredPartId": "red_sun"
      }
    ],
    "availableParts": [
      {
        "id": "red_sun",
        "name": "日の丸（赤い太陽）",
        "ruby": "ひのまる",
        "icon": "🔴",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"#bc002d\" />",
        "targetSlotId": "sun_slot"
      },
      {
        "id": "blue_star",
        "name": "青い星",
        "ruby": "あおいほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,10 62,38 92,38 68,56 77,85 50,67 23,85 32,56 8,38 38,38\" fill=\"#0055a5\" />",
        "targetSlotId": ""
      },
      {
        "id": "yellow_crescent",
        "name": "黄色い三日月",
        "ruby": "きいろいみかづき",
        "icon": "🌙",
        "svgContent": "<path d=\"M50 15 A35 35 0 1 0 85 50 A28 28 0 1 1 50 15 Z\" fill=\"#ffcc00\" />",
        "targetSlotId": ""
      }
    ],
    "hint": "東の空からのぼる、日本の伝統のシンボルを真ん中に置こう！",
    "trivia": "日本の国旗（日章旗・日の丸）は太陽をかたどっており、聖徳太子の時代から太陽を尊ぶ伝統があります。"
  },
  {
    "id": "us",
    "countryCode": "us",
    "countryName": "アメリカ",
    "countryRuby": "あめりか",
    "aspectRatio": "19 / 10",
    "baseBgColor": "#ffffff",
    "baseElementsSvg": "<rect width=\"100\" height=\"100\" fill=\"#b22234\"/><rect y=\"7.69\" width=\"100\" height=\"7.69\" fill=\"#ffffff\"/><rect y=\"23.07\" width=\"100\" height=\"7.69\" fill=\"#ffffff\"/><rect y=\"38.46\" width=\"100\" height=\"7.69\" fill=\"#ffffff\"/><rect y=\"53.84\" width=\"100\" height=\"7.69\" fill=\"#ffffff\"/><rect y=\"69.23\" width=\"100\" height=\"7.69\" fill=\"#ffffff\"/><rect y=\"84.61\" width=\"100\" height=\"7.69\" fill=\"#ffffff\"/>",
    "slots": [
      {
        "id": "canton_slot",
        "name": "左上",
        "xPercent": 20,
        "yPercent": 26.92,
        "widthPercent": 40,
        "heightPercent": 53.85,
        "requiredPartId": "blue_stars_50"
      }
    ],
    "availableParts": [
      {
        "id": "blue_stars_50",
        "name": "青地に50個の星",
        "ruby": "あおじにごじっこ",
        "icon": "🟦",
        "svgContent": "<rect width=\"100\" height=\"100\" fill=\"#002868\"/><polygon points=\"8.33,6.80 9.05,9.01 11.37,9.01 9.49,10.38 10.21,12.59 8.33,11.22 6.45,12.59 7.17,10.38 5.29,9.01 7.61,9.01\" fill=\"#ffffff\"/><polygon points=\"25.00,6.80 25.72,9.01 28.04,9.01 26.16,10.38 26.88,12.59 25.00,11.22 23.12,12.59 23.84,10.38 21.96,9.01 24.28,9.01\" fill=\"#ffffff\"/><polygon points=\"41.67,6.80 42.39,9.01 44.71,9.01 42.83,10.38 43.55,12.59 41.67,11.22 39.79,12.59 40.51,10.38 38.63,9.01 40.95,9.01\" fill=\"#ffffff\"/><polygon points=\"58.34,6.80 59.06,9.01 61.38,9.01 59.50,10.38 60.22,12.59 58.34,11.22 56.46,12.59 57.18,10.38 55.30,9.01 57.62,9.01\" fill=\"#ffffff\"/><polygon points=\"75.01,6.80 75.73,9.01 78.05,9.01 76.17,10.38 76.89,12.59 75.01,11.22 73.13,12.59 73.85,10.38 71.97,9.01 74.29,9.01\" fill=\"#ffffff\"/><polygon points=\"91.68,6.80 92.40,9.01 94.72,9.01 92.84,10.38 93.56,12.59 91.68,11.22 89.80,12.59 90.52,10.38 88.64,9.01 90.96,9.01\" fill=\"#ffffff\"/><polygon points=\"16.67,16.80 17.39,19.01 19.71,19.01 17.83,20.38 18.55,22.59 16.67,21.22 14.79,22.59 15.51,20.38 13.63,19.01 15.95,19.01\" fill=\"#ffffff\"/><polygon points=\"33.34,16.80 34.06,19.01 36.38,19.01 34.50,20.38 35.22,22.59 33.34,21.22 31.46,22.59 32.18,20.38 30.30,19.01 32.62,19.01\" fill=\"#ffffff\"/><polygon points=\"50.01,16.80 50.73,19.01 53.05,19.01 51.17,20.38 51.89,22.59 50.01,21.22 48.13,22.59 48.85,20.38 46.97,19.01 49.29,19.01\" fill=\"#ffffff\"/><polygon points=\"66.68,16.80 67.40,19.01 69.72,19.01 67.84,20.38 68.56,22.59 66.68,21.22 64.80,22.59 65.52,20.38 63.64,19.01 65.96,19.01\" fill=\"#ffffff\"/><polygon points=\"83.35,16.80 84.07,19.01 86.39,19.01 84.51,20.38 85.23,22.59 83.35,21.22 81.47,22.59 82.19,20.38 80.31,19.01 82.63,19.01\" fill=\"#ffffff\"/><polygon points=\"8.33,26.80 9.05,29.01 11.37,29.01 9.49,30.38 10.21,32.59 8.33,31.22 6.45,32.59 7.17,30.38 5.29,29.01 7.61,29.01\" fill=\"#ffffff\"/><polygon points=\"25.00,26.80 25.72,29.01 28.04,29.01 26.16,30.38 26.88,32.59 25.00,31.22 23.12,32.59 23.84,30.38 21.96,29.01 24.28,29.01\" fill=\"#ffffff\"/><polygon points=\"41.67,26.80 42.39,29.01 44.71,29.01 42.83,30.38 43.55,32.59 41.67,31.22 39.79,32.59 40.51,30.38 38.63,29.01 40.95,29.01\" fill=\"#ffffff\"/><polygon points=\"58.34,26.80 59.06,29.01 61.38,29.01 59.50,30.38 60.22,32.59 58.34,31.22 56.46,32.59 57.18,30.38 55.30,29.01 57.62,29.01\" fill=\"#ffffff\"/><polygon points=\"75.01,26.80 75.73,29.01 78.05,29.01 76.17,30.38 76.89,32.59 75.01,31.22 73.13,32.59 73.85,30.38 71.97,29.01 74.29,29.01\" fill=\"#ffffff\"/><polygon points=\"91.68,26.80 92.40,29.01 94.72,29.01 92.84,30.38 93.56,32.59 91.68,31.22 89.80,32.59 90.52,30.38 88.64,29.01 90.96,29.01\" fill=\"#ffffff\"/><polygon points=\"16.67,36.80 17.39,39.01 19.71,39.01 17.83,40.38 18.55,42.59 16.67,41.22 14.79,42.59 15.51,40.38 13.63,39.01 15.95,39.01\" fill=\"#ffffff\"/><polygon points=\"33.34,36.80 34.06,39.01 36.38,39.01 34.50,40.38 35.22,42.59 33.34,41.22 31.46,42.59 32.18,40.38 30.30,39.01 32.62,39.01\" fill=\"#ffffff\"/><polygon points=\"50.01,36.80 50.73,39.01 53.05,39.01 51.17,40.38 51.89,42.59 50.01,41.22 48.13,42.59 48.85,40.38 46.97,39.01 49.29,39.01\" fill=\"#ffffff\"/><polygon points=\"66.68,36.80 67.40,39.01 69.72,39.01 67.84,40.38 68.56,42.59 66.68,41.22 64.80,42.59 65.52,40.38 63.64,39.01 65.96,39.01\" fill=\"#ffffff\"/><polygon points=\"83.35,36.80 84.07,39.01 86.39,39.01 84.51,40.38 85.23,42.59 83.35,41.22 81.47,42.59 82.19,40.38 80.31,39.01 82.63,39.01\" fill=\"#ffffff\"/><polygon points=\"8.33,46.80 9.05,49.01 11.37,49.01 9.49,50.38 10.21,52.59 8.33,51.22 6.45,52.59 7.17,50.38 5.29,49.01 7.61,49.01\" fill=\"#ffffff\"/><polygon points=\"25.00,46.80 25.72,49.01 28.04,49.01 26.16,50.38 26.88,52.59 25.00,51.22 23.12,52.59 23.84,50.38 21.96,49.01 24.28,49.01\" fill=\"#ffffff\"/><polygon points=\"41.67,46.80 42.39,49.01 44.71,49.01 42.83,50.38 43.55,52.59 41.67,51.22 39.79,52.59 40.51,50.38 38.63,49.01 40.95,49.01\" fill=\"#ffffff\"/><polygon points=\"58.34,46.80 59.06,49.01 61.38,49.01 59.50,50.38 60.22,52.59 58.34,51.22 56.46,52.59 57.18,50.38 55.30,49.01 57.62,49.01\" fill=\"#ffffff\"/><polygon points=\"75.01,46.80 75.73,49.01 78.05,49.01 76.17,50.38 76.89,52.59 75.01,51.22 73.13,52.59 73.85,50.38 71.97,49.01 74.29,49.01\" fill=\"#ffffff\"/><polygon points=\"91.68,46.80 92.40,49.01 94.72,49.01 92.84,50.38 93.56,52.59 91.68,51.22 89.80,52.59 90.52,50.38 88.64,49.01 90.96,49.01\" fill=\"#ffffff\"/><polygon points=\"16.67,56.80 17.39,59.01 19.71,59.01 17.83,60.38 18.55,62.59 16.67,61.22 14.79,62.59 15.51,60.38 13.63,59.01 15.95,59.01\" fill=\"#ffffff\"/><polygon points=\"33.34,56.80 34.06,59.01 36.38,59.01 34.50,60.38 35.22,62.59 33.34,61.22 31.46,62.59 32.18,60.38 30.30,59.01 32.62,59.01\" fill=\"#ffffff\"/><polygon points=\"50.01,56.80 50.73,59.01 53.05,59.01 51.17,60.38 51.89,62.59 50.01,61.22 48.13,62.59 48.85,60.38 46.97,59.01 49.29,59.01\" fill=\"#ffffff\"/><polygon points=\"66.68,56.80 67.40,59.01 69.72,59.01 67.84,60.38 68.56,62.59 66.68,61.22 64.80,62.59 65.52,60.38 63.64,59.01 65.96,59.01\" fill=\"#ffffff\"/><polygon points=\"83.35,56.80 84.07,59.01 86.39,59.01 84.51,60.38 85.23,62.59 83.35,61.22 81.47,62.59 82.19,60.38 80.31,59.01 82.63,59.01\" fill=\"#ffffff\"/><polygon points=\"8.33,66.80 9.05,69.01 11.37,69.01 9.49,70.38 10.21,72.59 8.33,71.22 6.45,72.59 7.17,70.38 5.29,69.01 7.61,69.01\" fill=\"#ffffff\"/><polygon points=\"25.00,66.80 25.72,69.01 28.04,69.01 26.16,70.38 26.88,72.59 25.00,71.22 23.12,72.59 23.84,70.38 21.96,69.01 24.28,69.01\" fill=\"#ffffff\"/><polygon points=\"41.67,66.80 42.39,69.01 44.71,69.01 42.83,70.38 43.55,72.59 41.67,71.22 39.79,72.59 40.51,70.38 38.63,69.01 40.95,69.01\" fill=\"#ffffff\"/><polygon points=\"58.34,66.80 59.06,69.01 61.38,69.01 59.50,70.38 60.22,72.59 58.34,71.22 56.46,72.59 57.18,70.38 55.30,69.01 57.62,69.01\" fill=\"#ffffff\"/><polygon points=\"75.01,66.80 75.73,69.01 78.05,69.01 76.17,70.38 76.89,72.59 75.01,71.22 73.13,72.59 73.85,70.38 71.97,69.01 74.29,69.01\" fill=\"#ffffff\"/><polygon points=\"91.68,66.80 92.40,69.01 94.72,69.01 92.84,70.38 93.56,72.59 91.68,71.22 89.80,72.59 90.52,70.38 88.64,69.01 90.96,69.01\" fill=\"#ffffff\"/><polygon points=\"16.67,76.80 17.39,79.01 19.71,79.01 17.83,80.38 18.55,82.59 16.67,81.22 14.79,82.59 15.51,80.38 13.63,79.01 15.95,79.01\" fill=\"#ffffff\"/><polygon points=\"33.34,76.80 34.06,79.01 36.38,79.01 34.50,80.38 35.22,82.59 33.34,81.22 31.46,82.59 32.18,80.38 30.30,79.01 32.62,79.01\" fill=\"#ffffff\"/><polygon points=\"50.01,76.80 50.73,79.01 53.05,79.01 51.17,80.38 51.89,82.59 50.01,81.22 48.13,82.59 48.85,80.38 46.97,79.01 49.29,79.01\" fill=\"#ffffff\"/><polygon points=\"66.68,76.80 67.40,79.01 69.72,79.01 67.84,80.38 68.56,82.59 66.68,81.22 64.80,82.59 65.52,80.38 63.64,79.01 65.96,79.01\" fill=\"#ffffff\"/><polygon points=\"83.35,76.80 84.07,79.01 86.39,79.01 84.51,80.38 85.23,82.59 83.35,81.22 81.47,82.59 82.19,80.38 80.31,79.01 82.63,79.01\" fill=\"#ffffff\"/><polygon points=\"8.33,86.80 9.05,89.01 11.37,89.01 9.49,90.38 10.21,92.59 8.33,91.22 6.45,92.59 7.17,90.38 5.29,89.01 7.61,89.01\" fill=\"#ffffff\"/><polygon points=\"25.00,86.80 25.72,89.01 28.04,89.01 26.16,90.38 26.88,92.59 25.00,91.22 23.12,92.59 23.84,90.38 21.96,89.01 24.28,89.01\" fill=\"#ffffff\"/><polygon points=\"41.67,86.80 42.39,89.01 44.71,89.01 42.83,90.38 43.55,92.59 41.67,91.22 39.79,92.59 40.51,90.38 38.63,89.01 40.95,89.01\" fill=\"#ffffff\"/><polygon points=\"58.34,86.80 59.06,89.01 61.38,89.01 59.50,90.38 60.22,92.59 58.34,91.22 56.46,92.59 57.18,90.38 55.30,89.01 57.62,89.01\" fill=\"#ffffff\"/><polygon points=\"75.01,86.80 75.73,89.01 78.05,89.01 76.17,90.38 76.89,92.59 75.01,91.22 73.13,92.59 73.85,90.38 71.97,89.01 74.29,89.01\" fill=\"#ffffff\"/><polygon points=\"91.68,86.80 92.40,89.01 94.72,89.01 92.84,90.38 93.56,92.59 91.68,91.22 89.80,92.59 90.52,90.38 88.64,89.01 90.96,89.01\" fill=\"#ffffff\"/>",
        "targetSlotId": "canton_slot"
      },
      {
        "id": "red_sun_wrong",
        "name": "赤い丸",
        "ruby": "あかいまる",
        "icon": "🔴",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"35\" fill=\"#bc002d\" />",
        "targetSlotId": ""
      },
      {
        "id": "green_cross",
        "name": "緑の十字",
        "ruby": "みどりのじゅうじ",
        "icon": "➕",
        "svgContent": "<rect x=\"40\" y=\"15\" width=\"20\" height=\"70\" fill=\"#009933\"/><rect x=\"15\" y=\"40\" width=\"70\" height=\"20\" fill=\"#009933\"/>",
        "targetSlotId": ""
      }
    ],
    "hint": "50の州を表す大切なシンボルを、赤白のしま模様の上に置こう！",
    "trivia": "アメリカの国旗（星条旗）の13本のしま模様は建国時の13州を、正確に並んだ50個の星は現在の州の数を表しています。"
  },
  {
    "id": "br",
    "countryCode": "br",
    "countryName": "ブラジル",
    "countryRuby": "ぶらじる",
    "aspectRatio": "10 / 7",
    "baseBgColor": "#009c3b",
    "slots": [
      {
        "id": "diamond_slot",
        "name": "ひし形",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 83,
        "heightPercent": 77,
        "requiredPartId": "yellow_diamond"
      },
      {
        "id": "globe_slot",
        "name": "天球儀",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 43,
        "heightPercent": 43,
        "requiredPartId": "blue_globe"
      }
    ],
    "availableParts": [
      {
        "id": "yellow_diamond",
        "name": "黄色いひし形",
        "ruby": "きいろいひしがた",
        "icon": "🔶",
        "svgContent": "<polygon points=\"50,2 98,50 50,98 2,50\" fill=\"#ffdf00\" />",
        "targetSlotId": "diamond_slot"
      },
      {
        "id": "blue_globe",
        "name": "星空の天球儀",
        "ruby": "てんきゅうぎ",
        "icon": "🌐",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"48\" fill=\"#002776\"/><path d=\"M5 60 Q 50 40 95 48\" stroke=\"#ffffff\" stroke-width=\"5.5\" fill=\"none\"/><circle cx=\"48\" cy=\"28\" r=\"2.5\" fill=\"#ffffff\"/><circle cx=\"58\" cy=\"32\" r=\"2\" fill=\"#ffffff\"/><circle cx=\"46\" cy=\"68\" r=\"2.5\" fill=\"#ffffff\"/><circle cx=\"54\" cy=\"72\" r=\"2\" fill=\"#ffffff\"/><circle cx=\"50\" cy=\"76\" r=\"1.5\" fill=\"#ffffff\"/>",
        "targetSlotId": "globe_slot"
      },
      {
        "id": "black_eagle",
        "name": "黒いワシ",
        "ruby": "くろいわし",
        "icon": "🦅",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"30\" fill=\"#000000\"/>",
        "targetSlotId": ""
      },
      {
        "id": "white_star",
        "name": "白い星",
        "ruby": "しろいほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,15 60,40 88,40 65,58 74,85 50,68 26,85 35,58 12,40 40,40\" fill=\"#ffffff\" />",
        "targetSlotId": ""
      }
    ],
    "hint": "豊かな自然と、リオデジャネイロの美しい星空を組み合わせよう！",
    "trivia": "ブラジル国旗の緑は豊かな森林、黄色は鉱物資源、青い円は共和制が樹立された日のリオデジャネイロの星空を表しています。"
  },
  {
    "id": "ch",
    "countryCode": "ch",
    "countryName": "スイス",
    "countryRuby": "すいす",
    "aspectRatio": "1 / 1",
    "baseBgColor": "#ff0000",
    "slots": [
      {
        "id": "cross_slot",
        "name": "十字",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 60,
        "heightPercent": 60,
        "requiredPartId": "white_cross"
      }
    ],
    "availableParts": [
      {
        "id": "white_cross",
        "name": "白い十字（スイスクロス）",
        "ruby": "しろいじゅうじ",
        "icon": "➕",
        "svgContent": "<rect x=\"38\" y=\"10\" width=\"24\" height=\"80\" fill=\"#ffffff\"/><rect x=\"10\" y=\"38\" width=\"80\" height=\"24\" fill=\"#ffffff\"/>",
        "targetSlotId": "cross_slot"
      },
      {
        "id": "yellow_lion",
        "name": "金のライオン",
        "ruby": "きんのらいおん",
        "icon": "🦁",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"35\" fill=\"#ffcc00\"/>",
        "targetSlotId": ""
      },
      {
        "id": "blue_stripes",
        "name": "青いしま",
        "ruby": "あおいしま",
        "icon": "〰️",
        "svgContent": "<rect x=\"10\" y=\"30\" width=\"80\" height=\"15\" fill=\"#0055a5\"/><rect x=\"10\" y=\"55\" width=\"80\" height=\"15\" fill=\"#0055a5\"/>",
        "targetSlotId": ""
      }
    ],
    "hint": "正方形の赤い旗の中央に、世界的に有名な伝統のマークを置こう！",
    "trivia": "スイス国旗はバチカン市国と並んで世界に2つしかない「正方形（1:1）」の国旗です。赤十字マークの由来にもなりました。"
  },
  {
    "id": "tr",
    "countryCode": "tr",
    "countryName": "トルコ",
    "countryRuby": "とるこ",
    "aspectRatio": "3 / 2",
    "baseBgColor": "#e30a17",
    "slots": [
      {
        "id": "crescent_slot",
        "name": "三日月",
        "xPercent": 44,
        "yPercent": 50,
        "widthPercent": 42,
        "heightPercent": 50,
        "requiredPartId": "turkey_crescent"
      },
      {
        "id": "star_slot",
        "name": "星",
        "xPercent": 68,
        "yPercent": 50,
        "widthPercent": 22,
        "heightPercent": 26,
        "requiredPartId": "turkey_star"
      }
    ],
    "availableParts": [
      {
        "id": "turkey_crescent",
        "name": "白い三日月",
        "ruby": "しろいみかづき",
        "icon": "🌙",
        "svgContent": "<mask id=\"crescentMask\"><rect width=\"100\" height=\"100\" fill=\"white\"/><circle cx=\"58\" cy=\"50\" r=\"32\" fill=\"black\"/></mask><circle cx=\"48\" cy=\"50\" r=\"40\" fill=\"#ffffff\" mask=\"url(#crescentMask)\"/>",
        "targetSlotId": "crescent_slot"
      },
      {
        "id": "turkey_star",
        "name": "白い五角星",
        "ruby": "しろいほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,10 62,38 92,38 68,56 77,85 50,67 23,85 32,56 8,38 38,38\" fill=\"#ffffff\" transform=\"rotate(15, 50, 50)\"/>",
        "targetSlotId": "star_slot"
      },
      {
        "id": "golden_sun",
        "name": "金色の太陽",
        "ruby": "きんのたいよう",
        "icon": "☀️",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"35\" fill=\"#ffcc00\"/>",
        "targetSlotId": ""
      },
      {
        "id": "blue_crown",
        "name": "青い冠",
        "ruby": "あおいかんむり",
        "icon": "👑",
        "svgContent": "<polygon points=\"20,70 80,70 85,35 65,55 50,30 35,55 15,35\" fill=\"#0055a5\"/>",
        "targetSlotId": ""
      }
    ],
    "hint": "夜空に浮かぶ2つのシンボルを組み合わせて、新月旗を完成させよう！",
    "trivia": "トルコ国旗は「新月旗（アイ・ユルドゥズ）」と呼ばれ、オスマン帝国時代から続く伝統的なシンボルです。"
  },
  {
    "id": "kr",
    "countryCode": "kr",
    "countryName": "韓国",
    "countryRuby": "かんこく",
    "aspectRatio": "3 / 2",
    "baseBgColor": "#ffffff",
    "slots": [
      {
        "id": "taeguk_slot",
        "name": "中央",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 44,
        "heightPercent": 44,
        "requiredPartId": "taeguk_mark"
      },
      {
        "id": "trigram_slot",
        "name": "四隅",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 88,
        "heightPercent": 80,
        "requiredPartId": "four_trigrams"
      }
    ],
    "availableParts": [
      {
        "id": "taeguk_mark",
        "name": "赤と青の太極マーク",
        "ruby": "たいきょくまーく",
        "icon": "☯️",
        "svgContent": "<g transform=\"rotate(-34, 50, 50)\"><circle cx=\"50\" cy=\"50\" r=\"45\" fill=\"#cd2e3a\" /><path d=\"M50 95 A45 45 0 0 1 50 5 A22.5 22.5 0 0 1 50 50 A22.5 22.5 0 0 0 50 95 Z\" fill=\"#0047a0\" /></g>",
        "targetSlotId": "taeguk_slot"
      },
      {
        "id": "four_trigrams",
        "name": "四隅の黒い三本線（卦）",
        "ruby": "よすみのけ",
        "icon": "☰",
        "svgContent": "<g fill=\"#000000\"><g transform=\"translate(14, 18) rotate(34)\"><rect x=\"-14\" y=\"-7\" width=\"28\" height=\"3\"/><rect x=\"-14\" y=\"-1\" width=\"28\" height=\"3\"/><rect x=\"-14\" y=\"5\" width=\"28\" height=\"3\"/></g><g transform=\"translate(86, 18) rotate(-34)\"><rect x=\"-14\" y=\"-7\" width=\"12\" height=\"3\"/><rect x=\"2\" y=\"-7\" width=\"12\" height=\"3\"/><rect x=\"-14\" y=\"-1\" width=\"28\" height=\"3\"/><rect x=\"-14\" y=\"5\" width=\"12\" height=\"3\"/><rect x=\"2\" y=\"5\" width=\"12\" height=\"3\"/></g><g transform=\"translate(14, 82) rotate(-34)\"><rect x=\"-14\" y=\"-7\" width=\"28\" height=\"3\"/><rect x=\"-14\" y=\"-1\" width=\"12\" height=\"3\"/><rect x=\"2\" y=\"-1\" width=\"12\" height=\"3\"/><rect x=\"-14\" y=\"5\" width=\"28\" height=\"3\"/></g><g transform=\"translate(86, 82) rotate(34)\"><rect x=\"-14\" y=\"-7\" width=\"12\" height=\"3\"/><rect x=\"2\" y=\"-7\" width=\"12\" height=\"3\"/><rect x=\"-14\" y=\"-1\" width=\"12\" height=\"3\"/><rect x=\"2\" y=\"-1\" width=\"12\" height=\"3\"/><rect x=\"-14\" y=\"5\" width=\"12\" height=\"3\"/><rect x=\"2\" y=\"5\" width=\"12\" height=\"3\"/></g></g>",
        "targetSlotId": "trigram_slot"
      },
      {
        "id": "green_leaf",
        "name": "緑のオリーブの枝",
        "ruby": "おりーぶのえだ",
        "icon": "🌿",
        "svgContent": "<path d=\"M20 80 Q 50 30 80 20\" stroke=\"#2e7d32\" stroke-width=\"4\" fill=\"none\"/>",
        "targetSlotId": ""
      }
    ],
    "hint": "宇宙の調和を表す陰陽の円と、四隅のシンボルを配置しよう！",
    "trivia": "韓国の国旗は「太極旗（テグッキ）」と呼ばれ、中央の円は陰陽の調和を、四隅の卦は天・地・日・月を表しています。"
  },
  {
    "id": "ar",
    "countryCode": "ar",
    "countryName": "アルゼンチン",
    "countryRuby": "あるぜんちん",
    "aspectRatio": "8 / 5",
    "baseBgColor": "#74acdf",
    "baseElementsSvg": "<rect y=\"33.33\" width=\"100\" height=\"33.34\" fill=\"#ffffff\"/>",
    "slots": [
      {
        "id": "sun_slot",
        "name": "中央",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 28,
        "heightPercent": 28,
        "requiredPartId": "sun_of_may"
      }
    ],
    "availableParts": [
      {
        "id": "sun_of_may",
        "name": "五月の太陽（顔のある太陽）",
        "ruby": "ごがつのたいよう",
        "icon": "🌞",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"22\" fill=\"#ffb81c\" stroke=\"#854d0e\" stroke-width=\"1.5\"/><g stroke=\"#ffb81c\" stroke-width=\"2.5\"><line x1=\"50\" y1=\"12\" x2=\"50\" y2=\"24\"/><line x1=\"50\" y1=\"76\" x2=\"50\" y2=\"88\"/><line x1=\"12\" y1=\"50\" x2=\"24\" y2=\"50\"/><line x1=\"76\" y1=\"50\" x2=\"88\" y2=\"50\"/><line x1=\"23\" y1=\"23\" x2=\"32\" y2=\"32\"/><line x1=\"68\" y1=\"68\" x2=\"77\" y2=\"77\"/><line x1=\"23\" y1=\"77\" x2=\"32\" y2=\"68\"/><line x1=\"68\" y1=\"32\" x2=\"77\" y2=\"23\"/></g><circle cx=\"43\" cy=\"46\" r=\"2.5\" fill=\"#854d0e\"/><circle cx=\"57\" cy=\"46\" r=\"2.5\" fill=\"#854d0e\"/><path d=\"M44 58 Q 50 64 56 58\" stroke=\"#854d0e\" stroke-width=\"2\" fill=\"none\"/>",
        "targetSlotId": "sun_slot"
      },
      {
        "id": "silver_anchor",
        "name": "銀のいかり",
        "ruby": "ぎんのいかり",
        "icon": "⚓",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"25\" fill=\"#666666\"/>",
        "targetSlotId": ""
      },
      {
        "id": "white_star",
        "name": "白い星",
        "ruby": "しろいほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,15 60,40 88,40 65,58 74,85 50,68 26,85 35,58 12,40 40,40\" fill=\"#ffffff\" />",
        "targetSlotId": ""
      }
    ],
    "hint": "青と白の空の中央に、独立の希望を表す輝くシンボルを置こう！",
    "trivia": "アルゼンチン国旗の「五月の太陽」は、1810年5月の独立革命の日に雨雲を突き抜けて輝いた太陽の伝説に由来しています。"
  }
];
