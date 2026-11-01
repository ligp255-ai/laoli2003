/* ============================================================
   作品数据：新增作品只需要在 window.WORKS 里加一段
   1. 把图片放进 assets/img/works/<slug>/01.jpg、01-thumb.jpg ...
   2. 复制下面任意一个项目，改 slug / 标题 / 文案 / images
   3. 图片编号从 01 开始，必须同时有 01.jpg 和 01-thumb.jpg
   ============================================================ */

const image = (slug, n, alt, caption, kind = "render") => {
  const nn = String(n).padStart(2, "0");
  return {
    n,
    src: `assets/img/works/${slug}/${nn}.jpg`,
    thumb: `assets/img/works/${slug}/${nn}-thumb.jpg`,
    alt,
    caption,
    kind
  };
};

window.CATEGORIES = ["景观", "室内", "视觉", "包装", "文创", "AIGC", "手绘", "模型"];

window.CATEGORY_COLORS = {
  "景观": "#5f6649",
  "室内": "#7b5a3d",
  "视觉": "#7d4039",
  "包装": "#7a5535",
  "文创": "#4f6470",
  "AIGC": "#5c4f3f",
  "手绘": "#6a6254",
  "模型": "#6d5b46"
};

window.WORKS = [
  /* ---------- 景观 ---------- */
  {
    slug: "campus-corner",
    title: "校园一角景观改造",
    en: "Campus Corner Landscape",
    category: "景观",
    year: "2025",
    role: "场地分析 / 方案推演 / 效果表达",
    tools: "AutoCAD · SketchUp · Lumion · Photoshop",
    summary: "从场地分析到节点落位的校园边角更新。",
    description:
      "以校园边角绿地为对象，先梳理人流、视线与高差，再把通行、停留和展示重新排进一条连续的路径。图纸包含区位、功能分区、交通流线、彩平与节点效果，尝试让一块被忽略的空地重新成为日常经过的地方。后三张效果图把圆形水景、中央草坪与入口树阵放回场地，补齐从总平到节点的阅读。",
    featured: true,
    preview: [8, 9, 10, 2],
    images: [
      image("campus-corner", 1, "校园一角景观改造彩平图", "彩平图：重新组织入口、路径与停留节点"),
      image("campus-corner", 2, "校园一角景观改造课程展板", "课程展板：从分析到节点的完整推演", "board"),
      image("campus-corner", 3, "校园一角景观改造节点效果图", "节点效果：林下休憩与通行"),
      image("campus-corner", 4, "校园一角景观改造功能分区图", "功能分区：把校园边角拆成可使用的几块", "board"),
      image("campus-corner", 5, "校园一角景观改造区位分析图", "区位分析：场地与校园的关系", "board"),
      image("campus-corner", 6, "校园一角景观改造 CAD 平面图", "CAD 平面：方案落地的基础图", "board"),
      image("campus-corner", 7, "校园一角景观改造交通流线图", "交通流线：高峰时段的路径校验", "board"),
      image("campus-corner", 8, "校园一角景观改造中心水景效果图", "中心水景：圆形花池与镜面水池"),
      image("campus-corner", 9, "校园一角景观改造草坪与廊架效果图", "草坪与廊架：把视线打开"),
      image("campus-corner", 10, "校园一角景观改造入口树阵效果图", "入口与树阵广场：节点标注")
    ]
  },
  {
    slug: "yunze-plaza",
    title: "云泽梦影城市文化广场",
    en: "Yunze Dream Plaza",
    category: "景观",
    year: "2025",
    role: "概念构思 / 总平与专项 / 展板表达",
    tools: "AutoCAD · SketchUp · Lumion · Photoshop",
    summary: "把云梦县的地域记忆，收进一个全龄使用的城市广场。",
    description:
      "项目位于湖北孝感云梦县，场地紧邻王城大道，周边以居住和商业为主。方案以“云泽梦影”为题，从秦简、楚文化与水泽地貌里提取曲线和云纹，组织中央水景、环形跑道、儿童活动与林下休憩；同时补上地下停车、公厕与服务商亭，试图把一块通过性的空地变成可停留的城市客厅。页面收录两张方案展板，场地效果图并入「校园一角景观改造」。",
    images: [
      image("yunze-plaza", 1, "云泽梦影城市文化广场设计展板", "云泽梦影：从区位、彩平到专项与效果", "board"),
      image("yunze-plaza", 2, "云泽梦影城市文化广场方案展板", "方案展板：总平、功能与景观结构", "board")
    ]
  },
  {
    slug: "school-planning",
    title: "中小学规划设计",
    en: "Primary & Secondary School Plan",
    category: "景观",
    year: "2025",
    role: "校园规划 / 功能分区 / 交通与景观",
    tools: "AutoCAD · SketchUp · Lumion · Photoshop",
    summary: "用一条共享轴，把教学、运动与生活区重新排进校园。",
    description:
      "一次完整的中小学校园规划练习：先按教学、运动、生活与行政分区，再用一条共享主轴把图书馆、食堂和体育馆串起来，让不同年级在课间也能相遇。方案强调生态融合与功能实用，保留山体与林地，用屋顶绿化、雨水花园和透水铺装处理高差与排水；交通上把家长接送、消防与后勤流线分开，避免高峰时段在校门口打结。",
    images: [
      image("school-planning", 1, "中小学规划设计展板", "校园规划：功能分区、交通、景观与效果", "board")
    ]
  },
  {
    slug: "waterfront-park",
    title: "滨水公园景观",
    en: "Waterfront Park",
    category: "景观",
    year: "2024",
    role: "景观方案 / 效果表达",
    tools: "SketchUp · Lumion · Photoshop",
    summary: "借山势与水系，组织一条可停留的滨水游线。",
    description:
      "以瀑布、湖面与林下空间为节点，组织高低错落的步行环线。设计重点放在水岸的可接近性、视线通廊和不同停留时长的座位上，让公园既能快速通过，也能坐下来待一会儿。",
    images: [
      image("waterfront-park", 1, "滨水公园主入口跌水效果图", "主入口：跌水与山石"),
      image("waterfront-park", 2, "滨水公园湖面效果图", "湖面与亭榭：把视线打开"),
      image("waterfront-park", 3, "滨水公园林下路径效果图", "林下路径：树荫与停留"),
      image("waterfront-park", 4, "滨水公园滨水步道效果图", "滨水步道：岸线的接近方式"),
      image("waterfront-park", 5, "滨水公园树阵效果图", "树阵与休憩：给日常留位置")
    ]
  },
  {
    slug: "red-culture-plaza",
    title: "红色文化广场",
    en: "Red Culture Plaza",
    category: "景观",
    year: "2025",
    role: "纪念性空间 / 铺装与雕塑 / 效果表达",
    tools: "SketchUp · Lumion · Photoshop",
    summary: "用纪念性构筑与铺装，组织进入广场的仪式路径。",
    description:
      "把纪念石、人物剪影、文化长廊和红色展墙放在同一条轴线上，形成从城市界面到广场核心的渐进体验。效果图重点表达人群尺度、光影和材料质感，让纪念性不靠体量压人，而靠路径慢慢展开。",
    images: [
      image("red-culture-plaza", 1, "红色文化广场主景效果图", "广场主景：雕塑、花坛与人群"),
      image("red-culture-plaza", 2, "红色文化广场人物剪影雕塑效果图", "人物剪影：把纪念性放进日常"),
      image("red-culture-plaza", 3, "红色文化广场文化长廊效果图", "文化长廊：三角形构架与展示"),
      image("red-culture-plaza", 4, "红色文化广场纪念石细部效果图", "纪念石：六边形徽记与铭文"),
      image("red-culture-plaza", 5, "红色文化广场红色构筑效果图", "红色构筑：把人物放进场景"),
      image("red-culture-plaza", 6, "红色文化广场红色展墙效果图", "红色展墙：入口立面的节奏"),
      image("red-culture-plaza", 7, "红色文化广场鸟瞰效果图", "鸟瞰：广场、水系与周边绿地"),
      image("red-culture-plaza", 8, "红色文化广场课程研报", "课程研报：从区位、说明到植物配置", "board")
    ]
  },
  {
    slug: "residential-landscape",
    title: "居住区景观",
    en: "Residential Landscape",
    category: "景观",
    year: "2024",
    role: "总图 / 入口界面 / 立面表达",
    tools: "SketchUp · Lumion · Photoshop",
    summary: "从建筑体量到组团绿地，建立可落地的景观骨架。",
    description:
      "以居住区总图、鸟瞰和住宅入口为切入口，梳理人车分流、宅间绿地和公共活动场地。尝试在有限造价里把日常使用放在形式之前：先让人走得顺、停得下，再谈风格。",
    images: [
      image("residential-landscape", 1, "居住区景观总平面图", "总平：组团、道路与中心绿地"),
      image("residential-landscape", 2, "居住区景观鸟瞰效果图", "鸟瞰：建筑体量与庭院"),
      image("residential-landscape", 3, "住宅入口界面效果图", "住宅入口：人车分流与院落")
    ]
  },
  {
    slug: "healing-park",
    title: "兰州九洲疗愈公园",
    en: "Jiuzhou Healing Park",
    category: "景观",
    year: "2025",
    featured: true,
    role: "场地调研 / 疗愈动线 / 专项分析 / 效果表达",
    tools: "AutoCAD · SketchUp · Lumion · Photoshop · Illustrator",
    summary: "用乡土植物与环形动线，把城市边角地做成可停留的疗愈公园。",
    description:
      "项目位于兰州九洲开发区，以“山河之境·城市疗愈”为题，从气候、乡土植物、人群压力与场地高差入手，把环形跑道、中央草坪、儿童活动、互动水景与林下休憩串成一条连续回路。分析部分覆盖交通、气候、植物选型、功能分区与设计策略；效果图统一在晴天与高绿量里，强调日常真正用得上的停留方式。气候参数、降水与区位分析单独成图，最后用一张总展板把分析、策略与效果收在一起。",
    preview: [1, 8, 9, 10],
    images: [
      image("healing-park", 1, "兰州九洲疗愈公园鸟瞰图", "鸟瞰：公园嵌在城市街区里"),
      image("healing-park", 2, "兰州九洲疗愈公园作品集总览", "作品集总览：四张展板放在同一页", "board"),
      image("healing-park", 3, "兰州九洲疗愈公园设计分析", "设计分析：区位、策略与总平", "board"),
      image("healing-park", 4, "兰州九洲疗愈公园交通分析", "交通分析：周边道路与步行入口", "board"),
      image("healing-park", 5, "兰州九洲疗愈公园气候数据", "气候数据：温度、降水与日照", "board"),
      image("healing-park", 6, "兰州九洲疗愈公园乡土植物选型", "乡土植物：乔木、花灌木与地被", "board"),
      image("healing-park", 7, "兰州九洲疗愈公园功能分区", "功能分区：把疗愈拆成几种日常", "board"),
      image("healing-park", 8, "兰州九洲疗愈公园儿童活动效果图", "儿童活动：橙色场地与木平台"),
      image("healing-park", 9, "兰州九洲疗愈公园互动水景效果图", "互动水景：可进入的圆形浅池"),
      image("healing-park", 10, "兰州九洲疗愈公园中央草坪效果图", "中央草坪：给城市留一块空地"),
      image("healing-park", 11, "兰州九洲疗愈公园设计分析图", "设计分析：区位、现状、总平与十二项专项", "board"),
      image("healing-park", 12, "兰州九洲疗愈公园节点效果汇总", "节点效果：草坪、水景、儿童活动与球场", "portrait"),
      image("healing-park", 13, "兰州九洲疗愈公园作品集版面", "作品集版面：分析、策略与效果的总览", "portrait"),
      image("healing-park", 14, "兰州九洲疗愈公园基本气候参数", "气候参数：温度、降水、风与日照", "board"),
      image("healing-park", 15, "兰州九洲疗愈公园降水量表", "降水：全年分布与 7—9 月峰值", "board"),
      image("healing-park", 16, "兰州九洲疗愈公园区位分析", "区位：从中国、甘肃到九州开发区", "board"),
      image("healing-park", 17, "兰州九洲疗愈公园总展板", "总展板：从场地分析到节点效果", "portrait")
    ]
  },

  /* ---------- 室内 ---------- */
  {
    slug: "interior-home",
    title: "居住空间室内设计",
    en: "Residential Interior",
    category: "室内",
    year: "2024",
    featured: true,
    role: "平面优化 / 材质搭配 / 全屋效果",
    tools: "AutoCAD · 3ds Max · VRay · Photoshop",
    summary: "一套住宅的平面优化、材质搭配与全屋表达。",
    description:
      "从原始户型到彩平，再到客厅、主卧、次卧、厨房与卫生间，完整走一遍住宅室内设计流程。重点处理收纳、动线、灯光和材质的统一，让效果图不只是好看，也能对应真实的施工逻辑。",
    images: [
      image("interior-home", 1, "居住空间室内设计客厅效果图", "客厅：奶油底、石材与暖光"),
      image("interior-home", 2, "居住空间室内设计主卧效果图", "主卧：软包床、纱帘与午后光"),
      image("interior-home", 3, "居住空间室内设计次卧效果图", "次卧：书桌与睡眠共用一面墙"),
      image("interior-home", 4, "居住空间室内设计厨房效果图", "厨房：木饰面、大理石与连续台面"),
      image("interior-home", 5, "居住空间室内设计卫生间效果图", "卫生间：石材、镜面与花艺"),
      image("interior-home", 6, "居住空间室内设计卧室效果图", "卧室：灰色墙面与照片墙"),
      image("interior-home", 7, "居住空间室内设计彩平图", "彩平图：家具与动线的整体校验", "board"),
      image("interior-home", 8, "居住空间室内设计原始 CAD 平面", "原始 CAD 平面：改造前的空间关系", "board"),
      image("interior-home", 9, "居住空间设计展板", "展板：平面、立面、节点与效果的整体呈现", "board"),
      image("interior-home", 10, "现代简约风主卧与软装展板", "软装展板：材质、灯光与主卧氛围", "board")
    ]
  },
  {
    slug: "warm-kitchen",
    title: "暖木餐厨空间",
    en: "Warm Wood Kitchen & Dining",
    category: "室内",
    year: "2026",
    role: "概念设定 / 材质与光线 / 效果表达",
    tools: "AIGC · Photoshop",
    summary: "用木色、红椅和午后侧光，把餐厨做成可以慢下来的角落。",
    description:
      "以开放式餐厨为对象，先把圆桌、岛台和走廊排进同一条视线，再用胡桃木、暖白墙、细条砖和一抹红椅建立温度。画面刻意保留午后的斜光与生活痕迹：水果、藤椅、半开的门和窗外的树。相比上一套偏理性的居住空间，这次更关心材质在光里的变化，以及一个人坐下来吃饭时的尺度。",
    images: [
      image("warm-kitchen", 1, "暖木餐厨空间效果图", "餐厨一体：圆桌、木柜与走廊尽头的窗", "portrait")
    ]
  },
  {
    slug: "office-space",
    title: "办公空间设计",
    en: "Office Space Design",
    category: "室内",
    year: "2026",
    featured: true,
    role: "平面规划 / 家具与灯光 / 效果表达",
    tools: "AutoCAD · SketchUp · Enscape · Photoshop",
    summary: "开放工位、会议与接待，串成一条清晰的工作动线。",
    description:
      "以开放办公区为核心，沿窗布置工位，把会议、接待与茶水收进内侧；木色桌面、黑色钢构与绿植控制整体温度。三张效果图分别看开放办公、靠窗工位与会议接待，重点处理自然采光、桌面照度与视线遮挡。",
    preview: [2, 1, 3],
    images: [
      image("office-space", 1, "办公空间开放工位效果图", "开放工位：沿窗布置，保留自然采光"),
      image("office-space", 2, "办公空间靠窗工位效果图", "靠窗工位：把绿意带进工作区"),
      image("office-space", 3, "办公空间会议接待效果图", "会议接待：玻璃隔断保持通透")
    ]
  },
  {
    slug: "exhibition-space",
    title: "民俗文化展陈空间",
    en: "Folk Culture Exhibition Space",
    category: "室内",
    year: "2026",
    role: "展陈动线 / 展墙与展柜 / 灯光设计",
    tools: "AutoCAD · SketchUp · Enscape · Photoshop",
    summary: "把民俗器物放回一条可以慢慢读完的环形展线。",
    description:
      "方案以“文脉相连”为题，用环形吊顶和中心展台组织参观动线，展墙依次排开非遗、民俗器物与图文资料；重点展品放在视线中心，展柜与展台用木色压低背景，灯光只照亮需要被读到的部分。三张效果图覆盖中心展台、展墙走廊与器物展区。",
    preview: [1, 3, 2],
    images: [
      image("exhibition-space", 1, "民俗文化展陈中心展台", "中心展台：红色狮头与环形吊顶"),
      image("exhibition-space", 2, "民俗文化展陈展墙走廊", "展墙走廊：图文与器物交替"),
      image("exhibition-space", 3, "民俗文化展陈器物展区", "器物展区：乐器与陶器陈列")
    ]
  },
  {
    slug: "interior-colorplans",
    title: "室内彩平配色",
    en: "Interior Color Plans",
    category: "室内",
    year: "2024",
    role: "平面梳理 / 色彩方案 / 图面表达",
    tools: "AutoCAD · Photoshop",
    summary: "同一套户型，五套不同的彩平配色。",
    description:
      "以同一套住宅平面为底，分别尝试奶油蓝、暗色、莫兰迪黄绿、高对比跳色与低饱和马卡龙五套配色。每张图保留家具、地面与软装的材质层级，用颜色区分公共区、卧室与辅助空间，作为方案汇报时的氛围比对。",
    preview: [3, 4, 1],
    images: [
      image("interior-colorplans", 1, "奶油蓝室内彩平", "奶油蓝：低饱和公共区", "board"),
      image("interior-colorplans", 2, "暗黑风格室内彩平", "暗色：深色地面与重点家具", "board"),
      image("interior-colorplans", 3, "莫兰迪黄绿室内彩平", "莫兰迪黄绿：柔和分区", "board"),
      image("interior-colorplans", 4, "高级感跳色室内彩平", "跳色：用高饱和家具点出重心", "board"),
      image("interior-colorplans", 5, "马卡龙低饱和室内彩平", "马卡龙：低饱和卧室与公共区", "board")
    ]
  },

  /* ---------- 视觉 ---------- */
{
    slug: "logo-design",
    title: "品牌标志设计",
    en: "Brand Marks",
    category: "视觉",
    year: "2025",
    role: "概念提炼 / 图形与字标 / 组合规范",
    tools: "Illustrator · Photoshop",
    summary: "两个品牌，两种语言：一个把稻田圈进圆里，一个把时钟折进杯身。",
    description:
      "半刻咖啡把咖啡杯和表盘拼成同一个圆，用一条分割线让杯身与指针共用轮廓，让“半刻”这个名字在图形里就被读到；雨禾村大米用稻田、远山、屋舍与稻穗围成闭环，一版偏写实、一版更概括，配合偏宋的笔画强调产地与新鲜。两套标志都整理了横竖组合、单色与反白用法，保证在小尺寸和包装上都能站住。",
    images: [
      image("logo-design", 1, "半刻咖啡标志：咖啡杯与时钟", "半刻咖啡：杯身与表盘共用一条分割线", "board"),
      image("logo-design", 2, "雨禾村大米标志：稻田与松柏", "雨禾村：稻田、松柏与水流的闭环", "portrait"),
      image("logo-design", 3, "湘西雨禾村大米标志：远山与稻穗", "湘西雨禾村：远山、屋舍与稻穗的横版组合", "board")
    ]
  },
  {
    slug: "national-day-poster",
    title: "国庆主题海报",
    en: "National Day Poster",
    category: "视觉",
    year: "2026",
    role: "主题构思 / 画面合成 / 字体排版",
    tools: "Photoshop",
    summary: "把天安门、红旗与秋叶，放进同一个黄昏。",
    description:
      "以“金秋拾光”为题，用暖橙的天光、被风掀起的红旗和散落的枫叶组织画面，让主旋律题材不只剩下红色块面。书法标题压在上部，拼音与日期做次级信息，正文收进下方留白，形成从情绪到信息的阅读顺序；边缘用落叶和远山收口，避免画面散掉。",
    images: [
      image("national-day-poster", 1, "国庆主题海报", "金秋拾光：天安门、红旗与秋叶", "portrait")
    ]
  },
  {
    slug: "art-investigation",
    title: "艺术考察展板",
    en: "Art Field Study Board",
    category: "视觉",
    year: "2023",
    role: "考察记录 / 信息梳理 / 版式",
    tools: "Photoshop · InDesign",
    summary: "把一次艺术考察的路线、器物与纹样，收进一张可读的展板。",
    description:
      "以 2023 年艺术考察为线索，把行程、现场照片、器物细节和纹样提取排成一张纵向展板。版面先用路线把阅读顺序定下来，再用统一的图注和色块收住不同来源的素材，避免考察记录变成照片堆叠。",
    images: [
      image("art-investigation", 1, "艺术考察课程展板", "艺术考察：路线、器物与纹样提取", "board")
    ]
  },
  {
    slug: "jiahui-dental",
    title: "佳惠口腔推广海报",
    en: "Jiahui Dental Campaign Posters",
    category: "视觉",
    year: "2026",
    role: "信息架构 / 版式设计 / 系列延展",
    tools: "Photoshop · Illustrator",
    summary: "把线下地推、线上账号与短视频运营，整理成三张能读懂的服务海报。",
    description:
      "围绕口腔门诊的获客流程，做三张同一家族的推广海报：第一张讲社区地推与到店咨询，第二张讲短视频账号的全流程托管，第三张把播放、留言和新增客户做成可核对的数据。三张都沿用佳惠的深绿与米白，先用大标题给出承诺，再用三步流程和实拍场景降低理解成本，让海报既能贴在社区，也能在手机里转发。",
    images: [
      image("jiahui-dental", 1, "佳惠口腔线下推广帮扶海报", "线下推广：社区地推、精准获客与到店咨询", "portrait"),
      image("jiahui-dental", 2, "佳惠口腔线上账号帮扶海报", "线上账号：从选题、拍摄到咨询的全程托管", "portrait"),
      image("jiahui-dental", 3, "佳惠口腔短视频运营海报", "短视频运营：播放、留言与新增客户的数据复盘", "portrait")
    ]
  },
  {
    slug: "pechoin-floral",
    title: "百雀羚本草清韵品牌插花",
    en: "Pechoin Herbal Floral",
    category: "视觉",
    year: "2026",
    role: "品牌调研 / 花艺设计 / 展板版式",
    tools: "Photoshop · Illustrator",
    summary: "把百雀羚的“科技新本草”，翻译成一组可以闻见的花。",
    description:
      "以百雀羚“本草清韵”为主题做一组品牌插花与展板：先梳理品牌与门店空间，再从蓝紫、奶白和淡黄里定下色彩，用绣球、玫瑰、郁金香、薰衣草和满天星搭出高低错落的圆形构图。展板把这组花放回产品、空间与品牌话术里，让花艺不只是装饰，而是能被读懂的品牌体验。",
    images: [
      image("pechoin-floral", 1, "百雀羚本草清韵品牌插花展板", "本草清韵：品牌调研、花材选型与成品分析", "board")
    ]
  },
  {
    slug: "smho-poster",
    title: "SMHO 设计师拼贴海报",
    en: "SMHO Designer Collage",
    category: "视觉",
    year: "2026",
    role: "概念构思 / 图像拼贴 / 字体编排",
    tools: "Photoshop",
    summary: "把图纸、色卡、花材和日常工具，拼成一张设计师的自画像。",
    description:
      "以“SMHO”四个字母作为画面骨架，把 CAD 图、效果图、色卡、植物、皮影和手作工具从四周向中心堆叠，人物坐在工作台前，像被自己的工作包围。拼贴保留纸张边缘和印刷颗粒，红色只留给印章、花和标题，让画面在密集信息里仍有一条清楚的阅读路径；二维码放在左下角，作为可继续联系的出口。",
    images: [
      image("smho-poster", 1, "SMHO 设计师拼贴海报", "SMHO：图纸、色卡与工作台的自画像", "portrait")
    ]
  },
  {
    slug: "seoul-collage",
    title: "首尔城市影像拼贴",
    en: "Seoul City Collage",
    category: "视觉",
    year: "2026",
    role: "城市摄影 / 图像拼贴 / 版式",
    tools: "Photoshop",
    summary: "用黑白照片、撕纸边缘和经纬度，拼出一座城市的高差。",
    description:
      "以首尔的高架、南山塔和夜间车流为素材，把不同时间与视角的照片撕开再叠合：桥体从画面上方压下，街道从下方穿过，中间留出天空和山脊的呼吸。全片只用黑白灰，靠纸张纹理、半调和硬边阴影区分层次；左下角用姓名与经纬度收住画面，让一张城市拼贴同时像一张档案和一张海报。",
    images: [
      image("seoul-collage", 1, "首尔城市影像拼贴海报", "首尔：高架、南山塔与夜间车流", "portrait")
    ]
  },

  /* ---------- 包装 ---------- */
  {
    slug: "coffee-brand",
    title: "半刻咖啡品牌与包装",
    en: "BANKE Coffee",
    category: "包装",
    year: "2026",
    featured: true,
    role: "标志设计 / 包装结构 / 场景呈现",
    tools: "Illustrator · Photoshop · InDesign",
    summary: "从标志、字体到挂耳盒、杯套与展板的完整品牌触点。",
    description:
      "以“半刻”作为品牌名，建立一套偏暖、偏静的咖啡视觉。标志把咖啡杯与时钟合并，包装用纸张、印章和手写感字体延续同一语气；从挂耳盒、豆罐到杯套、展板与人物海报，尽量让每个触点都说得同一种话。",
    preview: [1, 2, 8],
    images: [
      image("coffee-brand", 1, "半刻咖啡挂耳包装陈列", "挂耳咖啡系列陈列"),
      image("coffee-brand", 2, "半刻咖啡罐装包装陈列", "罐装系列：把烘焙度做成色彩"),
      image("coffee-brand", 3, "半刻咖啡杯套与标志", "杯套与标志：把时间折进杯身"),
      image("coffee-brand", 4, "半刻咖啡纸盒结构", "纸盒结构：展开面与信息层级", "board"),
      image("coffee-brand", 5, "半刻咖啡组合陈列", "组合陈列：礼盒与单品的并置"),
      image("coffee-brand", 6, "半刻咖啡三款挂耳盒产品图", "产品图：三款烘焙度并置"),
      image("coffee-brand", 7, "半刻咖啡门店场景陈列", "门店场景：让包装回到吧台"),
      image("coffee-brand", 8, "半刻咖啡包装设计展板", "展板：从标志、包装到场景的总览", "board"),
      image("coffee-brand", 9, "半刻咖啡人物海报", "人物海报：把包装放进生活场景", "portrait"),
      image("coffee-brand", 10, "半刻咖啡场景海报", "场景海报：货架与咖啡罐的组合", "portrait")
    ]
  },

  {
    slug: "rice-brand",
    title: "雨禾村大米包装",
    en: "Yuhecun Rice",
    category: "包装",
    year: "2026",
    role: "标志设计 / 包装设计",
    tools: "Illustrator · Photoshop · 3D 渲染",
    summary: "用稻田、山形与米粒，建立区域大米的品牌表情。",
    description:
      "标志把稻穗、山形与村落收进一个圆形轮廓，包装以米白、草绿和木色为主，强调产地与新鲜感。三款立式袋分别对应粳米、籼米与糯米，用同一套山水图形和不同底色区分米种；设计尽量克制，让“米”本身成为画面的主角。",
    preview: [1, 2, 3],
    images: [
      image("rice-brand", 1, "雨禾村三款大米包装", "三款包装：粳米、籼米与糯米"),
      image("rice-brand", 2, "雨禾村大米标志：稻田与山形", "雨禾村标志：稻田、山形与村落", "board"),
      image("rice-brand", 3, "雨禾村大米标志应用", "标志应用：把产地收进圆形", "board")
    ]
  },

  {
    slug: "xihe-rice",
    title: "溪禾大米包装",
    en: "Xihe Rice Packaging",
    category: "包装",
    year: "2026",
    role: "包装系统 / 图形延展 / 场景呈现",
    tools: "Illustrator · Photoshop · 3D 渲染",
    summary: "三款米种，用黄、绿、白三种纸色分开，也把稻田收进同一套图形。",
    description:
      "溪禾大米按米种建立三条色彩线：暖黄、草绿和米白。正面用米粒、稻穗与产地信息组成可缩放的网格，侧面留给规格与烹饪说明；五张场景图统一木质托盘、稻穗和散落米粒，让三款包装在货架上既能并排，也能单独站住。",
    images: [
      image("xihe-rice", 1, "溪禾大米三款包装场景", "三款并排：黄、绿、白"),
      image("xihe-rice", 2, "溪禾大米包装盒正面", "包装盒：米粒网格与产地信息"),
      image("xihe-rice", 3, "溪禾大米立式袋包装", "立式袋：把稻穗做成大面积图形"),
      image("xihe-rice", 4, "溪禾大米包装组合细节", "组合细节：纸张、提手与封口"),
      image("xihe-rice", 5, "溪禾大米全系列陈列", "全系列：盒、袋与礼盒一起上架")
    ]
  },

  {
    slug: "pastry-packaging",
    title: "桃酥包装",
    en: "Peach Pastry Packaging",
    category: "包装",
    year: "2026",
    role: "包装设计 / 场景呈现",
    tools: "Illustrator · Photoshop · 3D 渲染",
    summary: "用暖色纸张与中式纹样，更新传统点心的货架形象。",
    description:
      "把桃酥的圆形、酥皮纹理和节庆感转成包装图形，兼顾单盒、开窗盒、翻盖盒与组合装的陈列效果。三款口味用可可、原味与无糖分开，标志把桃酥与麦穗围进同一枚印章；目标不是把传统做得更老，而是让它在货架上更容易被年轻人拿起来。",
    preview: [1, 2, 3],
    images: [
      image("pastry-packaging", 1, "桃酥三款礼盒包装", "三款礼盒：可可、原味与无糖"),
      image("pastry-packaging", 2, "桃酥开窗盒型陈列", "开窗盒型：三种口味的陈列"),
      image("pastry-packaging", 3, "桃酥盒面设计", "盒面设计：圆形桃酥与中式纹样"),
      image("pastry-packaging", 4, "桃酥翻盖盒结构", "翻盖盒结构：展开面与内衬", "board"),
      image("pastry-packaging", 5, "原味桃酥产品与包装", "原味桃酥：产品与包装的关系"),
      image("pastry-packaging", 6, "卓酥记品牌标志", "卓酥记标志：桃酥与麦穗", "board")
    ]
  },

  /* ---------- 文创 ---------- */
  {
    slug: "dunhuang-bookmark",
    title: "敦煌飞天珐琅书签",
    en: "Dunhuang Enamel Bookmark",
    category: "文创",
    year: "2025",
    role: "纹样转译 / 产品设计 / 包装呈现",
    tools: "Illustrator · Photoshop · 3D 渲染",
    summary: "把藻井、飘带与金线，转译成一枚可佩戴的书签。",
    description:
      "从敦煌飞天的色彩、纹样和金属工艺出发，完成书签的正反面、包装与展示板。用珐琅的亮面和金线做层次，让文创不只停留在图案复制，也能让人愿意拿在手里反复看。",
    images: [
      image("dunhuang-bookmark", 1, "敦煌飞天珐琅书签主视觉", "珐琅书签主视觉", "portrait"),
      image("dunhuang-bookmark", 2, "敦煌飞天书签与包装", "书签与包装：把飞天放进书页", "portrait"),
      image("dunhuang-bookmark", 3, "敦煌飞天书签工艺说明海报", "工艺说明：掐丝、珐琅与尺寸", "portrait"),
      image("dunhuang-bookmark", 4, "敦煌飞天书签使用场景", "使用场景：书页与茶席之间"),
      image("dunhuang-bookmark", 5, "敦煌飞天书签三视图", "三视图：尺寸与结构"),
      image("dunhuang-bookmark", 6, "敦煌飞天书签宣传海报", "宣传海报：深色底与金线细部", "portrait"),
      image("dunhuang-bookmark", 7, "敦煌飞天书签礼盒", "礼盒：深绿与金的收纳", "portrait"),
      image("dunhuang-bookmark", 8, "敦煌飞天书签细节特写", "细节特写：金线、珠饰与书页", "portrait"),
      image("dunhuang-bookmark", 9, "敦煌飞天书签包装海报", "包装海报：礼盒、卡片与工艺", "board"),
      image("dunhuang-bookmark", 10, "敦煌飞天掐丝珐琅书签研报", "研报：纹样提取、工艺、尺寸与色彩系统", "board")
    ]
  },
  {
    slug: "horse-plush",
    title: "马踏飞燕毛绒玩具",
    en: "Galloping Horse Plush",
    category: "文创",
    year: "2025",
    role: "造型转译 / 产品呈现",
    tools: "Illustrator · Photoshop · 3D 渲染",
    summary: "把文物造型翻译成可拥抱的毛绒语言。",
    description:
      "以马踏飞燕为原型，保留三足腾空的动势，同时把青铜的硬边改成毛绒的圆润体块。展板呈现造型推演、配色与包装，尝试在“像文物”和“想抱一下”之间找到平衡。",
    images: [
      image("horse-plush", 1, "马踏飞燕文创毛绒玩具展板", "文创展板：造型推演、三视图、包装与品牌吊牌", "board")
    ]
  },

  /* ---------- AIGC ---------- */
  {
    slug: "oriental-beauty",
    title: "东方美学美妆视觉",
    en: "Oriental Beauty",
    category: "AIGC",
    year: "2026",
    featured: true,
    role: "概念设定 / AIGC 生成 / 后期统一",
    tools: "Midjourney · ComfyUI · Photoshop",
    summary: "从封神到赵飞燕，两组东方美妆概念视觉。",
    description:
      "以神话人物、青铜器、香炉和织物为线索，为口红与香水建立两组不同的东方叙事。AIGC 负责概念图与氛围，后期统一光线、材质和版式，让五张图像同一个品牌的不同章节。",
    images: [
      image("oriental-beauty", 1, "赵飞燕系列香水主视觉", "赵飞燕香水：人物、香气与器物", "portrait"),
      image("oriental-beauty", 2, "赵飞燕系列香水海报", "香水海报：把青铜器放进画面", "portrait"),
      image("oriental-beauty", 3, "赵飞燕系列香水人物视觉", "人物视觉：低光与金箔", "portrait"),
      image("oriental-beauty", 4, "赵飞燕系列香水产品视觉", "产品视觉：香气落在瓶身", "portrait"),
      image("oriental-beauty", 5, "封神系列口红视觉", "封神口红：神话色彩与金属外壳", "portrait")
    ]
  },
  {
    slug: "aigc-illustration",
    title: "AIGC 创作者插画",
    en: "AIGC Creator Portraits",
    category: "AIGC",
    year: "2026",
    role: "概念设定 / AIGC 生成 / 系列统一",
    tools: "Midjourney · ComfyUI · Photoshop",
    summary: "把工作台、手稿与日常物件，编进四种创作者的工作状态。",
    description:
      "用 AIGC 生成一组创作者形象插画，把桌面、纸张、植物和屏幕作为叙事道具。四张图分别对应空间设计、花艺、亲子创作和手绘练习，保持同一套暖色与光线，形成可以继续扩展的系列，也用来练习如何把提示词变成稳定的视觉语言。",
    images: [
      image("aigc-illustration", 1, "AIGC 空间设计师插画", "空间设计师：工作台与手稿", "portrait"),
      image("aigc-illustration", 2, "AIGC 花艺设计师插画", "花艺设计师：纸片与植物", "portrait"),
      image("aigc-illustration", 3, "AIGC 亲子创作插画", "亲子创作：画笔与花束", "portrait"),
      image("aigc-illustration", 4, "AIGC 手绘练习插画", "手绘练习：草图与色卡", "portrait")
    ]
  },
  {
    slug: "aigc-commercial",
    title: "AIGC 商业海报",
    en: "AIGC Commercial Posters",
    category: "AIGC",
    year: "2026",
    role: "概念设定 / 提示词 / 版式合成",
    tools: "Midjourney · Photoshop",
    summary: "六组商业语气练习：耳机、护肤、美食、婚礼与运动。",
    description:
      "用同一套工作流处理不同品类：先用提示词锁定光线、材质和镜头，再在 Photoshop 里补上标题、参数和品牌语气。BOLT 用冷灰和白色产品压住人物，Glossier 用粉色拼贴保留“真实皮肤”，三张美食海报统一在悬浮构图里；婚礼与跑者两张把电影感光线和插画线条放进同一组练习。",
    images: [
      image("aigc-commercial", 1, "BOLT 无线耳机广告", "BOLT：把声音做成轻盈的光", "portrait"),
      image("aigc-commercial", 2, "Glossier 护肤拼贴广告", "Glossier：粉色拼贴与真实皮肤", "portrait"),
      image("aigc-commercial", 3, "三联浮空美食海报", "浮空美食：三种口味的垂直构图", "portrait"),
      image("aigc-commercial", 4, "电影感红花婚礼三联画", "婚礼三联画：红花与低光", "portrait"),
      image("aigc-commercial", 5, "涂鸦跑者运动海报", "跑者：插画线条拉住实拍人物", "portrait"),
      image("aigc-commercial", 6, "DEFY GRAVITY 汉堡广告", "DEFY GRAVITY：让汉堡离开桌面", "portrait")
    ]
  },
  {
    slug: "fridge-magnets",
    title: "AIGC IP 冰箱贴与主题墙",
    en: "AIGC Fridge Magnets & Feature Wall",
    category: "AIGC",
    year: "2026",
    role: "IP 设定 / AIGC 生成 / 产品与空间延展",
    tools: "Midjourney · ComfyUI · Photoshop",
    summary: "从一组圆形 IP 冰箱贴，长成一面可以逛的主题墙。",
    description:
      "先以身边的人物、动物、花和相机为原型，生成两组圆形冰箱贴：一组是“李小满”的卡通日常，一组是“老李”的热爱创造。每个徽章都保留厚珐琅的高光和金属包边，让它们像真的能吸在冰箱上；再把图案放大、拆散，铺进零售空间的黄色主题墙，完成从产品到空间的一次延展。",
    images: [
      image("fridge-magnets", 1, "AIGC IP 冰箱贴：李小满系列", "李小满系列：人物、花与相机", "portrait"),
      image("fridge-magnets", 2, "AIGC IP 冰箱贴：老李系列", "老李系列：热爱创造与日常工具", "portrait"),
      image("fridge-magnets", 3, "AIGC IP 主题墙与零售空间", "主题墙：把徽章放大成一整面黄色"),
      image("fridge-magnets", 4, "AIGC IP 主题墙陈列", "陈列：产品、画框与货架"),
      image("fridge-magnets", 5, "AIGC IP 主题墙细节", "细节：浮雕、珐琅与手作痕迹", "portrait")
    ]
  },

  /* ---------- 手绘 ---------- */
  {
    slug: "hand-drawing",
    title: "手绘表现",
    en: "Hand Drawing",
    category: "手绘",
    year: "2023-2024",
    role: "空间透视 / 景观表达 / 马克笔",
    tools: "马克笔 · 针管笔 · 水彩",
    summary: "从室内透视到建筑与景观小方案，用手绘保持对光线和尺度的敏感。",
    description:
      "一组课程与日常练习：室内大堂、楼梯与走廊的马克笔与针管笔透视，露台与景观小方案的快速配色，建筑群总平线稿，以及乔木、棕榈、叠石跌水、景墙台阶和灯具的单体练习。手绘在这里不只是效果，而是推敲方案的工具；线条、比例和明暗都要为设计判断服务。",
    images: [
      image("hand-drawing", 1, "室内空间马克笔透视手绘", "室内空间：马克笔与针管笔"),
      image("hand-drawing", 2, "露台方案快速配色手绘", "露台方案：八组快速配色"),
      image("hand-drawing", 3, "景观小方案推敲手绘", "小方案推敲：九组平面与立面", "portrait"),
      image("hand-drawing", 4, "建筑群总平面线稿", "建筑群总平：线稿与屋顶", "portrait"),
      image("hand-drawing", 5, "水彩小品手绘", "水彩小品：色块与留白", "portrait"),
      image("hand-drawing", 6, "人与家具尺度分析手绘", "尺度分析：人与家具", "portrait"),
      image("hand-drawing", 7, "建筑与场地透视手绘", "场地透视：建筑、台阶与树", "portrait"),
      image("hand-drawing", 8, "空间分解轴测手绘", "分解轴测：把结构拆开看", "portrait"),
      image("hand-drawing", 9, "建筑透视手绘", "建筑透视：红绿对比与树影", "portrait"),
      image("hand-drawing", 10, "室内色彩透视手绘", "室内色彩：马克笔铺大关系"),
      image("hand-drawing", 11, "景观色彩透视手绘", "景观色彩：树荫与水面的冷暖"),
      image("hand-drawing", 12, "室内沙发区色彩手绘", "沙发区：材质与色彩的快速表达"),
      image("hand-drawing", 13, "景观元素组合手绘", "景观元素：乔木、花池、绿篱与铺装"),
      image("hand-drawing", 14, "棕榈树姿态线稿", "棕榈树：两种姿态的线稿", "portrait"),
      image("hand-drawing", 15, "叠石与跌水手绘", "叠石与跌水：用排线分出水与石"),
      image("hand-drawing", 16, "景墙与台阶透视手绘", "景墙与台阶：把树根放进构造"),
      image("hand-drawing", 17, "孤植大树手绘", "孤植大树：树干、树冠与光影"),
      image("hand-drawing", 18, "室内楼梯透视手绘", "室内楼梯：一点透视与栏板", "portrait"),
      image("hand-drawing", 19, "室内走廊透视手绘", "室内走廊：吊顶、柜体与透视网格", "portrait"),
      image("hand-drawing", 20, "建筑立面配色手绘", "建筑立面配色：四组马克笔推敲", "portrait"),
      image("hand-drawing", 21, "沙发与单椅色彩手绘", "沙发与单椅：五组色彩练习"),
      image("hand-drawing", 22, "灯具造型手绘", "灯具：吊灯、壁灯与落地灯"),
      image("hand-drawing", 23, "庭院透视手绘", "庭院透视：廊架、台阶与树影", "portrait"),
      image("hand-drawing", 24, "家具与座椅草图", "家具草图：桌、椅与凳的比例推敲", "portrait")
    ]
  },
  {
    slug: "drafting-details",
    title: "制图与节点",
    en: "Drafting & Details",
    category: "手绘",
    year: "2024",
    role: "节点大样 / 家具尺度 / 制图表达",
    tools: "针管笔 · 马克笔 · 硫酸纸",
    summary: "用针管笔把构造、家具和亭子画到能落地。",
    description:
      "一组以“画清楚”为目标的手绘练习：先用手绘把家具、座椅和六角亭的体块与尺度画准，再把铺装、景墙、座凳的构造大样画到能落地。线宽用来区分材料与结构，标注落在真实尺寸上。景石座凳、弧形廊架、树池与木构大样，把石头、木格栅和混凝土基础放进同一张图里。相比效果图，这批图更关心连接方式、比例和标注，是方案能否落地的那一半。",
    images: [
      image("drafting-details", 1, "家具透视手绘", "家具透视：床与沙发", "board"),
      image("drafting-details", 2, "铺装与景墙构造大样", "构造大样：铺装、景墙与座凳", "board"),
      image("drafting-details", 3, "座凳平面与剖面大样", "座凳大样：平面、剖面与尺寸", "board"),
      image("drafting-details", 4, "六角亭平立剖手绘", "六角亭：平立剖与柱网", "board"),
      image("drafting-details", 5, "座凳石材节点大样", "石材节点：收边与固定", "board"),
      image("drafting-details", 6, "透视网格练习", "透视网格：用辅助线校正比例", "portrait"),
      image("drafting-details", 7, "座椅造型草图", "座椅草图：三视图与透视", "portrait"),
      image("drafting-details", 8, "家具与铺装样式手绘", "家具与铺装样式：桌面、座凳与景框", "portrait"),
      image("drafting-details", 9, "弧形座凳平立剖大样", "弧形座凳：平面、立面与坐面收边", "board"),
      image("drafting-details", 10, "乔木种植与树池剖面", "乔木种植：树池、土球与根系层次", "board"),
      image("drafting-details", 11, "廊架与木构节点大样", "廊架节点：木梁、钢柱与基础", "board"),
      image("drafting-details", 12, "树池与坐凳剖面大样", "树池坐凳：面层、种植土与混凝土", "board")
    ]
  },
  {
    slug: "cad-drafting",
    title: "CAD 制图与节点",
    en: "CAD Drafting Studies",
    category: "手绘",
    year: "2024",
    role: "平立剖绘制 / 节点大样 / 图纸排版",
    tools: "AutoCAD · Photoshop",
    summary: "从家具、柜体到楼梯与餐厅立面的一套制图练习。",
    description:
      "课程制图练习，包含家具三视图、书柜立面、住宅平面、楼梯剖面、踏步大样与餐厅立面。图纸按统一线宽与标注层级整理，重点练习尺寸链、材料标注和节点放大，让方案能落到施工图的语言里。",
    preview: [1, 2, 4],
    images: [
      image("cad-drafting", 1, "CAD 制图课程作业总览", "课程作业：四组图纸的总览", "board"),
      image("cad-drafting", 2, "家具三视图", "家具三视图：尺寸与结构关系", "board"),
      image("cad-drafting", 3, "书柜立面图", "书柜立面：分格与材料标注", "board"),
      image("cad-drafting", 4, "住宅平面图", "住宅平面：墙体、家具与尺寸链", "board"),
      image("cad-drafting", 5, "楼梯剖面图", "楼梯剖面：踏步与平台关系", "board"),
      image("cad-drafting", 6, "踏步大样图", "踏步大样：面层与结构收口", "board"),
      image("cad-drafting", 7, "餐厅立面图", "餐厅立面：柜体、灯具与标注", "board")
    ]
  },

  /* ---------- 模型 ---------- */
  {
    slug: "shizilin-model",
    title: "古典园林模型",
    en: "Classical Garden Model",
    category: "模型",
    year: "2024",
    role: "模型制作 / 场景搭建 / 灯光",
    tools: "木板 · 石膏 · 模型树 · LED",
    summary: "用实体模型，把亭台、廊桥、假山与水系搭成一座可绕行的园子。",
    description:
      "从平面到节点，按传统园林“步移景异”的方式搭一座实体模型：先定水面与假山骨架，再安排亭、廊、桥的视线关系，最后用模型树、石粉和灯光补足层次。制作过程保留了手工痕迹，也刻意控制颜色数量，让照片里先读到空间，再读到细节；最后两张记录组员一起落位和拍下模型的工作状态。",
    images: [
      image("shizilin-model", 1, "古典园林模型整体", "整体：亭台、假山与水系"),
      image("shizilin-model", 2, "古典园林模型俯视", "俯视：院落与游线的关系"),
      image("shizilin-model", 3, "古典园林模型夜景", "夜景：灯光把亭子点亮"),
      image("shizilin-model", 4, "古典园林模型廊桥与水系", "廊桥与水系：红色拱桥跨过溪流"),
      image("shizilin-model", 5, "古典园林模型展陈现场", "展陈现场：模型与围观的人"),
      image("shizilin-model", 6, "古典园林模型制作过程", "制作过程：树、石与建筑的落位"),
      image("shizilin-model", 7, "古典园林模型组员协作", "协作：一起调整建筑与假山的位置"),
      image("shizilin-model", 8, "古典园林模型拍摄现场", "拍摄现场：用手机记录模型细节"),
      image("shizilin-model", 9, "古典园林模型制作细节", "制作细节：调整假山与亭子的关系")
    ]
  },
  {
    slug: "pocket-park-model",
    title: "口袋公园模型",
    en: "Pocket Park Model",
    category: "模型",
    year: "2026",
    role: "模型制作 / 景观节点 / 展陈",
    tools: "木板 · 草粉 · 亚克力 · 模型人",
    summary: "把口袋公园的弧形花池、环形廊架与停坐节点，做成一座可以俯看的实体模型。",
    description:
      "以街角口袋公园为对象，用木板、草粉和亚克力搭出三组弧形花池，把停坐、穿行和观赏的几种状态围合出来。中间的蓝色环形装置和白色圆环廊架是场地的两个记忆点，模型里分别用卡纸和亚克力棒表现；模型人、碎石、花草与路牌补足尺度，让照片里能直接读到人怎么停留、怎么绕行。",
    images: [
      image("pocket-park-model", 1, "口袋公园模型正面", "正面：入口标识与三组弧形花池"),
      image("pocket-park-model", 2, "口袋公园模型俯视", "俯视：停坐区、廊架与穿行路径"),
      image("pocket-park-model", 3, "口袋公园模型中心花池", "中心：弧形花池围出的小人群"),
      image("pocket-park-model", 4, "口袋公园模型环形装置", "节点：蓝色环形装置与橙色座椅"),
      image("pocket-park-model", 5, "口袋公园模型廊架", "廊架：白色圆环与采光筒"),
      image("pocket-park-model", 6, "口袋公园模型标识", "标识：口袋公园与拼音路牌")
    ]
  },
  {
    slug: "tea-showroom-model",
    title: "茶文化展厅空间模型",
    en: "Tea Culture Showroom Model",
    category: "模型",
    year: "2025",
    role: "模型制作 / 空间组织 / 展陈",
    tools: "木板 · 卡纸 · 灰色地坪",
    summary: "用一座俯视模型，推演茶文化展厅的环形茶席与弧形隔断。",
    description:
      "把茶文化展厅拆成三个层次：外围的弧形隔断负责围合与导视，中间的环形茶席承担主要停留，四角的散座与展台补足观看和等候。模型用统一的木色和灰色地坪控制画面，让弧形墙、长桌、圆几与展台的高低关系一眼可读；俯拍角度也方便检查动线是否绕得通。",
    images: [
      image("tea-showroom-model", 1, "茶文化展厅模型俯视", "俯视：环形茶席、弧形隔断与散座"),
      image("tea-showroom-model", 2, "茶文化展厅模型整体", "整体：展厅、茶席与外围隔断")
    ]
  }
];

/* 手稿横向画廊：同样从作品里挑图 */
window.GALLERY_PICKS = [
  { slug: "hand-drawing", n: 1 },
  { slug: "hand-drawing", n: 2 },
  { slug: "hand-drawing", n: 4 },
  { slug: "hand-drawing", n: 7 },
  { slug: "hand-drawing", n: 9 },
  { slug: "hand-drawing", n: 10 },
  { slug: "drafting-details", n: 1 },
  { slug: "drafting-details", n: 3 },
  { slug: "dunhuang-bookmark", n: 1 },
  { slug: "dunhuang-bookmark", n: 3 },
  { slug: "coffee-brand", n: 3 },
  { slug: "coffee-brand", n: 5 }
];
