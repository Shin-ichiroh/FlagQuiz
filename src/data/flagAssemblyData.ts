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
    "hint": "白い旗の真ん中に、東から昇る「太陽」の赤い丸を置こう！",
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
        "name": "左上の星たち",
        "xPercent": 20,
        "yPercent": 27,
        "widthPercent": 40,
        "heightPercent": 54,
        "requiredPartId": "blue_stars"
      }
    ],
    "availableParts": [
      {
        "id": "blue_stars",
        "name": "青地に50個の星",
        "ruby": "あおじにごじっこ",
        "icon": "🟦",
        "svgContent": "<rect width=\"100\" height=\"100\" fill=\"#3c3b6e\"/><circle cx=\"20\" cy=\"20\" r=\"4\" fill=\"#ffffff\"/><circle cx=\"50\" cy=\"20\" r=\"4\" fill=\"#ffffff\"/><circle cx=\"80\" cy=\"20\" r=\"4\" fill=\"#ffffff\"/><circle cx=\"35\" cy=\"40\" r=\"4\" fill=\"#ffffff\"/><circle cx=\"65\" cy=\"40\" r=\"4\" fill=\"#ffffff\"/><circle cx=\"20\" cy=\"60\" r=\"4\" fill=\"#ffffff\"/><circle cx=\"50\" cy=\"60\" r=\"4\" fill=\"#ffffff\"/><circle cx=\"80\" cy=\"60\" r=\"4\" fill=\"#ffffff\"/><circle cx=\"35\" cy=\"80\" r=\"4\" fill=\"#ffffff\"/><circle cx=\"65\" cy=\"80\" r=\"4\" fill=\"#ffffff\"/>",
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
    "hint": "赤と白のしま模様の左上に、星が集まった青い四角を置こう！",
    "trivia": "アメリカの国旗（星条旗）の13本のしま模様は建国時の13州を、50個の星は現在の州の数を表しています。"
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
        "name": "大きな黄色いひし形",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 82,
        "heightPercent": 78,
        "requiredPartId": "yellow_diamond"
      },
      {
        "id": "globe_slot",
        "name": "青い天球儀",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 42,
        "heightPercent": 42,
        "requiredPartId": "blue_globe"
      }
    ],
    "availableParts": [
      {
        "id": "yellow_diamond",
        "name": "黄色いひし形",
        "ruby": "きいろいひしがた",
        "icon": "🔶",
        "svgContent": "<polygon points=\"50,5 95,50 50,95 5,50\" fill=\"#ffdf00\" />",
        "targetSlotId": "diamond_slot"
      },
      {
        "id": "blue_globe",
        "name": "星空の天球儀",
        "ruby": "てんきゅうぎ",
        "icon": "🌐",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"45\" fill=\"#002776\"/><path d=\"M10 58 Q 50 42 90 48\" stroke=\"#ffffff\" stroke-width=\"6\" fill=\"none\"/><circle cx=\"45\" cy=\"30\" r=\"2.5\" fill=\"#ffffff\"/><circle cx=\"55\" cy=\"32\" r=\"2\" fill=\"#ffffff\"/><circle cx=\"48\" cy=\"68\" r=\"2.5\" fill=\"#ffffff\"/><circle cx=\"55\" cy=\"72\" r=\"2\" fill=\"#ffffff\"/><circle cx=\"50\" cy=\"76\" r=\"1.5\" fill=\"#ffffff\"/>",
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
    "hint": "緑の旗の上に「黄色いひし形」を置き、その真ん中に南十字星が輝く「青い天球儀」を重ねよう！",
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
        "name": "真ん中の白い十字",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 65,
        "heightPercent": 65,
        "requiredPartId": "white_cross"
      }
    ],
    "availableParts": [
      {
        "id": "white_cross",
        "name": "白い十字（スイスクロス）",
        "ruby": "しろいじゅうじ",
        "icon": "➕",
        "svgContent": "<rect x=\"37\" y=\"10\" width=\"26\" height=\"80\" fill=\"#ffffff\"/><rect x=\"10\" y=\"37\" width=\"80\" height=\"26\" fill=\"#ffffff\"/>",
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
    "hint": "正方形の赤い旗のど真ん中に、伝統の「白い十字」を置こう！",
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
        "name": "白い三日月",
        "xPercent": 44,
        "yPercent": 50,
        "widthPercent": 42,
        "heightPercent": 50,
        "requiredPartId": "turkey_crescent"
      },
      {
        "id": "star_slot",
        "name": "白い星",
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
    "hint": "赤い旗の上に、夜空を照らす「白い三日月」と、その右となりに「白い星」を置こう！",
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
        "name": "中央の太極円",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 44,
        "heightPercent": 44,
        "requiredPartId": "taeguk_mark"
      },
      {
        "id": "trigram_slot",
        "name": "四隅の卦（け）",
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
    "hint": "白い旗の中央に赤と青の「太極マーク」を、周りの4つの角に「黒い三本線（卦）」を置こう！",
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
        "name": "真ん中の五月の太陽",
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
    "hint": "青と白の美しい3本しまの真ん中に、優しい顔のついた「五月の太陽」を置こう！",
    "trivia": "アルゼンチン国旗の「五月の太陽」は、1810年5月の独立革命の日に雨雲を突き抜けて輝いた太陽の伝説に由来しています。"
  }
];
