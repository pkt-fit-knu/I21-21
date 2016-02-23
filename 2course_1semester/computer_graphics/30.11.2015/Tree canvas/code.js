function Branch(level, begin, distance, angle) {
    this.level = level;
    this.angle = angle;
    this.begin = begin;
    this.end = {"X": distance * Math.cos(angle) + begin.X, "Y": begin.Y - distance * Math.sin(angle)};
    this.distance = distance;
}

Branch.prototype.toHTML = function () {
    if (this.level <= 2) {
        return '<line x1="' + this.begin.X + '" y1="' + this.begin.Y + '" x2="' + this.end.X + '" y2="' + this.end.Y + '" style="stroke:rgb(50,0,0);stroke-width:4" />';
    } else {
        return '<line x1="' + this.begin.X + '" y1="' + this.begin.Y + '" x2="' + this.end.X + '" y2="' + this.end.Y + '" style="stroke:rgb(50,255,0);stroke-width:2" />';
    }
};

Branch.allBranches = [];

Branch.prototype.makeChildren = function (count) {
    count--;
    var delta = 120 / count * Math.PI / 180;
    var dist = this.distance * 4 / 5;
    var startAngle = this.angle - 60 * Math.PI / 180;
    
    var child = [];
    
    for (var i = 0; i <= count; ++i) {
        var newChild = new Branch(this.level + 1, this.end, dist, startAngle + delta * i)
        child.push(newChild);
        if (this.level < 4) {
            newChild.makeChildren(5);
        }
    }
    
    for (var i = 0; i < child.length; ++i) {
        Branch.allBranches.push(child[i]);
    }
}

function tree(x, y, children) {
    var start = new Branch(1, {"X": x, "Y": y}, 50, 90 * Math.PI / 180);
    Branch.allBranches.push(start);
    start.makeChildren(children);
}

function main() {
    tree(300, 500, 4);
    tree(200, 200, 3);
}

window.onload = function () {
    main();
    
    var drawingCanvas = document.getElementById('smile');
    
    if (drawingCanvas && drawingCanvas.getContext) {
        var context = drawingCanvas.getContext('2d');
        
        for (var i = 0; i < Branch.allBranches.length; ++i) {
            var b = Branch.allBranches[i];
            context.beginPath();
            context.moveTo(b.begin.X, b.begin.Y);
            context.lineTo(b.end.X, b.end.Y);
            context.stroke();
        }
    }
};