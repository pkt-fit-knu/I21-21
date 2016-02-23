window.onload = function () {
    var drawingCanvas = document.getElementById('smile');
    
    if (drawingCanvas && drawingCanvas.getContext) {
        var context = drawingCanvas.getContext('2d');

        context.fillStyle = "Orange";
        context.fillRect(10, 10, 530, 470);

        context.strokeStyle = "black";
        context.strokeRect(20, 20, 510, 450);

        context.fillStyle = "#000000";
        context.font = "30px Sans-Serif";
        context.textBaseline = "top";
        context.fillText("Яковлєв Олексій", 150, 420);


        var imm = new Image();
        imm.onload = function () {
            context.drawImage(imm, 30, 30, 490, 380);
        };

        imm.src = "photo.jpg";
    }
};