# Builds every storefront image from the photo library into public/media/shop.
# Models move onto one warm studio sweep; mockups become still lifes on the same sweep.
# usage: python3 -I build.py <repo> [slug ...]
import sys, os, json, numpy as np
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from sweep import load, sweep, house, to_lin, to_srgb, LUMA
from manifest import P, EDITS
from PIL import Image, ImageFilter
from scipy import ndimage

from paths import SRC, MASKS, PLATE
REPO = sys.argv[1]
ONLY = set(sys.argv[2:])
OUT = os.path.join(REPO, 'public/media/shop')
TARGET = (0xd9 / 255, 0xd1 / 255, 0xc7 / 255)
FIELD = np.load(PLATE)
T_LIN = to_lin(np.array(TARGET, dtype=np.float32))

def film(a):
    """The outdoor grade: quieter greens, warm hanji tint, softer blacks."""
    lum = (a @ np.array([0.299, 0.587, 0.114], dtype=np.float32))[..., None]
    a = a * 0.80 + lum * 0.20
    a = a * np.array([1.03, 1.0, 0.94], dtype=np.float32)
    a = 0.035 + a * 0.94
    return np.clip(a + (a - 0.5) * 0.04, 0, 1)

def write(a, path, size, q=82, grain=0.007, seed=3):
    im = Image.fromarray((np.clip(a, 0, 1) * 255 + 0.5).astype(np.uint8)).resize(size, Image.LANCZOS)
    g = house(np.asarray(im, dtype=np.float32) / 255, seed=seed, grain=grain)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    Image.fromarray((g * 255 + 0.5).astype(np.uint8)).save(path, 'WEBP', quality=q, method=6)
    return os.path.relpath(path, os.path.join(REPO, 'public'))

_cache = {}
def studio(name):
    """A photo with its backdrop moved onto the house sweep (ungraded), plus its subject mask."""
    if name not in _cache:
        a, m = load(SRC + name + '.png', MASKS + name + '.png')
        _cache[name] = (sweep(a, m, TARGET), m)
    return _cache[name]

def subject(m):
    ys, xs = np.nonzero(m > 0.5)
    return xs.min(), ys.min(), xs.max(), ys.max()

def extract(img, x0, y0, x1, y1):
    """Crop a box that may run past the frame; the overflow is filled with soft backdrop."""
    h, w = img.shape[:2]
    x0, y0, x1, y1 = [int(round(v)) for v in (x0, y0, x1, y1)]
    pad = max(0, -x0, -y0, x1 - w, y1 - h)
    if pad:
        big = np.pad(img, ((pad, pad), (pad, pad), (0, 0)), mode='edge')
        soft = ndimage.gaussian_filter(big, (24, 24, 0))
        inside = np.zeros(big.shape[:2], np.float32); inside[pad:pad + h, pad:pad + w] = 1
        inside = ndimage.gaussian_filter(inside, 6)[..., None]
        img = big * inside + soft * (1 - inside)
        x0, x1, y0, y1 = x0 + pad, x1 + pad, y0 + pad, y1 + pad
    return img[y0:y1, x0:x1]

# Crop bands, as fractions of the figure's height from the top of the head
BANDS = {
    'top':   (-0.045, 0.60),
    'hood':  (-0.045, 0.64),
    'shorts': (0.22, 0.86),
    'legs':  (0.40, None),
    'full':  (-0.07, None),
}

def crop(name, kind, ratio=0.8):
    img, m = studio(name)
    h, w = m.shape
    x0, top, x1, bot = subject(m)
    H = bot - top
    a, b = BANDS[kind]
    y0 = top + a * H
    y1 = bot + 0.05 * H if b is None else top + b * H
    if kind == 'legs': y1 = bot + 0.035 * H
    band = m[max(0, int(y0)):min(h, int(y1))]
    cols = band.sum(axis=0)
    cx = (cols * np.arange(w)).sum() / max(cols.sum(), 1)
    ch = y1 - y0; cw = ch * ratio
    # a figure touching the frame edge cannot be padded sideways: crop tighter instead
    touches = m[:, :4].max() > 0.5 or m[:, -4:].max() > 0.5
    if touches and cw > w:
        cw = w; ch = cw / ratio; mid = (y0 + y1) / 2; y0, y1 = mid - ch / 2, mid + ch / 2
    xa = cx - cw / 2
    if touches: xa = min(max(xa, 0), w - cw)
    return extract(img, xa, y0, xa + cw, y0 + ch)

