from pathlib import Path
from pypdf import PdfReader

pdf = Path(r"D:\桌面\简历 (1).pdf")
reader = PdfReader(str(pdf))
parts = []
for i, page in enumerate(reader.pages, 1):
    parts.append(f"--- PAGE {i} ---\n")
    parts.append(page.extract_text() or "")
    parts.append("\n")
    try:
        for j, image in enumerate(page.images):
            out = Path("assets") / "img" / f"resume-p{i}-{j}{Path(image.name).suffix or '.jpg'}"
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_bytes(image.data)
            parts.append(f"[image] {out} {len(image.data)} bytes\n")
    except Exception as exc:
        parts.append(f"[image error] {exc}\n")

Path("resume.txt").write_text("".join(parts), encoding="utf-8")
print("written resume.txt")
