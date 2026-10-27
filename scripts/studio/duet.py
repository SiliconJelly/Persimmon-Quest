# qBand headbands and qPad tablets from the device renders in <PQ_PHOTOS>/headband and <PQ_PHOTOS>/tablet.
# Each render is staged on the studio sweep (still, cut, back and extra views), in-use photos become
# shared scenes.
# usage: python3 -I duet.py <repo>
# Some source names do not match their picture (two "walking shorts" and a "sock" are tablet backs); this list goes by the picture.
import sys, os
import numpy as np
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build import clean_cut, place, still, write, hero_cut, OUT, REPO
from paths import SRC

HB, TB = SRC + 'headband/', SRC + 'tablet/'
COMBS = dict(fit=(1.7, 1.3), centre=(0.5, 0.12))  # close on the comb contacts along the strap
RING, PAD, CLOSE = dict(fit=(0.8, 0.6), centre=(0.5, 0.5)), dict(fit=(0.86, 0.64), centre=(0.5, 0.5)), dict(fit=(0.84, 0.74), centre=(0.5, 0.5))

# slug: colour: {view: (source, fit)}; "still" and "back" fill the catalogue's own fields, the rest are extra views
DEVICES = {
    'qband-sage-duo': {'sage': {
        'still': (HB + 'SAGE DUO woven EEG headband', RING),
        'back': (HB + 'Headband Rear Liner with Three Comb Pods', RING),
        'front': (HB + 'Sage Duo Front Elevation', dict(fit=(0.86, 0.5), centre=(0.5, 0.5))),
        'side': (HB + 'Sage Duo right-side headband profile', dict(fit=(0.86, 0.5), centre=(0.5, 0.5))),
        'liner': (HB + 'Sage Duo Inner Forehead Liner', RING),
        'contacts': (HB + 'Sage Duo Inner Side Contact Assembly', CLOSE),
        'pod': (HB + 'Sage Four-Finger EEG Contact Pod', CLOSE),
    }},
    'qband-everyday': {
        'oat': {'still': (HB + 'Oat leaf headband sensor arrangement', RING), 'inside': (HB + 'Oat Leaf Headband Inner Sensor Detail', RING)},
        'graphite': {'still': (HB + 'Graphite Loop EEG Headband', RING), 'inside': (HB + 'Graphite EEG Headband Sensor Layout', RING)},
        'rose': {'still': (HB + 'Rose Weave EEG Headband Concept', RING), 'inside': (HB + 'Rose Weave Interior Sensor Detail', RING)},
        'blue': {'still': (HB + 'Blue contour EEG wellness headband', RING), 'inside': (HB + 'Blue contour EEG headband render', RING)},
    },
    # The Arc has one render, so its Sage and Graphite editions are recoloured from the Ivory one (see tint below)
    'qband-arc': {
        'pearl': {'still': (HB + 'Ivory Arc EEG Headband(1)', RING), 'inside': (HB + 'Ivory Arc inner sensor detail', RING), 'combs': (HB + 'Ivory Arc EEG Headband(1)', COMBS)},
        'sage': {'still': (HB + 'Ivory Arc EEG Headband(1)', RING, (0.6, 0.63, 0.56)), 'inside': (HB + 'Ivory Arc inner sensor detail', RING, (0.6, 0.63, 0.56)), 'combs': (HB + 'Ivory Arc EEG Headband(1)', COMBS, (0.6, 0.63, 0.56))},
        'graphite': {'still': (HB + 'Ivory Arc EEG Headband(1)', RING, (0.27, 0.27, 0.285)), 'inside': (HB + 'Ivory Arc inner sensor detail', RING, (0.27, 0.27, 0.285)), 'combs': (HB + 'Ivory Arc EEG Headband(1)', COMBS, (0.27, 0.27, 0.285))},
    },
    'qpad-one': {
        'ivory': {
            'still': (TB + 'Reading Rhythm tablet in serene garden mode', PAD),
            'back': (TB + 'Rear three-quarter ivory tablet and dock', PAD),
            'screen': (TB + 'Word Quest tablet learning interface', PAD),
            'keys': (TB + 'Four-key tactile control deck', dict(fit=(0.88, 0.5), centre=(0.5, 0.5))),
        },
        'graphite': {
            'still': (TB + 'Daily Movement wellness tablet mockup', PAD),
            'back': (TB + 'Luxury Smart Walking Shorts', PAD),
        },
    },
    'qpad-grip': {
        'ivory': {
            'still': (TB + 'Premium tablet cutout with colorful side buttons', PAD),
            'back': (TB + 'Rear Grip Frame case with strap, stand', PAD),
            'pair': (TB + 'Premium Ivory Tablet Case with Tactile Buttons', PAD),
            'rail': (TB + 'Sage grip four-key side control rail', dict(fit=(0.5, 0.8), centre=(0.5, 0.5))),
        },
        'sage': {
            'still': (TB + 'Focus Garden tablet with breathing garden', PAD),
            'back': (TB + 'Integrated sage tablet with hinged kickstand', PAD),
        },
    },
}

