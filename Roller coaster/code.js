var canvas = null;
var rollerCoaster;

function createCanvas() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var html = "<canvas id=\"myCanvas\" style=\"position:absolute; left:0; top:0;\" width=\"" + w + "\" height=\"" + h + "\"><p>Ваш браузер не підтримує малювання.</p></canvas>";
    var body = document.getElementsByTagName("body")[0];
    body.innerHTML = html + body.innerHTML;
    canvas = document.getElementById("myCanvas");
}

function drawBounds() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var context = canvas.getContext("2d");
    context.beginPath();
    context.lineWidth = 5;
    context.moveTo(0, 0);
    context.lineTo(0, h);
    context.lineTo(w, h);
    context.lineTo(w, 0);
    context.lineTo(0, 0);
    context.stroke();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function RollerCoaster(nodes, ball) {
    this.segments = [];
    for (var i = 0; i < nodes.length - 1; ++i) {
        this.segments.push([nodes[i], nodes[i + 1]]);
    }
    this.ballX = 10;
    this.ballY = 150;
    this.img = ball;
    this.hV = 0;
    this.vV = 0;
    this.hA = 0;
    this.vA = 0;
    this.freeFall = false;
}

RollerCoaster.generateRollerCoaster = function (step, ball) {
    var w = window.innerWidth;
    var h = window.innerHeight;
    
    var Y = h / 3;
    var X = 0;
    var nodes = [];
    nodes.push({"x": X, "y": Y});
    Y += 100;
    X += 100;
    
    while (X < w) {
        nodes.push({"x": X, "y": Y});
        X += step;
        Y += getRandomInt(-5, 11);
    }
    
    return new RollerCoaster(nodes, ball);
};

RollerCoaster.g = 0.1;

RollerCoaster.prototype.draw = function () {
    var context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(this.segments[0][0].x, this.segments[0][0].y);
    for (var i = 0; i < this.segments.length; ++i) {
        context.lineTo(this.segments[i][1].x, this.segments[i][1].y);
    }
    context.lineWidth = 2;
    context.stroke();
};

RollerCoaster.prototype.identifySegment = function () {
    this.segmentIndex = -1;
    for (var i = 0; i < this.segments.length; ++i) {
        if (this.segments[i][0].x <= this.ballX && this.ballX < this.segments[i][1].x) {
            this.segmentIndex = i;
            return;
        }
    }
}

RollerCoaster.prototype.getMaxY = function (x) {
    var p1 = this.segments[this.segmentIndex][0];
    var p2 = this.segments[this.segmentIndex][1];
    
    return (x - p1.x) * (p2.y - p1.y) / (p2.x - p1.x) + p1.y;
};

RollerCoaster.prototype.getAngle = function () {
    var p1 = this.segments[this.segmentIndex][0];
    var p2 = this.segments[this.segmentIndex][1];
    var tg = (p2.y - p1.y) / (p2.x - p1.x);
    
    return Math.atan(tg);
}

function moveBall() {
    var freeFallChanged = false;
    rollerCoaster.identifySegment();
    var y = rollerCoaster.ballY;
    var maxY = rollerCoaster.getMaxY(rollerCoaster.ballX);
    if (rollerCoaster.ballY < maxY) {
        if (!rollerCoaster.freeFall)
            freeFallChanged = true;
        rollerCoaster.freeFall = true;
        rollerCoaster.vA += RollerCoaster.g;
    } else {
        var angle = rollerCoaster.getAngle();
        rollerCoaster.vA = RollerCoaster.g * Math.cos(angle);
        rollerCoaster.hA = RollerCoaster.g * Math.sin(angle);
        if (rollerCoaster.freeFall) {
            var a = Math.sqrt(Math.pow(rollerCoaster.hA, 2) + Math.pow(rollerCoaster.vA, 2));
            var sign = Math.sign(rollerCoaster.hV);
            if (sign == 0) {
                sign = 1;
            }
            if (sign == -1) {
                sign = -0.5;
            }
            rollerCoaster.hA = a * Math.cos(angle) * sign;
            rollerCoaster.vA = a * Math.sin(angle) * sign;//v * Math.sin(angle) * sign;
        }
        if (rollerCoaster.freeFall)
            freeFallChanged = true;
        rollerCoaster.freeFall = false;
    }
    
    rollerCoaster.hV += rollerCoaster.hA;
    rollerCoaster.vV += rollerCoaster.vA;
    
    rollerCoaster.ballX += rollerCoaster.hV;
    rollerCoaster.ballY += rollerCoaster.vV;
    
    if (rollerCoaster.ballY > maxY) {
        rollerCoaster.ballY = maxY;
    }
    
    if (rollerCoaster.ballX > window.innerWidth - 40) {
        rollerCoaster.ballX = window.innerWidth - 40;
        rollerCoaster.hV = -rollerCoaster.hV * 0.75;
        rollerCoaster.hA = -rollerCoaster.hA * 0.75;
    }
    
    if (rollerCoaster.ballX < 0) {
        rollerCoaster.ballX = 0;
        rollerCoaster.hV = -rollerCoaster.hV * 0.75;
        rollerCoaster.hA = -rollerCoaster.hA * 0.75;
    }
    
    if (rollerCoaster.ballY < y && rollerCoaster.vV > 0) {
        rollerCoaster.vV = 0;
        if (freeFallChanged)
            rollerCoaster.vA = RollerCoaster.g * Math.sin(angle);
    }
    
    if (rollerCoaster.ballY > y && rollerCoaster.hV < 0) {
        rollerCoaster.hV *= 0.97;
    }
    
    rollerCoaster.img.style.left = rollerCoaster.ballX;
    rollerCoaster.img.style.top = rollerCoaster.ballY - 10;
}

window.onload = function () {
    createCanvas();
    drawBounds();
    var ball = document.getElementById("ball");
    rollerCoaster = RollerCoaster.generateRollerCoaster(10, ball);
    rollerCoaster.draw();
    setInterval(moveBall, 50);
};