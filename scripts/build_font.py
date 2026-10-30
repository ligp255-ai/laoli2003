from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parent.parent
FONT_DIR = ROOT / "assets" / "fonts"
SOURCE = FONT_DIR / "NotoSansSC-VF.ttf"
OUTPUT = FONT_DIR / "NotoSansSC-subset.woff2"
TEXT_FILE = FONT_DIR / "subset-text.txt"

sources = [
    ROOT / "index.html",
    ROOT / "assets" / "css" / "style.css",
    ROOT / "assets" / "js" / "app.js",
    *sorted((ROOT / "data").glob("*.js")),
]

characters = set()
for path in sources:
    characters.update(path.read_text(encoding="utf-8"))

# Always keep the basics, in case a label is added later in HTML.
characters.update(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    "abcdefghijklmnopqrstuvwxyz"
    "0123456789"
    " .,:;!?@#$%&*()[]{}<>/\\|+-=_\"'`~^"
    "，。、；：！？…—–·“”‘’（）《》【】「」『』"
    "©®°±×÷→←↑↓"
)

TEXT_FILE.write_text("".join(sorted(characters)), encoding="utf-8")

command = [
    sys.executable,
    "-m",
    "fontTools.subset",
    str(SOURCE),
    f"--text-file={TEXT_FILE}",
    f"--output-file={OUTPUT}",
    "--flavor=woff2",
    "--layout-features=*",
    "--name-IDs=*",
    "--name-languages=*",
    "--notdef-outline",
    "--recommended-glyphs",
    "--drop-tables+=DSIG",
]

subprocess.run(command, check=True)
print(f"{OUTPUT.name}: {OUTPUT.stat().st_size / 1024:.1f} KB")
print(f"characters: {len(characters)}")

from embed_fonts import build as build_fonts_css

css_path, css_size = build_fonts_css()
print(f"{css_path.name}: {css_size / 1024:.1f} KB")
