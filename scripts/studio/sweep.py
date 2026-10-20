# Studio sweep: moves every model onto one warm backdrop and applies a light house grade.
# Keeps the original backdrop's light falloff and floor shadows, swaps only its colour.
import numpy as np
from PIL import Image, ImageFilter

LUMA = np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)

def load(src, mask_path):
    a = np.asarray(Image.open(src).convert('RGB'), dtype=np.float32) / 255
    m = np.asarray(Image.open(mask_path).convert('L'), dtype=np.float32) / 255
    return a, m

def to_lin(c): return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
def to_srgb(c): return np.where(c <= 0.0031308, c * 12.92, 1.055 * np.power(np.clip(c, 0, None), 1 / 2.4) - 0.055)

def sweep(a, m, target, contrast=1.0):
    """Recolour the backdrop to `target` (sRGB 0-1), keeping its luminance structure."""
    lin = to_lin(a)
    Y = lin @ LUMA
    bg = m < 0.02
    yref = np.median(Y[bg])
    t = to_lin(np.array(target, dtype=np.float32))
    ratio = (Y / yref) ** contrast
    new_bg = to_srgb(t[None, None, :] * ratio[..., None])
    # soften the matte edge a touch so hair blends instead of cutting
    ms = np.asarray(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8)), dtype=np.float32) / 255
    w = ms[..., None]
    return np.clip(a * w + new_bg * (1 - w), 0, 1)

def house(a, seed=11, sat=0.92, grain=0.007):
    lum = (a @ np.array([0.299, 0.587, 0.114], dtype=np.float32))[..., None]
    a = a * sat + lum * (1 - sat)
    a = a * np.array([1.012, 1.0, 0.985], dtype=np.float32)
    a = 0.018 + a * 0.975
    rng = np.random.default_rng(seed)
    a = a + rng.normal(0, grain, a.shape[:2])[..., None]
    return np.clip(a, 0, 1)

def save(a, path, size=None, q=84):
    im = Image.fromarray((np.clip(a, 0, 1) * 255 + 0.5).astype(np.uint8))
    if size: im = im.resize(size, Image.LANCZOS)
    im.save(path, 'WEBP', quality=q, method=6)
    return im
