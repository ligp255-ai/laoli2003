from pathlib import Path
import re
import urllib.request

root = Path(r"D:\桌面\作品集2003")
css_path = root / "assets" / "fonts" / "hanken.css"
css = css_path.read_text(encoding="utf-8")

blocks = re.findall(r"@font-face\s*\{(.*?)\}", css, re.S)
for block in blocks:
    weight = re.search(r"font-weight:\s*(\d+)", block)
    urange = re.search(r"unicode-range:\s*([^;]+);", block)
    url = re.search(r"url\((https://[^)]+\.woff2)\)", block)
    if not (weight and urange and url):
        continue
    if "U+0000-00FF" not in urange.group(1):
        continue
    w = weight.group(1)
    out = root / "assets" / "fonts" / f"hanken-{w}.woff2"
    urllib.request.urlretrieve(url.group(1), out)
    print(out.name, out.stat().st_size)
