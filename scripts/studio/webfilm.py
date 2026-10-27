# Every film on the site, encoded for the web: H.264 MP4 that plays on any phone, with its index at the front so it
# starts at once, no sound track, a still poster for when a phone holds back autoplay, and a smaller phone cut for the
# films shown large on phones, framed the way the page crops them there.
# Originals stay outside the repo (default ~/Downloads/down/film, or set PQ_FILMS). Needs ffmpeg (set FFMPEG to its path).
#
#   python3 -I webfilm.py ../..
import os, subprocess, sys, tempfile
from PIL import Image

SRC = os.environ.get('PQ_FILMS', os.path.expanduser('~/Downloads/down/film'))
FFMPEG = os.environ.get('FFMPEG', 'ffmpeg')
OUT = 'public/media/film'
X264 = ['-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high', '-level', '4.0', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an']

# name: source, width on large screens, poster time in seconds, phone cut (ffmpeg crop and scale) or None
FILMS = {
    'persimmon-ai': ('persimmon-ai.mp4', 1600, 9.0, 'crop=864:1080:528:0,scale=720:900'),   # 4:5, as /research crops it
    'choreography': ('choreography.mp4', 1600, 2.0, 'scale=960:-2'),                         # phones show it as a 16:9 band
    'drape': ('drape.mp4', 1280, 1.5, 'crop=406:720:437:0'),                                  # 9:16 for the homepage hero
    'stride-scan': ('stride-scan.mp4', 1280, 0.0, None),
    'hands-free-reply': ('hands-free-reply.webm', 1280, 4.0, None),
    'proud-moment': ('proud-moment.webm', 1280, 4.0, None),
}
# Played by scrubbing (forward, then back), so every few frames is a keyframe and seeking stays smooth
SCRUB = {'stride-scan'}
# Films made by another script (film.py) that only need a phone cut here: name: crop and scale
PHONE_ONLY = {'sage-duo-orbit': 'crop=900:900:398:0,scale=720:720'}  # square, as the Duet page crops it on phones


def run(args):
    subprocess.run([FFMPEG, '-hide_banner', '-loglevel', 'error', '-y', *args], check=True)


def main(root):
    out = os.path.join(root, OUT)
    os.makedirs(out, exist_ok=True)
    for name, (src, width, at, phone) in FILMS.items():
        path = os.path.join(SRC, src)
        gop = ['-g', '4'] if name in SCRUB else []
        run(['-i', path, '-vf', f"scale='min({width},iw)':-2", *X264, '-crf', '25', '-maxrate', '3M', '-bufsize', '6M', *gop, os.path.join(out, name + '.mp4')])
        if phone:
            run(['-i', path, '-vf', phone, *X264, '-crf', '26', '-maxrate', '1600k', '-bufsize', '3200k', os.path.join(out, name + '-phone.mp4')])
        with tempfile.TemporaryDirectory() as tmp:
            still = os.path.join(tmp, 'still.png')
            run(['-ss', str(at), '-i', path, '-frames:v', '1', still])
            im = Image.open(still).convert('RGB')
            if im.width > width: im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
            im.save(os.path.join(out, name + '.webp'), 'WEBP', quality=78, method=6)
        sizes = ', '.join(f'{f} {os.path.getsize(os.path.join(out, f)) // 1024} KB' for f in sorted(os.listdir(out)) if f.startswith(name + '.') or f.startswith(name + '-phone'))
        print(name, '|', sizes)
    for name, phone in PHONE_ONLY.items():
        run(['-i', os.path.join(out, name + '.mp4'), '-vf', phone, *X264, '-crf', '28', '-maxrate', '1200k', '-bufsize', '2400k', os.path.join(out, name + '-phone.mp4')])
        print(name, '| phone cut', os.path.getsize(os.path.join(out, name + '-phone.mp4')) // 1024, 'KB')


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else '../..')