# In-use photos shared by several product pages: name: source (all 3:2)
SCENES = {
    'calm-reading': TB + 'Calm Reading with Sage Headband and Tablet',
    'seated-stretch': HB + 'Gentle Seated Stretch with Sage Duo',
    'water-rhythm': TB + 'Gentle Water Rhythm by the Pool',
    'word-quest': HB + 'Sage Duo Greeting Practice at Home',
    'tai-chi': HB + 'Serene Tai Chi in a Courtyard',
    'shared-rhythm': TB + 'Shared Rhythm After a Morning Walk',
    'core-ball': TB + 'Seated Pilates with Sage Duo',
    'strength-band': TB + 'Home resistance band strength session',
    'melody': TB + 'Learning a melody at home',
    'cycling': HB + 'Gentle Home Cycling in Smart Gear',
    'herbs': HB + 'Thoughtful herb planting activity',
}

# Card and gallery "in use" pictures, 4:5: slug/colour: (source, centre x, top y) as fractions of the photo
CONTEXTS = {
    ('qband-sage-duo', 'sage'): (HB + 'Silver-haired man with Sage Duo and qPad', 0.5, 0.02),
    ('qband-everyday', 'blue'): (HB + 'Silver-haired man in cobalt smartwear', 0.5, 0.02),
    ('qpad-one', 'ivory'): (HB + 'Sage Duo Greeting Practice at Home', 0.6, 0.0),
}


def tint(rgb, al, target):
    """Recolour the shell and strap to a new edition, keeping their shading; grey sensors and dark parts stay as they are."""
    L = rgb @ np.array([0.299, 0.587, 0.114], dtype=np.float32)
    sat = rgb.max(-1) - rgb.min(-1)
    w = np.clip((L - 0.42) / 0.18, 0, 1) * np.clip(1 - (sat - 0.2) / 0.1, 0, 1)
    ref = np.median(L[(al > 0.5) & (w > 0.9)])
    t = np.clip(np.array(target, dtype=np.float32)[None, None] * (L / ref)[..., None] ** 1.15, 0, 1)
    return rgb * (1 - w[..., None]) + t * w[..., None]


def rgb_of(path):
    return np.asarray(Image.open(path + '.png').convert('RGB'), dtype=np.float32) / 255


def window(a, cx, top, ratio=0.8):
    """A 4:5 window of a photo, centred on cx and starting at top."""
    h, w = a.shape[:2]
    cw, ch = (h * ratio, h) if w / h > ratio else (w, w / ratio)
    x0 = min(max(cx * w - cw / 2, 0), w - cw)
    y0 = min(max(top * h, 0), h - ch)
    return a[int(y0):int(y0 + ch), int(x0):int(x0 + cw)]


def main():
    for slug, colours in DEVICES.items():
        d = os.path.join(OUT, slug)
        os.makedirs(d, exist_ok=True)
        for colour, views in colours.items():
            for view, spec in views.items():
                src, fit = spec[0], spec[1]
                rgb, al = clean_cut(src + '.png')
                if len(spec) > 2: rgb = tint(rgb, al, spec[2])
                canvas = place(rgb, al, **fit)
                name = f'{colour}-{view}' if view != 'still' else f'{colour}-still'
                write(still(canvas), os.path.join(d, name + '.webp'), canvas.size, grain=0.006)
                if view == 'still':
                    canvas.save(os.path.join(d, f'{colour}-cut.webp'), 'WEBP', quality=88, method=6)
            print(slug, colour, ', '.join(views))

    scenes = os.path.join(OUT, 'scenes')
    os.makedirs(scenes, exist_ok=True)
    for name, src in SCENES.items():
        write(rgb_of(src), os.path.join(scenes, name + '.webp'), (1200, 800))
    print('scenes', len(SCENES))

    for (slug, colour), (src, cx, top) in CONTEXTS.items():
        write(window(rgb_of(src), cx, top), os.path.join(OUT, slug, f'{colour}-context.webp'), (960, 1200))
    print('contexts', len(CONTEXTS))

if __name__ == '__main__':
    main()
