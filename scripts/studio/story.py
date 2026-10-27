# The homepage's opening story: the qBand Sage Duo, then a qPad that wakes and tells what the day looked like, then two people
# sharing it on a bench. Exports the headband from three angles, the brain whose signals it reads (graded to warm
# porcelain, with a map of its folds for the light to run along), the tablet with its screen off, the photos its screen
# shows and the closing photo, and prints where the tablet's glass sits, so the page can lay its screens onto it.
# Raw photos stay outside the repo (default ~/Downloads/down, or set PQ_PHOTOS). The brain needs its subject mask first:
#
#   .cache/fgmask .cache/masks "${PQ_PHOTOS:-$HOME/Downloads/down}/brain/brain-top.webp"
#   python3 -I story.py ../..
import os, sys
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

SRC = os.environ.get('PQ_PHOTOS', os.path.expanduser('~/Downloads/down'))
OUT = 'public/media/site/qband-sage-duo'
TABLET = 'tablet/Persimmon Quest Wellness Tablet.png'  # ivory qPad, screen off, four keys below
# The tablet's glass in the source render, corner by corner (TL, TR, BR, BL), read off its dark screen
GLASS = [(168, 153), (1105, 251), (1182, 849), (208, 852)]
SCREEN = (1000, 640)  # the flat size the page draws each screen at before it is laid onto the glass
# The headband from three angles, all cut to one shared frame at one scale, so the page can turn it by crossfading
ANGLES = {
    'band-front': 'headband/Sage Duo Front Elevation.png',
    'band-three': 'headband/SAGE DUO woven EEG headband.png',
    'band-side': 'headband/Sage Duo right-side headband profile.png',
}
ANGLE_BOX = (20, 248, 1240, 998)  # the union of the three renders' outlines in their 1254 px squares
ANGLE_W = 1400
BRAIN = 'brain/brain-top.webp'  # a white clay brain from above, on white
BRAIN_MASK = '.cache/masks/brain-top.png'
BRAIN_H = 900
# The brain's tones run from umber in the folds through clay to cream on the crowns
BRAIN_STOPS = [(0.0, (104, 80, 64)), (0.28, (164, 136, 116)), (0.58, (214, 197, 180)), (0.82, (240, 230, 217)), (1.0, (253, 249, 243))]
PHOTOS = {
    'couple': ('tablet/Shared Rhythm After a Morning Walk.png', 1800),
    'read': ('tablet/Calm Reading with Sage Headband and Tablet.png', 1000),
    'walk': ('headband/Confident Morning Walk in Smart Shoes.png', 1000),
    'melody': ('tablet/Learning a melody at home.png', 1000),
}


def homography(src, dst):
    """The 3x3 projective map sending four points to four points."""
    rows, rhs = [], []
    for (x, y), (u, v) in zip(src, dst):
        rows += [[x, y, 1, 0, 0, 0, -u * x, -u * y], [0, 0, 0, x, y, 1, -v * x, -v * y]]
        rhs += [u, v]
    h = np.linalg.solve(np.array(rows, float), np.array(rhs, float))
    return np.append(h, 1).reshape(3, 3)


