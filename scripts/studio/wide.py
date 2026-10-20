import sys, os, numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build import film, write, REPO, SRC
from PIL import Image
for name, out in [("Older man bicycling along a park path", "family-ride"), ("Morning park walk in navy jacquard hoodie", "family-walk")]:
    a = np.asarray(Image.open(SRC + name + '.png').convert('RGB'), dtype=np.float32) / 255
    print(write(film(a), os.path.join(REPO, 'public/media/site/people', out + '.webp'), (1344, 896), grain=0.012))
