let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
let objects = [];
let steps = 0;

const H = window.innerHeight * 0.66;
const W = window.innerWidth;
const fifthW = W / 5
const positionA = { x: fifthW, y: H / 2 };
const positionB = { x: fifthW * 2, y: H / 2 };
const positionC = { x: fifthW * 3, y: H / 2 };
const maxSpeed = 6; // Maximum speed for the balls

function init() {
    canvas.width = W;
    canvas.height = H;
}

for (let i = 0; i < 10; i++) {
    objects.push({
        x: 10 + Math.random() * (W - 20),
        y: 10 + Math.random() * (H - 20),
        speedX: Math.random() * 10 - 5,
        speedY: Math.random() * 10 - 5,
        number: i,
        attractionToA: Math.random(),
        attractionToB: Math.random(),
        attractionToC: Math.random()
    });
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


function drawObjects() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawLetters();

    objects.forEach(function (obj) {
        // Apply attraction forces to each target
        applyAttraction(obj, positionA, obj.attractionToA);
        applyAttraction(obj, positionB, obj.attractionToB);
        applyAttraction(obj, positionC, obj.attractionToC);

        // Determine the favorite letter based on highest attraction
        let maxAttraction = Math.max(obj.attractionToA, obj.attractionToB, obj.attractionToC);
        let target;
        if (maxAttraction === obj.attractionToA) {
            target = positionA;
        } else if (maxAttraction === obj.attractionToB) {
            target = positionB;
        } else {
            target = positionC;
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

        context.beginPath();
        context.arc(obj.x, obj.y, 10, 0, 2 * Math.PI);
        context.fillStyle = 'orange';
        context.fill();

        context.font = '10px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(obj.number, obj.x, obj.y);
    });
}


function drawLetters() {
    context.font = '48px Arial';
    context.fillStyle = 'black';
    context.fillText('A', positionA.x, positionA.y);
    context.fillText('B', positionB.x, positionB.y);
    context.fillText('C', positionC.x, positionC.y);
}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function takeStep() {
    async function loopWithDelayAsync(maxIterations) {
        for (let iteration = 1; iteration <= maxIterations; iteration++) {
            await delay(100);
            steps++;
            document.getElementById("steps").innerHTML = steps;
            drawObjects();
        }
    }
    await loopWithDelayAsync(30)
}



init();
takeStep();
