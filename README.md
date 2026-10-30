# 李贵平 · 设计作品集 2026

面向 HR 快速浏览的单页作品集。包含景观、室内、视觉、文创、AIGC、手绘与模型共 31 个项目，支持按方向筛选、全屏查看项目详情，并适配手机与平板。

## 打开方式

最简单的方式是双击 `index.html`，用 Chrome、Edge 或 Safari 打开。

也可以在本目录启动一个本地服务器：

```powershell
python -m http.server 4173
```

然后访问 `http://127.0.0.1:4173/`。

## 页面结构

- 首屏：插画背景 + 巨型字标，中间是个人介绍卡片，左下角是悬浮入口
- 精选作品：6 组重点项目，点击进入详情
- 全部作品：31 个项目的书脊式索引，可按方向筛选
- 关于：个人简介、技能、教育与在校经历
- 过程：手绘与细节的横向画廊
- 联系：邮箱、电话、所在地与简历下载

项目详情通过地址栏 hash 打开，例如 `index.html#/work/campus-corner`，可以直接把某个项目的链接发给 HR。

## 常改文件

| 想改什么 | 改哪里 |
| --- | --- |
| 姓名、简介、邮箱、电话、求职方向、技能、教育经历 | `data/profile.js` |
| 作品标题、文案、图片顺序、分类、精选 | `data/works.js` |
| 肖像照 | 替换 `assets/img/portrait.jpg` |
| 首屏插画背景 | 替换 `assets/img/hero-bg.jpg`（建议 1536×864） |
| 简历 PDF | 替换 `assets/li-guiping-resume.pdf` |
| 页面配色、字号、间距 | `assets/css/style.css` 顶部的 `:root` 变量 |
| 字体文件 | `assets/fonts/`，改完运行 `python scripts/build_font.py` |

`data/profile.js` 修改后刷新页面即可生效，不需要重新构建。

## 新增作品

最短流程：

```powershell
python scripts/prepare_work.py --slug my-project --src "D:\图片\我的项目"
```

脚本会把图片整理成 `assets/img/works/my-project/01.jpg`、`01-thumb.jpg`，并在根目录生成 `新增作品条目.txt`。把文件里的条目粘进 `data/works.js`，改好标题和说明即可。

完整步骤、字段解释和图片规格见 [新增作品说明.md](新增作品说明.md)。

## 目录

```text
index.html                  页面结构
assets/css/style.css        视觉样式与响应式规则
assets/css/fonts.css        内嵌字体（自动生成，不要手改）
assets/js/app.js            渲染、筛选、项目详情、动效
assets/js/vendor/           GSAP 与 ScrollTrigger（本地文件）
assets/fonts/               字体源文件（子集 woff2 与可变字体）
assets/img/works/           31 个项目的网页图片
assets/img/portrait.jpg     肖像
assets/li-guiping-resume.pdf 简历
data/profile.js             个人资料
data/works.js               作品数据、画廊选图
scripts/prepare_work.py     新作品图片整理工具
scripts/build_images.py     从原始素材重建现有 31 组图片
scripts/build_font.py       重新生成中文子集字体
```

## 重新生成字体

页面使用本地中文子集字体，字体以 base64 内嵌在 `assets/css/fonts.css`，所以直接双击 `index.html` 也能正常显示，不受 `file://` 的字体跨域限制。

新增了较多生僻字后，如果发现个别字变成系统字体，可以运行：

```powershell
python scripts/build_font.py
```

它会重新生成 `assets/fonts/NotoSansSC-subset.woff2`，并自动重写 `assets/css/fonts.css`。需要安装 Python 与 `fonttools`。不运行也能正常浏览，只是新增的字可能回退到系统字体。

## 说明

- 页面不依赖任何外部 CDN，断网也能完整打开。
- 图片已压缩为网页尺寸，原始大图仍保留在根目录的素材文件夹里。
- `scripts/build_images.py` 会清空并重建 `assets/img/works/`，只用于从原始素材重建现有作品，新增作品请用 `prepare_work.py`。

## 部署到 GitHub Pages

将仓库推送到 `main` 分支后，GitHub Actions 会自动发布此静态网站；也可以在 Actions 页面手动运行 `Deploy portfolio to GitHub Pages`。

首次部署前，在仓库的 **Settings → Pages → Build and deployment** 中将 **Source** 设为 **GitHub Actions**。部署完成后，页面地址会显示在该工作流的部署环境中；项目仓库通常使用 `https://<用户名>.github.io/<仓库名>/`。
