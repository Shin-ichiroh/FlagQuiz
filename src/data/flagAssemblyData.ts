export interface AssemblyPart {
  id: string;
  name: string;
  ruby: string;
  icon: string;
  svgContent?: string;
  viewBox?: string;
  targetSlotId: string;
}

export interface AssemblySlot {
  id: string;
  name: string;
  xPercent: number;
  yPercent: number;
  widthPercent: number;
  heightPercent: number;
  layer?: number;
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
        "layer": 1,
        "requiredPartId": "red_sun"
      }
    ],
    "availableParts": [
      {
        "id": "red_sun",
        "name": "日の丸（赤い太陽）",
        "ruby": "ひのまる",
        "icon": "🔴",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"48\" fill=\"#bc002d\" />",
        "viewBox": "0 0 100 100",
        "targetSlotId": "sun_slot"
      },
      {
        "id": "blue_star",
        "name": "青い星",
        "ruby": "あおいほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,10 62,38 92,38 68,56 77,85 50,67 23,85 32,56 8,38 38,38\" fill=\"#0055a5\" />",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "yellow_crescent",
        "name": "黄色い三日月",
        "ruby": "きいろいみかづき",
        "icon": "🌙",
        "svgContent": "<path d=\"M50 15 A35 35 0 1 0 85 50 A28 28 0 1 1 50 15 Z\" fill=\"#ffcc00\" />",
        "viewBox": "0 0 100 100",
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
        "yPercent": 26.923,
        "widthPercent": 40,
        "heightPercent": 53.846,
        "layer": 1,
        "requiredPartId": "blue_stars_50"
      }
    ],
    "availableParts": [
      {
        "id": "blue_stars_50",
        "name": "青地に50個の星",
        "ruby": "あおじにごじっこ",
        "icon": "🟦",
        "svgContent": "<rect width=\"76\" height=\"53.85\" fill=\"#002868\"/><polygon points=\"6.33,3.53 6.75,4.81 8.09,4.81 7.01,5.60 7.42,6.88 6.33,6.09 5.25,6.88 5.66,5.60 4.57,4.81 5.92,4.81\" fill=\"#ffffff\"/><polygon points=\"19.00,3.53 19.42,4.81 20.76,4.81 19.67,5.60 20.09,6.88 19.00,6.09 17.91,6.88 18.33,5.60 17.24,4.81 18.58,4.81\" fill=\"#ffffff\"/><polygon points=\"31.67,3.53 32.08,4.81 33.43,4.81 32.34,5.60 32.75,6.88 31.67,6.09 30.58,6.88 30.99,5.60 29.91,4.81 31.25,4.81\" fill=\"#ffffff\"/><polygon points=\"44.33,3.53 44.75,4.81 46.09,4.81 45.01,5.60 45.42,6.88 44.33,6.09 43.25,6.88 43.66,5.60 42.57,4.81 43.92,4.81\" fill=\"#ffffff\"/><polygon points=\"57.00,3.53 57.42,4.81 58.76,4.81 57.67,5.60 58.09,6.88 57.00,6.09 55.91,6.88 56.33,5.60 55.24,4.81 56.58,4.81\" fill=\"#ffffff\"/><polygon points=\"69.67,3.53 70.08,4.81 71.43,4.81 70.34,5.60 70.75,6.88 69.67,6.09 68.58,6.88 68.99,5.60 67.91,4.81 69.25,4.81\" fill=\"#ffffff\"/><polygon points=\"12.67,8.92 13.08,10.20 14.43,10.20 13.34,10.99 13.75,12.27 12.67,11.48 11.58,12.27 11.99,10.99 10.91,10.20 12.25,10.20\" fill=\"#ffffff\"/><polygon points=\"25.33,8.92 25.75,10.20 27.09,10.20 26.01,10.99 26.42,12.27 25.33,11.48 24.25,12.27 24.66,10.99 23.57,10.20 24.92,10.20\" fill=\"#ffffff\"/><polygon points=\"38.00,8.92 38.42,10.20 39.76,10.20 38.67,10.99 39.09,12.27 38.00,11.48 36.91,12.27 37.33,10.99 36.24,10.20 37.58,10.20\" fill=\"#ffffff\"/><polygon points=\"50.67,8.92 51.08,10.20 52.43,10.20 51.34,10.99 51.75,12.27 50.67,11.48 49.58,12.27 49.99,10.99 48.91,10.20 50.25,10.20\" fill=\"#ffffff\"/><polygon points=\"63.33,8.92 63.75,10.20 65.09,10.20 64.01,10.99 64.42,12.27 63.33,11.48 62.25,12.27 62.66,10.99 61.57,10.20 62.92,10.20\" fill=\"#ffffff\"/><polygon points=\"6.33,14.31 6.75,15.58 8.09,15.58 7.01,16.37 7.42,17.65 6.33,16.86 5.25,17.65 5.66,16.37 4.57,15.58 5.92,15.58\" fill=\"#ffffff\"/><polygon points=\"19.00,14.31 19.42,15.58 20.76,15.58 19.67,16.37 20.09,17.65 19.00,16.86 17.91,17.65 18.33,16.37 17.24,15.58 18.58,15.58\" fill=\"#ffffff\"/><polygon points=\"31.67,14.31 32.08,15.58 33.43,15.58 32.34,16.37 32.75,17.65 31.67,16.86 30.58,17.65 30.99,16.37 29.91,15.58 31.25,15.58\" fill=\"#ffffff\"/><polygon points=\"44.33,14.31 44.75,15.58 46.09,15.58 45.01,16.37 45.42,17.65 44.33,16.86 43.25,17.65 43.66,16.37 42.57,15.58 43.92,15.58\" fill=\"#ffffff\"/><polygon points=\"57.00,14.31 57.42,15.58 58.76,15.58 57.67,16.37 58.09,17.65 57.00,16.86 55.91,17.65 56.33,16.37 55.24,15.58 56.58,15.58\" fill=\"#ffffff\"/><polygon points=\"69.67,14.31 70.08,15.58 71.43,15.58 70.34,16.37 70.75,17.65 69.67,16.86 68.58,17.65 68.99,16.37 67.91,15.58 69.25,15.58\" fill=\"#ffffff\"/><polygon points=\"12.67,19.69 13.08,20.97 14.43,20.97 13.34,21.76 13.75,23.04 12.67,22.25 11.58,23.04 11.99,21.76 10.91,20.97 12.25,20.97\" fill=\"#ffffff\"/><polygon points=\"25.33,19.69 25.75,20.97 27.09,20.97 26.01,21.76 26.42,23.04 25.33,22.25 24.25,23.04 24.66,21.76 23.57,20.97 24.92,20.97\" fill=\"#ffffff\"/><polygon points=\"38.00,19.69 38.42,20.97 39.76,20.97 38.67,21.76 39.09,23.04 38.00,22.25 36.91,23.04 37.33,21.76 36.24,20.97 37.58,20.97\" fill=\"#ffffff\"/><polygon points=\"50.67,19.69 51.08,20.97 52.43,20.97 51.34,21.76 51.75,23.04 50.67,22.25 49.58,23.04 49.99,21.76 48.91,20.97 50.25,20.97\" fill=\"#ffffff\"/><polygon points=\"63.33,19.69 63.75,20.97 65.09,20.97 64.01,21.76 64.42,23.04 63.33,22.25 62.25,23.04 62.66,21.76 61.57,20.97 62.92,20.97\" fill=\"#ffffff\"/><polygon points=\"6.33,25.07 6.75,26.35 8.09,26.35 7.01,27.14 7.42,28.42 6.33,27.63 5.25,28.42 5.66,27.14 4.57,26.35 5.92,26.35\" fill=\"#ffffff\"/><polygon points=\"19.00,25.07 19.42,26.35 20.76,26.35 19.67,27.14 20.09,28.42 19.00,27.63 17.91,28.42 18.33,27.14 17.24,26.35 18.58,26.35\" fill=\"#ffffff\"/><polygon points=\"31.67,25.07 32.08,26.35 33.43,26.35 32.34,27.14 32.75,28.42 31.67,27.63 30.58,28.42 30.99,27.14 29.91,26.35 31.25,26.35\" fill=\"#ffffff\"/><polygon points=\"44.33,25.07 44.75,26.35 46.09,26.35 45.01,27.14 45.42,28.42 44.33,27.63 43.25,28.42 43.66,27.14 42.57,26.35 43.92,26.35\" fill=\"#ffffff\"/><polygon points=\"57.00,25.07 57.42,26.35 58.76,26.35 57.67,27.14 58.09,28.42 57.00,27.63 55.91,28.42 56.33,27.14 55.24,26.35 56.58,26.35\" fill=\"#ffffff\"/><polygon points=\"69.67,25.07 70.08,26.35 71.43,26.35 70.34,27.14 70.75,28.42 69.67,27.63 68.58,28.42 68.99,27.14 67.91,26.35 69.25,26.35\" fill=\"#ffffff\"/><polygon points=\"12.67,30.46 13.08,31.74 14.43,31.74 13.34,32.53 13.75,33.81 12.67,33.02 11.58,33.81 11.99,32.53 10.91,31.74 12.25,31.74\" fill=\"#ffffff\"/><polygon points=\"25.33,30.46 25.75,31.74 27.09,31.74 26.01,32.53 26.42,33.81 25.33,33.02 24.25,33.81 24.66,32.53 23.57,31.74 24.92,31.74\" fill=\"#ffffff\"/><polygon points=\"38.00,30.46 38.42,31.74 39.76,31.74 38.67,32.53 39.09,33.81 38.00,33.02 36.91,33.81 37.33,32.53 36.24,31.74 37.58,31.74\" fill=\"#ffffff\"/><polygon points=\"50.67,30.46 51.08,31.74 52.43,31.74 51.34,32.53 51.75,33.81 50.67,33.02 49.58,33.81 49.99,32.53 48.91,31.74 50.25,31.74\" fill=\"#ffffff\"/><polygon points=\"63.33,30.46 63.75,31.74 65.09,31.74 64.01,32.53 64.42,33.81 63.33,33.02 62.25,33.81 62.66,32.53 61.57,31.74 62.92,31.74\" fill=\"#ffffff\"/><polygon points=\"6.33,35.84 6.75,37.12 8.09,37.12 7.01,37.91 7.42,39.19 6.33,38.40 5.25,39.19 5.66,37.91 4.57,37.12 5.92,37.12\" fill=\"#ffffff\"/><polygon points=\"19.00,35.84 19.42,37.12 20.76,37.12 19.67,37.91 20.09,39.19 19.00,38.40 17.91,39.19 18.33,37.91 17.24,37.12 18.58,37.12\" fill=\"#ffffff\"/><polygon points=\"31.67,35.84 32.08,37.12 33.43,37.12 32.34,37.91 32.75,39.19 31.67,38.40 30.58,39.19 30.99,37.91 29.91,37.12 31.25,37.12\" fill=\"#ffffff\"/><polygon points=\"44.33,35.84 44.75,37.12 46.09,37.12 45.01,37.91 45.42,39.19 44.33,38.40 43.25,39.19 43.66,37.91 42.57,37.12 43.92,37.12\" fill=\"#ffffff\"/><polygon points=\"57.00,35.84 57.42,37.12 58.76,37.12 57.67,37.91 58.09,39.19 57.00,38.40 55.91,39.19 56.33,37.91 55.24,37.12 56.58,37.12\" fill=\"#ffffff\"/><polygon points=\"69.67,35.84 70.08,37.12 71.43,37.12 70.34,37.91 70.75,39.19 69.67,38.40 68.58,39.19 68.99,37.91 67.91,37.12 69.25,37.12\" fill=\"#ffffff\"/><polygon points=\"12.67,41.23 13.08,42.51 14.43,42.51 13.34,43.30 13.75,44.58 12.67,43.79 11.58,44.58 11.99,43.30 10.91,42.51 12.25,42.51\" fill=\"#ffffff\"/><polygon points=\"25.33,41.23 25.75,42.51 27.09,42.51 26.01,43.30 26.42,44.58 25.33,43.79 24.25,44.58 24.66,43.30 23.57,42.51 24.92,42.51\" fill=\"#ffffff\"/><polygon points=\"38.00,41.23 38.42,42.51 39.76,42.51 38.67,43.30 39.09,44.58 38.00,43.79 36.91,44.58 37.33,43.30 36.24,42.51 37.58,42.51\" fill=\"#ffffff\"/><polygon points=\"50.67,41.23 51.08,42.51 52.43,42.51 51.34,43.30 51.75,44.58 50.67,43.79 49.58,44.58 49.99,43.30 48.91,42.51 50.25,42.51\" fill=\"#ffffff\"/><polygon points=\"63.33,41.23 63.75,42.51 65.09,42.51 64.01,43.30 64.42,44.58 63.33,43.79 62.25,44.58 62.66,43.30 61.57,42.51 62.92,42.51\" fill=\"#ffffff\"/><polygon points=\"6.33,46.62 6.75,47.89 8.09,47.89 7.01,48.68 7.42,49.96 6.33,49.17 5.25,49.96 5.66,48.68 4.57,47.89 5.92,47.89\" fill=\"#ffffff\"/><polygon points=\"19.00,46.62 19.42,47.89 20.76,47.89 19.67,48.68 20.09,49.96 19.00,49.17 17.91,49.96 18.33,48.68 17.24,47.89 18.58,47.89\" fill=\"#ffffff\"/><polygon points=\"31.67,46.62 32.08,47.89 33.43,47.89 32.34,48.68 32.75,49.96 31.67,49.17 30.58,49.96 30.99,48.68 29.91,47.89 31.25,47.89\" fill=\"#ffffff\"/><polygon points=\"44.33,46.62 44.75,47.89 46.09,47.89 45.01,48.68 45.42,49.96 44.33,49.17 43.25,49.96 43.66,48.68 42.57,47.89 43.92,47.89\" fill=\"#ffffff\"/><polygon points=\"57.00,46.62 57.42,47.89 58.76,47.89 57.67,48.68 58.09,49.96 57.00,49.17 55.91,49.96 56.33,48.68 55.24,47.89 56.58,47.89\" fill=\"#ffffff\"/><polygon points=\"69.67,46.62 70.08,47.89 71.43,47.89 70.34,48.68 70.75,49.96 69.67,49.17 68.58,49.96 68.99,48.68 67.91,47.89 69.25,47.89\" fill=\"#ffffff\"/>",
        "viewBox": "0 0 76 53.85",
        "targetSlotId": "canton_slot"
      },
      {
        "id": "red_sun_wrong",
        "name": "赤い丸",
        "ruby": "あかいまる",
        "icon": "🔴",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"35\" fill=\"#bc002d\" />",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "green_cross",
        "name": "緑の十字",
        "ruby": "みどりのじゅうじ",
        "icon": "➕",
        "svgContent": "<rect x=\"40\" y=\"15\" width=\"20\" height=\"70\" fill=\"#009933\"/><rect x=\"15\" y=\"40\" width=\"70\" height=\"20\" fill=\"#009933\"/>",
        "viewBox": "0 0 100 100",
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
    "baseBgColor": "#009440",
    "slots": [
      {
        "id": "diamond_slot",
        "name": "ひし形",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 83,
        "heightPercent": 75.714,
        "layer": 1,
        "requiredPartId": "yellow_diamond"
      },
      {
        "id": "globe_slot",
        "name": "天球儀",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 35,
        "heightPercent": 50,
        "layer": 2,
        "requiredPartId": "blue_globe"
      }
    ],
    "availableParts": [
      {
        "id": "yellow_diamond",
        "name": "黄色いひし形",
        "ruby": "きいろいひしがた",
        "icon": "🔶",
        "svgContent": "<path fill=\"#ffcb00\" d=\"M-1743 0 0 1113 1743 0 0-1113Z\"/>",
        "viewBox": "-1743 -1113 3486 2226",
        "targetSlotId": "diamond_slot"
      },
      {
        "id": "blue_globe",
        "name": "27星の青い天球儀",
        "ruby": "てんきゅうぎ",
        "icon": "🌐",
        "svgContent": "<defs><path id=\"j\" fill-rule=\"evenodd\" d=\"M-31.5 0h33a30 30 0 0 0 30-30v-10a30 30 0 0 0-30-30h-33zm13-13h19a19 19 0 0 0 19-19v-6a19 19 0 0 0-19-19h-19z\"/><path id=\"k\" d=\"M0 0h63v-13H12v-18h40v-12H12v-14h48v-13H0z\" transform=\"translate(-31.5)\"/><path id=\"m\" d=\"M-26.25 0h52.5v-12h-40.5v-16h33v-12h-33v-11H25v-12h-51.25z\"/><path id=\"l\" d=\"M-31.5 0h12v-48l14 48h11l14-48V0h12v-70H14L0-22l-14-48h-17.5z\"/><path id=\"b\" fill-rule=\"evenodd\" d=\"M0 0a31.5 35 0 0 0 0-70A31.5 35 0 0 0 0 0m0-13a18.5 22 0 0 0 0-44 18.5 22 0 0 0 0 44\"/><path id=\"c\" fill-rule=\"evenodd\" d=\"M-31.5 0h13v-26h28a22 22 0 0 0 0-44h-40zm13-39h27a9 9 0 0 0 0-18h-27z\"/><path id=\"o\" d=\"M-15.75-22C-15.75-15-9-11.5 1-11.5s14.74-3.25 14.75-7.75c0-14.25-46.75-5.25-46.5-30.25C-30.5-71-6-70 3-70s26 4 25.75 21.25H13.5c0-7.5-7-10.25-15-10.25-7.75 0-13.25 1.25-13.25 8.5-.25 11.75 46.25 4 46.25 28.75C31.5-3.5 13.5 0 0 0c-11.5 0-31.55-4.5-31.5-22z\"/><use xlink:href=\"#f\" id=\"p\" transform=\"scale(31.5)\"/><use xlink:href=\"#f\" id=\"q\" transform=\"scale(26.25)\"/><use xlink:href=\"#f\" id=\"u\" transform=\"scale(21)\"/><use xlink:href=\"#f\" id=\"r\" transform=\"scale(15)\"/><use xlink:href=\"#f\" id=\"v\" transform=\"scale(10.5)\"/><g id=\"n\"><clipPath id=\"a\"><path d=\"M-31.5 0v-70h63V0zM0-47v12h31.5v-12z\"/></clipPath><use xlink:href=\"#b\" clip-path=\"url(#a)\"/><path d=\"M5-35h26.5v10H5z\"/><path d=\"M21.5-35h10V0h-10z\"/></g><g id=\"i\"><use xlink:href=\"#c\"/><path d=\"M28 0c0-10 0-32-15-32H-6c22 0 22 22 22 32\"/></g><g id=\"f\" fill=\"#fff\"><g id=\"e\"><path id=\"d\" d=\"M0-1v1h.5\" transform=\"rotate(18 0 -1)\"/><use xlink:href=\"#d\" transform=\"scale(-1 1)\"/></g><use xlink:href=\"#e\" transform=\"rotate(72)\"/><use xlink:href=\"#e\" transform=\"rotate(-72)\"/><use xlink:href=\"#e\" transform=\"rotate(144)\"/><use xlink:href=\"#e\" transform=\"rotate(216)\"/></g></defs><clipPath id=\"h\"><circle r=\"735\"/></clipPath><circle r=\"735\"/></clipPath><path fill=\"#009440\" d=\"M-2100-1470h4200v2940h-4200z\"/><path fill=\"#ffcb00\" d=\"M-1743 0 0 1113 1743 0 0-1113Z\"/><circle r=\"735\" fill=\"#302681\"/><path fill=\"#fff\" d=\"M-2205 1470a1785 1785 0 0 1 3570 0h-105a1680 1680 0 1 0-3360 0z\" clip-path=\"url(#h)\"/><g fill=\"#009440\" transform=\"translate(-420 1470)\"><use xlink:href=\"#b\" y=\"-1697.5\" transform=\"rotate(-7)\"/><use xlink:href=\"#i\" y=\"-1697.5\" transform=\"rotate(-4)\"/><use xlink:href=\"#j\" y=\"-1697.5\" transform=\"rotate(-1)\"/><use xlink:href=\"#k\" y=\"-1697.5\" transform=\"rotate(2)\"/><use xlink:href=\"#l\" y=\"-1697.5\" transform=\"rotate(5)\"/><use xlink:href=\"#m\" y=\"-1697.5\" transform=\"rotate(9.75)\"/><use xlink:href=\"#c\" y=\"-1697.5\" transform=\"rotate(14.5)\"/><use xlink:href=\"#i\" y=\"-1697.5\" transform=\"rotate(17.5)\"/><use xlink:href=\"#b\" y=\"-1697.5\" transform=\"rotate(20.5)\"/><use xlink:href=\"#n\" y=\"-1697.5\" transform=\"rotate(23.5)\"/><use xlink:href=\"#i\" y=\"-1697.5\" transform=\"rotate(26.5)\"/><use xlink:href=\"#k\" y=\"-1697.5\" transform=\"rotate(29.5)\"/><use xlink:href=\"#o\" y=\"-1697.5\" transform=\"rotate(32.5)\"/><use xlink:href=\"#o\" y=\"-1697.5\" transform=\"rotate(35.5)\"/><use xlink:href=\"#b\" y=\"-1697.5\" transform=\"rotate(38.5)\"/></g><use xlink:href=\"#p\" x=\"-600\" y=\"-132\"/><use xlink:href=\"#p\" x=\"-535\" y=\"177\"/><use xlink:href=\"#q\" x=\"-625\" y=\"243\"/><use xlink:href=\"#r\" x=\"-463\" y=\"132\"/><use xlink:href=\"#q\" x=\"-382\" y=\"250\"/><use xlink:href=\"#u\" x=\"-404\" y=\"323\"/><use xlink:href=\"#p\" x=\"228\" y=\"-228\"/><use xlink:href=\"#p\" x=\"515\" y=\"258\"/><use xlink:href=\"#u\" x=\"617\" y=\"265\"/><use xlink:href=\"#q\" x=\"545\" y=\"323\"/><use xlink:href=\"#q\" x=\"368\" y=\"477\"/><use xlink:href=\"#u\" x=\"367\" y=\"551\"/><use xlink:href=\"#u\" x=\"441\" y=\"419\"/><use xlink:href=\"#q\" x=\"500\" y=\"382\"/><use xlink:href=\"#u\" x=\"365\" y=\"405\"/><use xlink:href=\"#q\" x=\"-280\" y=\"30\"/><use xlink:href=\"#u\" x=\"200\" y=\"-37\"/><use xlink:href=\"#p\" y=\"330\"/><use xlink:href=\"#q\" x=\"85\" y=\"184\"/><use xlink:href=\"#q\" y=\"118\"/><use xlink:href=\"#u\" x=\"-74\" y=\"184\"/><use xlink:href=\"#r\" x=\"-37\" y=\"235\"/><use xlink:href=\"#q\" x=\"220\" y=\"495\"/><use xlink:href=\"#u\" x=\"283\" y=\"430\"/><use xlink:href=\"#u\" x=\"162\" y=\"412\"/><use xlink:href=\"#p\" x=\"-295\" y=\"390\"/><use xlink:href=\"#v\" y=\"575\"/>",
        "viewBox": "-735 -735 1470 1470",
        "targetSlotId": "globe_slot"
      },
      {
        "id": "black_eagle",
        "name": "黒いワシ",
        "ruby": "くろいわし",
        "icon": "🦅",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"30\" fill=\"#000000\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "white_star",
        "name": "白い星",
        "ruby": "しろいほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,15 60,40 88,40 65,58 74,85 50,68 26,85 35,58 12,40 40,40\" fill=\"#ffffff\" />",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "豊かな自然と、リオデジャネイロの美しい星空を組み合わせよう！",
    "trivia": "ブラジル国旗の青い円は、共和制が樹立された1889年11月15日のリオデジャネイロの星空（南十字星など27個の星）と、国の標語「ORDEM E PROGRESSO（秩序と進歩）」を表しています。"
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
        "layer": 1,
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
        "viewBox": "0 0 100 100",
        "targetSlotId": "cross_slot"
      },
      {
        "id": "yellow_lion",
        "name": "金のライオン",
        "ruby": "きんのらいおん",
        "icon": "🦁",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"35\" fill=\"#ffcc00\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "blue_stripes",
        "name": "青いしま",
        "ruby": "あおいしま",
        "icon": "〰️",
        "svgContent": "<rect x=\"10\" y=\"30\" width=\"80\" height=\"15\" fill=\"#0055a5\"/><rect x=\"10\" y=\"55\" width=\"80\" height=\"15\" fill=\"#0055a5\"/>",
        "viewBox": "0 0 100 100",
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
        "xPercent": 33.333,
        "yPercent": 50,
        "widthPercent": 33.333,
        "heightPercent": 50,
        "layer": 1,
        "requiredPartId": "turkey_crescent"
      },
      {
        "id": "star_slot",
        "name": "星",
        "xPercent": 53.927,
        "yPercent": 50,
        "widthPercent": 15.076,
        "heightPercent": 23.777,
        "layer": 2,
        "requiredPartId": "turkey_star"
      }
    ],
    "availableParts": [
      {
        "id": "turkey_crescent",
        "name": "白い三日月",
        "ruby": "しろいみかづき",
        "icon": "🌙",
        "svgContent": "<path fill=\"#ffffff\" d=\"M42675 8021a15000 15000 0 1 1 0-16042 12000 12000 0 1 0 0 16042z\"/>",
        "viewBox": "15000 -15000 30000 30000",
        "targetSlotId": "crescent_slot"
      },
      {
        "id": "turkey_star",
        "name": "白い五角星",
        "ruby": "しろいほし",
        "icon": "⭐",
        "svgContent": "<path fill=\"#ffffff\" d=\"m41750 0 13568-4408-8386 11541V-7133l8386 11541z\"/>",
        "viewBox": "41750 -7133 13568 14266",
        "targetSlotId": "star_slot"
      },
      {
        "id": "golden_sun",
        "name": "金色の太陽",
        "ruby": "きんのたいよう",
        "icon": "☀️",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"35\" fill=\"#ffcc00\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "blue_crown",
        "name": "青い冠",
        "ruby": "あおいかんむり",
        "icon": "👑",
        "svgContent": "<polygon points=\"20,70 80,70 85,35 65,55 50,30 35,55 15,35\" fill=\"#0055a5\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "夜空に浮かぶ2つのシンボルを組み合わせて、新月旗を完成させよう！",
    "trivia": "トルコ国旗は「新月旗（アイ・ユルドゥズ）」と呼ばれ、三日月と星の正確な位置や比率は法律で厳密に定められています。"
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
        "id": "trigram_slot",
        "name": "四隅",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 100,
        "heightPercent": 100,
        "layer": 1,
        "requiredPartId": "four_trigrams"
      },
      {
        "id": "taeguk_slot",
        "name": "中央",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 33.333,
        "heightPercent": 50,
        "layer": 2,
        "requiredPartId": "taeguk_mark"
      }
    ],
    "availableParts": [
      {
        "id": "taeguk_mark",
        "name": "赤と青の太極マーク",
        "ruby": "たいきょくまーく",
        "icon": "☯️",
        "svgContent": "<path fill=\"#cd2e3a\" d=\"M9.985 6.656A18 18 0 1 1-19.97-13.313a24 24 0 1 1 39.938 26.626\"/><path fill=\"#0047a0\" d=\"M0 0a12 12 0 1 1 19.97 13.313 24 24 0 1 1-39.94-26.626A12 12 0 1 0 0 0\"/>",
        "viewBox": "-24 -24 48 48",
        "targetSlotId": "taeguk_slot"
      },
      {
        "id": "four_trigrams",
        "name": "四隅の黒い三本線（卦）",
        "ruby": "よすみのけ",
        "icon": "☰",
        "svgContent": "<g stroke=\"#000\" stroke-width=\"4\"><path d=\"M-34.946-37.72-48.26-17.75m4.992 3.328 13.313-19.97m4.992 3.329-13.312 19.969m63.236 42.157 6.101-9.152m1.11-1.664 6.101-9.153m4.993 3.328-6.102 9.153m-1.11 1.664-6.101 9.152m4.992 3.329 6.102-9.153m1.11-1.664 6.1-9.153M-48.259 17.75l13.313 19.97m4.992-3.329-6.102-9.152m-1.109-1.664-6.102-9.153m4.993-3.328 13.312 19.97m63.236-42.158-6.101-9.153m-1.11-1.664-6.101-9.152m4.992-3.328 13.313 19.969m4.992-3.328-6.102-9.153m-1.11-1.664-6.1-9.153\"/></g>",
        "viewBox": "-72 -48 144 96",
        "targetSlotId": "trigram_slot"
      },
      {
        "id": "green_leaf",
        "name": "緑のオリーブの枝",
        "ruby": "おりーぶのえだ",
        "icon": "🌿",
        "svgContent": "<path d=\"M20 80 Q 50 30 80 20\" stroke=\"#2e7d32\" stroke-width=\"4\" fill=\"none\"/>",
        "viewBox": "0 0 100 100",
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
        "widthPercent": 20.833,
        "heightPercent": 33.333,
        "layer": 1,
        "requiredPartId": "sun_of_may"
      }
    ],
    "availableParts": [
      {
        "id": "sun_of_may",
        "name": "五月の太陽（顔のある太陽）",
        "ruby": "ごがつのたいよう",
        "icon": "🌞",
        "svgContent": "<g id=\"c\"><path id=\"a\" stroke-width=\"1.112\" stroke=\"#85340a\" fill=\"#f6b40e\" d=\"m396.84 251.31 28.454 61.992s.49 1.185 1.28.859c.79-.327.299-1.512.299-1.512l-23.715-63.956m-.68 24.12c-.347 9.428 5.452 14.613 4.694 23.032-.757 8.42 3.867 13.18 4.94 16.454 1.073 3.274-1.16 5.232-.198 5.698.963.466 3.07-2.12 2.383-6.775-.687-4.655-4.22-6.037-3.39-16.32.83-10.283-4.206-12.678-2.98-22.058\"/><use xlink:href=\"#a\" transform=\"rotate(22.5 400 250)\"/><use xlink:href=\"#a\" transform=\"rotate(45 400 250)\"/><use xlink:href=\"#a\" transform=\"rotate(67.5 400 250)\"/><path id=\"b\" fill=\"#85340a\" d=\"M404.31 274.41c.453 9.054 5.587 13.063 4.579 21.314 2.213-6.525-3.124-11.583-2.82-21.22m-7.649-23.757 19.487 42.577-16.329-43.887\"/><use xlink:href=\"#b\" transform=\"rotate(22.5 400 250)\"/><use xlink:href=\"#b\" transform=\"rotate(45 400 250)\"/><use xlink:href=\"#b\" transform=\"rotate(67.5 400 250)\"/></g><use xlink:href=\"#c\" transform=\"rotate(90 400 250)\"/><use xlink:href=\"#c\" transform=\"rotate(180 400 250)\"/><use xlink:href=\"#c\" transform=\"rotate(270 400 250)\"/><circle r=\"27.778\" stroke=\"#85340a\" cy=\"250\" cx=\"400\" stroke-width=\"1.5\" fill=\"#f6b40e\"/><path id=\"h\" fill=\"#843511\" d=\"M409.47 244.06c-1.897 0-3.713.822-4.781 2.531 2.136 1.923 6.856 2.132 10.062-.219a7.333 7.333 0 0 0-5.281-2.312zm-.031.438c1.846-.034 3.571.814 3.812 1.656-2.136 2.35-5.55 2.146-7.687.437.935-1.495 2.439-2.067 3.875-2.094z\"/><use xlink:href=\"#d\" transform=\"matrix(-1 0 0 1 800.25 0)\"/><use xlink:href=\"#e\" transform=\"matrix(-1 0 0 1 800.25 0)\"/><use xlink:href=\"#f\" transform=\"translate(18.862)\"/><use xlink:href=\"#g\" transform=\"matrix(-1 0 0 1 800.25 0)\"/><path d=\"M395.75 253.84c-.913.167-1.563.977-1.563 1.906 0 1.062.878 1.906 1.938 1.906a1.89 1.89 0 0 0 1.563-.812c.739.556 1.764.615 2.312.625.084.002.193 0 .25 0 .548-.01 1.573-.069 2.313-.625.36.516.935.812 1.562.812 1.06 0 1.938-.844 1.938-1.906 0-.929-.65-1.74-1.563-1.906.513.18.844.676.844 1.219a1.28 1.28 0 0 1-1.281 1.281c-.68 0-1.242-.54-1.282-1.219-.208.417-1.034 1.655-2.656 1.719-1.622-.064-2.447-1.302-2.656-1.719-.04.679-.6 1.219-1.281 1.219a1.28 1.28 0 0 1-1.281-1.281c0-.542.33-1.038.843-1.219zM397.84 259.53c-2.138 0-2.983 1.937-4.906 3.219 1.068-.427 1.91-1.27 3.406-2.125 1.496-.855 2.772.187 3.625.187h.031c.853 0 2.13-1.041 3.625-.187 1.497.856 2.369 1.698 3.438 2.125-1.924-1.282-2.8-3.219-4.938-3.219-.426 0-1.271.23-2.125.656h-.031c-.853-.426-1.698-.656-2.125-.656z\" fill=\"#85340a\"/><path d=\"M397.12 262.06c-.844.037-1.96.207-3.563.688 3.848-.855 4.697.437 6.407.437h.03c1.71 0 2.56-1.292 6.407-.438-4.274-1.282-5.124-.437-6.406-.437h-.031c-.802 0-1.437-.312-2.844-.25z\" fill=\"#85340a\"/><path d=\"M393.75 262.72c-.248.003-.519.005-.813.031 4.488.428 2.331 3 7.032 3h.03c4.702 0 2.575-2.572 7.063-3-4.7-.426-3.214 2.344-7.062 2.344h-.031c-3.608 0-2.496-2.421-6.22-2.375zM403.85 269.66a3.848 3.848 0 0 0-3.846-3.846 3.848 3.848 0 0 0-3.847 3.846 3.955 3.955 0 0 1 3.847-3.04 3.952 3.952 0 0 1 3.846 3.04z\" fill=\"#85340a\"/><path id=\"e\" fill=\"#85340a\" d=\"M382.73 244.02c4.915-4.273 11.11-4.915 14.53-1.709.837 1.121 1.373 2.32 1.593 3.57.43 2.433-.33 5.062-2.236 7.756.215-.001.643.212.856.427 1.697-3.244 2.297-6.577 1.74-9.746a13.815 13.815 0 0 0-.67-2.436c-4.7-3.845-11.11-4.272-15.81 2.138z\"/><path id=\"d\" fill=\"#85340a\" d=\"M390.42 242.74c2.777 0 3.419.642 4.7 1.71 1.284 1.068 1.924.854 2.137 1.068.213.215 0 .854-.426.64s-1.284-.64-2.564-1.708c-1.283-1.07-2.563-1.069-3.846-1.069-3.846 0-5.983 3.205-6.41 2.991-.426-.214 2.137-3.632 6.41-3.632z\"/><use xlink:href=\"#h\" transform=\"translate(-19.181)\"/><circle id=\"f\" cy=\"246.15\" cx=\"390.54\" r=\"1.923\" fill=\"#85340a\"/><path id=\"g\" fill=\"#85340a\" d=\"M385.29 247.44c3.633 2.778 7.265 2.564 9.402 1.282 2.136-1.282 2.136-1.709 1.71-1.709-.427 0-.853.427-2.564 1.281-1.71.856-4.273.856-8.546-.854z\"/>",
        "viewBox": "316.67 166.67 166.67 166.67",
        "targetSlotId": "sun_slot"
      },
      {
        "id": "silver_anchor",
        "name": "銀のいかり",
        "ruby": "ぎんのいかり",
        "icon": "⚓",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"25\" fill=\"#666666\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "white_star",
        "name": "白い星",
        "ruby": "しろいほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,15 60,40 88,40 65,58 74,85 50,68 26,85 35,58 12,40 40,40\" fill=\"#ffffff\" />",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "青と白の空の中央に、独立の希望を表す輝くシンボルを置こう！",
    "trivia": "アルゼンチン国旗の「五月の太陽」は、1810年5月の独立革命の日に雨雲を突き抜けて輝いた太陽の伝説に由来しています。"
  }
];
