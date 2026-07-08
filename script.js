/* ============================================================
   国风文人游历 · 脚本逻辑
   模块：数据层 / 存档层 / 导航层 / 地图层 / 弹窗层 /
        答题层 / 侧边栏诗签 / 藏书阁渲染
   ------------------------------------------------------------
   全部数据内置，无外部依赖；存档使用 localStorage。
   ============================================================ */

(function () {
  "use strict";

  /* =========================================================
     一、数据层
     4 座城市 × 3 处古迹 = 12 处；苏轼（黄州、杭州）、李清照（济南、金华）
     pos：光点在地图中的位置（百分比，均匀分布、互不重叠）
     ========================================================= */
  const CITIES = [
    {
      id: "jinan",
      name: "济南",
      author: "李清照",
      pos: { top: "22%", left: "24%" },
      sites: [
        {
          id: "jinan_1",
          name: "漱玉泉",
          author: "李清照",
          story:
            "李清照少女时代居于济南，常在溪亭泉畔游玩。漱玉泉旁的故居后来被辟为李清照纪念堂，泉水潺潺，似犹闻当年少女吟哦之声。她早期的名作《如梦令》便记下了溪亭日暮、误入藕花的少女情趣。",
          poem:
            "常记溪亭日暮，沉醉不知归路。\n兴尽晚回舟，误入藕花深处。\n争渡，争渡，惊起一滩鸥鹭。",
          quiz: "常记溪亭日暮，____。",
          answer: "沉醉不知归路"
        },
        {
          id: "jinan_2",
          name: "大明湖",
          author: "李清照",
          img: "assets/gallery/jinan/daming.png",
          story:
            "济南泉源众多，大明湖烟波浩渺。李清照少时生活于此，对风雨花事观察入微。一夜风雨之后，她问卷帘人海棠如何，卷帘人答‘依旧’，她却道‘应是绿肥红瘦’，四字道尽暮春神韵。",
          poem:
            "昨夜雨疏风骤，浓睡不消残酒。\n试问卷帘人，却道海棠依旧。\n知否，知否？应是绿肥红瘦。",
          quiz: "昨夜雨疏风骤，____。",
          answer: "浓睡不消残酒"
        },
        {
          id: "jinan_3",
          name: "趵突泉",
          author: "李清照",
          story:
            "趵突泉为济南名泉之首，泉畔今有李清照纪念堂。李清照与赵明诚婚后暂别，独居时思念成词，《一剪梅》中‘才下眉头，却上心头’一句，写尽离愁，传唱千古。",
          poem:
            "红藕香残玉簟秋。轻解罗裳，独上兰舟。\n云中谁寄锦书来，雁字回时，月满西楼。\n花自飘零水自流。一种相思，两处闲愁。\n此情无计可消除，才下眉头，却上心头。",
          quiz: "红藕香残玉簟秋，____。",
          answer: "轻解罗裳，独上兰舟"
        }
      ]
    },
    {
      id: "huangzhou",
      name: "黄州",
      author: "苏轼",
      pos: { top: "32%", left: "70%" },
      sites: [
        {
          id: "huangzhou_1",
          name: "东坡赤壁",
          author: "苏轼",
          img: "assets/gallery/huangzhou/chibi.png",
          story:
            "苏轼因乌台诗案贬谪黄州，常游城外赤壁。江风明月之间，他怀古伤今，挥毫写下《念奴娇·赤壁怀古》。‘大江东去’四字开篇，雄视千古，将个人失意化为山河浩叹。",
          poem:
            "大江东去，浪淘尽，千古风流人物。\n故垒西边，人道是，三国周郎赤壁。\n乱石穿空，惊涛拍岸，卷起千堆雪。\n江山如画，一时多少豪杰。",
          quiz: "大江东去，____，千古风流人物。",
          answer: "浪淘尽"
        },
        {
          id: "huangzhou_2",
          name: "定慧院",
          author: "苏轼",
          img: "assets/gallery/huangzhou/dinghui.png",
          story:
            "苏轼初到黄州，寓居定慧院。夜深人静，他见缺月疏桐、孤鸿缥缈，遂作《卜算子》以自况。‘拣尽寒枝不肯栖’一句，写尽谪居中不肯苟同的孤高心迹。",
          poem:
            "缺月挂疏桐，漏断人初静。\n谁见幽人独往来，缥缈孤鸿影。\n惊起却回头，有恨无人省。\n拣尽寒枝不肯栖，寂寞沙洲冷。",
          quiz: "缺月挂疏桐，____。",
          answer: "漏断人初静"
        },
        {
          id: "huangzhou_3",
          name: "雪堂",
          author: "苏轼",
          img: "assets/gallery/huangzhou/xuetang.png",
          story:
            "苏轼在黄州筑雪堂躬耕，自号东坡居士。一日出行遇雨，同行皆狼狈，唯他竹杖芒鞋、吟啸徐行。雨过天晴，他作《定风波》，‘一蓑烟雨任平生’道出超然旷达之怀。",
          poem:
            "莫听穿林打叶声，何妨吟啸且徐行。\n竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。\n料峭春风吹酒醒，微冷，山头斜照却相迎。\n回首向来萧瑟处，归去，也无风雨也无晴。",
          quiz: "莫听穿林打叶声，____。",
          answer: "何妨吟啸且徐行"
        }
      ]
    },
    {
      id: "hangzhou",
      name: "杭州",
      author: "苏轼",
      pos: { top: "70%", left: "26%" },
      sites: [
        {
          id: "hangzhou_1",
          name: "西湖",
          author: "苏轼",
          story:
            "苏轼两度仕杭，疏浚西湖、筑起苏堤。一个晴雨交替之日，他泛舟湖上，见水光潋滟、山色空蒙，遂将西湖比作西施，写下《饮湖上初晴后雨》，从此西湖更添一段风流。",
          poem:
            "水光潋滟晴方好，山色空蒙雨亦奇。\n欲把西湖比西子，淡妆浓抹总相宜。",
          quiz: "水光潋滟晴方好，____。",
          answer: "山色空蒙雨亦奇"
        },
        {
          id: "hangzhou_2",
          name: "望湖楼",
          author: "苏轼",
          story:
            "六月盛夏，苏轼登望湖楼饮酒。忽见黑云翻墨、白雨跳珠，转眼风卷云散，湖面如镜。他醉中挥笔写下《六月二十七日望湖楼醉书》，一场骤雨尽收诗中。",
          poem:
            "黑云翻墨未遮山，白雨跳珠乱入船。\n卷地风来忽吹散，望湖楼下水如天。",
          quiz: "黑云翻墨未遮山，____。",
          answer: "白雨跳珠乱入船"
        },
        {
          id: "hangzhou_3",
          name: "孤山",
          author: "苏轼",
          story:
            "苏轼知杭州时，与友人刘景游孤山。时值深秋，荷尽菊残，他却见橙黄橘绿，以为一年好景。遂作《赠刘景文》勉之，于萧瑟中见丰盈，尽显东坡旷达之风。",
          poem:
            "荷尽已无擎雨盖，菊残犹有傲霜枝。\n一年好景君须记，最是橙黄橘绿时。",
          quiz: "荷尽已无擎雨盖，____。",
          answer: "菊残犹有傲霜枝"
        }
      ]
    },
    {
      id: "jinhua",
      name: "金华",
      author: "李清照",
      pos: { top: "74%", left: "70%" },
      sites: [
        {
          id: "jinhua_1",
          name: "八咏楼",
          author: "李清照",
          story:
            "南渡之后，李清照避乱金华，登八咏楼远眺。江山残破、故土难回，她慨然题诗，‘千古风流八咏楼，江山留与后人愁’，柔婉笔端忽作金石之声，忧国之思跃然纸上。",
          poem:
            "千古风流八咏楼，江山留与后人愁。\n水通南国三千里，气压江城十四州。",
          quiz: "千古风流八咏楼，____。",
          answer: "江山留与后人愁"
        },
        {
          id: "jinhua_2",
          name: "双溪",
          author: "李清照",
          story:
            "春暮时节，李清照寓居金华。闻双溪春色尚好，本欲泛舟，却念物是人非，愁绪难载。遂作《武陵春》，‘只恐双溪舴艋舟，载不动许多愁’，将无形之愁写得有重有量。",
          poem:
            "风住尘香花已尽，日晚倦梳头。\n物是人非事事休，欲语泪先流。\n闻说双溪春尚好，也拟泛轻舟。\n只恐双溪舴艋舟，载不动许多愁。",
          quiz: "风住尘香花已尽，____。",
          answer: "日晚倦梳头"
        },
        {
          id: "jinhua_3",
          name: "金华寓所",
          author: "李清照",
          story:
            "晚年寓居金华，李清照孤苦伶仃。一个秋日，她寻寻觅觅，却只见冷清凄戚，遂作《声声慢》。开篇十四叠字，如泣如诉，写尽国破家亡、孑然一身之痛，为千古绝唱。",
          poem:
            "寻寻觅觅，冷冷清清，凄凄惨惨戚戚。\n乍暖还寒时候，最难将息。\n三杯两盏淡酒，怎敌他、晚来风急！\n雁过也，正伤心，却是旧时相识。",
          quiz: "寻寻觅觅，____，凄凄惨惨戚戚。",
          answer: "冷冷清清"
        }
      ]
    }
  ];

  /* 诗句池：用于「今日诗签」与「诗文抽签」 */
  const VERSE_POOL = [
    { text: "但愿人长久，千里共婵娟。", author: "—— 苏轼《水调歌头》" },
    { text: "不识庐山真面目，只缘身在此山中。", author: "—— 苏轼《题西林壁》" },
    { text: "竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。", author: "—— 苏轼《定风波》" },
    { text: "十年生死两茫茫，不思量，自难忘。", author: "—— 苏轼《江城子》" },
    { text: "欲把西湖比西子，淡妆浓抹总相宜。", author: "—— 苏轼《饮湖上初晴后雨》" },
    { text: "人间有味是清欢。", author: "—— 苏轼《浣溪沙》" },
    { text: "枝上柳绵吹又少，天涯何处无芳草。", author: "—— 苏轼《蝶恋花》" },
    { text: "莫道不销魂，帘卷西风，人比黄花瘦。", author: "—— 李清照《醉花阴》" },
    { text: "生当作人杰，死亦为鬼雄。", author: "—— 李清照《夏日绝句》" },
    { text: "知否，知否？应是绿肥红瘦。", author: "—— 李清照《如梦令》" },
    { text: "此情无计可消除，才下眉头，却上心头。", author: "—— 李清照《一剪梅》" },
    { text: "寻寻觅觅，冷冷清清，凄凄惨惨戚戚。", author: "—— 李清照《声声慢》" },
    { text: "争渡，争渡，惊起一滩鸥鹭。", author: "—— 李清照《如梦令》" }
  ];

  /* 存档键名 */
  const SAVE_KEY = "guofeng_save";
  const SCROLL_CONFIG_KEY = "guofeng_scroll_config"; /* 新增：长卷配置 */
  const PORTRAIT_KEY = "guofeng_portrait";           /* 新增：人像配置 */
  const GLOBAL_ACHIEVED_KEY = "guofeng_global_achieved"; /* 新增：全局通关标记 */

  /* =========================================================
     一·补：印章数据（全局通关后解锁）
     ========================================================= */
  const SEALS = [
    { id: "seal_you",   name: "游",   shape: "square", text: "游" },
    { id: "seal_mo",    name: "墨",   shape: "square", text: "墨" },
    { id: "seal_cang",  name: "藏",   shape: "oval",   text: "藏" },
    { id: "seal_sushi", name: "苏轼", shape: "square", text: "轼" },
    { id: "seal_liqingzhao", name: "清照", shape: "square", text: "照" },
    { id: "seal_qiangu", name: "千古", shape: "rect",  text: "千古" }
  ];

  /* =========================================================
     一·补：城市专属边框数据
     ========================================================= */
  const CITY_FRAMES = {
    huangzhou: { id: "frame_hz", name: "黄州赤壁 · 东坡游历", color: "#6b5538", accent: "#9c3b2e", author: "苏轼", theme: "ink-mountain" },
    hangzhou:  { id: "frame_hg", name: "杭州·西湖柳", color: "#5a7d68", accent: "#6b5538", author: "苏轼", theme: "willow" },
    jinan:     { id: "frame_jn", name: "济南·泉纹",   color: "#8b6b4f", accent: "#9c3b2e", author: "李清照", theme: "spring" },
    jinhua:    { id: "frame_jh", name: "金华·山影纹", color: "#7d5a47", accent: "#b8564a", author: "李清照", theme: "mountain" }
  };

  /* =========================================================
     一·补：风物画集预设插画数据
     每解锁 1 处古迹 → 解锁 1 张古迹插画
     单城 3 处全解锁 → 额外解锁 1 张城市全景大图
     ========================================================= */
  const GALLERY_IMAGES = {
    jinan: {
      sites: [
        { id: "jinan_1", name: "漱玉泉", poem: "常记溪亭日暮，沉醉不知归路", author: "李清照", width: 400, height: 300 },
        { id: "jinan_2", name: "大明湖", poem: "知否，知否？应是绿肥红瘦", author: "李清照", width: 400, height: 300, img: "assets/gallery/jinan/daming.png" },
        { id: "jinan_3", name: "趵突泉", poem: "才下眉头，却上心头", author: "李清照", width: 400, height: 300 }
      ],
      panorama: { id: "jinan_pano", name: "济南全景", poem: "济南名士多", author: "李清照", width: 600, height: 400 }
    },
    huangzhou: {
      sites: [
        { id: "huangzhou_1", name: "东坡赤壁", poem: "大江东去，浪淘尽，千古风流人物", author: "苏轼", width: 400, height: 300, img: "assets/gallery/huangzhou/chibi.png" },
        { id: "huangzhou_2", name: "定慧院", poem: "拣尽寒枝不肯栖，寂寞沙洲冷", author: "苏轼", width: 400, height: 300, img: "assets/gallery/huangzhou/dinghui.png" },
        { id: "huangzhou_3", name: "雪堂", poem: "一蓑烟雨任平生", author: "苏轼", width: 400, height: 300, img: "assets/gallery/huangzhou/xuetang.png" }
      ],
      panorama: { id: "huangzhou_pano", name: "黄州全景", poem: "赤壁怀古", author: "苏轼", width: 600, height: 400, img: "assets/gallery/huangzhou/panorama.png" }
    },
    hangzhou: {
      sites: [
        { id: "hangzhou_1", name: "西湖", poem: "欲把西湖比西子，淡妆浓抹总相宜", author: "苏轼", width: 400, height: 300 },
        { id: "hangzhou_2", name: "望湖楼", poem: "黑云翻墨未遮山，白雨跳珠乱入船", author: "苏轼", width: 400, height: 300 },
        { id: "hangzhou_3", name: "孤山", poem: "最是橙黄橘绿时", author: "苏轼", width: 400, height: 300 }
      ],
      panorama: { id: "hangzhou_pano", name: "杭州全景", poem: "淡妆浓抹总相宜", author: "苏轼", width: 600, height: 400 }
    },
    jinhua: {
      sites: [
        { id: "jinhua_1", name: "八咏楼", poem: "千古风流八咏楼，江山留与后人愁", author: "李清照", width: 400, height: 300 },
        { id: "jinhua_2", name: "双溪", poem: "只恐双溪舴艋舟，载不动许多愁", author: "李清照", width: 400, height: 300 },
        { id: "jinhua_3", name: "金华寓所", poem: "寻寻觅觅，冷冷清清，凄凄惨惨戚戚", author: "李清照", width: 400, height: 300 }
      ],
      panorama: { id: "jinhua_pano", name: "金华全景", poem: "水通南国三千里", author: "李清照", width: 600, height: 400 }
    }
  };

  /* =========================================================
     二、存档层：localStorage 读写
     ========================================================= */
  function loadSave() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function saveSave(list) {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(list));
    } catch (e) {
      /* localStorage 不可用时静默忽略 */
    }
  }

  function isUnlocked(siteId) {
    return loadSave().indexOf(siteId) !== -1;
  }

  function unlockSite(siteId) {
    const list = loadSave();
    if (list.indexOf(siteId) === -1) {
      list.push(siteId);
      saveSave(list);
    }
  }

  /* 统计某城已解锁数量 */
  function countUnlocked(city) {
    return city.sites.filter(function (s) { return isUnlocked(s.id); }).length;
  }

  /* =========================================================
     二·补：长卷配置 / 全局通关 / 人像配置 读写
     ========================================================= */
  function loadScrollConfig() {
    try {
      var raw = localStorage.getItem(SCROLL_CONFIG_KEY);
      if (!raw) return { frame: "none", seals: [], nickname: "佚名居士" };
      var obj = JSON.parse(raw);
      if (!obj || typeof obj !== "object") return { frame: "none", seals: [], nickname: "佚名居士" };
      return {
        frame: obj.frame || "none",
        seals: Array.isArray(obj.seals) ? obj.seals : [],
        nickname: obj.nickname || "佚名居士"
      };
    } catch (e) {
      return { frame: "none", seals: [], nickname: "佚名居士" };
    }
  }

  function saveScrollConfig(cfg) {
    try { localStorage.setItem(SCROLL_CONFIG_KEY, JSON.stringify(cfg)); } catch (e) {}
  }

  function isGlobalAchieved() {
    var total = 0, unlocked = 0;
    CITIES.forEach(function (c) {
      total += c.sites.length;
      unlocked += countUnlocked(c);
    });
    return total > 0 && unlocked === total;
  }

  function isCityAchieved(cityId) {
    var city = CITIES.find(function (c) { return c.id === cityId; });
    if (!city) return false;
    return countUnlocked(city) === city.sites.length;
  }

  function anyCityAchieved() {
    return CITIES.some(function (c) { return isCityAchieved(c.id); });
  }

  function getAchievedCities() {
    return CITIES.filter(function (c) { return isCityAchieved(c.id); });
  }

  /* =========================================================
     三、DOM 引用
     ========================================================= */
  var dom = {
    map: document.getElementById("map"),
    navItems: document.querySelectorAll(".nav-item"),
    views: {
      home: document.getElementById("view-home"),
      library: document.getElementById("view-library"),
      gallery: document.getElementById("view-gallery"),
      draw: document.getElementById("view-draw"),
      scroll: document.getElementById("view-scroll")
    },
    entryLibrary: document.getElementById("entry-library"),
    btnDrawVerse: document.getElementById("btn-draw-verse"),
    verseBox: document.getElementById("verse-box"),
    libraryGrid: document.getElementById("library-grid"),
    btnDrawMain: document.getElementById("btn-draw-main"),
    drawPaper: document.getElementById("draw-paper"),
    overlayCity: document.getElementById("overlay-city"),
    overlayQuiz: document.getElementById("overlay-quiz"),
    cityTitle: document.getElementById("city-popup-title"),
    citySub: document.getElementById("city-popup-sub"),
    siteList: document.getElementById("site-list"),
    quizBadge: document.getElementById("quiz-badge"),
    quizTitle: document.getElementById("quiz-title"),
    quizAuthor: document.getElementById("quiz-author"),
    quizStory: document.getElementById("quiz-story"),
    quizPrompt: document.getElementById("quiz-prompt"),
    quizInput: document.getElementById("quiz-input"),
    quizSubmit: document.getElementById("quiz-submit"),
    quizFeedback: document.getElementById("quiz-feedback"),

    /* ----- 新增 DOM 引用 ----- */
    /* 侧边栏：风物画集卡片 */
    entryGallery: document.getElementById("entry-gallery"),
    btnEntryGallery: document.getElementById("btn-entry-gallery"),
    galleryCardTip: document.getElementById("gallery-card-tip"),

    /* 风物画集视图 */
    galleryGrid: document.getElementById("gallery-grid"),

    /* 插画预览弹窗 */
    overlayGalleryPreview: document.getElementById("overlay-gallery-preview"),
    galleryPreviewTitle: document.getElementById("gallery-preview-title"),
    galleryPreviewSub: document.getElementById("gallery-preview-sub"),
    galleryPreviewImage: document.getElementById("gallery-preview-image"),
    btnDownloadGallery: document.getElementById("btn-download-gallery"),

    /* 城市达成弹窗 */
    overlayCityComplete: document.getElementById("overlay-city-complete"),
    achieveCityTitle: document.getElementById("achieve-city-title"),
    achieveCitySub: document.getElementById("achieve-city-sub"),

    /* 全局通关弹窗 */
    overlayGlobalComplete: document.getElementById("overlay-global-complete"),
    sealsPreview: document.getElementById("seals-preview"),

    /* 游历长卷 */
    framePicker: document.getElementById("frame-picker"),
    sealPicker: document.getElementById("seal-picker"),
    sealLockedTip: document.getElementById("seal-locked-tip"),
    scrollCanvas: document.getElementById("scroll-canvas"),
    scrollSealsLayer: document.getElementById("scroll-seals-layer"),
    scrollEmpty: document.getElementById("scroll-empty"),
    btnScrollDownload: document.getElementById("btn-scroll-download")
  };

  /* =========================================================
     四、导航层：首页 / 藏书阁 / 诗文抽签 切换
     ========================================================= */
  function switchView(name) {
    Object.keys(dom.views).forEach(function (key) {
      dom.views[key].classList.toggle("active", key === name);
    });
    dom.navItems.forEach(function (item) {
      item.classList.toggle("active", item.getAttribute("data-view") === name);
    });
    if (name === "library") renderLibrary();
    if (name === "gallery") renderGallery();
    if (name === "scroll") renderScrollPage();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* =========================================================
     五、地图层：渲染 4 城光点（依据存档刷新状态）
     ========================================================= */
  function renderMap() {
    /* 清除旧光点（保留装饰层 map-decor） */
    const dots = dom.map.querySelectorAll(".map-dot");
    dots.forEach(function (d) { d.remove(); });

    CITIES.forEach(function (city) {
      const unlockedCount = countUnlocked(city);
      const isCityUnlocked = unlockedCount > 0;

      const dotWrap = document.createElement("div");
      dotWrap.className = "map-dot" + (isCityUnlocked ? " unlocked" : "");
      dotWrap.style.top = city.pos.top;
      dotWrap.style.left = city.pos.left;
      dotWrap.setAttribute("role", "button");
      dotWrap.setAttribute("tabindex", "0");
      dotWrap.setAttribute("aria-label", city.name);

      const dot = document.createElement("span");
      dot.className = "dot";

      const label = document.createElement("span");
      label.className = "label";
      label.textContent = city.name + " · " + city.author;

      dotWrap.appendChild(dot);
      dotWrap.appendChild(label);

      const open = function () { openCityPopup(city.id); };
      dotWrap.addEventListener("click", open);
      dotWrap.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });

      dom.map.appendChild(dotWrap);
    });
  }

  /* =========================================================
     六、弹窗层
     ========================================================= */
  /* 关闭指定遮罩 */
  function closeOverlay(overlay) {
    if (!overlay) return;
    overlay.hidden = true;
  }

  /* 关闭所有弹窗（ESC 时调用） */
  function closeAllOverlays() {
    closeOverlay(dom.overlayCity);
    closeOverlay(dom.overlayQuiz);
    closeOverlay(dom.overlayCityComplete);
    closeOverlay(dom.overlayGlobalComplete);
    closeOverlay(dom.overlayGalleryPreview);
  }

  /* 当前是否有弹窗打开 */
  function anyOverlayOpen() {
    return (
      !dom.overlayCity.hidden ||
      !dom.overlayQuiz.hidden ||
      !dom.overlayCityComplete.hidden ||
      !dom.overlayGlobalComplete.hidden ||
      !dom.overlayGalleryPreview.hidden
    );
  }

  /* 6.1 打开古迹列表弹窗 */
  function openCityPopup(cityId) {
    const city = CITIES.find(function (c) { return c.id === cityId; });
    if (!city) return;

    const unlockedCount = countUnlocked(city);

    dom.cityTitle.textContent = city.name + " · " + city.author + " 游迹";
    dom.citySub.textContent =
      "共 " + city.sites.length + " 处古迹，已收录 " + unlockedCount + " 处";

    /* 渲染古迹列表 */
    dom.siteList.innerHTML = "";
    city.sites.forEach(function (site) {
      const done = isUnlocked(site.id);
      const item = document.createElement("div");
      item.className = "site-item";
      item.setAttribute("role", "button");
      item.setAttribute("tabindex", "0");

      const info = document.createElement("div");
      info.className = "site-info";
      const siName = document.createElement("div");
      siName.className = "si-name";
      siName.textContent = site.name;
      const siAuthor = document.createElement("div");
      siAuthor.className = "si-author";
      siAuthor.textContent = site.author;
      info.appendChild(siName);
      info.appendChild(siAuthor);

      const status = document.createElement("div");
      status.className = "site-status" + (done ? " done" : "");
      status.textContent = done ? "已收录" : "待解锁";

      item.appendChild(info);
      item.appendChild(status);

      const open = function () { openQuizPopup(site.id); };
      item.addEventListener("click", open);
      item.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });

      dom.siteList.appendChild(item);
    });

    dom.overlayCity.hidden = false;
  }

  /* 6.2 打开答题弹窗 */
  let currentSite = null; /* 当前答题的古迹对象 */

  function openQuizPopup(siteId) {
    /* 先关掉古迹列表弹窗，再打开答题弹窗 */
    closeOverlay(dom.overlayCity);

    /* 查找古迹 */
    let site = null;
    for (let i = 0; i < CITIES.length && !site; i++) {
      for (let j = 0; j < CITIES[i].sites.length; j++) {
        if (CITIES[i].sites[j].id === siteId) { site = CITIES[i].sites[j]; break; }
      }
    }
    if (!site) return;
    currentSite = site;

    dom.quizBadge.textContent = isUnlocked(site.id) ? "已收录" : "答题";
    dom.quizTitle.textContent = site.name;
    dom.quizAuthor.textContent = "文人 · " + site.author;

    dom.quizStory.textContent = site.story;

    /* 渲染填空题干：将 ____ 替换为可视空白 */
    const parts = site.quiz.split("____");
    dom.quizPrompt.innerHTML = "";
    parts.forEach(function (part, idx) {
      dom.quizPrompt.appendChild(document.createTextNode(part));
      if (idx < parts.length - 1) {
        const blank = document.createElement("span");
        blank.className = "blank";
        blank.textContent = "　　";
        dom.quizPrompt.appendChild(blank);
      }
    });

    /* 重置输入与反馈区（默认不显示正确答案） */
    dom.quizInput.value = "";
    dom.quizFeedback.hidden = true;
    dom.quizFeedback.className = "quiz-feedback";
    dom.quizFeedback.innerHTML = "";

    dom.overlayQuiz.hidden = false;
    /* 自动聚焦输入框 */
    setTimeout(function () { dom.quizInput.focus(); }, 50);
  }

  /* =========================================================
     七、答题层：判分（答对解锁；答错显示正确答案）
     ========================================================= */
  /* 归一化：去除空白与中英文标点，便于宽松比对 */
  function normalize(str) {
    return String(str)
      .replace(/\s+/g, "")
      .replace(
        /[。，、；：？！.,;:?!""''""''（）()\[\]【】｛｝{}·\-—~～·…]/g,
        ""
      );
  }

  function checkAnswer() {
    if (!currentSite) return;
    const userVal = dom.quizInput.value.trim();
    if (!userVal) {
      /* 空输入：轻提示，不计为答错 */
      dom.quizFeedback.hidden = false;
      dom.quizFeedback.className = "quiz-feedback wrong";
      dom.quizFeedback.innerHTML = "请先填入所缺诗句，再行提交。";
      return;
    }

    const correct = normalize(currentSite.answer) === normalize(userVal);

    dom.quizFeedback.hidden = false;

    if (correct) {
      var wasUnlocked = isUnlocked(currentSite.id);
      unlockSite(currentSite.id);
      dom.quizFeedback.className = "quiz-feedback right";
      dom.quizFeedback.innerHTML = wasUnlocked
        ? "答对了！此古迹已收录于藏书阁。"
        : "答对了！已解锁并收录于藏书阁。";
      /* 刷新地图光点与藏书阁（若已渲染） */
      renderMap();
      if (dom.views.library.classList.contains("active")) renderLibrary();
      /* 更新弹窗角标 */
      dom.quizBadge.textContent = "已收录";
      /* 新增：检测城市达成与全局通关 */
      if (!wasUnlocked) {
        var curCity = findCityBySite(currentSite.id);
        if (curCity && isCityAchieved(curCity.id)) {
          /* 延后弹出，让用户先看到答对反馈 */
          setTimeout(function () { showCityAchievement(curCity); }, 1200);
        }
      }
    } else {
      dom.quizFeedback.className = "quiz-feedback wrong";
      dom.quizFeedback.innerHTML =
        "未中。再细品题中诗意。<br>" +
        '<span class="ans-label">正确答案：</span>' +
        '<span class="ans-text">' + escapeHtml(currentSite.answer) + "</span>";
    }
  }

  /* 简单 HTML 转义，避免答案中的特殊字符破坏结构 */
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* =========================================================
     八、侧边栏 / 抽签页诗签
     ========================================================= */
  function pickVerse() {
    return VERSE_POOL[Math.floor(Math.random() * VERSE_POOL.length)];
  }

  /* 渲染侧边栏今日诗签 */
  function renderSidebarVerse() {
    const v = pickVerse();
    dom.verseBox.querySelector(".verse-text").textContent = v.text;
    dom.verseBox.querySelector(".verse-author").textContent = v.author;
  }

  /* 渲染抽签页诗签 */
  function renderDrawVerse() {
    const v = pickVerse();
    dom.drawPaper.querySelector(".draw-text").textContent = v.text;
    dom.drawPaper.querySelector(".draw-author").textContent = v.author;
  }

  /* =========================================================
     九、藏书阁渲染：4 城分栏，进度 + 古迹卡片
     ========================================================= */
  function renderLibrary() {
    dom.libraryGrid.innerHTML = "";

    CITIES.forEach(function (city) {
      const unlockedCount = countUnlocked(city);
      const total = city.sites.length;

      const column = document.createElement("div");
      column.className = "lib-column";
      column.setAttribute("data-city-id", city.id);

      /* 城市标题 + 进度 */
      const head = document.createElement("div");
      head.className = "lib-col-head";
      const cityEl = document.createElement("span");
      cityEl.className = "city";
      cityEl.textContent = city.name;
      const prog = document.createElement("span");
      prog.className = "progress";
      prog.innerHTML = city.name + " <b>" + unlockedCount + "/" + total + "</b>";
      head.appendChild(cityEl);
      head.appendChild(prog);

      /* 古迹卡片列表 */
      const sitesWrap = document.createElement("div");
      sitesWrap.className = "lib-sites";

      city.sites.forEach(function (site) {
        const card = document.createElement("div");
        const done = isUnlocked(site.id);
        card.className = "lib-card " + (done ? "unlocked" : "locked");

        if (done) {
          const name = document.createElement("div");
          name.className = "site-name";
          name.textContent = site.name;
          const author = document.createElement("div");
          author.className = "site-author";
          author.textContent = site.author;
          const poem = document.createElement("div");
          poem.className = "site-poem";
          poem.textContent = site.poem; /* white-space: pre-line 保留换行 */
          card.appendChild(name);
          card.appendChild(author);
          card.appendChild(poem);
        } else {
          const tip = document.createElement("div");
          tip.className = "locked-tip";
          tip.textContent = "待解锁 · " + site.name;
          card.appendChild(tip);
        }

        sitesWrap.appendChild(card);
      });

      column.appendChild(head);
      column.appendChild(sitesWrap);
      dom.libraryGrid.appendChild(column);
    });
    /* 新增：刷新达成徽章与边框 */
    refreshLibraryBadges();
  }

  /* =========================================================
     九·补：辅助工具
     ========================================================= */
  /* 根据古迹 id 查找所在城市 */
  function findCityBySite(siteId) {
    for (var i = 0; i < CITIES.length; i++) {
      for (var j = 0; j < CITIES[i].sites.length; j++) {
        if (CITIES[i].sites[j].id === siteId) return CITIES[i];
      }
    }
    return null;
  }

  /* 创建一个可拖动印章 DOM 元素 */
  function createSealDragElement(seal, x, y, onRemove) {
    var el = document.createElement("div");
    el.className = "seal-drag " + (seal.shape === "rect" ? "rect" : seal.shape === "oval" ? "oval" : "");
    el.textContent = seal.text;
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.setAttribute("data-seal-id", seal.id);
    el.title = "拖动移动，双击移除";

    var dragging = false;
    var offsetX = 0, offsetY = 0;

    function onDown(e) {
      dragging = true;
      var rect = el.getBoundingClientRect();
      var parentRect = el.parentElement.getBoundingClientRect();
      var px = e.touches ? e.touches[0].clientX : e.clientX;
      var py = e.touches ? e.touches[0].clientY : e.clientY;
      offsetX = px - rect.left;
      offsetY = py - rect.top;
      e.preventDefault();
    }

    function onMove(e) {
      if (!dragging) return;
      var parentRect = el.parentElement.getBoundingClientRect();
      var px = e.touches ? e.touches[0].clientX : e.clientX;
      var py = e.touches ? e.touches[0].clientY : e.clientY;
      var nx = px - parentRect.left - offsetX;
      var ny = py - parentRect.top - offsetY;
      el.style.left = nx + "px";
      el.style.top = ny + "px";
      e.preventDefault();
    }

    function onUp() {
      if (!dragging) return;
      dragging = false;
      if (typeof onRemove === "function") {
        /* 不在这里移除，只通知位置变化；双击才移除 */
      }
    }

    el.addEventListener("mousedown", onDown);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    el.addEventListener("touchstart", onDown, { passive: false });
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onUp);

    el.addEventListener("dblclick", function () {
      el.remove();
      if (typeof onRemove === "function") onRemove();
    });

    return el;
  }

  /* =========================================================
     九·补 2：城市达成与全局通关
     ========================================================= */
  var cityAchievedSet = {}; /* 记录已弹过达成窗的城市，避免重复弹出 */

  function showCityAchievement(city) {
    if (cityAchievedSet[city.id]) {
      /* 已弹过，则只检查全局通关 */
      checkGlobalAchievement();
      return;
    }
    cityAchievedSet[city.id] = true;

    dom.achieveCityTitle.textContent = city.name + " · " + city.author;
    dom.achieveCitySub.textContent =
      "已集齐" + city.sites.length + "处古迹，解锁专属古风边框与人像入画";
    closeOverlay(dom.overlayQuiz); /* 关闭答题弹窗 */
    dom.overlayCityComplete.hidden = false;

    /* 更新 UI 状态 */
    refreshGalleryCard();
    refreshLibraryBadges();

    /* 若同时触发全局通关，再延后弹出 */
    if (isGlobalAchieved()) {
      setTimeout(showGlobalAchievement, 2200);
    }
  }

  function checkGlobalAchievement() {
    if (isGlobalAchieved()) {
      setTimeout(showGlobalAchievement, 200);
    }
  }

  var globalShown = false;
  function showGlobalAchievement() {
    if (globalShown) return;
    /* 仅在初次全解锁时弹窗；若已在 localStorage 标记则不弹 */
    if (localStorage.getItem(GLOBAL_ACHIEVED_KEY) === "1") {
      globalShown = true;
      return;
    }
    globalShown = true;
    try { localStorage.setItem(GLOBAL_ACHIEVED_KEY, "1"); } catch (e) {}

    /* 渲染印章预览 */
    dom.sealsPreview.innerHTML = "";
    SEALS.forEach(function (s) {
      var btn = document.createElement("span");
      btn.className = "seal-btn" + (s.shape === "rect" ? " rect" : s.shape === "oval" ? " oval" : "");
      btn.textContent = s.text;
      dom.sealsPreview.appendChild(btn);
    });

    closeOverlay(dom.overlayCityComplete);
    dom.overlayGlobalComplete.hidden = false;

    /* 更新长卷 / 人像印章入口 */
    refreshSealPickers();
  }

  /* 刷新侧边栏风物画集卡片状态 */
  function refreshGalleryCard() {
    var unlockedAny = loadSave().length > 0;
    dom.entryGallery.classList.toggle("locked", !unlockedAny);
    dom.btnEntryGallery.disabled = !unlockedAny;
    dom.galleryCardTip.textContent = unlockedAny
      ? "已解锁 " + loadSave().length + " 幅插画"
      : "解锁古迹，收集古风插画";
  }

  /* 刷新藏书阁城市达成徽章与专属边框 */
  function refreshLibraryBadges() {
    var cols = dom.libraryGrid.querySelectorAll(".lib-column");
    cols.forEach(function (col) {
      var cityId = col.getAttribute("data-city-id");
      if (!cityId) return;
      var achieved = isCityAchieved(cityId);
      col.classList.toggle("achieved", achieved);
      var city = CITIES.find(function (c) { return c.id === cityId; });
      if (achieved && city) {
        var authorClass = city.author === "苏轼" ? "author-su" : "author-li";
        col.classList.add(authorClass);
        var frame = CITY_FRAMES[cityId];
        if (frame) col.style.setProperty("--city-border", frame.color);
      }
      /* 徽章 */
      var head = col.querySelector(".lib-col-head");
      if (!head) return;
      var oldBadge = col.querySelector(".lib-col-achieve");
      if (achieved && !oldBadge) {
        var badge = document.createElement("span");
        badge.className = "lib-col-achieve";
        badge.textContent = "✦ 达成";
        head.querySelector(".city").appendChild(badge);
      } else if (!achieved && oldBadge) {
        oldBadge.remove();
      }
    });
  }

  /* =========================================================
     九·补 3：印章选择器（长卷专用）
     ========================================================= */
  function refreshSealPickers() {
    var unlocked = isGlobalAchieved();
    if (dom.sealLockedTip) {
      dom.sealLockedTip.style.display = unlocked ? "none" : "inline-block";
    }
    if (unlocked) {
      var oldBtns = dom.sealPicker.querySelectorAll(".seal-btn");
      oldBtns.forEach(function (b) { b.remove(); });
      SEALS.forEach(function (s) {
        var btn = document.createElement("button");
        btn.className = "seal-btn" + (s.shape === "rect" ? " rect" : s.shape === "oval" ? " oval" : "");
        btn.textContent = s.text;
        btn.title = s.name;
        btn.addEventListener("click", function () { addSealToScroll(s); });
        dom.sealPicker.appendChild(btn);
      });
    }
  }

  /* =========================================================
     九·补 4：风物画集渲染
     ========================================================= */
  function renderGallery() {
    dom.galleryGrid.innerHTML = "";

    CITIES.forEach(function (city) {
      var unlockedCount = countUnlocked(city);
      var total = city.sites.length;
      var achieved = isCityAchieved(city.id);
      var images = GALLERY_IMAGES[city.id];
      if (!images) return;

      var column = document.createElement("div");
      column.className = "gallery-column";
      column.setAttribute("data-city-id", city.id);

      var head = document.createElement("div");
      head.className = "gallery-col-head";
      var cityEl = document.createElement("span");
      cityEl.className = "city";
      cityEl.textContent = city.name;
      var prog = document.createElement("span");
      prog.className = "progress";
      prog.innerHTML = "<b>" + unlockedCount + "/" + total + "</b> 幅";
      head.appendChild(cityEl);
      head.appendChild(prog);

      var imagesWrap = document.createElement("div");
      imagesWrap.className = "gallery-images";

      images.sites.forEach(function (img) {
        var item = document.createElement("div");
        var unlocked = isUnlocked(img.id);
        item.className = "gallery-item" + (unlocked ? "" : " locked");
        item.setAttribute("data-image-id", img.id);

        if (unlocked && img.img) {
          var imageEl = document.createElement("img");
          imageEl.src = img.img;
          imageEl.className = "gallery-item-image";
          imageEl.alt = img.name;
          item.appendChild(imageEl);
        } else {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.className = "gallery-item-image";
          if (unlocked) {
            drawInkIllustration(canvas, img, city.author);
          } else {
            drawLockedIllustration(canvas);
          }
          item.appendChild(canvas);
        }

        var overlay = document.createElement("div");
        overlay.className = "gallery-item-overlay";
        var name = document.createElement("div");
        name.className = "gallery-item-name";
        name.textContent = unlocked ? img.name : "待解锁";
        var poem = document.createElement("div");
        poem.className = "gallery-item-poem";
        poem.textContent = unlocked ? img.poem : "";
        overlay.appendChild(name);
        overlay.appendChild(poem);

        var lockedTip = document.createElement("div");
        lockedTip.className = "gallery-locked-tip";
        lockedTip.textContent = "待解锁";

        item.appendChild(overlay);
        if (!unlocked) item.appendChild(lockedTip);

        if (unlocked) {
          item.addEventListener("click", function () {
            openGalleryPreview(city.id, img);
          });
        }

        imagesWrap.appendChild(item);
      });

      if (achieved && images.panorama) {
        var panoItem = document.createElement("div");
        panoItem.className = "gallery-item";
        panoItem.setAttribute("data-image-id", images.panorama.id);

        if (images.panorama.img) {
          var panoImg = document.createElement("img");
          panoImg.src = images.panorama.img;
          panoImg.className = "gallery-item-image";
          panoImg.alt = images.panorama.name;
          panoItem.appendChild(panoImg);
        } else {
          var panoCanvas = document.createElement("canvas");
          panoCanvas.width = images.panorama.width;
          panoCanvas.height = images.panorama.height;
          panoCanvas.className = "gallery-item-image";
          drawPanoramaIllustration(panoCanvas, images.panorama, city);
          panoItem.appendChild(panoCanvas);
        }

        var panoOverlay = document.createElement("div");
        panoOverlay.className = "gallery-item-overlay";
        var panoName = document.createElement("div");
        panoName.className = "gallery-item-name";
        panoName.textContent = images.panorama.name;
        var panoPoem = document.createElement("div");
        panoPoem.className = "gallery-item-poem";
        panoPoem.textContent = images.panorama.poem;
        panoOverlay.appendChild(panoName);
        panoOverlay.appendChild(panoPoem);

        panoItem.appendChild(panoOverlay);
        panoItem.addEventListener("click", function () {
          openGalleryPreview(city.id, images.panorama);
        });

        imagesWrap.appendChild(panoItem);
      }

      column.appendChild(head);
      column.appendChild(imagesWrap);
      dom.galleryGrid.appendChild(column);
    });
  }

  function drawInkIllustration(canvas, img, author) {
    var ctx = canvas.getContext("2d");
    var W = canvas.width, H = canvas.height;

    ctx.fillStyle = "#f5f0e6";
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = author === "李清照" ? "#9c3b2e" : "#2f5d50";
    ctx.beginPath();
    ctx.arc(W * 0.4, H * 0.5, W * 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = author === "李清照" ? "rgba(156, 59, 46, 0.25)" : "rgba(47, 93, 80, 0.25)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W * 0.1, H * 0.7);
    ctx.bezierCurveTo(W * 0.3, H * 0.5, W * 0.5, H * 0.4, W * 0.7, H * 0.6);
    ctx.bezierCurveTo(W * 0.8, H * 0.5, W * 0.9, H * 0.65, W * 0.95, H * 0.5);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = author === "李清照" ? "rgba(156, 59, 46, 0.15)" : "rgba(47, 93, 80, 0.15)";
    ctx.beginPath();
    ctx.ellipse(W * 0.5, H * 0.35, W * 0.25, H * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "#2b2b2b";
    ctx.font = "bold 16px serif";
    ctx.textAlign = "center";
    ctx.fillText(img.name, W / 2, H * 0.85);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "#5c5142";
    ctx.font = "12px serif";
    ctx.textAlign = "center";
    var poemLines = img.poem.split("，");
    var startY = H * 0.92;
    poemLines.forEach(function (line, i) {
      ctx.fillText(line, W / 2, startY + i * 14);
    });
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = author === "李清照" ? "#9c3b2e" : "#2f5d50";
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    ctx.strokeRect(4, 4, W - 8, H - 8);
    ctx.restore();
  }

  function drawLockedIllustration(canvas) {
    var ctx = canvas.getContext("2d");
    var W = canvas.width, H = canvas.height;

    ctx.fillStyle = "#d9d3c4";
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    ctx.strokeStyle = "#b8b1a3";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(10, 10, W - 20, H - 20);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "#b8b1a3";
    ctx.font = "14px serif";
    ctx.textAlign = "center";
    ctx.fillText("待解锁", W / 2, H / 2);
    ctx.restore();
  }

  function drawPanoramaIllustration(canvas, img, city) {
    var ctx = canvas.getContext("2d");
    var W = canvas.width, H = canvas.height;

    ctx.fillStyle = "#f5f0e6";
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    ctx.globalAlpha = 0.06;
    var grad = ctx.createLinearGradient(0, H * 0.5, 0, H);
    grad.addColorStop(0, city.author === "李清照" ? "#9c3b2e" : "#2f5d50");
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, H);
    ctx.bezierCurveTo(W * 0.2, H * 0.6, W * 0.5, H * 0.5, W * 0.8, H * 0.65);
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = city.author === "李清照" ? "rgba(156, 59, 46, 0.2)" : "rgba(47, 93, 80, 0.2)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, H * 0.75);
    ctx.bezierCurveTo(W * 0.15, H * 0.65, W * 0.35, H * 0.7, W * 0.5, H * 0.6);
    ctx.bezierCurveTo(W * 0.7, H * 0.55, W * 0.85, H * 0.65, W, H * 0.6);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "rgba(47, 93, 80, 0.08)";
    ctx.beginPath();
    ctx.arc(W * 0.3, H * 0.35, 60, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(W * 0.7, H * 0.45, 80, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "#2b2b2b";
    ctx.font = "bold 20px serif";
    ctx.textAlign = "center";
    ctx.fillText(img.name, W / 2, H * 0.88);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "#5c5142";
    ctx.font = "14px serif";
    ctx.textAlign = "center";
    ctx.fillText(img.poem, W / 2, H * 0.95);
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = CITY_FRAMES[city.id] ? CITY_FRAMES[city.id].color : "#2f5d50";
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.4;
    ctx.strokeRect(6, 6, W - 12, H - 12);
    ctx.restore();
  }

  var currentPreviewImage = null;
  function openGalleryPreview(cityId, img) {
    currentPreviewImage = img;
    dom.galleryPreviewTitle.textContent = img.name;
    dom.galleryPreviewSub.textContent = img.poem;

    dom.galleryPreviewImage.innerHTML = "";

    if (img.img) {
      var imageEl = document.createElement("img");
      imageEl.src = img.img;
      imageEl.className = "gallery-preview-full";
      imageEl.alt = img.name;
      imageEl.style.width = "100%";
      imageEl.style.height = "auto";
      dom.galleryPreviewImage.appendChild(imageEl);
    } else {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.style.width = "100%";
      canvas.style.height = "auto";

      var city = CITIES.find(function (c) { return c.id === cityId; });
      if (img.id.indexOf("_pano") !== -1) {
        drawPanoramaIllustration(canvas, img, city);
      } else {
        drawInkIllustration(canvas, img, city.author);
      }

      dom.galleryPreviewImage.appendChild(canvas);
    }

    dom.overlayGalleryPreview.hidden = false;
  }

  function downloadGalleryImage() {
    if (!currentPreviewImage) return;

    var canvas = dom.galleryPreviewImage.querySelector("canvas");
    var imgEl = dom.galleryPreviewImage.querySelector("img");

    if (imgEl) {
      var tempCanvas = document.createElement("canvas");
      tempCanvas.width = imgEl.naturalWidth || imgEl.width;
      tempCanvas.height = imgEl.naturalHeight || imgEl.height;
      var ctx = tempCanvas.getContext("2d");
      ctx.drawImage(imgEl, 0, 0);
      canvas = tempCanvas;
    }

    if (!canvas) return;

    var link = document.createElement("a");
    link.download = "古风插画_" + currentPreviewImage.id + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  /* 在 Canvas 上绘制一枚印章 */
  function drawSealOnCanvas(ctx, text, x, y, w, h) {
    ctx.save();
    /* 轻微旋转 */
    var cx = x + w / 2, cy = y + h / 2;
    ctx.translate(cx, cy);
    ctx.rotate(-6 * Math.PI / 180);
    ctx.translate(-cx, -cy);

    /* 印底 */
    ctx.fillStyle = "#9c3b2e";
    roundRect(ctx, x, y, w, h, 6);
    ctx.fill();

    /* 内框 */
    ctx.strokeStyle = "rgba(251, 247, 238, 0.8)";
    ctx.lineWidth = 2;
    roundRect(ctx, x + 4, y + 4, w - 8, h - 8, 4);
    ctx.stroke();

    /* 印文 */
    ctx.fillStyle = "#fbf7ee";
    var fontSize = Math.min(w, h) * 0.4;
    ctx.font = "bold " + fontSize + "px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x + w / 2, y + h / 2);

    ctx.restore();
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  /* =========================================================
     九·补 5：游历长卷
     ========================================================= */
  var currentFrame = "none";

  /* 渲染长卷页整体（工具栏 + 画布） */
  function renderScrollPage() {
    renderFramePicker();
    refreshSealPickers();
    var unlockedAny = loadSave().length > 0;
    dom.scrollEmpty.hidden = unlockedAny;
    dom.btnScrollDownload.disabled = !unlockedAny;
    if (unlockedAny) {
      renderScrollCanvas();
      /* 从存档恢复印章 */
      restoreScrollSeals();
    }
  }

  /* 渲染边框选择按钮 */
  function renderFramePicker() {
    /* 清除除"素底"外的按钮 */
    var btns = dom.framePicker.querySelectorAll(".frame-option");
    btns.forEach(function (b) {
      if (b.getAttribute("data-frame") !== "none") b.remove();
    });

    var achieved = getAchievedCities();
    achieved.forEach(function (city) {
      var f = CITY_FRAMES[city.id];
      if (!f) return;
      var btn = document.createElement("button");
      btn.className = "frame-option";
      btn.textContent = f.name;
      btn.setAttribute("data-frame", city.id);
      if (currentFrame === city.id) btn.classList.add("active");
      btn.addEventListener("click", function () {
        currentFrame = city.id;
        dom.framePicker.querySelectorAll(".frame-option")
          .forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        renderScrollCanvas();
      });
      dom.framePicker.appendChild(btn);
    });

    /* 素底按钮 */
    var noneBtn = dom.framePicker.querySelector('[data-frame="none"]');
    if (noneBtn) {
      noneBtn.classList.toggle("active", currentFrame === "none");
      noneBtn.onclick = function () {
        currentFrame = "none";
        dom.framePicker.querySelectorAll(".frame-option")
          .forEach(function (b) { b.classList.remove("active"); });
        noneBtn.classList.add("active");
        renderScrollCanvas();
      };
    }
  }

  /* 在长卷上添加印章 */
  function addSealToScroll(seal) {
    var el = createSealDragElement(seal, 60, 60, function () { saveScrollSeals(); });
    dom.scrollSealsLayer.appendChild(el);
    saveScrollSeals();
  }

  /* 绑定长卷滚动事件，同步印章层位置 */
  function bindScrollEvents() {
    var scrollTrack = document.getElementById("scroll-track");
    if (!scrollTrack) return;
    scrollTrack.addEventListener("scroll", function () {
      dom.scrollSealsLayer.style.transform = "translateX(-" + scrollTrack.scrollLeft + "px)";
    });
  }

  /* 保存印章位置到 localStorage */
  function saveScrollSeals() {
    var cfg = loadScrollConfig();
    var seals = [];
    var layerRect = dom.scrollSealsLayer.getBoundingClientRect();
    var els = dom.scrollSealsLayer.querySelectorAll(".seal-drag");
    els.forEach(function (el) {
      var id = el.getAttribute("data-seal-id");
      var left = parseFloat(el.style.left) || 0;
      var top = parseFloat(el.style.top) || 0;
      seals.push({ id: id, x: left, y: top });
    });
    cfg.seals = seals;
    cfg.frame = currentFrame;
    saveScrollConfig(cfg);
  }

  /* 从存档恢复印章 */
  function restoreScrollSeals() {
    dom.scrollSealsLayer.innerHTML = "";
    var cfg = loadScrollConfig();
    currentFrame = cfg.frame || "none";
    (cfg.seals || []).forEach(function (s) {
      var seal = SEALS.find(function (x) { return x.id === s.id; });
      if (!seal) return;
      var el = createSealDragElement(seal, s.x, s.y, function () { saveScrollSeals(); });
      dom.scrollSealsLayer.appendChild(el);
    });
    /* 监听印章移动保存 */
    var observer = new MutationObserver(function () { saveScrollSeals(); });
    observer.observe(dom.scrollSealsLayer, { childList: true, subtree: true, attributes: true });
  }

  /* 绘制长卷 Canvas（横向卷轴） */
  function renderScrollCanvas() {
    var canvas = dom.scrollCanvas;
    var ctx = canvas.getContext("2d");
    var H = 600;
    var margin = 60;
    var cityWidth = 560;
    var cityGap = 50;

    var sections = [];
    sections.push({ type: "header", w: 420 });
    sections.push({ type: "divider", w: 30 });

    CITIES.forEach(function (city) {
      var unlockedSites = city.sites.filter(function (s) { return isUnlocked(s.id); });
      if (unlockedSites.length === 0) return;
      sections.push({ type: "city", city: city, sites: unlockedSites, w: cityWidth });
      sections.push({ type: "divider", w: 30 });
    });
    sections.push({ type: "footer", w: 320 });

    var totalW = sections.reduce(function (sum, s) { return sum + s.w; }, 0) + margin * 2;
    var cssW = Math.max(2000, totalW);
    var cssH = H;
    var dpr = window.devicePixelRatio || 1;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.width = cssW + "px";
    canvas.style.height = cssH + "px";
    ctx.scale(dpr, dpr);
    var W = cssW;

    ctx.clearRect(0, 0, W, H);

    ctx.save();
    ctx.globalAlpha = 0.04;
    ctx.fillStyle = "#2f5d50";
    ctx.beginPath();
    ctx.ellipse(W * 0.2, H * 0.35, 200, 110, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#9c3b2e";
    ctx.beginPath();
    ctx.ellipse(W * 0.8, H * 0.65, 220, 130, 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = "#d8cdb8";
    ctx.lineWidth = 1;
    ctx.setLineDash([12, 8]);
    ctx.beginPath();
    ctx.moveTo(margin + 20, margin + 40);
    ctx.lineTo(W - margin - 20, margin + 40);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(margin + 20, H - margin - 40);
    ctx.lineTo(W - margin - 20, H - margin - 40);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    var frameColor = null;
    var frameCfg = null;
    if (currentFrame !== "none" && CITY_FRAMES[currentFrame]) {
      frameColor = CITY_FRAMES[currentFrame].color;
      frameCfg = CITY_FRAMES[currentFrame];
      drawScrollFrame(ctx, W, H, frameColor, frameCfg);
    }

    var x = margin;
    var y = margin;

    sections.forEach(function (section) {
      if (section.type === "header") {
        ctx.save();
        ctx.fillStyle = "#2f5d50";
        ctx.font = "bold 34px serif";
        ctx.textAlign = "center";
        ctx.fillText("国风文人游历图卷", x + section.w / 2, y + 60);

        ctx.fillStyle = "#5c5142";
        ctx.font = "15px serif";
        var total = CITIES.reduce(function (s, c) { return s + c.sites.length; }, 0);
        var unLocked = loadSave().length;
        ctx.fillText("已收古迹  " + unLocked + " / " + total + "  处", x + section.w / 2, y + 100);

        ctx.strokeStyle = "#2f5d50";
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        ctx.moveTo(x + 60, y + 120);
        ctx.lineTo(x + section.w - 60, y + 120);
        ctx.stroke();
        ctx.restore();
        x += section.w;
      } else if (section.type === "divider") {
        ctx.save();
        ctx.strokeStyle = "#d8cdb8";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y + 40);
        ctx.lineTo(x, H - margin - 40);
        ctx.stroke();

        ctx.fillStyle = "#d8cdb8";
        ctx.beginPath();
        ctx.arc(x, y + 40, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, H - margin - 40, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        x += section.w;
      } else if (section.type === "city") {
        var city = section.city;
        var sites = section.sites;
        var achieved = isCityAchieved(city.id);
        var titleColor = city.author === "李清照" ? "#9c3b2e" : "#2f5d50";

        ctx.save();
        ctx.fillStyle = titleColor;
        ctx.font = "bold 26px serif";
        ctx.textAlign = "center";
        ctx.fillText(city.name + " · " + city.author, x + section.w / 2, y + 38);

        ctx.strokeStyle = titleColor;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        ctx.moveTo(x + 30, y + 58);
        ctx.lineTo(x + section.w - 30, y + 58);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.restore();

        if (achieved) {
          drawCityStamp(ctx, x + section.w - 60, y + 15, city);
          ctx.save();
          ctx.fillStyle = "#7a6d59";
          ctx.font = "12px serif";
          ctx.textAlign = "right";
          ctx.fillText("—— 全城游历已毕 ——", x + section.w - 20, y + 42);
          ctx.restore();
        }

        var siteY = y + 80;
        var siteH = (H - siteY - margin - 20) / sites.length;

        sites.forEach(function (site, idx) {
          var sy = siteY + idx * siteH;
          var imgWidth = 120;
          var imgHeight = 90;
          var imgX = x + 20;
          var imgY = sy;

          drawSiteIllustration(ctx, imgX, imgY, imgWidth, imgHeight, site, city.author);

          ctx.save();
          ctx.fillStyle = titleColor;
          ctx.font = "bold 16px serif";
          ctx.textAlign = "left";
          ctx.fillText("◆ " + site.name, x + imgWidth + 30, sy + 24);
          ctx.restore();

          ctx.save();
          ctx.fillStyle = "#2b2b2b";
          ctx.font = "14px serif";
          ctx.textAlign = "left";
          var poemLines = site.poem.split("\n").slice(0, 2);
          poemLines.forEach(function (line, li) {
            ctx.fillText(line, x + imgWidth + 30, sy + 48 + li * 18);
          });
          ctx.restore();

          ctx.save();
          ctx.fillStyle = "#7a6d59";
          ctx.font = "12px serif";
          ctx.textAlign = "left";
          var summary = site.story.length > 50 ? site.story.slice(0, 50) + "……" : site.story;
          var charsPerLine = 24;
          for (var i = 0; i < summary.length; i += charsPerLine) {
            ctx.fillText(summary.slice(i, i + charsPerLine), x + imgWidth + 30, sy + 80 + Math.floor(i / charsPerLine) * 16);
          }
          ctx.restore();

          ctx.save();
          ctx.fillStyle = "#9c3b2e";
          ctx.font = "11px serif";
          ctx.textAlign = "right";
          ctx.fillText("—— " + site.author, x + section.w - 20, sy + imgHeight - 8);
          ctx.restore();
        });

        x += section.w;
      } else if (section.type === "footer") {
        ctx.save();
        ctx.fillStyle = "#7a6d59";
        ctx.font = "14px serif";
        ctx.textAlign = "center";
        ctx.fillText("—— 游历所至，尽在此卷 ——", x + section.w / 2, y + 50);

        ctx.fillStyle = "#5c5142";
        ctx.font = "12px serif";
        var now = new Date();
        ctx.fillText(now.getFullYear() + "年 · 国风文人游历", x + section.w / 2, y + 80);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "#9c3b2e";
        ctx.font = "bold 18px serif";
        ctx.textAlign = "center";
        ctx.fillText("墨", x + section.w / 2 - 15, y + 120);
        ctx.fillText("韵", x + section.w / 2 + 15, y + 120);
        ctx.restore();

        x += section.w;
      }
    });

    dom.scrollSealsLayer.style.height = H + "px";
  }

  function drawSiteIllustration(ctx, x, y, w, h, site, author) {
    ctx.save();
    ctx.fillStyle = "rgba(253, 250, 242, 0.25)";
    ctx.fillRect(x, y, w, h);

    ctx.strokeStyle = "rgba(120, 100, 70, 0.25)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w, h);

    if (site.img) {
      if (site._imgLoaded && site._imgObj && site._imgObj.complete) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();
        var im = site._imgObj;
        var scale = Math.max(w / im.width, h / im.height);
        var dw = im.width * scale;
        var dh = im.height * scale;
        ctx.drawImage(im, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
        ctx.restore();
        ctx.save();
        ctx.strokeStyle = "rgba(120, 100, 70, 0.4)";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, w, h);
        ctx.restore();
      } else {
        var img = new Image();
        img.onload = function () {
          site._imgLoaded = true;
          site._imgObj = img;
          renderScrollCanvas();
        };
        img.onerror = function () {
          console.error("古迹插画加载失败", site.img);
        };
        img.src = site.img;
      }
      ctx.restore();
      return;
    }

    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.fillStyle = author === "李清照" ? "#9c3b2e" : "#2f5d50";
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w * 0.35, h * 0.25, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = author === "李清照" ? "rgba(156, 59, 46, 0.28)" : "rgba(47, 93, 80, 0.28)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + w * 0.15, y + h * 0.8);
    ctx.bezierCurveTo(x + w * 0.3, y + h * 0.55, x + w * 0.5, y + h * 0.45, x + w * 0.7, y + h * 0.6);
    ctx.bezierCurveTo(x + w * 0.8, y + h * 0.5, x + w * 0.9, y + h * 0.7, x + w * 0.92, y + h * 0.55);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = author === "李清照" ? "rgba(156, 59, 46, 0.12)" : "rgba(47, 93, 80, 0.12)";
    ctx.beginPath();
    ctx.ellipse(x + w * 0.4, y + h * 0.35, w * 0.18, h * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + w * 0.7, y + h * 0.28, w * 0.14, h * 0.1, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "#5c5142";
    ctx.font = "10px serif";
    ctx.textAlign = "center";
    ctx.fillText(site.name.slice(0, 4), x + w / 2, y + h - 8);
    ctx.restore();

    ctx.restore();
  }

  function drawCityStamp(ctx, x, y, city) {
    ctx.save();
    var stampW = 42;
    var stampH = 42;
    var cx = x - stampW / 2;
    var cy = y - stampH / 2;

    ctx.fillStyle = city.author === "李清照" ? "#9c3b2e" : "#2f5d50";
    roundRect(ctx, cx, cy, stampW, stampH, 5);
    ctx.fill();

    ctx.strokeStyle = "rgba(251, 247, 238, 0.7)";
    ctx.lineWidth = 1.5;
    roundRect(ctx, cx + 3, cy + 3, stampW - 6, stampH - 6, 3);
    ctx.stroke();

    ctx.fillStyle = "#fbf7ee";
    ctx.font = "bold 15px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(city.name.charAt(0), cx + stampW / 2, cy + stampH / 2);

    ctx.restore();
  }

  function drawScrollDivider(ctx, W, y) {
    ctx.save();
    ctx.strokeStyle = "#d8cdb8";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(100, y);
    ctx.lineTo(W - 100, y);
    ctx.stroke();
    /* 中点小方点 */
    ctx.fillStyle = "#9c3b2e";
    ctx.beginPath();
    ctx.arc(W / 2, y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawScrollFrame(ctx, W, H, color, cfg) {
    cfg = cfg || {};
    var accent = cfg.accent || color;
    var theme = cfg.theme || "default";
    ctx.save();

    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.globalAlpha = 0.85;
    ctx.strokeRect(20, 20, W - 40, H - 40);

    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    ctx.strokeRect(34, 34, W - 68, H - 68);

    ctx.globalAlpha = 0.15;
    for (var i = 0; i < 3; i++) {
      ctx.strokeRect(28 + i * 2, 28 + i * 2, W - 56 - i * 4, H - 56 - i * 4);
    }
    ctx.globalAlpha = 1;

    ctx.save();
    ctx.globalAlpha = 0.1;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    for (var mx = 50; mx < W - 50; mx += 24) {
      ctx.beginPath();
      ctx.moveTo(mx, 40);
      ctx.quadraticCurveTo(mx + 12, 34, mx + 24, 40);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mx, H - 40);
      ctx.quadraticCurveTo(mx + 12, H - 34, mx + 24, H - 40);
      ctx.stroke();
    }
    ctx.restore();

    var corners = [
      [30, 30, 1], [W - 30, 30, -1],
      [30, H - 30, 1], [W - 30, H - 30, -1]
    ];
    corners.forEach(function (c) {
      var cx = c[0], cy = c[1], dir = c[2];
      ctx.save();
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.moveTo(cx - 8 * dir, cy - 8);
      ctx.quadraticCurveTo(cx, cy - 8, cx + 8 * dir, cy - 8);
      ctx.quadraticCurveTo(cx + 8 * dir, cy, cx + 8 * dir, cy + 8);
      ctx.quadraticCurveTo(cx, cy + 8, cx - 8 * dir, cy + 8);
      ctx.quadraticCurveTo(cx - 8 * dir, cy, cx - 8 * dir, cy - 8);
      ctx.fill();
      ctx.restore();
    });

    if (theme === "ink-mountain") {
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      for (var mx2 = 80; mx2 < W - 80; mx2 += 40) {
        ctx.beginPath();
        ctx.moveTo(mx2, H - 50);
        ctx.quadraticCurveTo(mx2 + 10, H - 75, mx2 + 20, H - 50);
        ctx.quadraticCurveTo(mx2 + 30, H - 70, mx2 + 40, H - 50);
        ctx.stroke();
      }
      ctx.restore();
    }

    if (cfg.name) {
      ctx.save();
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = color;
      ctx.font = "bold 16px serif";
      ctx.textAlign = "center";
      var titleX = W / 2;
      var titleY = 32;
      ctx.fillRect(titleX - 100, titleY - 14, 200, 22);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#fbf7ee";
      ctx.fillText(cfg.name, titleX, titleY + 2);
      ctx.restore();

      ctx.save();
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.9;
      var sealW = 28, sealH = 28;
      var sealX = W - 70;
      var sealY = H - 60;
      ctx.fillRect(sealX, sealY, sealW, sealH);
      ctx.strokeStyle = "#fbf7ee";
      ctx.lineWidth = 1;
      ctx.strokeRect(sealX + 3, sealY + 3, sealW - 6, sealH - 6);
      ctx.fillStyle = "#fbf7ee";
      ctx.font = "bold 11px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(cfg.author ? cfg.author.charAt(0) : "印", sealX + sealW / 2, sealY + sealH / 2);
      ctx.restore();
    }

    ctx.restore();
  }

  /* 下载长卷：底图 + 印章 合成 PNG */
  function downloadScrollImage() {
    var canvas = dom.scrollCanvas;
    var ctx = canvas.getContext("2d");

    /* 读取印章 DOM 位置，按比例映射到 canvas 像素坐标 */
    var canvasRect = canvas.getBoundingClientRect();
    var scaleX = canvas.width / canvasRect.width / (window.devicePixelRatio || 1);
    var scaleY = canvas.height / canvasRect.height / (window.devicePixelRatio || 1);

    var seals = dom.scrollSealsLayer.querySelectorAll(".seal-drag");
    var layerRect = dom.scrollSealsLayer.getBoundingClientRect();

    seals.forEach(function (el) {
      var elRect = el.getBoundingClientRect();
      var x = (elRect.left - layerRect.left) * scaleX;
      var y = (elRect.top - layerRect.top) * scaleY;
      var w = elRect.width * scaleX;
      var h = elRect.height * scaleY;
      drawSealOnCanvas(ctx, el.textContent, x, y, w, h);
    });

    var link = document.createElement("a");
    link.download = "国风文人游历长卷.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  /* =========================================================
     十、事件绑定
     ========================================================= */
  function bindEvents() {
    /* 导航切换 */
    dom.navItems.forEach(function (item) {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        switchView(item.getAttribute("data-view"));
      });
    });

    /* 侧边栏：藏书阁入口卡片 */
    dom.entryLibrary.addEventListener("click", function () {
      switchView("library");
    });

    /* 侧边栏：抽取诗文 */
    dom.btnDrawVerse.addEventListener("click", renderSidebarVerse);

    /* 抽签页：抽取诗文 */
    dom.btnDrawMain.addEventListener("click", renderDrawVerse);

    /* 弹窗关闭按钮 */
    document.querySelectorAll("[data-close]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const overlay = btn.closest(".overlay");
        closeOverlay(overlay);
      });
    });

    /* 点击遮罩空白处关闭 */
    [dom.overlayCity, dom.overlayQuiz].forEach(function (overlay) {
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) closeOverlay(overlay);
      });
    });

    /* 答题提交 */
    dom.quizSubmit.addEventListener("click", checkAnswer);
    dom.quizInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); checkAnswer(); }
    });

    /* ESC 关闭弹窗 */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && anyOverlayOpen()) {
        closeAllOverlays();
      }
    });

    /* =============== 新增事件绑定 =============== */

    /* 侧边栏：风物画集入口 */
    dom.btnEntryGallery.addEventListener("click", function (e) {
      e.stopPropagation();
      if (!loadSave().length > 0) return;
      switchView("gallery");
    });
    dom.entryGallery.addEventListener("click", function () {
      if (!loadSave().length > 0) return;
      switchView("gallery");
    });

    /* 插画预览：下载 */
    dom.btnDownloadGallery.addEventListener("click", downloadGalleryImage);

    /* 长卷：下载 */
    dom.btnScrollDownload.addEventListener("click", downloadScrollImage);
  }

  /* =========================================================
     十一、初始化
     ========================================================= */
  function init() {
    bindEvents();
    renderMap();          /* 依据存档渲染光点状态 */
    renderLibrary();      /* 预渲染藏书阁（切换时再刷新） */
    renderSidebarVerse(); /* 首屏展示今日诗签 */

    /* 新增：刷新收集相关 UI */
    refreshGalleryCard();
    refreshLibraryBadges();
    refreshSealPickers();

    /* 若已全局通关，不重复弹窗 */
    if (isGlobalAchieved()) {
      try { localStorage.setItem(GLOBAL_ACHIEVED_KEY, "1"); } catch (e) {}
      globalShown = true;
    }

    /* 绑定长卷滚动同步事件 */
    bindScrollEvents();
  }

  /* DOM 就绪后初始化 */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
