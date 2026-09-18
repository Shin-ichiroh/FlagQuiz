export interface CountryFact {
  area: number; // km2
  population: number; // 人口
  greeting: string; // あいさつ
  greetingLang: string; // 言語名
}

export const COUNTRY_FACTS: Record<string, CountryFact> = {
  "jp": {
    "area": 377975,
    "population": 125000000,
    "greeting": "こんにちは",
    "greetingLang": "日本語"
  },
  "kr": {
    "area": 100210,
    "population": 51740000,
    "greeting": "アニョハセヨ",
    "greetingLang": "韓国語"
  },
  "cn": {
    "area": 9600000,
    "population": 1412000000,
    "greeting": "ニーハオ (你好)",
    "greetingLang": "中国語"
  },
  "tw": {
    "area": 36197,
    "population": 23570000,
    "greeting": "ニーハオ",
    "greetingLang": "台湾華語"
  },
  "in": {
    "area": 3287263,
    "population": 1428000000,
    "greeting": "ナマステ (Namaste)",
    "greetingLang": "ヒンディー語"
  },
  "id": {
    "area": 1904569,
    "population": 275000000,
    "greeting": "スラマッ・シアン",
    "greetingLang": "インドネシア語"
  },
  "th": {
    "area": 513120,
    "population": 71800000,
    "greeting": "サワディー",
    "greetingLang": "タイ語"
  },
  "vn": {
    "area": 331212,
    "population": 98190000,
    "greeting": "シンチャオ",
    "greetingLang": "ベトナム語"
  },
  "ph": {
    "area": 300000,
    "population": 115600000,
    "greeting": "マガンダン・アラウ",
    "greetingLang": "タガログ語"
  },
  "my": {
    "area": 330803,
    "population": 33940000,
    "greeting": "スラマッ・パギ",
    "greetingLang": "マレー語"
  },
  "sg": {
    "area": 728,
    "population": 5640000,
    "greeting": "ハロー / ニーハオ",
    "greetingLang": "英語・中国語"
  },
  "sa": {
    "area": 2149690,
    "population": 36410000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "tr": {
    "area": 783562,
    "population": 85280000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "np": {
    "area": 147181,
    "population": 30550000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "lk": {
    "area": 65610,
    "population": 22180000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "bd": {
    "area": 147570,
    "population": 171200000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "il": {
    "area": 22072,
    "population": 9560000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "kz": {
    "area": 2724900,
    "population": 19620000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "kh": {
    "area": 181035,
    "population": 16770000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "bt": {
    "area": 38394,
    "population": 780000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "lb": {
    "area": 10452,
    "population": 1045200,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "mn": {
    "area": 1564116,
    "population": 3400000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "mv": {
    "area": 300,
    "population": 520000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "kp": {
    "area": 120538,
    "population": 26000000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "la": {
    "area": 236800,
    "population": 7530000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "om": {
    "area": 309500,
    "population": 4580000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "af": {
    "area": 652864,
    "population": 41130000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "am": {
    "area": 29743,
    "population": 2780000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "az": {
    "area": 86600,
    "population": 10140000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "bh": {
    "area": 778,
    "population": 1470000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "bn": {
    "area": 5765,
    "population": 449000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "cy": {
    "area": 9251,
    "population": 1250000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "ge": {
    "area": 69700,
    "population": 3710000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "ir": {
    "area": 1648195,
    "population": 88550000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "iq": {
    "area": 438317,
    "population": 44500000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "jo": {
    "area": 89342,
    "population": 11290000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "kw": {
    "area": 17818,
    "population": 4270000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "kg": {
    "area": 10000,
    "population": 6960000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "mm": {
    "area": 676578,
    "population": 54180000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "pk": {
    "area": 881912,
    "population": 235800000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "ps": {
    "area": 6020,
    "population": 602000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "qa": {
    "area": 11586,
    "population": 2690000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "sy": {
    "area": 185180,
    "population": 22130000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "tj": {
    "area": 143100,
    "population": 9950000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "tl": {
    "area": 14874,
    "population": 1340000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "tm": {
    "area": 488100,
    "population": 6430000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "ae": {
    "area": 83600,
    "population": 9440000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "uz": {
    "area": 447400,
    "population": 35650000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "ye": {
    "area": 527968,
    "population": 33700000,
    "greeting": "サラーム / ニーハオ",
    "greetingLang": "アジア諸語"
  },
  "gb": {
    "area": 242495,
    "population": 67330000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "fr": {
    "area": 643801,
    "population": 67750000,
    "greeting": "Bonjour (ボンジュール)",
    "greetingLang": "フランス語"
  },
  "de": {
    "area": 357022,
    "population": 84400000,
    "greeting": "Guten Tag (グーテン・ターク)",
    "greetingLang": "ドイツ語"
  },
  "it": {
    "area": 301340,
    "population": 59000000,
    "greeting": "Ciao (チャオ)",
    "greetingLang": "イタリア語"
  },
  "es": {
    "area": 505990,
    "population": 47620000,
    "greeting": "¡Hola! (オラ)",
    "greetingLang": "スペイン語"
  },
  "pt": {
    "area": 92212,
    "population": 10410000,
    "greeting": "Olá (オラ)",
    "greetingLang": "ポルトガル語"
  },
  "nl": {
    "area": 41543,
    "population": 17700000,
    "greeting": "Hallo (ハロー)",
    "greetingLang": "オランダ語"
  },
  "be": {
    "area": 30528,
    "population": 11690000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "ch": {
    "area": 41285,
    "population": 8770000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "at": {
    "area": 83871,
    "population": 9040000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "se": {
    "area": 450295,
    "population": 10490000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "no": {
    "area": 385207,
    "population": 5460000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "fi": {
    "area": 338424,
    "population": 5540000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "dk": {
    "area": 43094,
    "population": 4309400,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "is": {
    "area": 103000,
    "population": 388000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "ie": {
    "area": 70273,
    "population": 5130000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "gr": {
    "area": 131957,
    "population": 10430000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "pl": {
    "area": 312696,
    "population": 37750000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "cz": {
    "area": 78867,
    "population": 10490000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "hu": {
    "area": 93028,
    "population": 9680000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "ro": {
    "area": 238391,
    "population": 19050000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "hr": {
    "area": 56594,
    "population": 3860000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "ua": {
    "area": 603550,
    "population": 60355000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "ru": {
    "area": 17098242,
    "population": 144200000,
    "greeting": "ズドラーストヴィチェ",
    "greetingLang": "ロシア語"
  },
  "va": {
    "area": 0.5,
    "population": 800,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "mc": {
    "area": 2,
    "population": 39000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "al": {
    "area": 28748,
    "population": 2780000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "ba": {
    "area": 51209,
    "population": 3230000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "mk": {
    "area": 25713,
    "population": 1830000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "mt": {
    "area": 316,
    "population": 533000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "ad": {
    "area": 468,
    "population": 80000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "by": {
    "area": 207600,
    "population": 9200000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "bg": {
    "area": 110879,
    "population": 6450000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "ee": {
    "area": 45228,
    "population": 1350000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "lv": {
    "area": 64589,
    "population": 1880000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "lt": {
    "area": 65300,
    "population": 2830000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "li": {
    "area": 160,
    "population": 39000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "lu": {
    "area": 2586,
    "population": 650000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "md": {
    "area": 33846,
    "population": 2540000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "me": {
    "area": 13812,
    "population": 620000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "sm": {
    "area": 61,
    "population": 34000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "rs": {
    "area": 88361,
    "population": 6660000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "sk": {
    "area": 49035,
    "population": 5430000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "si": {
    "area": 20273,
    "population": 2110000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "xk": {
    "area": 10887,
    "population": 1800000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "ヨーロッパ諸語"
  },
  "eg": {
    "area": 1002450,
    "population": 109000000,
    "greeting": "マルハバン",
    "greetingLang": "アラビア語"
  },
  "za": {
    "area": 1221037,
    "population": 60600000,
    "greeting": "サワボナ / ハロー",
    "greetingLang": "ズールー語・英語"
  },
  "ke": {
    "area": 580367,
    "population": 54030000,
    "greeting": "ジャンボ (Jambo)",
    "greetingLang": "スワヒリ語"
  },
  "gh": {
    "area": 238533,
    "population": 33480000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "et": {
    "area": 1104300,
    "population": 123400000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "ma": {
    "area": 446550,
    "population": 37460000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "mz": {
    "area": 801590,
    "population": 32980000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "ug": {
    "area": 241038,
    "population": 47250000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "sc": {
    "area": 459,
    "population": 100000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "ss": {
    "area": 10000,
    "population": 10910000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "rw": {
    "area": 26338,
    "population": 13780000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "tz": {
    "area": 947303,
    "population": 65500000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "ng": {
    "area": 923768,
    "population": 218500000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "ao": {
    "area": 1246700,
    "population": 35590000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "er": {
    "area": 117600,
    "population": 3680000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "dz": {
    "area": 2381741,
    "population": 44900000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "bj": {
    "area": 112622,
    "population": 13350000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "bw": {
    "area": 581730,
    "population": 2630000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "bf": {
    "area": 274200,
    "population": 22670000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "bi": {
    "area": 27830,
    "population": 12890000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "cv": {
    "area": 4033,
    "population": 590000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "cm": {
    "area": 475442,
    "population": 27910000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "cf": {
    "area": 622984,
    "population": 5580000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "td": {
    "area": 1284000,
    "population": 17720000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "km": {
    "area": 2235,
    "population": 836000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "cg": {
    "area": 342000,
    "population": 34200000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "cd": {
    "area": 2344858,
    "population": 99010000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "ci": {
    "area": 322463,
    "population": 28160000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "dj": {
    "area": 23200,
    "population": 1120000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "gq": {
    "area": 28051,
    "population": 1670000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "sz": {
    "area": 17364,
    "population": 1200000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "ga": {
    "area": 267667,
    "population": 2380000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "gm": {
    "area": 11295,
    "population": 2710000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "gn": {
    "area": 245857,
    "population": 13870000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "gw": {
    "area": 10000,
    "population": 2110000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "ls": {
    "area": 30355,
    "population": 2310000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "lr": {
    "area": 10000,
    "population": 1000000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "ly": {
    "area": 1759540,
    "population": 6810000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "mg": {
    "area": 587041,
    "population": 29610000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "mw": {
    "area": 118484,
    "population": 20410000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "ml": {
    "area": 1240192,
    "population": 22590000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "mr": {
    "area": 1030700,
    "population": 103070000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "mu": {
    "area": 2040,
    "population": 1260000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "na": {
    "area": 825615,
    "population": 2570000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "ne": {
    "area": 1267000,
    "population": 26210000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "st": {
    "area": 964,
    "population": 227000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "sn": {
    "area": 196722,
    "population": 17320000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "sl": {
    "area": 71740,
    "population": 8610000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "so": {
    "area": 637657,
    "population": 17600000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "sd": {
    "area": 1861484,
    "population": 46870000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "tg": {
    "area": 56785,
    "population": 8850000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "tn": {
    "area": 163610,
    "population": 12360000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "zm": {
    "area": 752618,
    "population": 20020000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "zw": {
    "area": 390757,
    "population": 16000000,
    "greeting": "ジャンボ / ボンジュール",
    "greetingLang": "スワヒリ語・フランス語"
  },
  "us": {
    "area": 9833517,
    "population": 331900000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "ca": {
    "area": 9984670,
    "population": 38930000,
    "greeting": "Hello / Bonjour",
    "greetingLang": "英語・フランス語"
  },
  "mx": {
    "area": 1964375,
    "population": 128500000,
    "greeting": "¡Hola! (オラ)",
    "greetingLang": "スペイン語"
  },
  "jm": {
    "area": 10991,
    "population": 2830000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "cu": {
    "area": 109884,
    "population": 11210000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "bb": {
    "area": 430,
    "population": 280000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "pa": {
    "area": 75417,
    "population": 4410000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "cr": {
    "area": 51100,
    "population": 5180000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "gd": {
    "area": 344,
    "population": 125000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "bz": {
    "area": 22966,
    "population": 405000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "ag": {
    "area": 442,
    "population": 93000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "bs": {
    "area": 13943,
    "population": 410000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "dm": {
    "area": 751,
    "population": 72000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "do": {
    "area": 48670,
    "population": 11230000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "sv": {
    "area": 21041,
    "population": 6340000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "gt": {
    "area": 108889,
    "population": 18090000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "ht": {
    "area": 27750,
    "population": 11580000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "hn": {
    "area": 112492,
    "population": 10430000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "ni": {
    "area": 130373,
    "population": 6950000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "kn": {
    "area": 261,
    "population": 48000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "lc": {
    "area": 616,
    "population": 180000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "vc": {
    "area": 389,
    "population": 104000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "tt": {
    "area": 5128,
    "population": 1530000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "br": {
    "area": 8515767,
    "population": 215300000,
    "greeting": "Olá (オラ)",
    "greetingLang": "ポルトガル語"
  },
  "ar": {
    "area": 2780400,
    "population": 46230000,
    "greeting": "¡Hola! (オラ)",
    "greetingLang": "スペイン語"
  },
  "uy": {
    "area": 176215,
    "population": 3420000,
    "greeting": "¡Hola! (オラ)",
    "greetingLang": "スペイン語"
  },
  "py": {
    "area": 406752,
    "population": 6780000,
    "greeting": "¡Hola! (オラ)",
    "greetingLang": "スペイン語"
  },
  "co": {
    "area": 1141748,
    "population": 51870000,
    "greeting": "¡Hola! (オラ)",
    "greetingLang": "スペイン語"
  },
  "ec": {
    "area": 276841,
    "population": 18000000,
    "greeting": "¡Hola! (オラ)",
    "greetingLang": "スペイン語"
  },
  "bo": {
    "area": 1098581,
    "population": 12220000,
    "greeting": "¡Hola! (オラ)",
    "greetingLang": "スペイン語"
  },
  "cl": {
    "area": 756102,
    "population": 19600000,
    "greeting": "¡Hola! (オラ)",
    "greetingLang": "スペイン語"
  },
  "gy": {
    "area": 214969,
    "population": 808000,
    "greeting": "¡Hola! (オラ)",
    "greetingLang": "スペイン語"
  },
  "pe": {
    "area": 1285216,
    "population": 34050000,
    "greeting": "¡Hola! (オラ)",
    "greetingLang": "スペイン語"
  },
  "sr": {
    "area": 163820,
    "population": 618000,
    "greeting": "¡Hola! (オラ)",
    "greetingLang": "スペイン語"
  },
  "ve": {
    "area": 916445,
    "population": 28300000,
    "greeting": "¡Hola! (オラ)",
    "greetingLang": "スペイン語"
  },
  "au": {
    "area": 7692024,
    "population": 26010000,
    "greeting": "グッデイ (G-day)",
    "greetingLang": "オーストラリア英語"
  },
  "nz": {
    "area": 270467,
    "population": 5120000,
    "greeting": "キアオラ (Kia Ora)",
    "greetingLang": "マオリ語・英語"
  },
  "pg": {
    "area": 462840,
    "population": 10140000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "pw": {
    "area": 459,
    "population": 18000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "ki": {
    "area": 811,
    "population": 131000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "nr": {
    "area": 21,
    "population": 12000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "tv": {
    "area": 26,
    "population": 11000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "fj": {
    "area": 18274,
    "population": 930000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "fm": {
    "area": 702,
    "population": 114000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "mh": {
    "area": 181,
    "population": 42000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "sb": {
    "area": 28896,
    "population": 724000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "to": {
    "area": 747,
    "population": 107000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "vu": {
    "area": 12189,
    "population": 326000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "ws": {
    "area": 2842,
    "population": 222000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "ck": {
    "area": 236,
    "population": 15000,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  },
  "nu": {
    "area": 260,
    "population": 1900,
    "greeting": "Hello (ハロー)",
    "greetingLang": "英語"
  }
};
