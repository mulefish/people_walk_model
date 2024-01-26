
let agents = [];
let numAgents = 20; // Number of agents you want
let numSteps = 200; // Number of steps the agents will take
let areas = [] 
let objects = [];
const maxSpeed = 6; // Maximum speed for the balls

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");




// Function to calculate distance between two points
function distance(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}


function getRandomNumberBetween(min, max) {
    min = Math.ceil(min); // Use ceil on min to ensure it's the smallest integer greater than or equal to min
    max = Math.floor(max); // Use floor on max to ensure it's the largest integer less than or equal to max
    return Math.floor(Math.random() * (max - min + 1) + min);
}




function applyAttraction(obj, target, attractionWeight) {
    let dirX = target.x - obj.x;
    let dirY = target.y - obj.y;
    let length = Math.sqrt(dirX * dirX + dirY * dirY);
    dirX /= length;
    dirY /= length;

    // Increase the attraction effect
    obj.speedX += dirX * attractionWeight * 0.5;
    obj.speedY += dirY * attractionWeight * 0.5;
    
    // Limit the speed to maxSpeed
    let speed = Math.sqrt(obj.speedX * obj.speedX + obj.speedY * obj.speedY);
    if (speed > maxSpeed) {
        obj.speedX = (obj.speedX / speed) * maxSpeed;
        obj.speedY = (obj.speedY / speed) * maxSpeed;
    }
}



function startSimulation() {
    const leastX = 605
    const mostX = 900
    const leastY = 128
    const mostY = 480

    for (let i = 0; i < 10; i++) {
        objects.push({
            x: getRandomNumberBetween(leastX, mostX),
            y: getRandomNumberBetween(leastY, mostY),
            speedX: Math.random() * 10 - 5,
            speedY: Math.random() * 10 - 5,
            number: i,
            positionFitting: Math.random(),
            positionMen: Math.random(),
            positionWomen: Math.random(),
            positionCheckout: Math.random()
        });

    }

    // console.log( objects)


    // let steps = 0;
    // let interval = setInterval(() => {
    //     updateAgents();
    //     steps++;
    //     if (steps >= numSteps) clearInterval(interval); // Stop after a certain number of steps
    // }, 100); // Update every 100 milliseconds
}


function drawObjects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLetters();

    objects.forEach(function (obj) {
        // Apply attraction forces to each target
        applyAttraction(obj, positionFitting, obj.positionFitting);
        applyAttraction(obj, positionMen, obj.positionMen);
        applyAttraction(obj, positionWomen, obj.positionWomen);
        applyAttraction(obj, positionCheckout, obj.positionCheckout);




        // Determine the favorite letter based on highest attraction
        let maxAttraction = Math.max(obj.attractionToA, obj.attractionToB, obj.attractionToC);
        let target;
        if (maxAttraction === obj.positionFitting) {
            target = positionFitting;
        } else if (maxAttraction === obj.positionMen) {
            target = positionMen;
        } else if (maxAttraction === obj.positionWomen) {
            target = positionWomen;
        } else {
            target = positionCheckout;
        }

        // // Draw a line to the favorite letter
        // context.beginPath();
        // context.moveTo(obj.x, obj.y);
        // context.lineTo(target.x, target.y);
        // context.strokeStyle = 'gray';
        // context.stroke();

        if (obj.x <= 0 || obj.x >= canvas.width) {
            obj.speedX = -obj.speedX;
        }
        if (obj.y <= 0 || obj.y >= canvas.height) {
            obj.speedY = -obj.speedY;
        }

        obj.x += obj.speedX;
        obj.y += obj.speedY;

        ctx.beginPath();
        ctx.arc(obj.x, obj.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'orange';
        ctx.fill();

        ctx.font = '10px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(obj.number, obj.x, obj.y);
    });
}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function takeStep() {
    async function loopWithDelayAsync(maxIterations) {
        drawGrids()
        for (let iteration = 1; iteration <= maxIterations; iteration++) {
            await delay(100);
            steps++;
            document.getElementById("steps").innerHTML = steps;
            drawObjects();
        }
 
 
    }
    await loopWithDelayAsync(30)
}





let img = new Image();

img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    drawGrids()

    startSimulation();
    // finch

    takeStep()


};
img.src = 'lulustore.png';



const positionFitting = { x: 605, y: 128 };
const positionMen = { x: 845, y: 161 };
const positionEntrance = { x: 925, y: 430 };
const positionCheckout = { x: 780, y: 480 };
const positionWomen = { x: 605, y: 398 };



function drawLetters() {
    ctx.font = '48px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('A', positionFitting.x, positionFitting.y);
    ctx.fillText('B', positionMen.x, positionMen.y);
    ctx.fillText('C', positionEntrance.x, positionEntrance.y);
    ctx.fillText('D', positionCheckout.x, positionCheckout.y);
    ctx.fillText('E', positionWomen.x, positionWomen.y);



}






function drawGrids() {

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';

    ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
    let fitting = {
        name:"fitting",
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
        name:"men",
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
        name:"entrance",
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
        name:"checkout",
        x: men.x,
        y: fitting.h + 100,
        w: 120,
        h: 360,
        centerX: 0,
        centerY: 0

    }
    ctx.fillRect(checkout.x, checkout.y, checkout.w, checkout.h);


    ctx.fillStyle = 'rgba(255, 166, 33, 0.2)';
    let women = {
        name:"women",
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

    
    areas.push(fitting)

    areas.push(men)
    areas.push(entrance)
    areas.push(checkout)
    areas.push(women)



    drawLetters()

}
