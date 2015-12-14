function Circle(id, center, radius, width, angle) {
    this.id = id;
    this.center = center;
    this.radius = radius;
    this.width = width / 2;
    this.angle = angle;
    this.velocity = 0.05;
    
    document.getElementsByTagName('svg')[Circle.i++].innerHTML = '<circle id="' + id + '" cx="50" cy="5" r="' + this.width + '" stroke="blue" stroke-width="0" fill="blue" />';
    Circle.circles.push(this);
}

Circle.circles = [];
Circle.i = 0;

Circle.prototype.getX = function () {
    return this.center.X + this.radius * Math.cos(this.angle);
};

Circle.prototype.getY = function () {
    return this.center.Y - this.radius * Math.sin(this.angle);
};

Circle.move = function () {
    for (var i = 0; i < Circle.circles.length; ++i) {
        var c = Circle.circles[i];
        c.angle -= c.velocity;
        
        if (c.angle < -270 / 180 * Math.PI) {
            c.angle = 90 / 180 * Math.PI;
        }
        
        var circle = document.getElementById(c.id);
        var cx = c.getX();
        var cy = c.getY();
        
        if (c.angle * 180 / Math.PI < 90 && c.angle * 180 / Math.PI > -90) {
            c.velocity += 0.02;
        } else {
            c.velocity -= 0.02;
        }
        if (c.velocity <= 0) {
            c.velocity = 0.05;
        }
        
        /*if (c.angle * 180 / Math.PI <= 270) {
            c.angle = 90 * Math.PI / 180;
        }
        */
        document.getElementsByTagName('svg')[i].innerHTML = '<circle id="' + c.id + '" cx="' + cx + '" cy="' + cy + '" r="' + c.width + '" stroke="blue" stroke-width="0" fill="blue" />';
    }
};

Circle.prototype.launch = function () {
    setInterval(Circle.move, 75);
};

function main() {
    var circles = [];
    circles.push(new Circle('circle1', {"X": 50, "Y": 50}, 45, 10, 90 / 180 * Math.PI));
    circles.push(new Circle('circle2', {"X": 50, "Y": 50}, 45, 10, 90 / 180 * Math.PI - 0.2));
    circles.push(new Circle('circle3', {"X": 50, "Y": 50}, 45, 10, 90 / 180 * Math.PI - 0.4));
    for (var i = 0; i < circles.length; ++i) {
        circles[i].launch();
    }
}