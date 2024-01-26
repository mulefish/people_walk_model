
let agents = [];
let numAgents = 6;
let numSteps = 1000;
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
const maxSpeed = 6; // Maximum speed for the balls
let loops = 0 
let img = new Image();

const positionFitting = { x: 580, y: 118 };
const positionMen = { x: 845, y: 161 };
const positionEntrance = { x: 960, y: 430 };
const positionCheckout = { x: 800, y: 520 };
const positionWomen = { x: 550, y: 428 };

const leastX = 605
const mostX = 925
const leastY = 128
const mostY = 480


function getRandomNumberBetween(min, max) {
    return Math.random() * (max - min + 1) + min;
}
function isCloseEnough(agent, target, threshold = 50) { // 50 is an example threshold
    const distance = Math.sqrt(Math.pow(agent.x - target.x, 2) + Math.pow(agent.y - target.y, 2));
    return distance <= threshold;
}


let areas = [] 
// Global variable to control the simulation state
let isSimulationRunning = false;
let interval;

// Initialize agents and start the simulation for the first time
function startSimulation() {
    if (!isSimulationRunning) {
        isSimulationRunning = true;
        initAgents();
        continueSimulation();
    }
}



// Function to resume or continue the simulation
function continueSimulation() {
    if (!isSimulationRunning) {
        isSimulationRunning = true;
        interval = setInterval(() => {
            updateAgents();
        }, 100);
    }
}

// Function to pause the simulation
function pauseSimulation() {
    if (isSimulationRunning) {
        clearInterval(interval);
        isSimulationRunning = false;
    }
}

// Set up event listener for the button
document.getElementById("continueButton").addEventListener("click", function() {
    if (isSimulationRunning) {
        pauseSimulation();
        this.textContent = 'Continue Simulation'; // Change button text to "Continue Simulation"
    } else {
        continueSimulation();
        this.textContent = 'Pause Simulation'; // Change button text to "Pause Simulation"
    }
});


function drawLetters() {
    ctx.font = '48px Arial';
    const myBlack = 'rgba(0, 0, 0, 0.9)';

    ctx.fillStyle = myBlack
    //myOrange

    ctx.fillText('F', positionFitting.x, positionFitting.y);
    ctx.fillText('M', positionMen.x, positionMen.y);
    ctx.fillText('E', positionEntrance.x, positionEntrance.y);
    ctx.fillText('C', positionCheckout.x, positionCheckout.y);
    ctx.fillText('W', positionWomen.x, positionWomen.y);


}
//Load background image and start the simulation initially
img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    drawGrids();
    startSimulation();
};
img.src = 'lulustore.png';


function initAgents() {
    for (let i = 0; i < numAgents; i++) {
        agents.push({
            x: getRandomNumberBetween(leastX, mostX),
            y: getRandomNumberBetween(leastY, mostY),
            speedX: Math.random() * 10 - 5,
            speedY: Math.random() * 10 - 5,    
            number: i,
            target: null,
            nextTarget: null,
            isWaiting: Math.random() > 0.9 ? true : false 
        });
    }
}



function applyAttraction(obj, target, attractionWeight) {
    let dirX = target.x - obj.x;
    let dirY = target.y - obj.y;
    let length = Math.sqrt(dirX * dirX + dirY * dirY);
    dirX /= length;
    dirY /= length;

    obj.speedX += dirX * attractionWeight * 0.5;
    obj.speedY += dirY * attractionWeight * 0.5;
    
    // Limit the speed to maxSpeed
    let speed = Math.sqrt(obj.speedX * obj.speedX + obj.speedY * obj.speedY);
    if (speed > maxSpeed) {
        obj.speedX = (obj.speedX / speed) * maxSpeed;
        obj.speedY = (obj.speedY / speed) * maxSpeed;
    }
}


function addAgentAtEntrance() {
    const newAgent = {
        x: positionEntrance.x,
        y: positionEntrance.y,
        speedX: Math.random() * 10 - 5,
        speedY: Math.random() * 10 - 5,
        number: agents.length,
        target: null,
        nextTarget: null
    };
    agents.push(newAgent);
}

function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    let timeString = '';

    if (hours > 0) {
        timeString += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
    if (remainingMinutes > 0 || hours === 0) {
        timeString += `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
    }

    return timeString.trim();
}

function updateAgents() {
    loops++;
    document.getElementById("steps").innerHTML = loops; // formatTime(loops);

    if (Math.random() < 0.05) { // Adjust this probability as needed
        addAgentAtEntrance();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    drawGrids();
    drawLetters();

    for (let i = agents.length - 1; i >= 0; i--) {
        let agent = agents[i];

        // Determine the current target
        let targets = [positionFitting, positionMen, positionWomen, positionCheckout];
        
        if (agent.nextTarget === 'entrance') {
            agent.target = positionEntrance;
        } else if (!agent.target || isCloseEnough(agent, agent.target)) {
            if (agent.target === positionCheckout) {
                agent.nextTarget = 'entrance';
            } else {
                agent.target = targets[Math.floor(Math.random() * targets.length)];
            }
        }

        applyAttraction(agent, agent.target, 1); // Assuming equal attraction weight for simplicity

        // Boundary checks and position update
        if (agent.x <= 0 || agent.x >= canvas.width) agent.speedX *= -1;
        if (agent.y <= 0 || agent.y >= canvas.height) agent.speedY *= -1;
        agent.x += agent.speedX;
        agent.y += agent.speedY;

        // Draw the agent
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, 20, 0, 2 * Math.PI);
        const myOrange = 'rgba(255, 166, 55, 0.7)';

        ctx.fillStyle = myOrange;
        ctx.fill();
        ctx.font = '10px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(agent.number, agent.x, agent.y);

        // Check if agent reached the entrance after checkout and remove it
        if (agent.nextTarget === 'entrance' && isCloseEnough(agent, positionEntrance)) {
            agents.splice(i, 1); // Remove the agent from the array
        }
    }
}


function startSimulation() {
    initAgents();
    let steps = 0;
    let interval = setInterval(() => {
        updateAgents();
        steps++;
        if (steps >= numSteps) clearInterval(interval);
    }, 100);
}


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
        y: fitting.h + 95,
        w: 120,
        h: 260,
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
