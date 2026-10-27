# Every film on the site, encoded for the web: H.264 MP4 that plays on any phone, with its index at the front so it
# starts at once, no sound track, a still poster for when a phone holds back autoplay, and a phone cut for the films
# shown large on phones, framed the way the page crops them there.
# The house grade is baked into the pictures rather than laid on with a CSS filter: iPhones can stop drawing a video
# that carries a filter inside an animated frame, and it saves the phone that work on every frame.
# Originals stay outside the repo (default ~/Downloads/down/film, or set PQ_FILMS). Needs ffmpeg (set FFMPEG to its path).
#
#   python3 -I webfilm.py ../.. [name ...]
import os, subprocess, sys, tempfile
from PIL import Image

SRC = os.environ.get('PQ_FILMS', os.path.expanduser('~/Downloads/down/film'))
FFMPEG = os.environ.get('FFMPEG', 'ffmpeg')
OUT = 'public/media/film'
X264 = ['-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high', '-level', '4.0', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an',
        '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv']

# The Persimmon grade, as the CSS filters it replaces: saturate, then sepia, folded into one colour matrix (rows give R, G
# and B), then contrast and brightness as one gain and offset.
#   house: saturate(0.84) sepia(0.12) contrast(1.04) brightness(1.02)
#   soft:  saturate(0.92) sepia(0.06) contrast(1.02)
GRADES = {
    'house': ((0.8143, 0.1967, 0.0311, 0.0701, 0.9255, 0.0287, 0.0612, 0.1674, 0.7638), 1.0608, -5.202),
    'soft': ((0.9039, 0.1009, 0.0163, 0.0365, 0.9606, 0.0151, 0.0320, 0.0865, 0.8778), 1.02, -2.55),
}

# name: source, start and length in the source (None for all of it), width on large screens, poster time in the film,
# phone cut (ffmpeg crop and scale, or None) and grade (or None)
FILMS = {
    'persimmon-ai': ('persimmon-ai.mp4', None, 1600, 9.0, 'crop=864:1080:528:0,scale=720:900', None),   # 4:5, as /research crops it
    'choreography': ('choreography.mp4', None, 1920, 2.0, 'scale=1280:720', 'soft'),                    # phones show it as a 16:9 band
    'drape': ('tailoor-cloth.mp4', (9.8, 5), 1920, 1.5, 'crop=608:1080:656:0', 'house'),                 # the silk, 9:16 for the homepage hero
    'stride-scan': ('stride-scan.mp4', None, 1280, 0.0, None, None),
    'hands-free-reply': ('hands-free-reply.webm', None, 1280, 4.0, None, None),
    'proud-moment': ('proud-moment.webm', None, 1280, 4.0, None, None),
}
# Played by scrubbing (forward, then back), so every few frames is a keyframe and seeking stays smooth
SCRUB = {'stride-scan'}
# Films made by another script (film.py) that only need a phone cut here: name: crop and scale
PHONE_ONLY = {'sage-duo-orbit': 'crop=900:900:398:0,scale=720:720'}  # square, as the Duet page crops it on phones


def run(args):
    subprocess.run([FFMPEG, '-hide_banner', '-loglevel', 'error', '-y', *args], check=True)


def graded(frame, grade, video=True):
    """The filter chain: frame (crop and scale), then the grade in RGB, then back to video colour."""
    chain = [frame]
    if grade:
        m, k, o = GRADES[grade]
        mix = ':'.join(f'{c}={v}' for c, v in zip(('rr', 'rg', 'rb', 'gr', 'gg', 'gb', 'br', 'bg', 'bb'), m))
        lut = f"clip(val*{k}{o:+},0,255)"
        chain += ['format=gbrp', f'colorchannelmixer={mix}', f"lutrgb=r='{lut}':g='{lut}':b='{lut}'"]
    if video:
        chain.append('scale=out_color_matrix=bt709:out_range=tv,format=yuv420p')
    return ','.join(chain)


def main(root, only):
    out = os.path.join(root, OUT)
    os.makedirs(out, exist_ok=True)
    for name, (src, span, width, at, phone, grade) in FILMS.items():
        if only and name not in only: continue
        path = os.path.join(SRC, src)
        start, length = span or (0, None)
        cut = ['-ss', str(start), *(['-t', str(length)] if length else []), '-i', path]
        gop = ['-g', '4'] if name in SCRUB else []
        run([*cut, '-vf', graded(f"scale='min({width},iw)':-2", grade), *X264, '-crf', '25', '-maxrate', '3M', '-bufsize', '6M', *gop, os.path.join(out, name + '.mp4')])
        if phone:
            run([*cut, '-vf', graded(phone, grade), *X264, '-crf', '26', '-maxrate', '1600k', '-bufsize', '3200k', os.path.join(out, name + '-phone.mp4')])
        with tempfile.TemporaryDirectory() as tmp:
            still = os.path.join(tmp, 'still.png')
            run(['-ss', str(start + at), '-i', path, '-vf', graded('null', grade, video=False), '-frames:v', '1', still])
            im = Image.open(still).convert('RGB')
            if im.width > width: im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
            im.save(os.path.join(out, name + '.webp'), 'WEBP', quality=78, method=6)
        sizes = ', '.join(f'{f} {os.path.getsize(os.path.join(out, f)) // 1024} KB' for f in sorted(os.listdir(out)) if f.startswith(name + '.') or f.startswith(name + '-phone'))
        print(name, '|', sizes)
    for name, phone in PHONE_ONLY.items():
        if only and name not in only: continue
        run(['-i', os.path.join(out, name + '.mp4'), '-vf', phone, *X264, '-crf', '28', '-maxrate', '1200k', '-bufsize', '2400k', os.path.join(out, name + '-phone.mp4')])
        print(name, '| phone cut', os.path.getsize(os.path.join(out, name + '-phone.mp4')) // 1024, 'KB')


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else '../..', set(sys.argv[2:]))