def landscape(name, ratio=0.8, recolour=True):
    """A 4:5 window from a wide photo, centred on the person."""
    if recolour: img, m = studio(name)
    else:
        img = np.asarray(Image.open(SRC + name + '.png').convert('RGB'), dtype=np.float32) / 255
        m = np.asarray(Image.open(MASKS + name + '.png').convert('L'), dtype=np.float32) / 255
    h, w = m.shape
    cols = m.sum(axis=0); cx = (cols * np.arange(w)).sum() / cols.sum()
    cw = h * ratio
    xa = min(max(cx - cw / 2, 0), w - cw)
    return img[:, int(xa):int(xa + cw)]

def bottom(name, ratio=0.8):
    """Feet and lower legs: the bottom of a portrait close-up."""
    img, m = studio(name)
    h, w = m.shape
    _, _, _, bot = subject(m)
    ch = w / ratio
    y1 = min(h, bot + 0.05 * h); y0 = max(0, y1 - ch)
    return img[int(y0):int(y0 + ch)]

# ---------- Still lifes from the transparent mockups ----------
def clean_cut(path):
    im = Image.open(path).convert('RGBA')
    a = np.asarray(im, dtype=np.float32) / 255
    rgb, al = a[..., :3], a[..., 3]
    solid = al > 0.5
    lab, n = ndimage.label(solid)
    if n > 1:
        sizes = ndimage.sum(solid, lab, range(1, n + 1))
        keep = np.isin(lab, 1 + np.nonzero(sizes >= sizes.max() * 0.004)[0])
        near = ndimage.binary_dilation(keep, iterations=3)
        al = np.where(near, al, 0)
    # pull clean interior colour over the fringe so no coloured halo survives
    inner = ndimage.binary_erosion(al > 0.97, iterations=3).astype(np.float32)
    num = ndimage.gaussian_filter(rgb * inner[..., None], (5, 5, 0))
    den = ndimage.gaussian_filter(inner, 5)[..., None]
    fill = np.where(den > 1e-3, num / np.maximum(den, 1e-3), rgb)
    band = (inner < 0.5)[..., None]
    rgb = np.where(band, fill, rgb)
    al = ndimage.grey_erosion(al, size=(3, 3))
    al = ndimage.gaussian_filter(al, 0.7)
    al = np.where(al < 0.03, 0, al)
    return rgb, al

