import numpy as np


def sigmoid(z):
    return 1 / (1 + np.exp(-z))


def h(theta, X):
    return sigmoid(X.dot(theta))


f = open("counted_words.txt", "r")
words = [l.replace("\n", "") for l in f.readlines()]
f.close()

f = open("theta.txt", "r")
theta = [float(l) for l in f.readlines()]
f.close()

#print("Words:", words)

n = len(theta)
X = np.array([1] * len(theta))

article = input("Enter an article file name:\n")
f = open(article, "r")
lines = f.readlines()
article = ""
for l in lines:
    article += l.lower()
f.close()
#print("Artile:", article)

for i in range(1, n):
    if article.find(words[i - 1]) >= 0:
        X[i] = 1
    else:
        X[i] = 0

p = h(theta, X)
#print("X:", X)

if p >= 0.5:
    print("This is sport article, probability=", p * 100, "%", sep="")
else:
    print("This is medicine article, probability=", (1 - p) * 100, "%", sep="")