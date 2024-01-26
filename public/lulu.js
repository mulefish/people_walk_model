// var canvas = document.getElementById("myCanvas");
// var ctx = canvas.getContext("2d");
// const seventh =  window.innerHeight / 7;
// canvas.width = 10 + seventh * 7;
// canvas.height =10 + seventh * 7;
// var boxSize = seventh// Size of each box
// var padding = 2;  // Padding between boxes

// // Loop through rows and columns to draw the 6x6 boxes
// for (var row = 0; row < 6; row++) {
//     for (var col = 0; col < 6; col++) {
//         var x = col * (boxSize + padding);
//         var y = row * (boxSize + padding);

//         // Draw the box
//         ctx.beginPath();
//         ctx.rect(x, y, boxSize, boxSize);
//         ctx.stroke();

//         // Calculate the number to label the box (starting from 1)
//         var label = row * 6 + col + 1;

//         // Position the label in the center of the box
//         ctx.font = "16px Arial";
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         ctx.fillText(label, x + boxSize / 2, y + boxSize / 2);
//     }
// }



let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let img = new Image();

img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    drawGrids()
};
img.src = 'lulustore.png';


function drawGrids() {

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';

    ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
    let fitting = {
        x: 490,
        y: 28,
        w: 230,
        h: 200,
        centerX: 0,
        centerY: 0
    }
    ctx.fillRect(fitting.x, fitting.y, fitting.w, fitting.h);


    ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
    let men = {
        x: fitting.x + fitting.w,
        y: 28,
        w: 250,
        h: 200 + (fitting.h / 3),
        centerX: 0,
        centerY: 0

    }
    ctx.fillRect(men.x, men.y, men.w, men.h);

    ctx.fillStyle = 'rgba(0, 255, 255, 0.2)';
    let entrance = {
        x: 830,
        y: 290,
        w: 140,
        h: 280,
        centerX: 0,
        centerY: 0

    }
    ctx.fillRect(entrance.x, entrance.y, entrance.w, entrance.h);

    ctx.fillStyle = 'rgba(0, 255, 133, 0.2)';
    let checkout = {
        x: men.x,
        y: fitting.h,
        w: 120,
        h: 360,
        centerX: 0,
        centerY: 0

    }
    ctx.fillRect(checkout.x, checkout.y, checkout.w, checkout.h);


    ctx.fillStyle = 'rgba(255, 166, 33, 0.2)';
    let women = {
        x: fitting.x,
        y: fitting.y + fitting.h,
        w: 230,
        h: 340,
        centerX: 0,
        centerY: 0


    }
    ctx.fillRect(women.x, women.y, women.w, women.h);


    function setCenters(box) {
        box.centerX = box.x + box.w / 2
        box.centerY = box.y + box.h / 2
        return box
    }
    fitting = setCenters(fitting)
    men = setCenters(men)
    entrance = setCenters(entrance)
    checkout = setCenters(checkout)
    women = setCenters(women)
}
// 