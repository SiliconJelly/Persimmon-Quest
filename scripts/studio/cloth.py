# Silk for the end of the storefront: the cloth lifted off its grey studio, graded to the warm house look and
# feathered on every side, so it floats over the hanji-to-peach blend into the brand film without a box around it.
# Raw photos stay outside the repo (default ~/Downloads/pq assets/tailoor-inspiration, or set PQ_CLOTH).
#
#   python3 -I cloth.py ../..
import os, sys
import numpy as np
from PIL import Image, ImageFilter

SRC = os.environ.get('PQ_CLOTH', os.path.expanduser('~/Downloads/pq assets/tailoor-inspiration'))
OUT = 'public/media/site/material'
JOBS = {
    'cloth-ribbon': '250221_Tailoor_cloth_dettaglio_0293-Enhanced-SR.jpg',  # a ribbon of silk crossing the frame
}
WIDTH = 1800
TOP = 0.12  # the empty studio above the ribbon is cropped away
FEATHER = (0.24, 0.16)  # how far the cloth melts away from the top and bottom, and from the sides, as a share of the frame


def blur(a, r):
    im = Image.fromarray(np.clip(a * 255, 0, 255).astype(np.uint8))
    return np.asarray(im.filter(ImageFilter.GaussianBlur(r)), dtype=np.float32) / 255


def lift(rgb):
    """Silk is pink, the studio is neutral grey: the red-blue gap says which is which."""
    chroma = (rgb[..., 0] - rgb[..., 2]) * 255
    alpha = np.clip((chroma - 12) / 14, 0, 1)
    alpha = blur(alpha, 1.2)
    # The studio behind each edge, estimated from the pixels that are clearly studio, then removed from the edge colour
    bgw = (alpha < 0.05).astype(np.float32)
    bg = np.dstack([blur(rgb[..., c] * bgw, 24) for c in range(3)]) / np.maximum(blur(bgw, 24), 1e-3)[..., None]
    a = np.maximum(alpha, 0.2)[..., None]
    rgb = np.clip((rgb - (1 - alpha[..., None]) * bg) / a, 0, 1)
    return rgb, alpha


def feather(alpha):
    """Wherever the cloth meets the edge of the frame, it fades out on a smooth curve instead of being cut."""
    def ramp(n, share):
        i = np.arange(n, dtype=np.float32)
        t = np.clip(np.minimum(i, n - 1 - i) / (share * n), 0, 1)
        return t * t * (3 - 2 * t)
    h, w = alpha.shape
    return alpha * ramp(h, FEATHER[0])[:, None] * ramp(w, FEATHER[1])[None, :]


def grade(rgb):
    """The house look: quieter colour, a warm hanji tint and lifted blacks."""
    lum = (rgb @ np.array([0.299, 0.587, 0.114], dtype=np.float32))[..., None]
    rgb = rgb * 0.78 + lum * 0.22
    rgb = rgb * np.array([1.03, 1.0, 0.95], dtype=np.float32)
    rgb = 0.06 + rgb * 0.92
    return np.clip(rgb, 0, 1)


def main(root):
    out = os.path.join(root, OUT)
    os.makedirs(out, exist_ok=True)
    for name, src in JOBS.items():
        im = Image.open(os.path.join(SRC, src)).convert('RGB')
        im = im.resize((WIDTH, round(im.height * WIDTH / im.width)), Image.LANCZOS)
        rgb = np.asarray(im, dtype=np.float32) / 255
        rgb, alpha = lift(rgb)
        top = round(rgb.shape[0] * TOP)
        rgb, alpha = rgb[top:], feather(alpha[top:])
        rgba = np.dstack([grade(rgb), alpha])
        Image.fromarray((rgba * 255 + 0.5).astype(np.uint8)).save(os.path.join(out, name + '.webp'), 'WEBP', quality=82, method=6)
        print(name, (rgba.shape[1], rgba.shape[0]))


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else '../..')
