function SmoothlyMovingPicture(id, x1, y1, x2, y2, speed) {
    "use strict";
    this.id = id;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.left = x1;
    this.top = y1;
    
    var A, B, C;
    A = x2 - x1;
    B = y2 - y1;
    C = Math.sqrt(A * A + B * B);
    
    this.hSpeed = speed * A / C;
    this.vSpeed = speed * B / C;
}

SmoothlyMovingPicture.Array = [];

SmoothlyMovingPicture.NewInstanceHtml = function (x1, y1, x2, y2, speed) {
    "use strict";
    var lastId, html;
    lastId = SmoothlyMovingPicture.Array.length;
    html = '<img id="' + lastId + 's" src="picture.jpg" style="position: absolute; height: 100; left: ' + x1 + '; top: ' + y1 + ';" />';
    SmoothlyMovingPicture.Array.push(new SmoothlyMovingPicture(lastId + "s", x1, y1, x2, y2, speed));
    return html;
};

SmoothlyMovingPicture.prototype.move = function () {
    "use strict";
    var picture = document.getElementById(this.id);
    picture.style.left = this.left;
    picture.style.top = this.top;
    
    this.left += this.hSpeed;
    this.top += this.vSpeed;
    if (this.left > Math.max(this.x1, this.x2) || this.left < Math.min(this.x1, this.x2))
        this.hSpeed = -this.hSpeed;
    if (this.top > Math.max(this.y1, this.y2) || this.top < Math.min(this.y1, this.y2))
        this.vSpeed = -this.vSpeed;
        
};

SmoothlyMovingPicture.LaunchAll = function () {
    "use strict";
    setInterval(SmoothlyMovingPicture.MoveAll, 50);
};

SmoothlyMovingPicture.MoveAll = function () {
    "use strict";
    var i;
    for (i = 0; i < SmoothlyMovingPicture.Array.length; ++i) {
        SmoothlyMovingPicture.Array[i].move();
    }
};


function AcceleratedMovingPicture(id, x1, y1, x2, y2, speed, acceleration) {
    "use strict";
    this.id = id;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.left = x1;
    this.top = y1;
    
    var A, B, C;
    A = x2 - x1;
    B = y2 - y1;
    C = Math.sqrt(A * A + B * B);
    
    this.hSpeed = speed * A / C;
    this.vSpeed = speed * B / C;
    this.hAcceleration = acceleration * A / C;
    this.vAcceleration = acceleration * B / C;
}

AcceleratedMovingPicture.Array = [];

AcceleratedMovingPicture.NewInstanceHtml = function (x1, y1, x2, y2, speed, acceleration) {
    "use strict";
    var lastId, html;
    lastId = AcceleratedMovingPicture.Array.length;
    html = '<img id="' + lastId + 'a" src="picture.jpg" style="position: absolute; height: 100; left: ' + x1 + '; top: ' + y1 + ';" />';
    AcceleratedMovingPicture.Array.push(new AcceleratedMovingPicture(lastId + "a", x1, y1, x2, y2, speed, acceleration));
    return html;
};

AcceleratedMovingPicture.prototype.move = function () {
    "use strict";
    var picture = document.getElementById(this.id);
    picture.style.left = this.left;
    picture.style.top = this.top;
    this.left += this.hSpeed;
    this.top += this.vSpeed;
    
    if (this.left <= (this.x2 + this.x1) / 2) {
        if (this.x1 < this.x2)
            this.hSpeed += this.hAcceleration;
        else
            this.hSpeed -= this.hAcceleration;
    } else {
        if (this.x1 < this.x2)
            this.hSpeed -= this.hAcceleration;
        else
            this.hSpeed += this.hAcceleration;
    }
    
    if (this.top <= (this.y2 + this.y1) / 2) {
        if (this.y1 < this.y2)
            this.vSpeed += this.vAcceleration;
        else
            this.vSpeed -= this.vAcceleration;
    } else {
        if (this.y1 < this.y2)
            this.vSpeed -= this.vAcceleration;
        else
            this.vSpeed += this.vAcceleration;
    }
};

AcceleratedMovingPicture.LaunchAll = function () {
    "use strict";
    setInterval(AcceleratedMovingPicture.MoveAll, 50);
};

AcceleratedMovingPicture.MoveAll = function () {
    "use strict";
    var i;
    for (i = 0; i < AcceleratedMovingPicture.Array.length; ++i) {
        AcceleratedMovingPicture.Array[i].move();
    }
};


function Ball(id, x0, y0, x, y) {
    this.id = id;
    this.x0 = x0;
    this.y0 = y0;
    this.x = x;
    this.y = y;
    this.r = Math.sqrt(Math.pow(x-x0, 2) + Math.pow(y-y0, 2));
}

Ball.prototype.derivative = function () {
    return -(this.x - this.x0)/Math.sqrt(Math.pow(this.r, 2) - Math.pow(x - x0, 2));
}

Ball.prototype.calculateY = function () {
    this.y = this.derivative() * (this.x - this.x0) + this.y0;
}

Ball.g = 10;
Ball.m = 1;

Ball.prototype.move = function () {
    
}

function Start() {
    "use strict";
    var pictures = [];
    pictures.push({"x1": 1000, "y1": 500, "x2": 0, "y2": 0, "speed": 7});
    pictures.push({"x1": 1000, "y1": 500, "x2": 0, "y2": 0, "speed": 3, "acceleration": 0.25});
    //pictures.push({"x1": 0, "y1": 0, "x2": 1000, "y2": 500, "speed": 3, "acceleration": 0.25});
    document.write(SmoothlyMovingPicture.NewInstanceHtml(pictures[0].x1, pictures[0].y1, pictures[0].x2, pictures[0].y2, pictures[0].speed));
    document.write(AcceleratedMovingPicture.NewInstanceHtml(pictures[1].x1, pictures[1].y1, pictures[1].x2, pictures[1].y2, pictures[1].speed, pictures[1].acceleration));
    SmoothlyMovingPicture.LaunchAll();
    AcceleratedMovingPicture.LaunchAll();
}