# Studio pipeline

Builds every storefront picture in `public/media/shop` from the source photo library, so all of them share one studio sweep.
Source photos stay outside the repo (default `~/Downloads/down`, or set `PQ_PHOTOS`). Needs macOS (Apple Vision for subject masks) and Python 3 with Pillow, NumPy and SciPy.

```bash
cd scripts/studio
mkdir -p .cache/masks && swiftc -O fgmask.swift -o .cache/fgmask
.cache/fgmask .cache/masks "${PQ_PHOTOS:-$HOME/Downloads/down}"/*.png   # subject masks
python3 -I plate.py                     # the empty studio sweep, fitted from every backdrop
python3 -I build.py ../.. [slug ...]    # worn crops, still lifes, back views, motion, edits
python3 -I duet.py ../..                # Brainwear headbands, qPads, in-use scenes and the homepage cutouts
python3 -I sketch.py ../.. [slug ...]   # white line drawings for sensor maps and the bag
python3 -I wide.py ../..                # outdoor photos for the qPad screens
python3 -I logos.py ../..               # partner marks for the homepage credit band (raw files in PQ_LOGOS)
```

- `manifest.py` says which source photo becomes which product and colour.
- `sweep.py` moves a model onto the house backdrop (#d9d1c7), keeping the original light and floor shadows, and holds the light house grade.
- After adding a colour or product, add it to `src/app/catalog.ts` too; file names follow the list at the top of that file.
