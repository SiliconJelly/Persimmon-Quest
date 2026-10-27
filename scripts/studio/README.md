# Studio pipeline

Builds every picture and film the site uses, so the product photos share one studio sweep and the films share one grade.
Source photos and films stay outside the repo (default `~/Downloads/down`, or set `PQ_PHOTOS`; films in `~/Downloads/down/film`, or set `PQ_FILMS`).
Needs macOS (Apple Vision for subject masks), Python 3 with Pillow, NumPy and SciPy, and ffmpeg for the web films.

```bash
cd scripts/studio
mkdir -p .cache/masks && swiftc -O fgmask.swift -o .cache/fgmask
.cache/fgmask .cache/masks "${PQ_PHOTOS:-$HOME/Downloads/down}"/*.png   # subject masks
python3 -I plate.py                     # the empty studio sweep, fitted from every backdrop
python3 -I build.py ../.. [slug ...]    # worn crops, still lifes, back views, motion, edits
python3 -I duet.py ../..                # qBand headbands, qPads and in-use scenes
python3 -I sketch.py ../.. [slug ...]   # white line drawings for sensor maps and the bag
python3 -I wide.py ../..                # outdoor photos for the qPad screens
python3 -I logos.py ../..               # partner marks for the credit band (raw files in PQ_LOGOS)
python3 -I cloth.py ../..               # silk lifted off its studio for the homepage ending (raw files in PQ_CLOTH)
.cache/fgmask .cache/masks "${PQ_PHOTOS:-$HOME/Downloads/down}/brain/brain-top.webp"   # the brain's mask, for story.py
python3 -I story.py ../..               # the homepage opening (site/qband-sage-duo): Sage Duo from three angles, the brain, qPad screen-off, its screen photos and the glass mapping
python3 -I closing.py ../..             # the homepage ending: Sage Duo and the Quest Hood, each from three angles
python3 -I day.py ../..                 # the Duet page's day strip: Sage Duo from a morning walk to an evening read
python3 -I knit.py ../..                # the lookbook backdrop: feather jacquard and its sensor pod as a relief
swiftc -O film.swift -o .cache/film && python3 -I film.py ../..   # the Duet page film: Sage Duo, circled and back
FFMPEG=/path/to/ffmpeg python3 -I webfilm.py ../..              # every film for the web, with posters and phone cuts
```

- `manifest.py` says which source photo becomes which product and colour.
- `sweep.py` moves a model onto the house backdrop (#d9d1c7), keeping the original light and floor shadows, and holds the light house grade.
- `webfilm.py` writes H.264 MP4 with the index first and no sound, a `.webp` poster per film, and a `-phone.mp4` cut for the films shown large on phones. Pages pass both to `AutoVideo`, which picks the phone cut on small screens and keeps the poster when a phone holds back autoplay.
- After adding a colour or product, add it to `src/app/catalog.ts` too; file names follow the list at the top of that file.
