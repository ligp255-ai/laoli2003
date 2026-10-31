from pathlib import Path
from PIL import Image, ImageOps
import shutil

ROOT = Path(r"D:\桌面\作品集2003")
OUT = ROOT / "assets" / "img" / "works"
# 注意：作品源目录在 2026-10 之后有调整，本脚本保留用于早期 31 组图片的重建。
# 新增或改版作品请用 prepare_work.py；运行前先核对 WORKS 中的路径。
OUT.mkdir(parents=True, exist_ok=True)

# slug -> ordered list of source files (relative to ROOT)
WORKS = {
    "campus-corner": [
        "校园一角改造/彩平图.png",
        "校园一角改造/展板.psd.jpg",
        "校园一角改造/default (6).jfif",
        "校园一角改造/功能分区图.png",
        "校园一角改造/区位分析图.png",
        "校园一角改造/cad平面图.png",
        "校园一角改造/default (3).jfif",
        "室外效果图/效果图1.png",
        "室外效果图/效果图2.png",
        "室外效果图/效果图3.png",
    ],
    "yunze-plaza": [
        "展板/景观广场.jpg",
        "展板/广场.jpg",
    ],
    "school-planning": [
        "展板/展板.jpg",
    ],
    "waterfront-park": [
        "室外效果图/1效果图1.png",
        "室外效果图/2效果图2.png",
        "室外效果图/3效果图3.png",
        "室外效果图/效果图4.jpg",
        "室外效果图/效果图5.jpg",
    ],
    "red-culture-plaza": [
        "实训红色文化广场/效果图3.jpeg",
        "实训红色文化广场/效果图8.jpeg",
        "实训红色文化广场/效果图9.jpeg",
        "实训红色文化广场/效果图10.jpg",
        "实训红色文化广场/效果图1.jpeg",
        "实训红色文化广场/效果图2.jpeg",
        "实训红色文化广场/俯视图.jpg",
        "展板/研报.jpg",
    ],
    "residential-landscape": [
        "室外效果图/居住区.png",
        "室外效果图/m立面.jpg",
        "室外效果图/效果图.bmp",
    ],
    "interior-home": [
        "实训室内设计/客厅.jpg",
        "实训室内设计/主卧.jpg",
        "实训室内设计/次卧.jpg",
        "实训室内设计/厨房.jpg",
        "实训室内设计/厕所.jpg",
        "实训室内设计/卧室1.jpg",
        "实训室内设计/效果图.png",
        "实训室内设计/微信图片_20251218161729.png",
        "展板/居住空间设计.jpg",
        "展板/软装展板.jpg",
    ],
    "warm-kitchen": [
        "室内效果图/ChatGPT Image 2026年9月4日 13_53_07.png",
    ],
    "coffee-brand": [
        "包装设计/咖啡包装场景整合 (12).png",
        "包装设计/咖啡包装场景整合 (9).png",
        "包装设计/咖啡包装设计杯子及logo设计 (3).png",
        "包装设计/美式咖啡纸盒包装设计.jpeg",
        "包装设计/咖啡包装效果图.png",
        "包装设计/image (5).png",
        "包装设计/咖啡包装场景整合 (10).png",
        "包装设计/咖啡包装场景整合 (11).png",
    ],
    "rice-brand": [
        "包装设计/补齐包装盒渲染图颜色 (7).png",
        "logo设计/1雨禾村大米logo.png",
        "logo设计/2雨禾村大米logo.png",
    ],
    "pastry-packaging": [
        "包装设计/桃酥包装设计.png",
        "包装设计/bz.png",
        "包装设计/包装场景整合 (6).png",
    ],
    "dunhuang-bookmark": [
        "文创/书签设计 (2).jpg",
        "文创/书签设计 (1).jpg",
        "文创/书签设计 (3).jpg",
        "文创/书签设计 (4).jpg",
        "文创/书签设计 (6).jpg",
        "文创/书签设计 (8).jpg",
        "文创/书签设计 (5).jpg",
        "文创/书签设计 (7).jpg",
        "展板/敦煌飞天书签设计.jpg",
        "展板/敦煌飞天——书签设计展板.jpg",
    ],
    "horse-plush": [
        "文创/马踏飞燕——毛绒玩具.png",
        "展板/马踏飞燕文创毛绒玩具.png",
    ],
    "oriental-beauty": [
        "AIGC——作品/赵飞燕系列香水2.png",
        "AIGC——作品/赵飞燕系列香水.png",
        "AIGC——作品/赵飞燕系列香水3.png",
        "AIGC——作品/赵飞燕系列香水4.png",
        "AIGC——作品/封神系列口红.png",
    ],
    "aigc-illustration": [
        "AIGC——作品/形象插画 (1).png",
        "AIGC——作品/形象插画 (2).png",
        "AIGC——作品/形象插画 (3).png",
        "AIGC——作品/形象插画 (4).png",
    ],
    "hand-drawing": [
        "手绘/手绘.jpg",
        "手绘/铺装.jpg",
        "手绘/水体.jpg",
        "手绘/节点.jpg",
        "手绘/微信图片_20240711182641.jpg",
        "手绘/微信图片_20241230195322.jpg",
        "手绘/扫描件_20250616_001(3).jpg",
        "手绘/扫描件_20250616_001(4).jpg",
        "手绘/扫描件_20250622_001(1).jpg",
        "手绘/扫描件_20250622_001(2).jpg",
        "手绘/扫描件_20250622_001(3).jpg",
        "手绘/扫描件_20250622_001.jpg",
        "手绘/IMG_20250616_081058.jpg",
        "手绘/扫描件_20250603_001(2).jpg",
        "手绘/扫描件_20250603_001(3).jpg",
        "手绘/扫描件_20250603_001(4).jpg",
        "手绘/扫描件_20250603_001.jpg",
        "手绘/扫描件_20250616_001(1).jpg",
        "手绘/扫描件_20250616_001(2).jpg",
        "手绘/扫描件_20250616_001(5).jpg",
        "手绘/扫描件_20250616_001(6).jpg",
        "手绘/扫描件_20250616_001(7).jpg",
        "手绘/扫描件_20250616_001.jpg",
    ],
    "drafting-details": [
        "手绘/扫描件_18002000元400600环之李贵平_001.jpg",
        "手绘/012b6179e401830d418498b646f07a3.jpg",
        "手绘/6c87e7de2d55ad1a776591a618babaf.jpg",
        "手绘/扫描件_0000_001.jpg",
        "手绘/扫描件_1200_001.jpg",
        "手绘/扫描件_20250512_001.jpg",
        "手绘/扫描件_20250519_001(1).jpg",
        "手绘/扫描件_20250519_001(2).jpg",
        "手绘/86ed05bf6090e5ed794eb5717084843.jpg",
        "手绘/扫描件_83_001.jpg",
    ],
    "logo-design": [
        "logo设计/半刻咖啡logo.png",
        "logo设计/1雨禾村大米logo.png",
        "logo设计/2雨禾村大米logo.png",
    ],
    "national-day-poster": [
        "展板/国庆.png",
    ],
    "healing-park": [
        "疗愈空间——兰州乡土植物导向下的疗愈空间设计/鸟瞰图.png",
        "疗愈空间——兰州乡土植物导向下的疗愈空间设计/环境设计综合实训作品集1.png",
        "疗愈空间——兰州乡土植物导向下的疗愈空间设计/设计分析图.png",
        "疗愈空间——兰州乡土植物导向下的疗愈空间设计/交通分析图.png",
        "疗愈空间——兰州乡土植物导向下的疗愈空间设计/兰州城关区九州开发区气候表生成.png",
        "疗愈空间——兰州乡土植物导向下的疗愈空间设计/兰州城关区九州开发区气候表生成 (4).png",
        "疗愈空间——兰州乡土植物导向下的疗愈空间设计/功能分区图.png",
        "疗愈空间——兰州乡土植物导向下的疗愈空间设计/效果图 (1).jpg",
        "疗愈空间——兰州乡土植物导向下的疗愈空间设计/效果图 (2).jpg",
        "疗愈空间——兰州乡土植物导向下的疗愈空间设计/效果图 (3).jpg",
        "疗愈空间——兰州乡土植物导向下的疗愈空间设计/分析图.jpg",
        "疗愈空间——兰州乡土植物导向下的疗愈空间设计/效果图 (4).jpg",
        "疗愈空间——兰州乡土植物导向下的疗愈空间设计/环境设计综合实训作品集2.png",
    ],
    "aigc-commercial": [
        "AIGC——作品/BOLTワイヤレスイヤホン広告.png",
        "AIGC——作品/グロッシエー ピンクスキンコラージュ.png",
        "AIGC——作品/三联浮空美食盛宴.png",
        "AIGC——作品/电影感红花婚礼三联画.png",
        "AIGC——作品/落書きに引っ張られる虹色ランナー.png",
        "AIGC——作品/重力を超えるスモーキーバーガー.png",
    ],
    "fridge-magnets": [
        "AIGC——作品/冰箱贴 (1).png",
        "AIGC——作品/冰箱贴 (2).png",
        "AIGC——作品/背景墙 (1).png",
        "AIGC——作品/背景墙 (2).png",
        "AIGC——作品/背景墙 (3).png",
    ],
    "xihe-rice": [
        "包装设计/三款大米包装同场景设计.png",
        "包装设计/三款大米包装同场景设计 (1).png",
        "包装设计/三款大米包装同场景设计 (2).png",
        "包装设计/三款大米包装同场景设计 (3).png",
        "包装设计/三款大米包装同场景设计 (4).png",
    ],
    "art-investigation": [
        "展板/艺术考察期末.jpg",
    ],
    "jiahui-dental": [
        "展板/图片.png",
        "展板/图片 (1).png",
        "展板/图片 (2).png",
    ],
    "pechoin-floral": [
        "展板/1e4fb0dcfb8b972a88a6fca208bee5c.jpg",
    ],
    "smho-poster": [
        "展板/主页设计.jpg",
    ],
    "seoul-collage": [
        "创意设计/微信图片_2026-10-17_152617_606.png",
    ],
    "shizilin-model": [
        "狮子林——模型制作/平面图.png",
        "狮子林——模型制作/平面示意图.png",
        "狮子林——模型制作/节点图3.png",
        "狮子林——模型制作/节点图1.png",
        "狮子林——模型制作/节点图2.png",
        "狮子林——模型制作/制作过程.jpg",
        "狮子林——模型制作/制作过程 (2).jpg",
        "狮子林——模型制作/节点图5.png",
    ],
    "pocket-park-model": [
        "模型制作——口袋公园/口袋公园 (3).jpg",
        "模型制作——口袋公园/口袋公园 (6).jpg",
        "模型制作——口袋公园/口袋公园 (1).jpg",
        "模型制作——口袋公园/口袋公园 (4).jpg",
        "模型制作——口袋公园/口袋公园 (2).jpg",
        "模型制作——口袋公园/口袋公园 (5).jpg",
    ],
    "tea-showroom-model": [
        "模型制作——口袋公园/商业空间展厅 (2).jpg",
    ],
}

