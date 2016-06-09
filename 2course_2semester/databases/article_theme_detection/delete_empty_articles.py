import os
from os.path import isfile, join


for dir in ["articles/sport", "articles/medicine"]:
    onlyfiles = [f for f in os.listdir(dir) if isfile(join(dir, f))]
    print("Files count:", len(onlyfiles))

    for fname in onlyfiles:
        statinfo = os.stat(dir + "/" + fname)
        if statinfo.st_size == 1:
            os.remove(dir + "/" + fname)
            print(dir + "/" + fname, "was removed")