import os
from os.path import isfile, join

def read_features():
    f = open("counted_words.txt", "r")
    feats = f.readlines()
    i = 0
    while i < len(feats):
        feats[i] = feats[i].replace("\n", "")
        i += 1
    return feats

features = read_features()
main_f = open("training_set.txt", "w")

for dir in ["articles/sport", "articles/medicine"]:
    onlyfiles = [f for f in os.listdir(dir) if isfile(join(dir, f))]

    for fname in onlyfiles:
        f = open(dir + "/" + fname)
        lines = f.readlines()
        text = ""
        for l in lines:
            text += l
        text = text.lower()

        feature_vector = [0] * (len(features) + 1)
        feature_vector[0] = 1
        for i in range(len(features)):
            if text.find(features[i]) >= 0:
                feature_vector[i + 1] = 1

        for f in feature_vector:
            print(f, end=" ", file=main_f)
        if dir == "articles/sport":
            print(1, file=main_f)
        else:
            print(0, file=main_f)

main_f.close()