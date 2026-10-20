# Partner marks for the homepage trust band. Every logo becomes one flat silhouette (alpha only),
# so the page can tint them all the same quiet grey and size them by how heavy they look.
# Raw files stay outside the repo (default ~/Downloads/pq assets/partner-logos, or set PQ_LOGOS).
#
#   python3 -I logos.py ../..
#
# Prints each mark's aspect ratio and ink density for src/app/components/site/Partners.tsx.
import os, re, subprocess, sys, tempfile
import numpy as np
from PIL import Image
from scipy import ndimage

SRC = os.environ.get('PQ_LOGOS', os.path.expanduser('~/Downloads/pq assets/partner-logos'))
OUT = 'public/media/site/partners'
MAX_H, MAX_W = 200, 1400  # stored size: about three times the largest the band shows

# slug: (raw file, how the mark is read)
#   ink       anything that is not paper white is the mark
#   knockout  the mark is reversed out of a solid banner: keep the reversed part, drop the banner
LOGOS = {
    'uw': ('uw.png', 'ink'),
    'uc-davis': ('uc-davis.svg', 'ink'),
    'anthropic': ('anthropic.svg', 'ink'),
    'sanofi': ('sanofi.svg', 'ink'),
    'wyoming': ('wyoming.png', 'ink'),
    'concordia': ('concordia.svg', 'knockout'),
    'ritsumeikan': ('ritsumeikan.gif', 'ink'),
    'oita': ('oita.svg', 'ink'),
    'blpn': ('blpn.png', 'ink'),
}


def rasterise(path, tmp, size=2400):
    """SVGs go through Quick Look, which clips anything that is not square, so each is centred on a square canvas first."""
    if not path.endswith('.svg'):
        return Image.open(path).convert('RGBA')
    svg = open(path, encoding='utf-8').read()
    x, y, w, h = [float(v) for v in re.search(r'viewBox="([^"]+)"', svg).group(1).replace(',', ' ').split()]
    side = max(w, h)
    svg = re.sub(r'(<svg[^>]*?)\s(width|height|viewBox)="[^"]*"', r'\1', svg, count=1)
    svg = re.sub(r'(<svg[^>]*?)\s(width|height|viewBox)="[^"]*"', r'\1', svg, count=1)
    svg = re.sub(r'(<svg[^>]*?)\s(width|height|viewBox)="[^"]*"', r'\1', svg, count=1)
    box = f'{x - (side - w) / 2} {y - (side - h) / 2} {side} {side}'
    svg = svg.replace('<svg', f'<svg width="{size}" height="{size}" viewBox="{box}"', 1)
    copy = os.path.join(tmp, os.path.basename(path))
    open(copy, 'w', encoding='utf-8').write(svg)
    subprocess.run(['qlmanage', '-t', '-s', str(size), '-o', tmp, copy], check=True, capture_output=True)
    return Image.open(copy + '.png').convert('RGBA')


def ink_of(img):
    """0 where the paper is white, 1 where the mark is at its full colour."""
    paper = Image.new('RGBA', img.size, (255, 255, 255, 255))
    paper.alpha_composite(img)
    rgb = np.asarray(paper.convert('RGB')).astype(np.float32)
    ink = (255 - rgb.min(axis=2)) / 255
    solid = ink[ink > 0.35]
    # Scale to the palest solid colour, so a mark drawn in two colours becomes one even ink
    return np.clip(ink / (np.percentile(solid, 15) if solid.size else 1), 0, 1)


def mark(img, how):
    ink = ink_of(img)
    if how == 'knockout':
        banner = ndimage.binary_fill_holes(ink > 0.5)
        banner = ndimage.binary_erosion(banner, iterations=max(2, round(min(ink.shape) / 250)))
        ink = np.where(banner, 1 - ink, 0)
    ys, xs = np.nonzero(ink > 0.04)
    return ink[ys.min():ys.max() + 1, xs.min():xs.max() + 1]


def main(root):
    out = os.path.join(root, OUT)
    os.makedirs(out, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        for slug, (name, how) in LOGOS.items():
            alpha = mark(rasterise(os.path.join(SRC, name), tmp), how)
            h, w = alpha.shape
            scale = min(MAX_H / h, MAX_W / w)
            a = Image.fromarray((alpha * 255).astype(np.uint8)).resize((round(w * scale), round(h * scale)), Image.LANCZOS)
            Image.merge('LA', (Image.new('L', a.size, 0), a)).save(os.path.join(out, f'{slug}.png'), optimize=True)
            print(f'{slug:12} ratio {w / h:5.2f}  density {alpha.mean():.2f}  {a.size[0]}x{a.size[1]}')


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else '../..')
