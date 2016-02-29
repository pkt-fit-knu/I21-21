def formatted_print(json, indent):
    if type(json) is dict:
        if len(json) < 4:
            print(json)
        else:
            print("\t" * indent, "{", sep="")
            for key in json:
                print("\t" * (indent + 1), key, ":", sep="", end=" ")
                formatted_print(json[key], indent + 1)
            print("\t" * indent, "}", sep="")
    elif type(json) is list:
        if len(json) < 4:
            print(json)
        else:
            print("\t" * indent, "[", sep="")
            for key in json:
                formatted_print(key, indent + 1)
            print("\t" * indent, "]", sep="")
    else:
        print(json)

def qs(a, l, r):
    i = l; j = r; x = a[(l + r) // 2]

    while i <= j:
        while a[i][0] < x[0]:
            i += 1
        while x[0] < a[j][0]:
            j -= 1
        if i <= j:
            temp = a[i]
            a[i] = a[j]
            a[j] = temp
            i += 1
            j -= 1

    if i < r:
        qs(a, i, r)
    if l < j:
        qs(a, l, j)

filename = "iris.data"
f = open(filename, "r")

rows = [l.replace("\n", "").split(",") for l in f.readlines()]

preliminary_rules = {
    0: {},
    1: {},
    2: {},
    3: {}
}

for r in rows:
    if len(rows) < 5:
        continue

    for i in preliminary_rules:
        if r[i] in preliminary_rules[i]:
            if r[len(r) - 1] in preliminary_rules[i][r[i]]:
                preliminary_rules[i][r[i]][r[len(r) - 1]] += 1
            else:
                preliminary_rules[i][r[i]][r[len(r) - 1]] = 1
        else:
            preliminary_rules[i][r[i]] = {
                r[len(r) - 1]: 1
            }

rules = {
    0: {},
    1: {},
    2: {},
    3: {}
}

for col_number in preliminary_rules:
    for key in preliminary_rules[col_number]:
        max = -99999999
        selected_name = ""
        for name in preliminary_rules[col_number][key]:
            n = preliminary_rules[col_number][key][name]
            if n > max:
                max = n
                selected_name = name
        rules[col_number][key] = selected_name
        #{
        #    selected_name: max
        #}

revision = {
    0: {"matches": 0, "mismatches": 0},
    1: {"matches": 0, "mismatches": 0},
    2: {"matches": 0, "mismatches": 0},
    3: {"matches": 0, "mismatches": 0},
}

for row in rows:
    for key in rules:
        value = row[key]
        if row[len(row) - 1] == rules[key][value]:
            revision[key]["matches"] += 1
        else:
            revision[key]["mismatches"] += 1

max = -9999999

for key in revision:
    m = revision[key]["matches"]
    col = -1
    if m > max:
        m = max
        col = key

output_rule = []

for key in rules[col]:
    output_rule.append([key, rules[col][key]])

qs(output_rule, 0, len(output_rule) - 1)

print("The best rule:")

#print("if column #", col, " == ", output_rule[0][0], " then result = ", output_rule[0][1], sep="")
print("if column #", col, " >= ", output_rule[0][0], sep="", end="")

for i in range(1, len(output_rule)):
    if output_rule[i][1] != output_rule[i - 1][1]:
        print(" and <= ", output_rule[i][0], " then result = ", output_rule[i - 1][1], sep="")
        print("if column #", col, " >= ", output_rule[i][0], sep="", end="")

print(" and <= ", output_rule[-1][0], " then result = ", output_rule[-1][1], sep="")

print()
print("Matches:", revision[col]["matches"])
print("Mismatches:", revision[col]["mismatches"])