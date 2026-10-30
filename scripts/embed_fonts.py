"""把字体文件写成带 data URI 的 fonts.css。

这样直接双击 index.html 也能加载字体，不受 file:// 的字体 CORS 限制。
"""

from __future__ import annotations

import base64
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FONT_DIR = ROOT / "assets" / "fonts"
OUT = ROOT / "assets" / "css" / "fonts.css"


def data_uri(path: Path) -> str:
    payload = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:font/woff2;base64,{payload}"


def build() -> tuple[Path, int]:
    noto = FONT_DIR / "NotoSansSC-subset.woff2"
    hanken = FONT_DIR / "hanken-var.woff2"

    for path in (noto, hanken):
        if not path.exists():
            raise FileNotFoundError(path)

    css = f"""/* 由 scripts/embed_fonts.py 生成，请勿手改。 */
@font-face {{
  font-family: "Noto Sans SC";
  src: url("{data_uri(noto)}") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}}

@font-face {{
  font-family: "Hanken Grotesk";
  src: url("{data_uri(hanken)}") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF;
}}
"""
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(css, encoding="utf-8")
    return OUT, OUT.stat().st_size


if __name__ == "__main__":
    path, size = build()
    print(f"{path.name}: {size / 1024:.1f} KB")
