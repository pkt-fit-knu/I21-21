var defaultStyle = "width: 200; position: absolute; left: ";
var left = 0;
var top = 0;

function move() {
    setInterval(_move, 50);
};

function _move() {
    left += 1;
    top += 1;
    document.getElementById("img").style.left = left;
    document.getElementById("img").style.top = top;
}

function Picture(picture, x1, y1, x2, y2) {
    this.picture = document.getElementById(picture);
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.left = x1;
    this.up = y1;
    
    this.launch = function () {
        var A = this.y2 - this.y1;
        var B = this.x2 - this.x1;
        var C = Math.sqrt(A*A + B*B);

        this.verticalSpeed = Picture.SPEED * A / C;
        this.horizontalSpeed = Picture.SPEED * B / C;

        setInterval(this.move, Picture.SPEED);
    }
    
    this.move = function () {
        this.left += this.horizontalSpeed;
        this.up += this.verticalSpeed;
        this.picture.style.left = this.left;
        this.picture.style.top = this.up;
    }
    
    this.launch();
}
/*
Picture.prototype.move = function () {
        this.left += this.horizontalSpeed;
        this.up += this.verticalSpeed;
        this.picture.style.left = this.left;
        this.picture.style.top = this.up;
    };

Picture.prototype.launch = function () {
        var A = this.y2 - this.y1;
        var B = this.x2 - this.x1;
        var C = Math.sqrt(A*A + B*B);

        this.verticalSpeed = Picture.SPEED * A / C;
        this.horizontalSpeed = Picture.SPEED * B / C;

        setInterval(this.move, Picture.SPEED);
    };
*/
Picture.INTERVAL = 1000;
Picture.SPEED = 2.0;

function start() {
    Picture("img", 0, 0, 1000, 500);
}