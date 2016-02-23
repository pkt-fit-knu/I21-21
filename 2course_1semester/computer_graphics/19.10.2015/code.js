function mainFunc(complex, real) {
    var x, y, n, result;
    x = {'real': 1, 'complex': 2};

    function add(complex) {
        z = {'real': 0, 'complex': 0};
        z['real'] = x['real'] + complex['real'];
        z['complex'] = x['complex'] + complex['complex'];
        x = z;
    }
    
    function multiply(n) {
        z = {'real': 0, 'complex': 0};
        z['real'] = x['real'] * n;
        z['complex'] = x['complex'] * n;
        x = z;
    }
    
    function print() {
        console.log(x);
    }
    

    return {"add": add, "mult": multiply, "print": print};
}

function minMax(parameter) {
    if (parameter == 'min') {
        function min(array) {
            var m = 100000000;
            for (i in array) {
                if (array[i] < m) {
                    m = array[i];
                }
            }
            return m;
        }
        
        return min;
    } else {
        function max(array) {
            var m = -100000000;
            for (i in array) {
                if (array[i] > m) {
                    m = array[i];
                }
            }
            return m;
        }
        
        return max;
    }
}

function main() {
    /*var f = mainFunc();
    f.add({'real': 1, 'complex': 3});
    f.print();*/
    var array = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    var minimum = minMax('min');
    var maximum = minMax('max');
    console.log('Minimum ' + minimum(array));
    console.log('Maximum ' + maximum(array));
}