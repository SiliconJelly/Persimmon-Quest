# Where the studio pipeline reads and writes. Source photos stay outside the repo.
import os
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(os.environ.get('PQ_PHOTOS', os.path.expanduser('~/Downloads/down')), '')
CACHE = os.path.join(HERE, '.cache')
MASKS = os.path.join(CACHE, 'masks', '')
PLATE = os.path.join(CACHE, 'plate_ratio.npy')
