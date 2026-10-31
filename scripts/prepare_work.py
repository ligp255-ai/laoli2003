"""把一组成图整理成作品集需要的 01.jpg / 01-thumb.jpg。

用法：
    python scripts/prepare_work.py --slug my-work --src "D:\\图片\\我的项目" --title "我的项目"

脚本只负责图片：按文件名排序，生成 2200px 大图和 760px 缩略图，
并在终端打印一段可以直接粘进 data/works.js 的项目条目。
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
WORKS_DIR = ROOT / "assets" / "img" / "works"
SUPPORTED = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tif", ".tiff", ".jfif"}
SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def natural_key(path: Path):
    return [int(part) if part.isdigit() else part.lower() for part in re.split(r"(\d+)", path.name)]


def flatten(image: Image.Image) -> Image.Image:
    image = ImageOps.exif_transpose(image)
    if image.mode in ("RGBA", "LA") or (image.mode == "P" and "transparency" in image.info):
        image = image.convert("RGBA")
        canvas = Image.new("RGB", image.size, (12, 10, 8))
        canvas.paste(image, mask=image.getchannel("A"))
        return canvas
    return image.convert("RGB")


def save(image: Image.Image, path: Path, max_side: int, quality: int) -> tuple[int, int]:
    copy = image.copy()
    copy.thumbnail((max_side, max_side), Image.Resampling.LANCZOS)
    path.parent.mkdir(parents=True, exist_ok=True)
    copy.save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    return copy.size


def main() -> int:
    parser = argparse.ArgumentParser(description="整理新作品的图片并打印 data/works.js 条目")
    parser.add_argument("--slug", required=True, help="英文短名，只用小写字母、数字和连字符，例如 campus-corner")
    parser.add_argument("--src", required=True, help="原始图片所在文件夹")
    parser.add_argument("--title", help="作品标题，例如 社区口袋公园（不填则生成后再改）")
    parser.add_argument("--category", help="景观 / 室内 / 视觉 / 包装 / 文创 / AIGC / 手绘 / 模型")
    parser.add_argument("--year", default="2026", help="年份，例如 2026")
    parser.add_argument("--force", action="store_true", help="覆盖同名的已有图片")
    args = parser.parse_args()

    if not SLUG_RE.match(args.slug):
        print("slug 只能使用小写字母、数字和连字符，例如 my-work。", file=sys.stderr)
        return 1

    source = Path(args.src)
    if not source.is_dir():
        print(f"找不到文件夹：{source}", file=sys.stderr)
        return 1

    files = sorted((p for p in source.iterdir() if p.is_file() and p.suffix.lower() in SUPPORTED), key=natural_key)
    if not files:
        print(f"{source} 里没有可用的图片。", file=sys.stderr)
        return 1

    title = args.title or "作品标题"
    category = args.category or "景观"

    target = WORKS_DIR / args.slug
    if target.exists() and any(target.iterdir()) and not args.force:
        print(f"{target} 已经有图片。确认要覆盖时加 --force。", file=sys.stderr)
        return 1

    target.mkdir(parents=True, exist_ok=True)
    entries = []
    for index, file in enumerate(files, 1):
        with Image.open(file) as raw:
            image = flatten(raw)
            large = save(image, target / f"{index:02d}.jpg", 2200, 84)
            thumb = save(image, target / f"{index:02d}-thumb.jpg", 760, 78)
        print(f"{index:02d}  {large[0]}x{large[1]} / thumb {thumb[0]}x{thumb[1]}  <- {file.name}")
        entries.append(
            f'      image("{args.slug}", {index}, "{title} 图 {index:02d}", '
            f'"图 {index:02d} 的说明", "render")'
        )

    snippet = "\n".join(
        [
            "  {",
            f'    slug: "{args.slug}",',
            f'    title: "{title}",',
            f'    en: "{title}",',
            f'    category: "{category}",',
            f'    year: "{args.year}",',
            '    role: "你的角色",',
            '    tools: "使用的软件",',
            '    summary: "一句话说明这个项目。",',
            '    description: "两三句话说明项目背景、过程与结果。",',
            "    images: [",
            ",\n".join(entries),
            "    ]",
            "  },",
            "",
        ]
    )
    snippet_file = ROOT / "新增作品条目.txt"
    snippet_file.write_text(snippet, encoding="utf-8")

    print(f"\nDone. {len(files)} image pairs saved to assets/img/works/{args.slug}")
    print("A ready-to-paste entry was written to: 新增作品条目.txt")
    print("Edit the title / captions there if needed, then copy the block into data/works.js.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
