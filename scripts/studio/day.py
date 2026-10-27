# The Duet page's day strip: Sage Duo worn from a morning walk to an evening read, one frame per moment.
# Each photo is cut to a tall (4:5) or wide (4:3) frame around its subject and given the house grade, so the strip
# reads as one film roll. The page lays the frames out at one height and names what each moment senses.
#
#   python3 -I day.py ../..
import os, sys
import numpy as np
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from paths import SRC
from sweep import house

OUT = 'public/media/site/day'
TALL, WIDE = (720, 900), (1200, 900)
HB, TB = 'headband/', 'tablet/'
# name: (source, frame, centre x as a share of the photo's width). Only photos where the band worn is Sage Duo.
FRAMES = {
    'walk': (HB + 'Confident Morning Walk in Smart Shoes.png', TALL, 0.44),
    'pickleball': (HB + 'Pickleball Doubles with Sage Duo.webp', WIDE, 0.5),
    'tai-chi': (HB + 'Serene Tai Chi in a Courtyard.png', TALL, 0.47),
    'pilates': (HB + 'Core Pilates with the Persimmon Ball.webp', WIDE, 0.56),
    'pool': (TB + 'Gentle Water Rhythm by the Pool.png', TALL, 0.31),
    'word-quest': (HB + 'Sage Duo Greeting Practice at Home.png', WIDE, 0.5),
    'stretch': (HB + 'Gentle Seated Stretch with Sage Duo.png', TALL, 0.36),
    'together': (TB + 'Shared Rhythm After a Morning Walk.png', WIDE, 0.5),
    'read': (TB + 'Calm Reading with Sage Headband and Tablet.png', WIDE, 0.5),
}


def frame(im, size, cx):
    """Cut the largest window of the frame's shape, full height, centred on cx and kept inside the photo."""
    w, h = im.size
    ratio = size[0] / size[1]
    cw, ch = (round(h * ratio), h) if w / h > ratio else (w, round(w / ratio))
    x0 = min(max(round(cx * w - cw / 2), 0), w - cw)
    y0 = (h - ch) // 2
    return im.crop((x0, y0, x0 + cw, y0 + ch)).resize(size, Image.LANCZOS)


def main(root):
    out = os.path.join(root, OUT)
    os.makedirs(out, exist_ok=True)
    for i, (name, (src, size, cx)) in enumerate(FRAMES.items()):
        im = frame(Image.open(os.path.join(SRC, src)).convert('RGB'), size, cx)
        g = house(np.asarray(im, dtype=np.float32) / 255, seed=20 + i)
        Image.fromarray((g * 255 + 0.5).astype(np.uint8)).save(os.path.join(out, name + '.webp'), 'WEBP', quality=78, method=6)
        print(name, size)


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else '../..')
