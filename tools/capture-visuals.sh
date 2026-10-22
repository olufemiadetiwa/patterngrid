#!/usr/bin/env bash
# Full-page captures of the routes that carry workspace scenes, at desktop and
# phone widths, using the installed Chrome in headless mode. No downloads.
#   [ROUTES="name:/path ..."] tools/capture-visuals.sh <base-url> <out-dir>
# e.g. tools/capture-visuals.sh http://localhost:8780 docs/visuals/after
set -euo pipefail
BASE="${1:-http://localhost:8780}"; OUT="${2:-docs/visuals/after}"
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
mkdir -p "$OUT"
ROUTES="${ROUTES:-home:/ services:/services strategy:/services/data-ai-strategy engineering:/services/data-engineering bi:/services/business-intelligence ai:/services/ai-automation capability:/services/capability-building fmcg:/industries/fmcg-distribution retail:/industries/retail-ecommerce work:/work about:/about founder:/about/precious-celestine contact:/contact assessment:/assessment}"
for pair in $ROUTES; do
  name="${pair%%:*}"; path="${pair#*:}"
  for size in 1440x7200 390x9000; do
    w="${size%x*}"; h="${size#*x}"
    if [ "$w" -lt 500 ]; then
      # Headless Chrome's window cannot go below ~500 px: frame the page at the exact width instead.
      "$CH" --headless=new --disable-gpu --hide-scrollbars --window-size="600,$h" --timeout=12000 \
        --screenshot="$OUT/$name-$w.png" "$BASE/__frame?w=$w&h=$h&src=$path%3Fpgstatic%3D1" >/dev/null 2>&1 &
    else
      "$CH" --headless=new --disable-gpu --hide-scrollbars --window-size="$w,$h" --timeout=9000 \
        --screenshot="$OUT/$name-$w.png" "$BASE$path?pgstatic=1" >/dev/null 2>&1 &
    fi
  done
  wait
done
# Trim trailing white space and store as JPEG so the repo stays light.
python3 - "$OUT" <<'PY'
import sys, glob, os, re
from PIL import Image, ImageChops
out = sys.argv[1]
for f in sorted(glob.glob(os.path.join(out, '*.png'))):
    im = Image.open(f).convert('RGB')
    m = re.search(r'-(\d+)\.png$', f)
    if m and im.width > int(m.group(1)): im = im.crop((0, 0, int(m.group(1)), im.height))  # framed capture
    bg = Image.new('RGB', im.size, (255, 255, 255))
    bbox = ImageChops.difference(im, bg).getbbox()
    if bbox: im = im.crop((0, 0, im.width, min(im.height, bbox[3] + 40)))
    scale = 0.5 if im.width > 800 else 1
    if scale != 1: im = im.resize((int(im.width * scale), int(im.height * scale)), Image.LANCZOS)
    im.save(f[:-4] + '.jpg', 'JPEG', quality=82, optimize=True)
    os.remove(f)
    print(os.path.basename(f[:-4] + '.jpg'), im.size)
PY
