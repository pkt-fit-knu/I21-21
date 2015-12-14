function SampleClass(name, surname) {
    "use strict";
    this.name = name;
    this.surname = surname;
}

SampleClass.prototype.AlertData = function() {
    "use strict";
    alert(this.name + " " + this.surname);
};

function pageLoad() {
    "use strict";
    document.getElementsByTagName("body")[0].innerHTML += "Hello";
    var human = new SampleClass("Alexey", "Yakovlev");
    document.getElementsByTagName("body")[0].innerHTML += ", " + human.name + " " + human.surname;
    human.AlertData();
}

function writeRectanglePerimetrAndDiagonal() {
    "use strict";
    var sideLength1 = document.getElementById("textBox1").value;
    var sideLength2 = document.getElementById("textBox2").value;
    
    var diagonal = Math.sqrt(sideLength1 * sideLength1 + sideLength2 * sideLength2);
    var perimetr = sideLength1 * 2 + sideLength2 * 2;
    
    alert("Perimetr: " + perimetr + "\n" +
          "Diagonal: " + diagonal);
}