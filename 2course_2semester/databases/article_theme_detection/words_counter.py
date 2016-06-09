import os
import re
import json
from os.path import isfile, join


all_words = []
main_f = open("counted_words.txt", "w")
stat = {}


def delete_vowels(str):
    end = len(str) - 1
    if end <= 0:
        return str
    while str[end] == "а" or str[end] == "о" or str[end] == "у" or str[end] == "е" or str[end] == "и" or \
        str[end] == "і" or str[end] == "э" or str[end] == "я" or str[end] == "є" or str[end] == "ю":
        str = str[:-1]
        end -= 1
    return str


for dir in ["articles/sport", "articles/medicine"]:
    onlyfiles = [f for f in os.listdir(dir) if isfile(join(dir, f))]
    dir_words = []
    stat[dir] = {}

    for fname in onlyfiles:
        f = open(dir + "/" + fname, "r")
        lines = [line.replace("\n", "") for line in f.readlines()]
        words = []
        for line in lines:
            w = [re.sub(r"\W+", "", str).lower() for str in line.split()]
            i = 0
            while i < len(w):
                if len(w[i]) < 4 or w[i] == "Главная" or w[i] == "Публикации":
                    del w[i]
                else:
                    w[i] = delete_vowels(w[i])
                i += 1
            words.append(w)
            for ww in w:
                if ww not in stat[dir]:
                    stat[dir][ww] = 1
                else:
                    stat[dir][ww] += 1
        dir_words += words

    all_words += dir_words


for s in stat:
    words = stat[s]
    statistics = []
    for key in words:
        statistics.append([key, words[key]])
    stat[s] = statistics


for s in stat:
    statistics = stat[s]
    sorted_st = []
    max = 0
    for st in statistics:
        if st[1] > max:
            max = st[1]

    feature_count = 0
    for i in range(max, 30, -1):
        for st in statistics:
            if feature_count >= 150:
                break
            if st[1] == i and len(st[0]) > 4:
                sorted_st.append(st)
                feature_count += 1
    stat[s] = sorted_st
    print(len(sorted_st))

unique_words = []

for st in stat:
    #print(st.split("/")[1], file=main_f)
    for example in stat[st]:
        unique_words.append(example[0])
        #print(example[0], file=main_f)

i = 0

while i < len(unique_words) - 1:
    j = i + 1
    while j < len(unique_words):
        if unique_words[i] == unique_words[j]:
            del unique_words[j]
            j -= 1
        j += 1
    i += 1

for w in unique_words:
    print(w, file=main_f)

print("Words have been counted")

main_f.close()