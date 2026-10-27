# The homepage lookbook's backdrop: a close-up of feather jacquard with a sensor pod tucked into its fold.
# The knit becomes a relief map, near white where light falls and darker in the stitches, so the page can multiply it
# into its own peach-to-cream background and the fabric takes the page's colour instead of the photo's. The pod keeps
# its bronze, and every edge feathers away so there is never a box around it. Prints where the pod sits.
# Raw photo stays outside the repo (default ~/Downloads/down, or set PQ_PHOTOS).
#
#   python3 -I knit.py ../..
import os, sys
import numpy as np
from PIL import Image, ImageFilter
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from paths import SRC

PHOTO = 'material/Pearl feather jacquard with sensor pod.webp'
OUT = 'public/media/site/material/knit.webp'
WIDTH = 1400
POD = (1047, 460, 1195, 602)  # the pod's box in the source photo
LOW = 0.56  # the deepest stitch shadow, as a share of the background it falls on
FEATHER = (0.26, 0.2)  # how far the knit melts away from the top and bottom, and from the sides


def ramp(n, share):
    i = np.arange(n, dtype=np.float32)
    t = np.clip(np.minimum(i, n - 1 - i) / (share * n), 0, 1)
    return t * t * (3 - 2 * t)


def main(root):
    im = Image.open(os.path.join(SRC, PHOTO)).convert('RGB')
    w, h = im.size
    rgb = np.asarray(im, dtype=np.float32) / 255
    lum = rgb @ np.array([0.299, 0.587, 0.114], dtype=np.float32)
    lo, hi = np.percentile(lum, [1, 99.5])
    n = np.clip((lum - lo) / (hi - lo), 0, 1)
    # Relief: light knit stays almost white, stitches and folds fall to LOW, with a breath of warmth
    relief = (LOW + (1 - LOW) * n ** 0.85)[..., None] * np.array([1.0, 0.988, 0.965], dtype=np.float32)

    # The pod keeps its bronze: inside its box, the warm metal is told apart from the knit by its colour
    x0, y0, x1, y1 = POD
    box = np.zeros((h, w), dtype=np.float32)
    box[y0:y1, x0:x1] = 1
    metal = np.clip(((rgb[..., 0] - rgb[..., 2]) * 255 - 38) / 18, 0, 1) * box
    metal = np.asarray(Image.fromarray((metal * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.5)), dtype=np.float32) / 255
    bronze = np.clip(0.18 + rgb * 0.92, 0, 1)
    out = relief * (1 - metal[..., None]) + bronze * metal[..., None]

    alpha = ramp(h, FEATHER[0])[:, None] * ramp(w, FEATHER[1])[None, :]
    a = np.dstack([np.clip(out, 0, 1), alpha])
    im = Image.fromarray((a * 255 + 0.5).astype(np.uint8)).resize((WIDTH, round(WIDTH * h / w)), Image.LANCZOS)
    path = os.path.join(root, OUT)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, 'WEBP', quality=80, method=6)
    cx, cy = (x0 + x1) / 2 / w, (y0 + y1) / 2 / h
    print('knit', im.size, 'pod at', f'{cx:.3f}', f'{cy:.3f}')


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else '../..')
