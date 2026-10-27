# The Duet page film: a woman wearing Sage Duo while the camera circles from her face round to the back of her head.
# Only the clean stretch of the source is used (it later dissolves from the back of her head into her face, which shows
# two pictures at once). That stretch plays forward and then back, with eased turns at each end, so the loop has no cut.
# Graded to the house: the cool studio grey warmed and lifted towards the site's taupe, with a soft vignette.
# Needs the film helper: swiftc -O film.swift -o .cache/film
#
#   python3 -I film.py ../..
import math, os, shutil, subprocess, sys
import numpy as np
from PIL import Image

SRC = os.environ.get('PQ_PHOTOS', os.path.expanduser('~/Downloads/down'))
CLIP = 'headband/Model_wearing_green_smart_headband_1080p_20261025195221.mp4'
CLEAN = (0.0, 5.46)  # seconds of the source before the dissolve begins
OUT = 'public/media/film/sage-duo-orbit'
SIZE = (1600, 900)
FPS = 24
TURN = 1.0  # seconds the camera takes to slow to a stop at each end, and to set off again
BITRATE = 2_600_000
HERE = os.path.dirname(os.path.abspath(__file__))
TOOL = os.path.join(HERE, '.cache/film')


def grade(rgb):
    """Lift and warm the studio grey, calm the colour a touch, roll off the highlights and add a soft vignette."""
    x = rgb.astype(np.float32) / 255 * np.array([1.16, 1.11, 1.11], np.float32)
    lum = x @ np.array([0.299, 0.587, 0.114], np.float32)
    x = lum[..., None] + (x - lum[..., None]) * 0.9
    x = np.where(x > 0.82, 0.82 + (x - 0.82) * 0.55, x)
    h, w = x.shape[:2]
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    r = np.hypot((xx - w * 0.52) / (w * 0.62), (yy - h * 0.42) / (h * 0.75))
    x *= (1 - 0.13 * np.clip(r - 0.35, 0, 1) ** 1.6)[..., None]
    return (np.clip(x, 0, 1) * 255 + 0.5).astype(np.uint8)


def travel(t, span):
    """Seconds into the source at t seconds into one leg: at full speed in the middle, easing to a stop at both ends."""
    leg = span + TURN
    ramp = lambda u: u / 2 - TURN / (2 * math.pi) * math.sin(math.pi * u / TURN)
    if t < TURN:
        return ramp(t)
    if t > leg - TURN:
        return span - ramp(leg - t)
    return TURN / 2 + (t - TURN)


def main(root):
    cache = os.path.join(HERE, '.cache')
    raw, frames = os.path.join(cache, 'film-src'), os.path.join(cache, 'film-out')
    for d in (raw, frames):
        shutil.rmtree(d, ignore_errors=True)
        os.makedirs(d)
    subprocess.run([TOOL, 'decode', os.path.join(SRC, CLIP), raw, str(CLEAN[0]), str(CLEAN[1])], check=True)
    src = [grade(np.asarray(Image.open(os.path.join(raw, f)).convert('RGB').resize(SIZE, Image.LANCZOS)))
           for f in sorted(os.listdir(raw))]
    span = (len(src) - 1) / FPS
    leg = round((span + TURN) * FPS)
    times = [travel(k / FPS, span) for k in range(leg)] + [travel((leg - k) / FPS, span) for k in range(leg)]
    for n, t in enumerate(times):
        f = min(t * FPS, len(src) - 1.0001)
        i, w = int(f), f - int(f)
        frame = src[i] if w < 0.02 else (src[i] * (1 - w) + src[i + 1] * w + 0.5).astype(np.uint8)
        Image.fromarray(frame).save(os.path.join(frames, f'o{n:04d}.png'), compress_level=1)
    out = os.path.join(root, OUT)
    subprocess.run([TOOL, 'encode', frames, out + '.mp4', str(FPS), str(BITRATE)], check=True)
    Image.open(os.path.join(frames, 'o0000.png')).save(out + '.webp', 'WEBP', quality=80, method=6)
    print(f'{len(times)} frames, {len(times) / FPS:.1f} s, {os.path.getsize(out + ".mp4") / 1e6:.1f} MB')


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else '../..')
