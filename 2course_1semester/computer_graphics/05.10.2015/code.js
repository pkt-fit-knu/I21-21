var obj1 = {'name': 'Alexey', 'surname': 'Yakovlev'};
var obj2 = Object.create(obj1);

function printObject() {
    var info1 = Object.keys(obj1);
    var info2 = Object.keys(obj2);
    
    var obj3 = {};
    
    for (var i = 0; i < info1.length; ++i)
        obj3[info1[i]] = obj1[info1[i]];
    
    for (var i = 0; i < info2.length; ++i)
        obj3[info2[i]] = obj2[info2[i]];
    
    console.log(obj3);
}

function printObjects2() {
    var info1 = Object.keys(obj1);
    var info2 = Object.keys(obj2);
    var obj3 = {};
    
    /*for (var i = 0; i < info1.length; ++i) {
        for (var j = 0; j < info2.length; ++j) {
            if (info1[i] == info2[j]) {
                obj3[info1[i]] = obj1[info1[i]];
            }
        }
    }*/
    
    for (masha in obj2) {
        if (obj2.hasOwnProperty(masha)) {
            delete obj1[masha];
        }
    }
    
    console.log(obj1);
    console.log(obj2);
    console.log(obj3);
}