# 透明底的标志图统一放到纸白背景上，避免深色底吃掉笔画
PROJECT_BG = {
    "logo-design": (244, 242, 238),
    "rice-brand": (244, 242, 238),
}

# 个别源图带平台水印，按比例从底部裁掉
CROP_BOTTOM = {
    ("rice-brand", 1): 0.045,
}

# 个别源图上方带相机模板抬头，按比例裁掉
CROP_TOP = {}

# 个别源图带整块相机模板边框，按四边比例裁到模型画面
CROP_BOX = {
    ("tea-showroom-model", 1): (0.03, 0.10, 0.97, 0.835),
}


def flatten(img: Image.Image, bg=(12, 10, 8)) -> Image.Image:
    img = ImageOps.exif_transpose(img)
    if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
        img = img.convert("RGBA")
        canvas = Image.new("RGB", img.size, bg)
        canvas.paste(img, mask=img.getchannel("A"))
        return canvas
    return img.convert("RGB")


def save(img: Image.Image, path: Path, max_side: int, quality: int) -> tuple[int, int]:
    img = img.copy()
    img.thumbnail((max_side, max_side), Image.Resampling.LANCZOS)
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    return img.size


total = 0
missing = []
for slug, sources in WORKS.items():
    folder = OUT / slug
    folder.mkdir(parents=True, exist_ok=True)
    bg = PROJECT_BG.get(slug, (12, 10, 8))
    for index, rel in enumerate(sources, 1):
        src = ROOT / rel
        if not src.exists():
            missing.append(str(src))
            continue
        try:
            with Image.open(src) as raw:
                img = flatten(raw, bg)
                crop = CROP_BOTTOM.get((slug, index))
                if crop:
                    img = img.crop((0, 0, img.width, round(img.height * (1 - crop))))
                top = CROP_TOP.get((slug, index))
                if top:
                    img = img.crop((0, round(img.height * top), img.width, img.height))
                box = CROP_BOX.get((slug, index))
                if box:
                    img = img.crop(
                        (
                            round(img.width * box[0]),
                            round(img.height * box[1]),
                            round(img.width * box[2]),
                            round(img.height * box[3]),
                        )
                    )
                large_size = save(img, folder / f"{index:02d}.jpg", 2200, 84)
                thumb_size = save(img, folder / f"{index:02d}-thumb.jpg", 760, 78)
            total += 1
            print(f"OK {slug} {index:02d} {large_size} / {thumb_size} <- {rel}")
        except Exception as exc:
            missing.append(f"{src} :: {exc}")

