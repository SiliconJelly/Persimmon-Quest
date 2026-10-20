# White line sketches from a product cutout (silhouette plus its main seams and pods).
import sys, os, numpy as np
from PIL import Image, ImageFilter
def _g1(a, r, axis):
    rad = max(1, int(3 * r)); x = np.arange(-rad, rad + 1); k = np.exp(-x * x / (2 * r * r)); k /= k.sum()
    pad = [(0, 0), (0, 0)]; pad[axis] = (rad, rad)
    return np.apply_along_axis(lambda v: np.convolve(v, k, mode='valid'), axis, np.pad(a, pad, mode='edge'))
def blur(a, r): return _g1(_g1(a.astype(np.float32), r, 0), r, 1)
def sketch(src, dst, fill=0.1):
    """White silhouette line drawing: a firm outline, only the main seams and pods inside,
    and a faint fill so the piece reads as an object rather than loose lines."""
    im = Image.open(src).convert('RGBA').resize((500, 625), Image.LANCZOS)
    alpha = np.asarray(im.getchannel('A'), dtype=np.float32) / 255
    L = im.convert('RGB').convert('L').filter(ImageFilter.MedianFilter(13)).filter(ImageFilter.MedianFilter(11))
    lum = np.asarray(L, dtype=np.float32) / 255
    lum = lum * alpha + 1.0 * (1 - alpha)
    d = blur(lum, 3.4) - blur(lum, 1.7)
    inner = np.clip((d - 0.029) / 0.03, 0, 1)
    dens = blur((inner > 0.3).astype(np.float32), 4)
    inner *= np.clip((dens - 0.075) / 0.06, 0, 1)
    inner *= np.clip(blur(alpha, 3) * 2.4 - 1.4, 0, 1)
    gy, gx = np.gradient(blur(alpha, 1.2))
    edge = np.clip(np.hypot(gx, gy) * 6.5, 0, 1)
    ink = np.maximum(inner * 0.72, edge)
    ink = np.where(ink < 0.22, 0, ink)
    body = np.clip(blur(alpha, 1.5) * 1.2 - 0.1, 0, 1) * fill
    a = np.maximum(ink, body)
    out = np.zeros((*a.shape, 4), dtype=np.uint8); out[..., :3] = 255; out[..., 3] = (np.clip(a, 0, 1) * 255).astype(np.uint8)
    Image.fromarray(out).save(dst, 'WEBP', quality=90, method=6)

R = sys.argv[1] + '/public/media/shop/'
BASE = {'breather-top': 'cornflower', 'movement-tank': 'sage', 'everyday-polo': 'mist', 'walking-shorts': 'sage', 'breather-vest': 'mist',
        'quest-hood': 'pine', 'movement-hood': 'sage', 'quest-stride': 'mist', 'everyday-socks': 'silver', 'everyday-gloves': 'pearl',
        'grip-gloves': 'slate', 'brainwear-duo': 'sage', 'everyday-brainwear': 'oat', 'brainwear-arc': 'pearl', 'qpad-one': 'ivory', 'qpad-grip': 'ivory'}
ONLY = set(sys.argv[2:])  # optional: redraw just these slugs
for slug, c in BASE.items():
    if ONLY and slug not in ONLY: continue
    sketch(f'{R}{slug}/{c}-cut.webp', f'{R}{slug}/sketch.webp'); print(slug)

# Leggings have no studio mockup: their drawing is kept as is and only gains the same faint fill.
def fill_outline(path, fill=0.1):
    from scipy import ndimage
    im = Image.open(path).convert('RGBA'); a = np.asarray(im.getchannel('A'), dtype=np.float32) / 255
    body = ndimage.binary_fill_holes(ndimage.binary_closing(a > 0.25, iterations=3))
    soft = blur(body.astype(np.float32), 1.5) * fill
    out = np.zeros((*a.shape, 4), dtype=np.uint8); out[..., :3] = 255; out[..., 3] = (np.clip(np.maximum(a, soft), 0, 1) * 255).astype(np.uint8)
    Image.fromarray(out).save(path, 'WEBP', quality=90, method=6)
if os.path.exists(R + 'movement-leggings/sketch.webp') and Image.open(R + 'movement-leggings/sketch.webp').getchannel('A').getextrema()[0] == 0:
    fill_outline(R + 'movement-leggings/sketch.webp'); print('movement-leggings')
