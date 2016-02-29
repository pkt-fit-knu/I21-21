filename = "iris.data"

f = open(filename, "r")
rows = [l.replace("\n", "").split(",") for l in f.readlines()]

rules = [
    {"column": 3, "min": 0.1, "max": 0.6, "result": "Iris-setosa"},
    {"column": 3, "min": 1.0, "max": 1.6, "result": "Iris-versicolor"},
    {"column": 3, "min": 1.7, "max": 2.5, "result": "Iris-virginica"}
]

matches = 0
errors = 0

for r in rows:
    if len(r) < 5:
        continue
    index = -1
    for i in range(len(rules)):
        column = rules[i]["column"]
        if rules[i]["min"] <= float(r[column]) and float(r[column]) <= rules[i]["max"]:
            index = i
    if index == -1:
        print("Error:", r)
        exit(1)
    else:
        result = r[4]
        if result == rules[index]["result"]:
            matches += 1
        else:
            errors += 1

print("Matches:", matches)
print("Errors:", errors)

print("Percentage:", matches * 100 / (matches + errors), "%")