# portrait
portrait_src = ROOT / "assets" / "img" / "resume-p1-0.jpg"
if portrait_src.exists():
    with Image.open(portrait_src) as raw:
        img = flatten(raw, (255, 255, 255))
        save(img, ROOT / "assets" / "img" / "portrait.jpg", 1200, 90)
    print("OK portrait")

# resume pdf
resume_src = Path(r"D:\桌面\简历 (1).pdf")
if resume_src.exists():
    shutil.copyfile(resume_src, ROOT / "assets" / "li-guiping-resume.pdf")
    print("OK resume pdf")

# og image (crop to 1200x630)
og_src = ROOT / "校园一角改造" / "彩平图.png"
if og_src.exists():
    with Image.open(og_src) as raw:
        img = flatten(raw)
        ratio = max(1200 / img.width, 630 / img.height)
        resized = img.resize((round(img.width * ratio), round(img.height * ratio)), Image.Resampling.LANCZOS)
        left = (resized.width - 1200) // 2
        top = (resized.height - 630) // 2
        resized.crop((left, top, left + 1200, top + 630)).save(
            ROOT / "assets" / "img" / "og.jpg", "JPEG", quality=86, optimize=True, progressive=True
        )
    print("OK og")

print(f"\nDONE {total} images")
if missing:
    print("MISSING / FAILED:")
    for item in missing:
        print(" -", item)
