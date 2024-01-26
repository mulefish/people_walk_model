
let agents = [];
let numAgents = 10;
let numSteps = 60;
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
const maxSpeed = 6; // Maximum speed for the balls

let img = new Image();



function initAgents() {
    for (let i = 0; i < numAgents; i++) {
        agents.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: Math.random() * 4 - 2,
            dy: Math.random() * 4 - 2,
            speedX: Math.random() * 10 - 5,
            speedY: Math.random() * 10 - 5,    
            number: i,
            positionFitting: Math.random(),
            positionMen: Math.random(),
            positionWomen: Math.random(),
            positionCheckout: Math.random()

        });
    }
    // console.log( JSON.stringify( agents, null, 2 ))
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


///


    // Determine the favorite letter based on highest attraction
//     let maxAttraction = Math.max(obj.attractionToA, obj.attractionToB, obj.attractionToC);
//     let target;
//     if (maxAttraction === obj.positionFitting) {
//         target = positionFitting;
//     } else if (maxAttraction === obj.positionMen) {
//         target = positionMen;
//     } else if (maxAttraction === obj.positionWomen) {
//         target = positionWomen;
//     } else {
//         target = positionCheckout;
//     }

//     // // Draw a line to the favorite letter
//     // context.beginPath();
//     // context.moveTo(obj.x, obj.y);
//     // context.lineTo(target.x, target.y);
//     // context.strokeStyle = 'gray';
//     // context.stroke();

//     if (obj.x <= 0 || obj.x >= canvas.width) {
//         obj.speedX = -obj.speedX;
//     }
//     if (obj.y <= 0 || obj.y >= canvas.height) {
//         obj.speedY = -obj.speedY;
//     }

//     obj.x += obj.speedX;
//     obj.y += obj.speedY;

//     ctx.beginPath();
//     ctx.arc(obj.x, obj.y, 10, 0, 2 * Math.PI);
//     ctx.fillStyle = 'orange';
//     ctx.fill();

//     ctx.font = '10px Arial';
//     ctx.fillStyle = 'white';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
//     ctx.fillText(obj.number, obj.x, obj.y);
// });
///

function updateAgents() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.drawImage(img, 0, 0); 
    drawGrids();
    
    agents.forEach(agent => {
        // agent.x += agent.dx;
        // agent.y += agent.dy;

        // if (agent.x < 0 || agent.x > canvas.width) agent.dx *= -1;
        // if (agent.y < 0 || agent.y > canvas.height) agent.dy *= -1;

        console.log( "BEFORE : " + JSON.stringify( agent ))
        applyAttraction(agent, positionFitting, agent.positionFitting);
        applyAttraction(agent, positionMen, agent.positionMen);
        applyAttraction(agent, positionWomen, agent.positionWomen);
        applyAttraction(agent, positionCheckout, agent.positionCheckout);
    


        // ctx.beginPath();
        // ctx.arc(agent.x, agent.y, 20, 0, 2 * Math.PI);
        // ctx.fillStyle = 'orange';
        // ctx.fill();


        let maxAttraction = Math.max(agent.positionFitting, agent.positionMen, agent.positionWomen);
        let target;
        if (maxAttraction === agent.positionFitting) {
            target = positionFitting;
        } else if (maxAttraction === agent.positionMen) {
            target = positionMen;
        } else if (maxAttraction === agent.positionWomen) {
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
    
        if (agent.x <= 0 || agent.x >= canvas.width) {
            agent.speedX = -agent.speedX;
        }
        if (agent.y <= 0 || agent.y >= canvas.height) {
            agent.speedY = -agent.speedY;
        }
        console.log( "AFTER: " + agent.number + "   " + agent.x + "   " + agent.speedX)

        agent.x += agent.speedX;
        agent.y += agent.speedY;
    
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, 10, 0, 2 * Math.PI);
//        console.log( agent.number, agent.x, agent.y)
        ctx.fillStyle = 'orange';
        ctx.fill();
    
        ctx.font = '10px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(agent.number, agent.x, agent.y);


    });
}


function startSimulation() {
    initAgents();
    let steps = 0;
    let interval = setInterval(() => {
        updateAgents();
        steps++;
        if (steps >= numSteps) clearInterval(interval); // Stop after a certain number of steps
    }, 100);
}


img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    drawGrids()
    startSimulation();
};
img.src = 'lulustore.png';

const positionFitting = { x: 605, y: 128 };
const positionMen = { x: 845, y: 161 };
const positionEntrance = { x: 925, y: 430 };
const positionCheckout = { x: 780, y: 480 };
const positionWomen = { x: 605, y: 398 };

let areas = [] 
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

    
    areas.push(fitting)

    areas.push(men)
    areas.push(entrance)
    areas.push(checkout)
    areas.push(women)
}