def place(rgb, al, size=(1000, 1250), fit=(0.78, 0.72), centre=(0.5, 0.47)):
    ys, xs = np.nonzero(al > 0.02)
    rgb = rgb[ys.min():ys.max() + 1, xs.min():xs.max() + 1]; al = al[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    W, H = size
    s = min(fit[0] * W / rgb.shape[1], fit[1] * H / rgb.shape[0])
    nw, nh = max(1, int(rgb.shape[1] * s)), max(1, int(rgb.shape[0] * s))
    rgba = np.dstack([rgb, al])
    im = Image.fromarray((np.clip(rgba, 0, 1) * 255 + 0.5).astype(np.uint8), 'RGBA').resize((nw, nh), Image.LANCZOS)
    canvas = Image.new('RGBA', size, (0, 0, 0, 0))
    canvas.paste(im, (int(centre[0] * W - nw / 2), int(centre[1] * H - nh / 2)))
    return canvas

def plate(size=(1000, 1250)):
    f = FIELD[0:1100, 72:952]
    rgb = to_srgb(T_LIN[None, None, :] * f[..., None])
    return np.asarray(Image.fromarray((np.clip(rgb, 0, 1) * 255).astype(np.uint8)).resize(size, Image.LANCZOS), dtype=np.float32) / 255

def still(canvas, shadow=0.2, drop=22, blur=26):
    c = np.asarray(canvas, dtype=np.float32) / 255
    rgb, al = c[..., :3], c[..., 3]
    bg = plate(canvas.size)
    sh = ndimage.gaussian_filter(np.roll(al, drop, axis=0), blur) * shadow
    bg = bg * (1 - sh[..., None] * 0.9)
    return bg * (1 - al[..., None]) + rgb * al[..., None]

FIT = {
    'quest-stride': dict(fit=(0.84, 0.56), centre=(0.5, 0.5)),
    'everyday-socks': dict(fit=(0.66, 0.70), centre=(0.5, 0.48)),
    'everyday-gloves': dict(fit=(0.82, 0.62), centre=(0.5, 0.48)),
    'grip-gloves': dict(fit=(0.82, 0.62), centre=(0.5, 0.48)),
    'walking-shorts': dict(fit=(0.74, 0.64), centre=(0.5, 0.48)),
}

def hero_cut(rgb, al, path, width=1400):
    """The piece alone, trimmed tight, for large feature stages."""
    ys, xs = np.nonzero(al > 0.02)
    rgba = np.dstack([rgb, al])[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    im = Image.fromarray((np.clip(rgba, 0, 1) * 255 + 0.5).astype(np.uint8))
    if im.width > width: im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(path, 'WEBP', quality=90, method=6)
    return os.path.relpath(path, os.path.join(REPO, 'public'))

def make_still(slug, name, base):
    rgb, al = clean_cut(SRC + name + '.png')
    canvas = place(rgb, al, **FIT.get(slug, {}))
    out = {}
    if slug == 'quest-stride' and base.endswith('ivory'): out['hero'] = hero_cut(rgb, al, base + '-hero.webp')
    out['still'] = write(still(canvas), base + '-still.webp', canvas.size, grain=0.006)
    cut_path = base + '-cut.webp'
    canvas.save(cut_path, 'WEBP', quality=88, method=6)
    out['cut'] = os.path.relpath(cut_path, os.path.join(REPO, 'public'))
    return out

LOOK, FULL, MOTION = (800, 1000), (1200, 1500), (960, 1200)

def build():
    report = {}
    for slug, colours in P.items():
        if ONLY and slug not in ONLY: continue
        d = os.path.join(OUT, slug)
        os.makedirs(d, exist_ok=True)
        report[slug] = {}
        kind = 'hood' if 'hood' in slug else 'shorts' if slug == 'walking-shorts' else 'top'
        for colour, src in colours.items():
            key = colour.lower(); base = os.path.join(d, key); r = {}
            if 'still' in src: r.update(make_still(slug, src['still'], base))
            if 'back' in src:
                rgb, al = clean_cut(SRC + src['back'] + '.png')
                r['back'] = write(still(place(rgb, al, **FIT.get(slug, {}))), base + '-back.webp', (1000, 1250), grain=0.006)
            if 'look' in src and slug != 'movement-leggings':
                r['look'] = write(crop(src['look'], kind), base + '.webp', LOOK)
                r['full'] = write(crop(src['look'], 'full'), base + '-full.webp', FULL)
            for who in ('women', 'men'):
                if who in src:
                    r[who] = write(crop(src[who], kind), f'{base}-{who}.webp', LOOK)
                    r[who + '-full'] = write(crop(src[who], 'full'), f'{base}-{who}-full.webp', FULL)
            if slug == 'movement-leggings':
                r['look'] = write(crop(src['legs'], 'legs'), base + '.webp', LOOK)
                r['full'] = write(crop(src['look'], 'full'), base + '-full.webp', FULL)
            if 'motion' in src:
                im = Image.open(SRC + src['motion'] + '.png')
                arr = landscape(src['motion']) if im.width > im.height else crop(src['motion'], 'full')
                r['motion'] = write(arr, base + '-motion.webp', MOTION)
            if 'detail' in src:
                r['look'] = write(bottom(src['detail']), base + '.webp', LOOK)
                r['full'] = write(bottom(src['detail']), base + '-full.webp', FULL)
            if 'context' in src:
                img = np.asarray(Image.open(SRC + src['context'] + '.png').convert('RGB'), dtype=np.float32) / 255
                h, w = img.shape[:2]; ch = int(w / 0.8); y0 = (h - ch) // 2
                r['context'] = write(film(img[y0:y0 + ch]), base + '-context.webp', MOTION, grain=0.01)
            report[slug][colour] = r
            print(slug, colour, sorted(r))
    if not ONLY or 'edits' in ONLY:
        report['edits'] = {}
        for key, name in EDITS.items():
            arr = landscape(name, recolour=False)
            report['edits'][key] = write(film(arr), os.path.join(OUT, 'edits', key + '.webp'), (900, 1125), grain=0.012)
        print('edits done')

if __name__ == '__main__':
    build()
