export interface AssemblyPart {
  id: string;
  name: string;
  ruby: string;
  icon: string;
  svgContent?: string;
  viewBox?: string;
  preserveAspectRatio?: string;
  traySvgContent?: string;
  trayViewBox?: string;
  trayBgColor?: string;
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
  baseViewBox?: string;
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
        "widthPercent": 62.5,
        "heightPercent": 62.5,
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
        "svgContent": "<path fill=\"#ffffff\" d=\"M7,0 h6 v7 h7 v6 h-7 v7 h-6 v-7 h-7 v-6 h7 z\"/>",
        "viewBox": "0 0 20 20",
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
  },
  {
    "id": "ca",
    "countryCode": "ca",
    "countryName": "カナダ",
    "countryRuby": "かなだ",
    "aspectRatio": "2 / 1",
    "baseBgColor": "#ffffff",
    "baseElementsSvg": "<rect x=\"0\" y=\"0\" width=\"25\" height=\"100\" fill=\"#d80621\"/><rect x=\"75\" y=\"0\" width=\"25\" height=\"100\" fill=\"#d80621\"/>",
    "slots": [
      {
        "id": "maple_leaf_slot",
        "name": "中央",
        "xPercent": 50,
        "yPercent": 50.3,
        "widthPercent": 38.75,
        "heightPercent": 83.96,
        "layer": 1,
        "requiredPartId": "maple_leaf"
      }
    ],
    "availableParts": [
      {
        "id": "maple_leaf",
        "name": "サトウカエデ（メイプル）の葉",
        "ruby": "めいぷるのは",
        "icon": "🍁",
        "svgContent": "<path d=\"M 4890 4430 l -45 -863 a 95 95 0 0 1 111 -98 l 859 151 -116 -320 a 65 65 0 0 1 20 -73 l 941 -762 -212 -99 a 65 65 0 0 1 -34 -79 l 186 -572 -542 115 a 65 65 0 0 1 -73 -38 l -105 -247 -423 454 a 65 65 0 0 1 -111 -57 l 204 -1052 -327 189 a 65 65 0 0 1 -91 -27 l -332 -652 -332 652 a 65 65 0 0 1 -91 27 l -327 -189 204 1052 a 65 65 0 0 1 -111 57 l -423 -454 -105 247 a 65 65 0 0 1 -73 38 l -542 -115 186 572 a 65 65 0 0 1 -34 79 l -212 99 941 762 a 65 65 0 0 1 20 73 l -116 320 859 -151 a 95 95 0 0 1 111 98 l -45 863 z\" fill=\"#d80621\"/>",
        "viewBox": "2940 400 3720 4030",
        "targetSlotId": "maple_leaf_slot"
      },
      {
        "id": "green_leaf",
        "name": "緑のオークの葉",
        "ruby": "みどりのは",
        "icon": "🍃",
        "svgContent": "<path d=\"M 50 15 C 30 30 20 60 45 80 L 55 80 C 80 60 70 30 50 15 Z\" fill=\"#2e7d32\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "red_star",
        "name": "赤い星",
        "ruby": "あかいほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,10 62,38 92,38 68,56 77,85 50,67 23,85 32,56 8,38 38,38\" fill=\"#d80621\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "赤白赤の帯の中央に、カナダのシンボルである赤い葉っぱを置こう！",
    "trivia": "カナダの国旗の中央に描かれているのはサトウカエデ（メイプル）の葉。国中に美しく茂る自然と豊かな実りを表しています。"
  },
  {
    "id": "vn",
    "countryCode": "vn",
    "countryName": "ベトナム",
    "countryRuby": "べとなむ",
    "aspectRatio": "3 / 2",
    "baseBgColor": "#da251d",
    "slots": [
      {
        "id": "star_slot",
        "name": "中央",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 40,
        "heightPercent": 60,
        "layer": 1,
        "requiredPartId": "gold_star"
      }
    ],
    "availableParts": [
      {
        "id": "gold_star",
        "name": "金色の大きな星",
        "ruby": "きんのほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,10 62,38 92,38 68,56 77,85 50,67 23,85 32,56 8,38 38,38\" fill=\"#ffff00\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": "star_slot"
      },
      {
        "id": "white_star",
        "name": "白い星",
        "ruby": "しろいほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,10 62,38 92,38 68,56 77,85 50,67 23,85 32,56 8,38 38,38\" fill=\"#ffffff\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "yellow_crescent",
        "name": "黄色い三日月",
        "ruby": "きいろいみかづき",
        "icon": "🌙",
        "svgContent": "<path d=\"M50 15 A35 35 0 1 0 85 50 A28 28 0 1 1 50 15 Z\" fill=\"#ffff00\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "真っ赤な大地の中央に、希望と団結を表す金色の星を置こう！",
    "trivia": "ベトナムの国旗は「金星紅旗」と呼ばれ、中央の大きな星は労働者・農民・知識人などの国民の団結を表しています。"
  },
  {
    "id": "so",
    "countryCode": "so",
    "countryName": "ソマリア",
    "countryRuby": "そまりあ",
    "aspectRatio": "3 / 2",
    "baseBgColor": "#4189dd",
    "slots": [
      {
        "id": "star_slot",
        "name": "中央",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 40,
        "heightPercent": 60,
        "layer": 1,
        "requiredPartId": "white_star_so"
      }
    ],
    "availableParts": [
      {
        "id": "white_star_so",
        "name": "白い五角星",
        "ruby": "しろいほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,10 62,38 92,38 68,56 77,85 50,67 23,85 32,56 8,38 38,38\" fill=\"#ffffff\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": "star_slot"
      },
      {
        "id": "yellow_sun",
        "name": "黄色い太陽",
        "ruby": "きいろのたいよう",
        "icon": "☀️",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"35\" fill=\"#ffcc00\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "white_moon",
        "name": "白い三日月",
        "ruby": "しろいみかづき",
        "icon": "🌙",
        "svgContent": "<path d=\"M50 15 A35 35 0 1 0 85 50 A28 28 0 1 1 50 15 Z\" fill=\"#ffffff\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "澄みきった青空の中央に、自由と平和の白い星を掲げよう！",
    "trivia": "ソマリアの国旗の水色は澄んだ空とインド洋、中央の白い五角星はソマリ族の住む5つの地域と自由を表しています。"
  },
  {
    "id": "cn",
    "countryCode": "cn",
    "countryName": "中国",
    "countryRuby": "ちゅうごく",
    "aspectRatio": "3 / 2",
    "baseBgColor": "#de2910",
    "slots": [
      {
        "id": "big_star_slot",
        "name": "大きな星",
        "xPercent": 16.67,
        "yPercent": 25,
        "widthPercent": 20,
        "heightPercent": 30,
        "layer": 1,
        "requiredPartId": "big_star"
      },
      {
        "id": "small_stars_slot",
        "name": "4つの小さな星",
        "xPercent": 36.67,
        "yPercent": 27.5,
        "widthPercent": 13.33,
        "heightPercent": 45,
        "layer": 2,
        "requiredPartId": "small_stars"
      }
    ],
    "availableParts": [
      {
        "id": "big_star",
        "name": "大きな黄金の星",
        "ruby": "おおきなほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50.00,0.00 61.23,34.55 97.55,34.55 68.16,55.90 79.39,90.45 50.00,69.10 20.61,90.45 31.84,55.90 2.45,34.55 38.77,34.55\" fill=\"#ffde00\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": "big_star_slot"
      },
      {
        "id": "small_stars",
        "name": "4つの小さな星",
        "ruby": "よっつのほし",
        "icon": "✨",
        "svgContent": "<g fill=\"#ffde00\"><polygon points=\"274.28,75.43 288.59,58.99 277.37,40.30 297.43,48.83 311.74,32.39 309.83,54.10 329.88,62.63 308.64,67.52 306.73,89.24 295.52,70.55\"/><polygon points=\"330.30,124.24 349.87,114.64 346.79,93.07 361.96,108.71 381.53,99.11 371.34,118.38 386.52,134.02 365.05,130.29 354.86,149.56 351.78,127.98\"/><polygon points=\"331.15,201.76 352.94,200.98 358.92,180.02 366.40,200.49 388.18,199.71 371.02,213.15 378.49,233.62 360.41,221.45 343.25,234.89 349.24,213.93\"/><polygon points=\"276.57,251.26 296.97,258.95 310.58,241.93 309.57,263.70 329.97,271.39 308.95,277.16 307.94,298.93 295.96,280.72 274.94,286.49 288.55,269.47\"/></g>",
        "viewBox": "270 30 120 270",
        "trayViewBox": "250 20 160 280",
        "targetSlotId": "small_stars_slot"
      },
      {
        "id": "red_sun",
        "name": "赤い太陽",
        "ruby": "あかいたいよう",
        "icon": "🔴",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"#ffffff\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "white_star",
        "name": "白い星",
        "ruby": "しろいほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,10 62,38 92,38 68,56 77,85 50,67 23,85 32,56 8,38 38,38\" fill=\"#ffffff\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "赤旗の左上に、大きな主星とそれを取り囲む4つの星を配置しよう！",
    "trivia": "中国の「五星紅旗」は、大きな星が指導者を、4つの小さな星が国民の固い団結を表しています。"
  },
  {
    "id": "se",
    "countryCode": "se",
    "countryName": "スウェーデン",
    "countryRuby": "すうぇーでん",
    "aspectRatio": "8 / 5",
    "baseBgColor": "#006aa7",
    "slots": [
      {
        "id": "cross_v_slot",
        "name": "黄色の縦棒",
        "xPercent": 37.5,
        "yPercent": 50,
        "widthPercent": 12.5,
        "heightPercent": 100,
        "layer": 1,
        "requiredPartId": "yellow_cross_v"
      },
      {
        "id": "cross_h_slot",
        "name": "黄色の横棒",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 100,
        "heightPercent": 20,
        "layer": 2,
        "requiredPartId": "yellow_cross_h"
      }
    ],
    "availableParts": [
      {
        "id": "yellow_cross_v",
        "name": "黄色の縦棒",
        "ruby": "きいろのたてぼう",
        "icon": "▮",
        "svgContent": "<rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"#fecc00\"/>",
        "traySvgContent": "<rect x=\"30\" y=\"5\" width=\"40\" height=\"90\" rx=\"3\" fill=\"#fecc00\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": "cross_v_slot"
      },
      {
        "id": "yellow_cross_h",
        "name": "黄色の横棒",
        "ruby": "きいろのよこぼう",
        "icon": "▬",
        "svgContent": "<rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"#fecc00\"/>",
        "traySvgContent": "<rect x=\"5\" y=\"30\" width=\"90\" height=\"40\" rx=\"3\" fill=\"#fecc00\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": "cross_h_slot"
      },
      {
        "id": "white_cross_v",
        "name": "白い縦棒",
        "ruby": "しろのたてぼう",
        "icon": "▮",
        "svgContent": "<rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"#ffffff\"/>",
        "traySvgContent": "<rect x=\"30\" y=\"5\" width=\"40\" height=\"90\" rx=\"3\" fill=\"#ffffff\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "red_cross_h",
        "name": "赤い横棒",
        "ruby": "あかのよこぼう",
        "icon": "▬",
        "svgContent": "<rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"#ed2939\"/>",
        "traySvgContent": "<rect x=\"5\" y=\"30\" width=\"90\" height=\"40\" rx=\"3\" fill=\"#ed2939\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "青い海と空の上に、黄金のスカンジナビア十字を交差させて完成させよう！",
    "trivia": "スウェーデンの金十字旗はスカンジナビア十字と呼ばれ、十字架の位置が少し左に寄っているのが北欧国旗の伝統です。"
  },
  {
    "id": "fi",
    "countryCode": "fi",
    "countryName": "フィンランド",
    "countryRuby": "ふぃんらんど",
    "aspectRatio": "18 / 11",
    "baseBgColor": "#ffffff",
    "slots": [
      {
        "id": "cross_v_slot",
        "name": "青い縦棒",
        "xPercent": 36.11,
        "yPercent": 50,
        "widthPercent": 16.67,
        "heightPercent": 100,
        "layer": 1,
        "requiredPartId": "blue_cross_v"
      },
      {
        "id": "cross_h_slot",
        "name": "青い横棒",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 100,
        "heightPercent": 27.27,
        "layer": 2,
        "requiredPartId": "blue_cross_h"
      }
    ],
    "availableParts": [
      {
        "id": "blue_cross_v",
        "name": "青い縦棒",
        "ruby": "あおのたてぼう",
        "icon": "▮",
        "svgContent": "<rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"#002f6c\"/>",
        "traySvgContent": "<rect x=\"30\" y=\"5\" width=\"40\" height=\"90\" rx=\"3\" fill=\"#002f6c\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": "cross_v_slot"
      },
      {
        "id": "blue_cross_h",
        "name": "青い横棒",
        "ruby": "あおのよこぼう",
        "icon": "▬",
        "svgContent": "<rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"#002f6c\"/>",
        "traySvgContent": "<rect x=\"5\" y=\"30\" width=\"90\" height=\"40\" rx=\"3\" fill=\"#002f6c\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": "cross_h_slot"
      },
      {
        "id": "yellow_cross_v",
        "name": "黄色の縦棒",
        "ruby": "きいろのたてぼう",
        "icon": "▮",
        "svgContent": "<rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"#ffcc00\"/>",
        "traySvgContent": "<rect x=\"30\" y=\"5\" width=\"40\" height=\"90\" rx=\"3\" fill=\"#ffcc00\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "green_cross_h",
        "name": "緑の横棒",
        "ruby": "みどりのよこぼう",
        "icon": "▬",
        "svgContent": "<rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"#009246\"/>",
        "traySvgContent": "<rect x=\"5\" y=\"30\" width=\"90\" height=\"40\" rx=\"3\" fill=\"#009246\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "純白の雪原の上に、深い湖と空を表す青い十字架をクロスさせよう！",
    "trivia": "フィンランドの国旗は「青十字旗」。白は冬の純白の雪、青は国内に数万もある美しい湖や青空を象徴しています。"
  },
  {
    "id": "pw",
    "countryCode": "pw",
    "countryName": "パラオ",
    "countryRuby": "ぱらお",
    "aspectRatio": "8 / 5",
    "baseBgColor": "#0099cc",
    "slots": [
      {
        "id": "moon_slot",
        "name": "満月",
        "xPercent": 43.75,
        "yPercent": 50,
        "widthPercent": 37.5,
        "heightPercent": 60,
        "layer": 1,
        "requiredPartId": "yellow_moon"
      }
    ],
    "availableParts": [
      {
        "id": "yellow_moon",
        "name": "黄色い満月",
        "ruby": "きいろのまんげつ",
        "icon": "🌕",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"45\" fill=\"#ffce00\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": "moon_slot"
      },
      {
        "id": "red_sun",
        "name": "赤い太陽",
        "ruby": "あかいたいよう",
        "icon": "🔴",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"45\" fill=\"#bc002d\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "white_star",
        "name": "白い星",
        "ruby": "しろいほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,10 62,38 92,38 68,56 77,85 50,67 23,85 32,56 8,38 38,38\" fill=\"#ffffff\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "南太平洋の青い海の上に、少し左に寄せて黄色い満月を浮かべよう！",
    "trivia": "パラオの国旗は日本の日の丸と形が同じ兄弟旗！日本の太陽に対してパラオは「月」を表し、風になびいた時に中央に見えるよう少し左に置かれています。"
  },
  {
    "id": "bd",
    "countryCode": "bd",
    "countryName": "バングラデシュ",
    "countryRuby": "ばんぐらでしゅ",
    "aspectRatio": "5 / 3",
    "baseBgColor": "#006a4e",
    "slots": [
      {
        "id": "sun_slot",
        "name": "赤い太陽",
        "xPercent": 45,
        "yPercent": 50,
        "widthPercent": 40,
        "heightPercent": 66.67,
        "layer": 1,
        "requiredPartId": "red_sun_bd"
      }
    ],
    "availableParts": [
      {
        "id": "red_sun_bd",
        "name": "昇る赤い太陽",
        "ruby": "あかいたいよう",
        "icon": "🔴",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"45\" fill=\"#f42a41\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": "sun_slot"
      },
      {
        "id": "yellow_star",
        "name": "黄色い星",
        "ruby": "きいろいほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,10 62,38 92,38 68,56 77,85 50,67 23,85 32,56 8,38 38,38\" fill=\"#ffcc00\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "white_crescent",
        "name": "白い三日月",
        "ruby": "しろいみかづき",
        "icon": "🌙",
        "svgContent": "<path d=\"M50 15 A35 35 0 1 0 85 50 A28 28 0 1 1 50 15 Z\" fill=\"#ffffff\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "緑豊かな大地の上に、昇る情熱の赤い太陽を置こう！",
    "trivia": "バングラデシュの国旗も日本の日の丸に影響を受けたとされています。緑は豊かな自然、赤い丸は昇る太陽と独立の夜明けを表します。"
  },
  {
    "id": "gb",
    "countryCode": "gb",
    "countryName": "イギリス",
    "countryRuby": "いぎりす",
    "aspectRatio": "2 / 1",
    "baseBgColor": "#012169",
    "slots": [
      {
        "id": "saltires_slot",
        "name": "斜め十字",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 100,
        "heightPercent": 100,
        "layer": 1,
        "requiredPartId": "saltires"
      },
      {
        "id": "cross_slot",
        "name": "聖ジョージの十字架",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 100,
        "heightPercent": 100,
        "layer": 2,
        "requiredPartId": "george_cross"
      }
    ],
    "availableParts": [
      {
        "id": "saltires",
        "name": "白と赤の斜め十字",
        "ruby": "ななめじゅうじ",
        "icon": "✖",
        "svgContent": "<defs><clipPath id=\"uk_saltires_s\"><path d=\"M0,0 v30 h60 v-30 z\"/></clipPath><clipPath id=\"uk_saltires_t\"><path d=\"M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z\"/></clipPath></defs><g clip-path=\"url(#uk_saltires_s)\"><path d=\"M0,0 L60,30 M60,0 L0,30\" stroke=\"#ffffff\" stroke-width=\"6\"/><path d=\"M0,0 L60,30 M60,0 L0,30\" clip-path=\"url(#uk_saltires_t)\" stroke=\"#c8102e\" stroke-width=\"4\"/></g>",
        "viewBox": "0 0 60 30",
        "trayViewBox": "0 0 60 30",
        "targetSlotId": "saltires_slot"
      },
      {
        "id": "george_cross",
        "name": "聖ジョージの十字架",
        "ruby": "せいじょーじじゅうじ",
        "icon": "➕",
        "svgContent": "<defs><clipPath id=\"uk_cross_s\"><path d=\"M0,0 v30 h60 v-30 z\"/></clipPath></defs><g clip-path=\"url(#uk_cross_s)\"><path d=\"M30,0 v30 M0,15 h60\" stroke=\"#ffffff\" stroke-width=\"10\"/><path d=\"M30,0 v30 M0,15 h60\" stroke=\"#c8102e\" stroke-width=\"6\"/></g>",
        "viewBox": "0 0 60 30",
        "trayViewBox": "0 0 60 30",
        "targetSlotId": "cross_slot"
      },
      {
        "id": "yellow_crown",
        "name": "黄金の王冠",
        "ruby": "おうかん",
        "icon": "👑",
        "svgContent": "<path d=\"M20 70 L20 40 L40 55 L50 25 L60 55 L80 40 L80 70 Z\" fill=\"#ffcc00\" stroke=\"#e65100\" stroke-width=\"2\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "white_dove",
        "name": "白いハト",
        "ruby": "しろいはと",
        "icon": "🕊️",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"30\" fill=\"#ffffff\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "青い海の上に、まず斜め十字を重ね、最後に聖ジョージの赤十字をのせよう！",
    "trivia": "イギリスの「ユニオンジャック」は、イングランドの聖ジョージ十字、スコットランドの聖アンドリュー十字、アイルランドの聖パトリック十字が合体して生まれました！"
  },
  // 17. オーストラリア
  {
    "id": "au",
    "countryCode": "au",
    "countryName": "オーストラリア",
    "countryRuby": "おーすとらりあ",
    "aspectRatio": "2 / 1",
    "baseBgColor": "#012169",
    "baseViewBox": "0 0 10080 5040",
    "baseElementsSvg": "<defs><clipPath id=\"au_a\"><path d=\"M0 0h6v3H0z\"/></clipPath><clipPath id=\"au_b\"><path d=\"M0 0v1.5h6V3zm6 0H3v3H0z\"/></clipPath></defs><path fill=\"#012169\" d=\"M0 0h10080v5040H0z\"/><path d=\"m0 0 6 3m0-3L0 3\" stroke=\"#fff\" stroke-width=\".6\" clip-path=\"url(#au_a)\" transform=\"scale(840)\"/><path d=\"m0 0 6 3m0-3L0 3\" stroke=\"#e4002b\" stroke-width=\".4\" clip-path=\"url(#au_b)\" transform=\"scale(840)\"/><path d=\"M2520 0v2520M0 1260h5040\" stroke=\"#fff\" stroke-width=\"840\"/><path d=\"M2520 0v2520M0 1260h5040\" stroke=\"#e4002b\" stroke-width=\"504\"/>",
    "slots": [
      {
        "id": "cw_slot",
        "name": "連邦の七稜星",
        "xPercent": 25,
        "yPercent": 75,
        "widthPercent": 16,
        "heightPercent": 32,
        "layer": 1,
        "requiredPartId": "cw_star"
      },
      {
        "id": "sc_slot",
        "name": "南十字星（5つの星）",
        "xPercent": 74.3,
        "yPercent": 50,
        "widthPercent": 32,
        "heightPercent": 82,
        "layer": 1,
        "requiredPartId": "southern_cross"
      }
    ],
    "availableParts": [
      {
        "id": "cw_star",
        "name": "連邦の七稜星",
        "ruby": "ななりょうせい",
        "icon": "⭐",
        "svgContent": "<path fill=\"#ffffff\" d=\"m0-360 69.421 215.845 212.038-80.301L155.99-35.603l194.985 115.71-225.881 19.651 31.105 224.59L0 160l-156.198 164.349 31.105-224.59-225.881-19.651 194.986-115.711-125.471-188.853 212.038 80.301z\"/>",
        "viewBox": "-360 -360 720 720",
        "preserveAspectRatio": "xMidYMid meet",
        "targetSlotId": "cw_slot"
      },
      {
        "id": "southern_cross",
        "name": "南十字星（5つの星）",
        "ruby": "みなみじゅうじせい",
        "icon": "✨",
        "svgContent": "<defs><path id=\"au_c\" d=\"m0-360 69.421 215.845 212.038-80.301L155.99-35.603l194.985 115.71-225.881 19.651 31.105 224.59L0 160l-156.198 164.349 31.105-224.59-225.881-19.651 194.986-115.711-125.471-188.853 212.038 80.301z\"/><path id=\"au_d\" d=\"M0-210 54.86-75.508l144.862 10.614L88.765 28.842l34.67 141.052L0 93.334l-123.435 76.56 34.67-141.052-110.957-93.736L-54.86-75.508z\"/></defs><g fill=\"#fff\"><use xlink:href=\"#au_c\" x=\"7560\" y=\"4200\"/><use xlink:href=\"#au_c\" x=\"6300\" y=\"2205\"/><use xlink:href=\"#au_c\" x=\"7560\" y=\"840\"/><use xlink:href=\"#au_c\" x=\"8680\" y=\"1869\"/><use xlink:href=\"#au_d\" x=\"8064\" y=\"2730\"/></g>",
        "viewBox": "5940 480 3100 4080",
        "preserveAspectRatio": "xMidYMid meet",
        "targetSlotId": "sc_slot"
      },
      {
        "id": "yellow_crescent_au",
        "name": "黄色い三日月",
        "ruby": "みかづき",
        "icon": "🌙",
        "svgContent": "<path d=\"M50 15 A35 35 0 1 0 85 50 A28 28 0 1 1 50 15 Z\" fill=\"#ffcc00\" />",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "red_sc_fake_au",
        "name": "赤い南十字星",
        "ruby": "あかいみなみじゅうじせい",
        "icon": "✨",
        "svgContent": "<g fill=\"#c8102e\"><polygon points=\"50,15 53,24 62,24 55,29 58,38 50,33 42,38 45,29 38,24 47,24\"/><polygon points=\"50,65 53,74 62,74 55,79 58,88 50,83 42,88 45,79 38,74 47,74\"/><polygon points=\"25,45 27,52 35,52 29,56 31,63 25,59 19,63 21,56 15,52 23,52\"/><polygon points=\"75,38 77,45 85,45 79,49 81,56 75,52 69,56 71,49 65,45 73,45\"/></g>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "左下にオーストラリア連邦を表す大きな七稜星、右側に南十字星の星々を置こう！",
    "trivia": "オーストラリアの国旗には、イギリスとの絆を表すユニオンジャックと、南半球の夜空に輝く南十字星、7つの州と地域を表す七稜星が描かれています。"
  },
  // 18. ニュージーランド
  {
    "id": "nz",
    "countryCode": "nz",
    "countryName": "ニュージーランド",
    "countryRuby": "にゅーじーらんど",
    "aspectRatio": "2 / 1",
    "baseBgColor": "#012169",
    "baseViewBox": "0 0 1200 600",
    "baseElementsSvg": "<defs><clipPath id=\"nz_b\"><path d=\"M0 0h600v300H0z\"/></clipPath><clipPath id=\"nz_c\"><path d=\"m0 0 300 150H0zm300 0h300L300 150zm0 150h300v150zm0 0v150H0z\"/></clipPath></defs><path fill=\"#012169\" d=\"M0 0h1200v600H0z\"/><path stroke=\"#FFF\" d=\"m0 0 600 300M0 300 600 0\" stroke-width=\"60\" clip-path=\"url(#nz_b)\"/><path stroke=\"#C8102E\" d=\"m0 0 600 300M0 300 600 0\" stroke-width=\"40\" clip-path=\"url(#nz_c)\"/><path stroke=\"#FFF\" d=\"M300 0v300M0 150h600\" stroke-width=\"100\" clip-path=\"url(#nz_b)\"/><path stroke=\"#C8102E\" d=\"M300 0v300M0 150h600\" stroke-width=\"60\" clip-path=\"url(#nz_b)\"/>",
    "slots": [
      {
        "id": "nz_sc_slot",
        "name": "赤い南十字星（4つの星）",
        "xPercent": 74,
        "yPercent": 50,
        "widthPercent": 33,
        "heightPercent": 82,
        "layer": 1,
        "requiredPartId": "nz_stars"
      }
    ],
    "availableParts": [
      {
        "id": "nz_stars",
        "name": "白縁の赤い南十字星",
        "ruby": "あかいみなみじゅうじせい",
        "icon": "✨",
        "svgContent": "<defs><g id=\"nz_d\"><g id=\"nz_a\"><path d=\"M0 0v.5L1 0z\" transform=\"translate(0 -.325)\"/><path d=\"M0 0v-.5L1 0z\" transform=\"rotate(-36 .5 -.162)\"/></g><use xlink:href=\"#nz_a\" transform=\"scale(-1 1)\"/><use xlink:href=\"#nz_a\" transform=\"rotate(72 0 0)\"/><use xlink:href=\"#nz_a\" transform=\"rotate(-72 0 0)\"/><use xlink:href=\"#nz_a\" transform=\"scale(-1 1) rotate(72)\"/></g></defs><g><use xlink:href=\"#nz_d\" fill=\"#FFF\" transform=\"matrix(45.4 0 0 45.4 900 120)\"/><use xlink:href=\"#nz_d\" fill=\"#C8102E\" transform=\"matrix(30 0 0 30 900 120)\"/><g transform=\"rotate(82 900 240)\"><use xlink:href=\"#nz_d\" fill=\"#FFF\" transform=\"rotate(-82 519.022 -457.666) scale(40.4)\"/><use xlink:href=\"#nz_d\" fill=\"#C8102E\" transform=\"rotate(-82 519.022 -457.666) scale(25)\"/></g><g transform=\"rotate(82 900 240)\"><use xlink:href=\"#nz_d\" fill=\"#FFF\" transform=\"rotate(-82 668.57 -327.666) scale(45.4)\"/><use xlink:href=\"#nz_d\" fill=\"#C8102E\" transform=\"rotate(-82 668.57 -327.666) scale(30)\"/></g><use xlink:href=\"#nz_d\" fill=\"#FFF\" transform=\"matrix(50.4 0 0 50.4 900 480)\"/><use xlink:href=\"#nz_d\" fill=\"#C8102E\" transform=\"matrix(35 0 0 35 900 480)\"/></g>",
        "viewBox": "690 55 395 490",
        "preserveAspectRatio": "xMidYMid meet",
        "targetSlotId": "nz_sc_slot"
      },
      {
        "id": "white_sc_fake",
        "name": "白い南十字星",
        "ruby": "しろいみなみじゅうじせい",
        "icon": "⭐",
        "svgContent": "<g fill=\"#ffffff\"><polygon points=\"50,15 53,24 62,24 55,29 58,38 50,33 42,38 45,29 38,24 47,24\"/><polygon points=\"50,65 53,74 62,74 55,79 58,88 50,83 42,88 45,79 38,74 47,74\"/><polygon points=\"25,45 27,52 35,52 29,56 31,63 25,59 19,63 21,56 15,52 23,52\"/><polygon points=\"75,38 77,45 85,45 79,49 81,56 75,52 69,56 71,49 65,45 73,45\"/></g>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "seven_star_fake_nz",
        "name": "連邦の七稜星",
        "ruby": "ななりょうせい",
        "icon": "⭐",
        "svgContent": "<path fill=\"#ffffff\" d=\"m0-360 69.421 215.845 212.038-80.301L155.99-35.603l194.985 115.71-225.881 19.651 31.105 224.59L0 160l-156.198 164.349 31.105-224.59-225.881-19.651 194.986-115.711-125.471-188.853 212.038 80.301z\" transform=\"translate(50,50) scale(0.12)\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "gold_crown_nz",
        "name": "黄金の王冠",
        "ruby": "おうかん",
        "icon": "👑",
        "svgContent": "<path d=\"M20 70 L20 40 L40 55 L50 25 L60 55 L80 40 L80 70 Z\" fill=\"#ffcc00\" stroke=\"#e65100\" stroke-width=\"2\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "右側の夜空に、白い縁取りがある4つの赤い南十字星を配置しよう！",
    "trivia": "ニュージーランドの国旗の南十字星は赤い星に白い縁取りがあるのが特徴！オーストラリア（白の5つの星）との違いに注目です。"
  },
  // 19. インド
  {
    "id": "in",
    "countryCode": "in",
    "countryName": "インド",
    "countryRuby": "いんど",
    "aspectRatio": "3 / 2",
    "baseBgColor": "#ffffff",
    "baseViewBox": "-45 -30 90 60",
    "baseElementsSvg": "<path fill=\"#FFF\" d=\"M-45-30h90v60h-90z\"/><path fill=\"#FF6820\" d=\"M-45-30h90v20h-90z\"/><path fill=\"#046A38\" d=\"M-45 10h90v20h-90z\"/>",
    "slots": [
      {
        "id": "chakra_slot",
        "name": "アショカ・チャクラ",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 21,
        "heightPercent": 31,
        "layer": 1,
        "requiredPartId": "ashoka_chakra"
      }
    ],
    "availableParts": [
      {
        "id": "ashoka_chakra",
        "name": "アショカ・チャクラ（青い法輪）",
        "ruby": "あしょか・ちゃくら",
        "icon": "☸️",
        "svgContent": "<g fill=\"#07038D\"><circle r=\"9.25\"/><circle r=\"8\" fill=\"#FFF\"/><circle r=\"1.6\"/><g id=\"in_d\"><g id=\"in_c\"><g id=\"in_b\"><g id=\"in_a\"><path d=\"m0-8 .3 4.814L0-.802l-.3-2.384z\"/><circle cy=\"-8\" r=\".35\" transform=\"rotate(7.5)\"/></g><use xlink:href=\"#in_a\" transform=\"scale(-1)\"/></g><use xlink:href=\"#in_b\" transform=\"rotate(15)\"/></g><use xlink:href=\"#in_c\" transform=\"rotate(30)\"/></g><use xlink:href=\"#in_d\" transform=\"rotate(60)\"/><use xlink:href=\"#in_d\" transform=\"rotate(120)\"/></g>",
        "viewBox": "-9.5 -9.5 19 19",
        "preserveAspectRatio": "xMidYMid meet",
        "targetSlotId": "chakra_slot"
      },
      {
        "id": "blue_flower",
        "name": "青いハス",
        "ruby": "はす",
        "icon": "🪷",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"35\" fill=\"none\" stroke=\"#000080\" stroke-width=\"6\"/><circle cx=\"50\" cy=\"50\" r=\"15\" fill=\"#000080\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "blue_sun_in",
        "name": "青い太陽",
        "ruby": "あおいたいよう",
        "icon": "☀️",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"20\" fill=\"#07038d\"/><path d=\"M50 10 L50 25 M50 75 L50 90 M10 50 L25 50 M75 50 L90 50 M22 22 L32 32 M68 68 L78 78 M78 22 L68 32 M32 68 L22 78\" stroke=\"#07038d\" stroke-width=\"4\" stroke-linecap=\"round\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "gold_star_in",
        "name": "金色の星",
        "ruby": "きんのほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,15 61,38 85,38 66,54 73,78 50,62 27,78 34,54 15,38 39,38\" fill=\"#ff9933\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "白い帯の真ん中に、24本のスポークをもつ神聖な青い車輪を置こう！",
    "trivia": "インド国旗の中央の車輪「アショカ・チャクラ」は、古代アショカ王の石柱に刻まれた24本の法輪で、一日24時間と進歩・正義を表しています。"
  },
  // 20. フィリピン
  {
    "id": "ph",
    "countryCode": "ph",
    "countryName": "フィリピン",
    "countryRuby": "ふぃりぴん",
    "aspectRatio": "2 / 1",
    "baseBgColor": "#0038a8",
    "baseViewBox": "-28 -45 180 90",
    "baseElementsSvg": "<path fill=\"#0038a8\" d=\"M-28-45h180V0L0 44z\"/><path fill=\"#ce1126\" d=\"M0 0h152v45H-28z\"/><path fill=\"#fff\" d=\"M49.942 0-28 45v-90z\"/>",
    "slots": [
      {
        "id": "ph_symbols_slot",
        "name": "太陽と3つの星",
        "xPercent": 21.65,
        "yPercent": 50,
        "widthPercent": 43.3,
        "heightPercent": 100,
        "layer": 1,
        "requiredPartId": "ph_sun_stars"
      }
    ],
    "availableParts": [
      {
        "id": "ph_sun_stars",
        "name": "黄金の太陽と3つの星",
        "ruby": "たいようとほし",
        "icon": "☀️",
        "svgContent": "<g fill=\"#fcd116\"><circle r=\"9\"/><g id=\"ph_c\"><g id=\"ph_b\"><path id=\"ph_a\" d=\"m0 0-3.164-15.909.945-.946zl-1.169-17.831L0-19l1.169 1.169zl2.219-16.855.945.946z\"/><use transform=\"scale(-1)\" xlink:href=\"#ph_a\"/></g><use transform=\"rotate(90)\" xlink:href=\"#ph_b\"/></g><use transform=\"rotate(45)\" xlink:href=\"#ph_c\"/><path id=\"ph_d\" d=\"M40.942 0 37.56 1.176l-.073 3.579-2.163-2.853-3.427 1.037L33.942 0l-2.045-2.939 3.427 1.037 2.163-2.853.073 3.579z\"/><use transform=\"rotate(120 -2.019 0)\" xlink:href=\"#ph_d\"/><use transform=\"rotate(240 -2.019 0)\" xlink:href=\"#ph_d\"/></g>",
        "viewBox": "-28 -45 78 90",
        "preserveAspectRatio": "xMidYMid meet",
        "targetSlotId": "ph_symbols_slot"
      },
      {
        "id": "red_sun_ph",
        "name": "赤い太陽",
        "ruby": "あかいたいよう",
        "icon": "🔴",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"25\" fill=\"#ce1126\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "blue_crescent_ph",
        "name": "青い三日月と星",
        "ruby": "あおいみかづき",
        "icon": "🌙",
        "svgContent": "<path d=\"M45 15 A35 35 0 1 0 80 50 A28 28 0 1 1 45 15 Z\" fill=\"#0038a8\"/><polygon points=\"75,25 78,32 85,32 80,36 82,43 75,39 68,43 70,36 65,32 72,32\" fill=\"#0038a8\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "gold_star_single_ph",
        "name": "金色の星（1つ）",
        "ruby": "きんのほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,15 61,38 85,38 66,54 73,78 50,62 27,78 34,54 15,38 39,38\" fill=\"#fcd116\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "左の白い三角の中に、8本の光条を放つ黄金の太陽と3つの星を配置しよう！",
    "trivia": "フィリピンの太陽の8本の光は独立運動が起きた主要8州を、3つの星はルソン・ビサヤ・ミンダナオの3つの大島・地域を表しています。"
  },
  // 21. イスラエル
  {
    "id": "il",
    "countryCode": "il",
    "countryName": "イスラエル",
    "countryRuby": "いすらえる",
    "aspectRatio": "11 / 8",
    "baseBgColor": "#ffffff",
    "baseViewBox": "0 0 1100 800",
    "baseElementsSvg": "<path d=\"M0 0h1100v800H0Z\" fill=\"#fff\"/><path d=\"M0 75h1100v125H0ZM0 600h1100v125H0Z\" fill=\"#0038b8\"/>",
    "slots": [
      {
        "id": "star_slot",
        "name": "ダビデの星",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 25.5,
        "heightPercent": 40,
        "layer": 1,
        "requiredPartId": "star_of_david"
      }
    ],
    "availableParts": [
      {
        "id": "star_of_david",
        "name": "ダビデの星（青い六芒星）",
        "ruby": "だびでのほし",
        "icon": "✡️",
        "svgContent": "<path d=\"M423.816 472.853h252.368L550 254.295ZM550 545.705l126.184-218.558H423.816Z\" fill=\"none\" stroke=\"#0038b8\" stroke-width=\"27.5\" stroke-linejoin=\"round\"/>",
        "viewBox": "410 240 280 320",
        "preserveAspectRatio": "xMidYMid meet",
        "targetSlotId": "star_slot"
      },
      {
        "id": "blue_crescent",
        "name": "青い三日月",
        "ruby": "みかづき",
        "icon": "🌙",
        "svgContent": "<path d=\"M50 15 A35 35 0 1 0 85 50 A28 28 0 1 1 50 15 Z\" fill=\"#0038b8\" />",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "gold_menorah_il",
        "name": "黄金の燭台（メノーラー）",
        "ruby": "めのーらー",
        "icon": "🕎",
        "svgContent": "<path d=\"M50 20 L50 85 M35 30 C35 60 50 65 50 65 C50 65 65 60 65 30 M20 40 C20 75 50 80 50 80 C50 80 80 75 80 40 M30 85 L70 85\" stroke=\"#ffb700\" stroke-width=\"4\" fill=\"none\" stroke-linecap=\"round\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "blue_star_il",
        "name": "青い五角星",
        "ruby": "あおいほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,15 61,38 85,38 66,54 73,78 50,62 27,78 34,54 15,38 39,38\" fill=\"#0038b8\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "上下の青いしま模様の真ん中に、青い正三角形が交差した「ダビデの星」を置こう！",
    "trivia": "イスラエルの国旗は、ユダヤ教の礼拝用ショール（タリート）の青い縞と、古代ダビデ王の盾に由来する六芒星「ダビデの星」で構成されています。"
  },
  // 22. ウルグアイ
  {
    "id": "uy",
    "countryCode": "uy",
    "countryName": "ウルグアイ",
    "countryRuby": "うるぐあい",
    "aspectRatio": "3 / 2",
    "baseBgColor": "#ffffff",
    "baseViewBox": "-5 -5 945 630",
    "baseElementsSvg": "<path fill=\"#fff\" d=\"M-5-5h945v630H-5z\"/><path fill=\"#0038a8\" d=\"M345 65h595v70H345zm0 140h595v70H345zM-5 345h945v70H-5zm0 140h945v70H-5z\"/>",
    "slots": [
      {
        "id": "uy_sun_slot",
        "name": "5月の太陽（カントン部）",
        "xPercent": 18.52,
        "yPercent": 27.78,
        "widthPercent": 28.6,
        "heightPercent": 42.9,
        "layer": 1,
        "requiredPartId": "uy_sun"
      }
    ],
    "availableParts": [
      {
        "id": "uy_sun",
        "name": "5月の太陽（16条の光）",
        "ruby": "ごがつのたいよう",
        "icon": "🌞",
        "svgContent": "<defs><style>.uy_c{stroke-width:.6}.uy_d{stroke-linecap:square}.uy_e{stroke-width:.27}.uy_f{fill:#7b3f00}.uy_g{stroke-width:.61}.uy_h{fill:#fcd116}</style><path id=\"uy_A\" d=\"M1.5 9 .2 11.03l.1.02c-.99 6.45.12 10.63.93 13.88.41 1.63.75 3.03.69 4.37a5.66 5.66 0 0 1-.71 2.54C5.86 26.68-1.46 24.12 6 12z\" class=\"uy_d uy_e uy_f\"/><path id=\"uy_B\" fill=\"none\" d=\"M0 11c-2 13 4.5 17 0 22\"/><path id=\"uy_C\" d=\"M0 0h-6l6 33L6 0zv33\"/><path id=\"uy_D\" stroke=\"none\" d=\"M0 0h6zv33L6 0\" class=\"uy_f\"/></defs><g transform=\"translate(234.285 -392.52)scale(3.7795)\"><g stroke=\"#7b3f00\" stroke-miterlimit=\"20\"><g class=\"uy_h\"><path d=\"m-19.11 157.89 3.07 4.58c-12.6 9.12-4.91 14.51-13.83 17.42 5.55-5.42-.73-6.25 3.94-17.55\" class=\"uy_d uy_g\"/><g transform=\"matrix(.3898 .9411 -.9411 .3898 -17.009 148.833)\"><g class=\"uy_d\"><path d=\"M1.5 9 6 12c-8 13 1 15-6 21 3-7-3.01-5.58-3.01-17.58\" class=\"uy_c\"/><use xlink:href=\"#uy_A\" class=\"uy_e\"/></g><use xlink:href=\"#uy_B\" class=\"uy_c\"/></g><path d=\"m-17.01 148.83-4.32-4.32-19.45 28.09 28.09-19.45-4.32-4.32-23.77 23.77\" class=\"uy_g\"/><g transform=\"matrix(-.3898 .9412 -.941 -.3898 -17.009 148.833)\"><g class=\"uy_d\"><path d=\"M1.5 9 6 12c-8 13 1 15-6 21 3-7-3.03-5.45-3.03-17.45\" class=\"uy_c\"/><use xlink:href=\"#uy_A\" class=\"uy_e\"/></g><use xlink:href=\"#uy_B\" class=\"uy_c\"/></g><g class=\"uy_c\" transform=\"matrix(0 1.0187 -1.0186 0 -17.009 148.833)\"><use xlink:href=\"#uy_C\"/><use xlink:href=\"#uy_D\"/></g><g transform=\"matrix(-.9411 .3898 -.3898 -.9411 -17.009 148.833)\"><g class=\"uy_d\"><path d=\"M1.5 9 6 12c-8 13 1 15-6 21 3-7-3.02-6.24-3.02-18.24\" class=\"uy_c\"/><use xlink:href=\"#uy_A\" class=\"uy_e\"/></g><use xlink:href=\"#uy_B\" class=\"uy_c\"/></g><g class=\"uy_c\" transform=\"scale(-1.0187)rotate(-45 -168.018 -93.21)\"><use xlink:href=\"#uy_C\"/><use xlink:href=\"#uy_D\"/></g><g transform=\"rotate(-157.5 6.298 76.108)scale(1.0186)\"><g class=\"uy_d\"><path d=\"M1.5 9 6 12c-8 13 1 15-6 21 3-7-3.01-5.46-3.01-17.46\" class=\"uy_c\"/><use xlink:href=\"#uy_A\" class=\"uy_e\"/></g><use xlink:href=\"#uy_B\" class=\"uy_c\"/></g><g class=\"uy_c\" transform=\"rotate(180 -8.504 74.417)scale(1.0186)\"><use xlink:href=\"#uy_C\"/><use xlink:href=\"#uy_D\"/></g><g transform=\"rotate(-112.5 41.22 80.1)scale(1.0186)\"><g class=\"uy_d\"><path d=\"M1.5 9 6 12c-8 13 1 15-6 21 3-7-2.95-5.79-2.95-17.79\" class=\"uy_c\"/><use xlink:href=\"#uy_A\" class=\"uy_e\"/></g><use xlink:href=\"#uy_B\" class=\"uy_c\"/></g><g class=\"uy_c\" transform=\"rotate(-135 22.32 77.94)scale(1.0186)\"><use xlink:href=\"#uy_C\"/><use xlink:href=\"#uy_D\"/></g><g transform=\"matrix(.3898 -.941 .9412 .3898 -17.009 148.833)\"><g class=\"uy_d\"><path d=\"M1.5 9 6 12c-8 13 1 15-6 21 3-7-3.02-5.59-3.02-17.59\" class=\"uy_c\"/><use xlink:href=\"#uy_A\" class=\"uy_e\"/></g><use xlink:href=\"#uy_B\" class=\"uy_c\"/></g><g class=\"uy_c\" transform=\"matrix(0 -1.0186 1.0187 0 -17.009 148.833)\"><use xlink:href=\"#uy_C\"/><use xlink:href=\"#uy_D\"/></g><g transform=\"matrix(.9411 -.3898 .3898 .9411 -17.009 148.833)\"><g class=\"uy_d\"><path d=\"M1.5 9 6 12c-8 13 1 15-6 21 3-7-2.98-5.66-2.98-17.66\" class=\"uy_c\"/><use xlink:href=\"#uy_A\" class=\"uy_e\"/></g><use xlink:href=\"#uy_B\" class=\"uy_c\"/></g><g class=\"uy_c\" transform=\"scale(1.0187)rotate(-45 168.018 93.21)\"><use xlink:href=\"#uy_C\"/><use xlink:href=\"#uy_D\"/></g></g><path stroke-width=\".28\" d=\"m-19.1 157.89-2.02 1.4.09.05c-3.44 5.68-4.03 10.05-4.53 13.43-.25 1.69-.48 3.14-1.06 4.38a5.76 5.76 0 0 1-1.66 2.11c6.38-3.04.5-8.3 12.24-16.8z\" class=\"uy_f\"/><g class=\"uy_g\"><path fill=\"none\" d=\"M-21.3 159.19c-6.95 11.45-2.39 17.75-8.58 20.7\"/><path d=\"M-17.01 148.83h-6.11l6.11 33.62 6.11-33.62h-6.11v33.62\" class=\"uy_h\"/></g></g><g class=\"uy_f\"><path d=\"M-17.01 148.83h6.11zv33.62l6.11-33.62\"/><path d=\"m-17.01 148.83 4.32 4.32zl-23.77 23.77 28.09-19.45\"/></g><circle cx=\"-17.01\" cy=\"148.83\" r=\"11.21\" stroke=\"#7b3f00\" class=\"uy_g uy_h\"/><g class=\"uy_f\"><path d=\"M-8.76 144.35c-.71.81-1.12-.61-3.67-.61s-2.95 1.53-3.36 1.22 2.14-2.14 2.95-2.24a7.2 7.2 0 0 1 4.07 1.63m-2.95.92a1.2 1.2 0 0 1-.61 1.94c-.71 0-2.04-1.22-1.43-2.04\"/><path d=\"M-15.07 146.18c.1-1.22 1.12-1.43 2.75-1.43s2.34 1.22 2.95 1.53c-.71 0-1.32-1.02-2.95-1.02s-1.63 0-2.75 1.02m.31.2c.41-.61.92.61 2.04.61a3.7 3.7 0 0 0 2.44-.81c.71-.51-1.02 1.22-2.14 1.22s-2.65-.61-2.34-1.02m-7.95-1.32c-.51.2-1.32 1.22 0 1.94-1.02-.71-.2-1.73 0-1.94\"/><path d=\"M-11.3 145.17c.2.2 1.02 1.22 0 1.94 1.32-.71.51-1.73 0-1.94m-7.33 4.38c-.92.2-.61 1.53-1.43 1.63s-1.22 1.02-1.12.92c.51-.41 1.63-.71 2.44-.71s1.02.51 1.73.51.92-.51 1.73-.51 1.94.31 2.44.71c.1.1-.31-.81-1.12-.92s-.51-1.43-1.43-1.63c0 .41.31.31.41.92 0 .51-.92.51-1.12 0 .2.81-.41.81-.92.81s-1.12 0-.92-.81c-.2.51-1.12.51-1.12 0 .1-.61.41-.51.41-.92zm-3.16 3.46c-.81.61-1.02.92-1.12 1.63a7 7 0 0 1 .55-.85l-.14-.06.17.02z\"/><path d=\"m-22.34 153.75-.01.02c.13.03.26.04.4.04zm.39.06a11.4 11.4 0 0 1 1.59.41c.57-.04 1.36-.19 3.35-.19s2.78.14 3.35.19a11.4 11.4 0 0 1 1.59-.41c-1.12 0-2.62-.8-3.31-.8-.81 0-1.02.2-1.63.2s-.81-.2-1.63-.2c-.69 0-2.19.8-3.31.8m9.88 0c.14 0 .28-.01.4-.04l-.01-.02z\"/><path d=\"m-11.68 153.75.17-.02-.14.06a7 7 0 0 1 .55.85c-.1-.71-.31-1.02-1.12-1.63z\"/><path d=\"M-11.65 153.78c-1.07.4-1.44.47-2.01.43-.97.31-1.76.63-3.35.63s-2.38-.32-3.35-.63c-.57.04-.94-.03-2-.44 3.19 1.38 2.85 1.88 5.35 1.88s2.16-.5 5.36-1.87m-10.71-.01c-.04-.03-.1-.04-.15-.05zm10.71 0 .15-.05a.8.8 0 0 1-.16.04zM-25.263 144.35c.714.815 1.121-.612 3.669-.612s2.955 1.529 3.362 1.223-2.14-2.14-2.955-2.242-3.159.714-4.076 1.63m2.955.918c-.713.611-.102 1.936.612 1.936s2.038-1.223 1.426-2.038\"/><path d=\"M-18.945 146.184c-.102-1.223-1.12-1.427-2.751-1.427s-2.344 1.223-2.955 1.529c.713 0 1.324-1.02 2.955-1.02s1.63 0 2.751 1.02m-.306.204c-.407-.612-.917.611-2.038.611s-1.732-.306-2.445-.815 1.019 1.223 2.14 1.223 2.649-.612 2.343-1.02M-17.01 156.58c-.51 0-1.83.31 0 .31s.51-.31 0-.31\"/></g></g>",
        "viewBox": "35 35 270 270",
        "preserveAspectRatio": "xMidYMid meet",
        "targetSlotId": "uy_sun_slot"
      },
      {
        "id": "golden_star",
        "name": "金色の星",
        "ruby": "きんのほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,15 61,38 85,38 66,54 73,78 50,62 27,78 34,54 15,38 39,38\" fill=\"#fcd116\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "uy_anchor",
        "name": "銀のいかり",
        "ruby": "ぎんのいかり",
        "icon": "⚓",
        "svgContent": "<circle cx=\"50\" cy=\"25\" r=\"8\" fill=\"none\" stroke=\"#4a5568\" stroke-width=\"4\"/><path d=\"M50 33 L50 85 M30 65 C30 85 70 85 70 65 M20 65 L40 65 M60 65 L80 65 M35 48 L65 48\" stroke=\"#4a5568\" stroke-width=\"4\" fill=\"none\" stroke-linecap=\"round\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "uy_bird",
        "name": "青いコンドル",
        "ruby": "こんどる",
        "icon": "🦅",
        "svgContent": "<path d=\"M50 20 Q30 50 15 45 Q35 70 50 65 Q65 70 85 45 Q70 50 50 20 Z\" fill=\"#0038a8\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "左上の白い四角の中に、顔と16条の光線をもつ黄金の「5月の太陽」を置こう！",
    "trivia": "ウルグアイの「5月の太陽」は16本の光線を持ち、1810年の5月革命を記念しています。9本の白青の縞模様は当時の9つの県を表します。"
  },
  // 23. チュニジア
  {
    "id": "tn",
    "countryCode": "tn",
    "countryName": "チュニジア",
    "countryRuby": "ちゅにじあ",
    "aspectRatio": "3 / 2",
    "baseBgColor": "#e70013",
    "baseViewBox": "-60 -40 120 80",
    "baseElementsSvg": "<path fill=\"#e70013\" d=\"M-60-40H60v80H-60z\"/>",
    "slots": [
      {
        "id": "tn_crescent_slot",
        "name": "白い円と赤い三日月・星",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 33.33,
        "heightPercent": 50,
        "layer": 1,
        "requiredPartId": "tn_crescent"
      }
    ],
    "availableParts": [
      {
        "id": "tn_crescent",
        "name": "白い円と赤い三日月・星",
        "ruby": "みかづきとほし",
        "icon": "🌙",
        "svgContent": "<circle fill=\"#fff\" r=\"20\"/><circle fill=\"#e70013\" r=\"15\"/><circle fill=\"#fff\" cx=\"4\" r=\"12\"/><path fill=\"#e70013\" d=\"m-5 0 16.281-5.29L1.22 8.56V-8.56L11.28 5.29z\"/>",
        "viewBox": "-20 -20 40 40",
        "preserveAspectRatio": "xMidYMid meet",
        "trayBgColor": "#e70013",
        "targetSlotId": "tn_crescent_slot"
      },
      {
        "id": "red_sun_tn",
        "name": "白い円と赤い太陽",
        "ruby": "あかいたいよう",
        "icon": "🔴",
        "svgContent": "<circle fill=\"#fff\" r=\"20\"/><circle fill=\"#e70013\" r=\"12\"/>",
        "viewBox": "-20 -20 40 40",
        "trayBgColor": "#e70013",
        "targetSlotId": ""
      },
      {
        "id": "green_crescent_tn",
        "name": "白い円と緑の三日月・星",
        "ruby": "みどりのみかづき",
        "icon": "🌙",
        "svgContent": "<circle fill=\"#fff\" r=\"20\"/><circle fill=\"#006233\" r=\"15\"/><circle fill=\"#fff\" cx=\"4\" r=\"12\"/><path fill=\"#006233\" d=\"m-5 0 16.281-5.29L1.22 8.56V-8.56L11.28 5.29z\"/>",
        "viewBox": "-20 -20 40 40",
        "preserveAspectRatio": "xMidYMid meet",
        "trayBgColor": "#e70013",
        "targetSlotId": ""
      },
      {
        "id": "gold_star_tn",
        "name": "白い円と黄金の星",
        "ruby": "きんのほし",
        "icon": "⭐",
        "svgContent": "<circle fill=\"#fff\" r=\"20\"/><polygon points=\"0,-14 4,-4 14,-4 6,2 9,12 0,6 -9,12 -6,2 -14,-4 -4,-4\" fill=\"#ffb700\"/>",
        "viewBox": "-20 -20 40 40",
        "trayBgColor": "#e70013",
        "targetSlotId": ""
      }
    ],
    "hint": "中央に、平和を表す白い円盤とオスマン伝統の赤い三日月・星を配置しよう！",
    "trivia": "チュニジアの国旗は1830年頃に制定された歴史あるデザイン。白い丸は太陽、赤い三日月と星はイスラムの象徴と幸運を表しています。"
  },
  // 24. パキスタン
  {
    "id": "pk",
    "countryCode": "pk",
    "countryName": "パキスタン",
    "countryRuby": "ぱきすたん",
    "aspectRatio": "3 / 2",
    "baseBgColor": "#01411c",
    "baseViewBox": "-75 -40 120 80",
    "baseElementsSvg": "<path fill=\"#fff\" d=\"M-75-40H45v80H-75z\"/><path fill=\"#01411C\" d=\"M-45-40h90v80h-90z\"/>",
    "slots": [
      {
        "id": "pk_crescent_slot",
        "name": "傾いた白い三日月と星",
        "xPercent": 62.5,
        "yPercent": 50,
        "widthPercent": 40,
        "heightPercent": 60,
        "layer": 1,
        "requiredPartId": "pk_crescent"
      }
    ],
    "availableParts": [
      {
        "id": "pk_crescent",
        "name": "傾いた白い三日月と星",
        "ruby": "かたむいたみかづきとほし",
        "icon": "🌙",
        "svgContent": "<g><circle r=\"24\" fill=\"#fff\"/><circle r=\"22\" cx=\"-7\" cy=\"-40\" fill=\"#01411C\" transform=\"rotate(-41.634 45 -40)\"/><path fill=\"#fff\" d=\"m8.751-17.959 10.11 11.373L3.997-9.844l13.94-6.1-7.692 13.129z\"/></g>",
        "viewBox": "-24 -24 48 48",
        "preserveAspectRatio": "xMidYMid meet",
        "targetSlotId": "pk_crescent_slot"
      },
      {
        "id": "yellow_crescent_pk",
        "name": "黄色い三日月",
        "ruby": "きいろいみかづき",
        "icon": "🌙",
        "svgContent": "<g transform=\"translate(50,50) rotate(-40)\" fill=\"#fcd116\"><path d=\"M0,-32 A32 32 0 1 0 0,32 A26 26 0 1 1 0,-32 Z\"/></g>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "white_star_pk",
        "name": "まっすぐな白い星",
        "ruby": "しろいほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,15 61,38 85,38 66,54 73,78 50,62 27,78 34,54 15,38 39,38\" fill=\"#ffffff\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "white_dove_pk",
        "name": "平和のハト",
        "ruby": "はと",
        "icon": "🕊️",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"30\" fill=\"#ffffff\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "濃い緑色のエリアの真ん中に、右上に向かって輝く白い三日月と星を置こう！",
    "trivia": "パキスタンの緑はイスラム教徒、白は他宗教の人々を表し、三日月は国家の進歩、星は知識と光明を象徴しています。"
  },
  // 25. モロッコ
  {
    "id": "ma",
    "countryCode": "ma",
    "countryName": "モロッコ",
    "countryRuby": "もろっこ",
    "aspectRatio": "3 / 2",
    "baseBgColor": "#c1272d",
    "baseViewBox": "0 0 90000 60000",
    "baseElementsSvg": "<path fill=\"#c1272d\" d=\"M0 0h90000v60000H0z\"/>",
    "slots": [
      {
        "id": "ma_star_slot",
        "name": "ソロモンの印（緑の五芒星）",
        "xPercent": 50,
        "yPercent": 50,
        "widthPercent": 45.1,
        "heightPercent": 40.8,
        "layer": 1,
        "requiredPartId": "ma_star"
      }
    ],
    "availableParts": [
      {
        "id": "ma_star",
        "name": "ソロモンの印（緑の細線五芒星）",
        "ruby": "そろもんのしるし",
        "icon": "✡️",
        "svgContent": "<path fill=\"none\" stroke=\"#006233\" stroke-width=\"1426\" stroke-linejoin=\"round\" d=\"m45000 17308 7460 22960-19531-14190h24142L37540 40268z\"/>",
        "viewBox": "24500 16500 41000 25000",
        "preserveAspectRatio": "xMidYMid meet",
        "targetSlotId": "ma_star_slot"
      },
      {
        "id": "green_solid_star",
        "name": "塗りつぶされた緑の星",
        "ruby": "みどりのほし",
        "icon": "⭐",
        "svgContent": "<polygon points=\"50,15 61,38 85,38 66,54 73,78 50,62 27,78 34,54 15,38 39,38\" fill=\"#006233\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "green_crescent_ma",
        "name": "緑の三日月",
        "ruby": "みどりのみかづき",
        "icon": "🌙",
        "svgContent": "<path d=\"M50 15 A35 35 0 1 0 85 50 A28 28 0 1 1 50 15 Z\" fill=\"#006233\" />",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      },
      {
        "id": "gold_crown_ma",
        "name": "王家の冠",
        "ruby": "おうかん",
        "icon": "👑",
        "svgContent": "<path d=\"M20 70 L20 40 L40 55 L50 25 L60 55 L80 40 L80 70 Z\" fill=\"#ffcc00\" stroke=\"#006233\" stroke-width=\"2\"/>",
        "viewBox": "0 0 100 100",
        "targetSlotId": ""
      }
    ],
    "hint": "真っ赤な大地の中央に、緑の細い線で一筆書きされた「ソロモンの印（五芒星）」を置こう！",
    "trivia": "モロッコの赤い地色は預言者ムハンマドの子孫である王家を、緑の一筆書きの五芒星は知恵・平和・健康を象徴するソロモンの印です。"
  },
  // 26. シンガポール
  {
    "id": "sg",
    "countryCode": "sg",
    "countryName": "シンガポール",
    "countryRuby": "しんがぽーる",
    "aspectRatio": "3 / 2",
    "baseBgColor": "#ffffff",
    "baseViewBox": "0 0 54 36",
    "baseElementsSvg": "<path d=\"M0 0h54v36H0z\" fill=\"#fff\"/><path d=\"M0 0h54v18H0z\" fill=\"#ed2939\"/>",
    "slots": [
      {
        "id": "sg_crescent_slot",
        "name": "三日月と5つの星",
        "xPercent": 23.4,
        "yPercent": 25,
        "widthPercent": 29.1,
        "heightPercent": 36.8,
        "layer": 1,
        "requiredPartId": "sg_crescent"
      }
    ],
    "availableParts": [
      {
        "id": "sg_crescent",
        "name": "白い三日月と5つの星",
        "ruby": "みかづきといつつのほし",
        "icon": "🌙",
        "svgContent": "<defs><path id=\"sg_a\" d=\"m15.03 3.475-1.014 3.12 2.655-1.928h-3.282l2.655 1.929z\"/><g id=\"sg_b\"><use xlink:href=\"#sg_a\" transform=\"rotate(72 15.03 9)\"/><use xlink:href=\"#sg_a\" transform=\"rotate(216 15.03 9)\"/></g></defs><g fill=\"#fff\"><circle cx=\"11.405\" cy=\"9\" r=\"6.625\"/><circle cx=\"14.405\" cy=\"9\" r=\"6.625\" fill=\"#ed2939\"/><use xlink:href=\"#sg_a\"/><use xlink:href=\"#sg_b\" transform=\"rotate(72 15.03 9)\"/><use xlink:href=\"#sg_b\"/></g>",
        "viewBox": "4.78 2.375 15.72 13.25",
        "preserveAspectRatio": "xMidYMid meet",
        "trayBgColor": "#ed2939",
        "targetSlotId": "sg_crescent_slot"
      },
      {
        "id": "white_sun_sg",
        "name": "白い太陽",
        "ruby": "しろいたいよう",
        "icon": "⚪",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"30\" fill=\"#ffffff\"/>",
        "viewBox": "0 0 100 100",
        "trayBgColor": "#ed2939",
        "targetSlotId": ""
      },
      {
        "id": "gold_crescent_star_sg",
        "name": "黄色い三日月と星",
        "ruby": "きいろいみかづきとほし",
        "icon": "⭐",
        "svgContent": "<path d=\"M45 20 A30 30 0 1 0 75 50 A24 24 0 1 1 45 20 Z\" fill=\"#ffcc00\"/><polygon points=\"70,35 73,42 80,42 75,46 77,53 70,49 63,53 65,46 60,42 67,42\" fill=\"#ffcc00\"/>",
        "viewBox": "0 0 100 100",
        "trayBgColor": "#ed2939",
        "targetSlotId": ""
      },
      {
        "id": "white_lion_sg",
        "name": "白いライオン",
        "ruby": "らいおん",
        "icon": "🦁",
        "svgContent": "<circle cx=\"50\" cy=\"50\" r=\"28\" fill=\"#ffffff\"/><circle cx=\"40\" cy=\"45\" r=\"4\" fill=\"#ed2939\"/><circle cx=\"60\" cy=\"45\" r=\"4\" fill=\"#ed2939\"/><circle cx=\"50\" cy=\"58\" r=\"5\" fill=\"#ed2939\"/>",
        "viewBox": "0 0 100 100",
        "trayBgColor": "#ed2939",
        "targetSlotId": ""
      }
    ],
    "hint": "赤い帯の左上に、若い国を表す白い三日月と円形に並ぶ5つの星を置こう！",
    "trivia": "シンガポールの三日月は「若く台頭する国家」を、5つの星は民主・平和・進歩・正義・平等の5つの理想を表しています。"
  }
];
