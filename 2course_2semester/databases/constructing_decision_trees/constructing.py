import math


def entropy(array):
    result = 0
    for value in array:
        result -= value * math.log(value, 2)
    return result


def info(arguments):
    if not type(arguments) is list:
        return

    if type(arguments[0]) is list:
        count = 0
        for a in arguments:
            count += a[0] + a[1]
        result = 0
        for a in arguments:
            sum = a[0] + a[1]
            result += sum / count * info(a)

        return result
    else:
        if arguments[0] == 0 or arguments[1] == 0:
            return 0

        sum = arguments[0] + arguments[1]
        array = [arguments[0] / sum, arguments[1] / sum]

        return entropy(array)


def gain(array):
    yes = 0
    no = 0
    for a in array:
        yes += a[0]
        no += a[1]

    return info([yes, no]) - info(array)


def qs(a, l, r):
    i = l; j = r; x = a[(l + r) // 2]

    while i <= j:
        while a[i] < x:
            i += 1
        while x < a[j]:
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


def delete_duplicats(array):
    qs(array, 0, len(array) - 1)
    i = 0
    while i < len(array) - 1:
        if array[i] == array[i + 1]:
            del array[i]
        else:
            i += 1


def count_gain(table, column):
    values = []
    for row in table:
        values.append(row[column])
    delete_duplicats(values)

    array = []

    for v in values:
        yes = 0
        no = 0
        for row in table:
            if row[column] == v:
                if row[len(row) - 1] == "yes":
                    yes += 1
                elif row[len(row) - 1] == "no":
                    no += 1
        array.append([yes, no])

    return gain(array), values


def tab(level):
    return "\t" * level


def make_tree(table, level):
    max = -1
    column = -1

    for i in range(len(table[0]) - 1):
        g = count_gain(table, i)
        if g[0] > max:
            max = g[0]
            values = g[1]
            column = i

    for v in values:
        print(tab(level), "If column", column, "=", v)

        sub_table = []
        for row in table:
            if row[column] == v:
                sub_table.append(row)

        max = -1
        sub_column = -1

        for i in range(len(sub_table) - 1):
            if i == column:
                continue
            else:
                g = count_gain(sub_table, i)
                if g[0] > max:
                    max = g[0]
                    sub_column = i

        if max == 0:
            print(tab(level + 1), sub_table[0][len(sub_table[0]) - 1])
        elif max >= 0.8:
            for row in sub_table:
                if row[len(row) - 1] == "yes":
                    yes = row[sub_column]
                elif row[len(row) - 1] == "no":
                    no = row[sub_column]
            print(tab(level + 1), "If column", sub_column, "=", yes, "then yes")
            print(tab(level + 1), "If column", sub_column, "=", no, "then no")
        else:
            make_tree(sub_table, level + 1)


f = open("weather.data", "r")
table = [l.split() for l in f.readlines()]

make_tree(table, 0)