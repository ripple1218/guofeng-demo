// 城市、文人、古迹点位数据，暴露全局变量cityData
const cityData = [
  {
    city: "黄州",
    author: "苏轼",
    spots: [
      {
        id: "huangzhou-1",
        city: "黄州",
        author: "苏轼",
        spotName: "赤壁",
        story:
          "元丰三年，苏轼贬谪黄州，游览赤壁，在月夜泛舟长江，写下千古名作。当地百姓常见他在江边抚琴沉思，偶有携酒伴随渔者夜谈。赤壁让苏轼领悟顺逆随缘的人生态度。",
        poemTitle: "念奴娇·赤壁怀古",
        poemFull: "大江东去，浪淘尽，千古风流人物。",
        question: "大江东去，浪淘尽，______。",
        answer: "千古风流人物",
        unlocked: false,
      },
      {
        id: "huangzhou-2",
        city: "黄州",
        author: "苏轼",
        spotName: "东坡雪堂",
        story:
          "苏轼被贬黄州后，在城东建“雪堂”，自号“东坡居士”。他常邀文友聚会，品茶赋诗。一次大雪封门，他未惧寒冷，于雪堂读书写诗，笑称“以雪为米，以竹为薪”。",
        poemTitle: "和子由渑池怀旧",
        poemFull: "人生如逆旅，我亦是行人。",
        question: "人生如逆旅，______。",
        answer: "我亦是行人",
        unlocked: false,
      },
      {
        id: "huangzhou-3",
        city: "黄州",
        author: "苏轼",
        spotName: "定惠院",
        story:
          "苏轼迁居黄州时，经常前往定惠院访僧谈禅。有次夜宿寺中，忽闻芭蕉夜雨，触发诗兴，遂与僧人共赋诗文。定惠院因他而成为诗文胜地。",
        poemTitle: "浣溪沙",
        poemFull: "谁道人生无再少？门前流水尚能西！休将白发唱黄鸡。",
        question: "谁道人生无再少？门前流水尚能西！______。",
        answer: "休将白发唱黄鸡",
        unlocked: false,
      }
    ],
  },
  {
    city: "杭州",
    author: "苏轼",
    spots: [
      {
        id: "hangzhou-1",
        city: "杭州",
        author: "苏轼",
        spotName: "西湖苏堤",
        story:
          "苏轼任杭州太守期间，亲自主持疏浚西湖，堆筑长堤，后来被称为“苏堤”。修筑时，他常在湖边与百姓同劳作，一起品尝湖鲜，号召节约民力，深受百姓爱戴。",
        poemTitle: "饮湖上初晴后雨",
        poemFull: "水光潋滟晴方好，山色空蒙雨亦奇。",
        question: "水光潋滟晴方好，______。",
        answer: "山色空蒙雨亦奇",
        unlocked: false,
      },
      {
        id: "hangzhou-2",
        city: "杭州",
        author: "苏轼",
        spotName: "六和塔",
        story:
          "苏轼曾登六和塔俯瞰钱塘江，对江潮生息无常感慨良多。他还与寺僧谈建筑与禅理，留下关于塔名由来的趣事——“六和”即六合，喻四方上下、和谐无争。",
        poemTitle: "江城子·密州出猎",
        poemFull: "老夫聊发少年狂，左牵黄，右擎苍。",
        question: "老夫聊发少年狂，______。",
        answer: "左牵黄，右擎苍",
        unlocked: false,
      },
      {
        id: "hangzhou-3",
        city: "杭州",
        author: "苏轼",
        spotName: "孤山放鹤亭",
        story:
          "有传苏轼在孤山为好友林和靖故居题写‘放鹤亭’匾额。一次他酒后误放僧人养鹤，村民欢喜说‘文人放鹤也成趣’，后人成此为典故。",
        poemTitle: "题西林壁",
        poemFull: "不识庐山真面目，只缘身在此山中。",
        question: "不识庐山真面目，______。",
        answer: "只缘身在此山中",
        unlocked: false,
      },
    ],
  },
  {
    city: "济南",
    author: "李清照",
    spots: [
      {
        id: "jinan-1",
        city: "济南",
        author: "李清照",
        spotName: "大明湖畔",
        story:
          "李清照常泛舟大明湖，以荷花为伴，吟咏词句。年少时，她曾在湖边柳荫下找寻遗失的画扇，偶遇民间女诗友，互题诗句，遗下许多趣谈。",
        poemTitle: "如梦令",
        poemFull: "常记溪亭日暮，沉醉不知归路。",
        question: "常记溪亭日暮，______。",
        answer: "沉醉不知归路",
        unlocked: false,
      },
      {
        id: "jinan-2",
        city: "济南",
        author: "李清照",
        spotName: "趵突泉",
        story:
          "少女李清照常到趵突泉边玩耍赏泉，有次泉边拾到一片残荷叶，用作信笺寄诗与远方同窗。趵突泉旁的清冷和诗意成为她早期灵感的源泉。",
        poemTitle: "一剪梅",
        poemFull: "红藕香残玉簟秋，轻解罗裳，独上兰舟。",
        question: "红藕香残玉簟秋，______。",
        answer: "轻解罗裳，独上兰舟",
        unlocked: false,
      },
      {
        id: "jinan-3",
        city: "济南",
        author: "李清照",
        spotName: "千佛山",
        story:
          "少女时期的李清照常同父亲爬千佛山，途中吟诗作对。据说有一回误入山中佛寺，与方丈论诗，方丈叹其才情非凡，赠以梅花一枝以作纪念。",
        poemTitle: "声声慢·寻寻觅觅",
        poemFull: "寻寻觅觅，冷冷清清，凄凄惨惨戚戚。",
        question: "寻寻觅觅，冷冷清清，______。",
        answer: "凄凄惨惨戚戚",
        unlocked: false,
      },
    ],
  },
  {
    city: "金华",
    author: "李清照",
    spots: [
      {
        id: "jinhua-1",
        city: "金华",
        author: "李清照",
        spotName: "婺江桥",
        story:
          "李清照随丈夫赵明诚赴金华，常在婺江桥上眺望江水发思乡之情。一次大潮将她随身诗稿打湿，桥头老者助其晾晒，诗稿气味混江风，自此更觉婺江亲切。",
        poemTitle: "武陵春",
        poemFull: "风住尘香花已尽，日晚倦梳头。",
        question: "风住尘香花已尽，______。",
        answer: "日晚倦梳头",
        unlocked: false,
      },
      {
        id: "jinhua-2",
        city: "金华",
        author: "李清照",
        spotName: "双龙洞",
        story:
          "李清照曾随友游双龙洞，舟中过狭处，低头避石，忽觉洞顶水珠滴落鬓发，遂赋诗戏称‘龙洞轻雨洗翠鬟’。此段游记流传于闺阁之间。",
        poemTitle: "临江仙·梅",
        poemFull: "庭院深深深几许？杨柳堆烟，帘幕无重数。",
        question: "庭院深深深几许？______。",
        answer: "杨柳堆烟，帘幕无重数",
        unlocked: false,
      },
      {
        id: "jinhua-3",
        city: "金华",
        author: "李清照",
        spotName: "仙桥",
        story:
          "李清照寓居金华时，常携闺友闲游仙桥。据传一日偶遇雨中卖花少女，二人共伞题句，后将此事写入词作，留下一段微雨桥头的佳话。",
        poemTitle: "清平乐·年年雪里",
        poemFull: "年年雪里，常插梅花醉。挼尽梅花无好意，赢得满衣清泪。",
        question: "年年雪里，常插梅花醉。______。",
        answer: "挼尽梅花无好意，赢得满衣清泪",
        unlocked: false,
      },
    ],
  },
];