def brain(out):
    """The brain in warm porcelain, and a soft map of its folds (where the surface sits darker than around it)."""
    rgb = np.asarray(Image.open(os.path.join(SRC, BRAIN)).convert('RGB')).astype(float) / 255
    a = np.asarray(Image.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), BRAIN_MASK)).convert('L')).astype(float) / 255
    # A smooth outline: the mask is blurred, then pulled tight around its middle
    a = np.clip((ndi.gaussian_filter(a, 2.2) - 0.56) / 0.16, 0, 1)
    a = a * a * (3 - 2 * a)
    # The render is grainy; smooth its light before mapping it
    lum = ndi.gaussian_filter(ndi.median_filter(rgb @ np.array([0.299, 0.587, 0.114]), 5), 0.9)
    lo, hi = np.percentile(lum[a > 0.9], [0.5, 99.6])
    t = np.clip((lum - lo) / (hi - lo), 0, 1) ** 0.8
    at = np.array([s for s, _ in BRAIN_STOPS]); cs = np.array([c for _, c in BRAIN_STOPS], float)
    tone = np.stack([np.interp(t, at, cs[:, k]) for k in range(3)], -1)
    valley = np.clip(ndi.gaussian_filter(lum, 4.5) - lum, 0, None)
    valley *= ndi.gaussian_filter(ndi.binary_erosion(a > 0.5, iterations=10).astype(float), 4)  # not the outline's own shade
    v = np.clip((valley / np.percentile(valley[valley > 0], 99.3) - 0.12) / 0.88, 0, 1) ** 0.8
    # Widened, so the folds still read as lines of light when the brain is drawn a few hundred pixels tall
    v = np.clip(ndi.gaussian_filter(ndi.grey_dilation(v, size=(5, 5)), 1.6) * 1.35, 0, 1)
    ys, xs = np.where(a > 0.02)
    box = (xs.min() - 6, ys.min() - 6, xs.max() + 7, ys.max() + 7)
    size = (round((box[2] - box[0]) * BRAIN_H / (box[3] - box[1])), BRAIN_H)
    im = Image.fromarray(np.dstack([tone, a * 255]).clip(0, 255).astype(np.uint8)).crop(box).resize(size, Image.LANCZOS)
    im.save(os.path.join(out, 'brain.webp'), 'WEBP', quality=86, method=6)
    # The folds are kept as alpha on white, so the page can use them as a mask
    v8 = (v * 255).clip(0, 255).astype(np.uint8)
    folds = Image.fromarray(np.dstack([np.full_like(v8, 255)] * 3 + [v8])).crop(box).resize(size, Image.LANCZOS)
    folds.save(os.path.join(out, 'brain-folds.webp'), 'WEBP', quality=80, method=6)
    print('brain', im.size)


def main(root):
    out = os.path.join(root, OUT)
    os.makedirs(out, exist_ok=True)

    for name, src in ANGLES.items():
        band = Image.open(os.path.join(SRC, src)).convert('RGBA').crop(ANGLE_BOX)
        band = band.resize((ANGLE_W, round(band.height * ANGLE_W / band.width)), Image.LANCZOS)
        band.save(os.path.join(out, name + '.webp'), 'WEBP', quality=88, method=6)
        print(name, band.size)

    brain(out)

    im = Image.open(os.path.join(SRC, TABLET)).convert('RGBA')
    x0, y0, x1, y1 = im.getchannel('A').point(lambda a: 255 if a > 30 else 0).getbbox()
    pad = 12
    box = (max(0, x0 - pad), max(0, y0 - pad), min(im.width, x1 + pad), min(im.height, y1 + pad))
    tab = im.crop(box)
    tab.save(os.path.join(out, 'qpad-off.webp'), 'WEBP', quality=88, method=6)
    glass = [(x - box[0], y - box[1]) for x, y in GLASS]
    w, h = SCREEN
    m = homography([(0, 0), (w, 0), (w, h), (0, h)], glass)
    m = m / m[2, 2]
    css = [m[0, 0], m[1, 0], 0, m[2, 0], m[0, 1], m[1, 1], 0, m[2, 1], 0, 0, 1, 0, m[0, 2], m[1, 2], 0, 1]
    print('qpad-off', tab.size)
    print('  matrix3d(' + ', '.join(f'{v:.6g}' for v in css) + ')')

    for name, (src, width) in PHOTOS.items():
        p = Image.open(os.path.join(SRC, src)).convert('RGB')
        p = p.resize((width, round(p.height * width / p.width)), Image.LANCZOS)
        p.save(os.path.join(out, name + '.webp'), 'WEBP', quality=82, method=6)
        print(name, p.size)


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else '../..')
