# Clean studio plate: a separable fit (row profile x column profile) of every portrait backdrop.
import sys, os, numpy as np
sys.path.insert(0, os.path.dirname(__file__))
from sweep import *
from scipy import ndimage
from paths import SRC as D, MASKS as M, PLATE
TARGET = (0xd9/255, 0xd1/255, 0xc7/255)
rows, cols = [], []
for f in sorted(os.listdir(M)):
    if Image.open(D + f).size != (1024, 1536): continue
    a, m = load(D + f, M + f)
    if m.mean() > 0.35: continue
    Y = to_lin(a) @ LUMA
    bg = ndimage.binary_erosion(m < 0.02, iterations=24, border_value=1)
    r = Y / np.median(Y[bg]); r[~bg] = np.nan
    rows.append(np.nanmedian(r, axis=1)); cols.append(np.nanmedian(r, axis=0))
row = ndimage.gaussian_filter1d(np.nanmedian(np.array(rows), axis=0), 10)
col = ndimage.gaussian_filter1d(np.nanmedian(np.array(cols), axis=0), 30)
col = col / np.median(col)
field = row[:, None] * col[None, :]
np.save(PLATE, field.astype(np.float32))
t = to_lin(np.array(TARGET, dtype=np.float32))
print('rows', row[::128].round(3)); print('cols', col[::128].round(3))
