# The homepage ending: two paths, each shown as a three-panel strip of its signature piece from three angles.
# Duet: Sage Duo worn, from the front, the side and the back (one studio portrait, split at its white gutters).
# The 2080s wardrobe: the Pine Quest Hood from the front, worn, and from the back (the shop's own studio pictures).
# Every panel is cut to the same 3:4 frame and size, so the two strips sit as a matching pair.
#
#   python3 -I closing.py ../..
import os, sys
import numpy as np
from PIL import Image

SRC = os.environ.get('PQ_PHOTOS', os.path.expanduser('~/Downloads/down'))
OUT = 'public/media/site/closing'
PANEL = (600, 800)
DUET = 'headband/create_three_angles_wearing_this_2K_20261025181916.jpg'
DUET_TOP = 0.04  # where each crop starts, as a share of the portrait's height, so the head sits high with room below
# name, picture, and how much of its width the panel keeps (the worn one is drawn closer, so the hood is the same size)
WEAR = [('front', 'quest-hood/pine-still.webp', 1.0), ('worn', 'quest-hood/pine-women.webp', 0.8), ('back', 'quest-hood/pine-back.webp', 1.0)]


def fit(im, top=None, cx=0.5):
    """Cut a 3:4 frame from the image: full width if it is wide enough, else full height, then scale to PANEL."""
    w, h = im.size
    if w / h > 3 / 4:
        cw = round(h * 3 / 4)
        x0 = min(max(0, round(cx * w - cw / 2)), w - cw)
        box = (x0, 0, x0 + cw, h)
    else:
        ch = round(w * 4 / 3)
        y0 = round((h - ch) / 2) if top is None else min(round(top * h), h - ch)
        box = (0, y0, w, y0 + ch)
    return im.crop(box).resize(PANEL, Image.LANCZOS)


def panels(im):
    """Split a strip of portraits at its white gutters."""
    a = np.asarray(im.convert('L')).astype(int)
    white = a.mean(0) > 245
    cuts, inside, start = [], False, 0
    for x, wcol in enumerate(list(white) + [True]):
        if not wcol and not inside:
            inside, start = True, x
        elif wcol and inside:
            inside = False
            if x - start > 100:
                cuts.append((start, x))
    return [im.crop((x0, 0, x1, im.height)) for x0, x1 in cuts]


def main(root):
    out = os.path.join(root, OUT)
    os.makedirs(out, exist_ok=True)
    strip = Image.open(os.path.join(SRC, DUET)).convert('RGB')
    for name, p in zip(('front', 'side', 'back'), panels(strip)):
        fit(p, top=DUET_TOP).save(os.path.join(out, f'duet-{name}.webp'), 'WEBP', quality=82, method=6)
        print('duet', name, p.size)
    for name, path, keep in WEAR:
        im = Image.open(os.path.join(root, 'public/media/shop', path)).convert('RGB')
        if keep < 1:
            w = round(im.width * keep)
            im = im.crop(((im.width - w) // 2, round(im.height * 0.03), (im.width + w) // 2, im.height))
        fit(im, top=0).save(os.path.join(out, f'wear-{name}.webp'), 'WEBP', quality=82, method=6)
        print('wear', name)


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else '../..')
