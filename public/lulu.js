
let agents = [];
let numAgents = 10; // Number of agents you want
let numSteps = 60; // Number of steps the agents will take

// Initialize agents with random positions
function initAgents() {
    for (let i = 0; i < numAgents; i++) {
        agents.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: Math.random() * 4 - 2, // Speed in x direction
            dy: Math.random() * 4 - 2, // Speed in y direction
        });
    }
}

// Update the position of each agent and draw it
function updateAgents() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.drawImage(img, 0, 0); // Redraw the background image
    drawGrids(); // Redraw the grids

    agents.forEach(agent => {
        // Update position
        agent.x += agent.dx;
        agent.y += agent.dy;

        // Keep the agent within the canvas bounds
        if (agent.x < 0 || agent.x > canvas.width) agent.dx *= -1;
        if (agent.y < 0 || agent.y > canvas.height) agent.dy *= -1;

        // Draw the agent
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, 20, 0, 2 * Math.PI); // Draw a circle with radius 5
        ctx.fillStyle = 'orange';
        ctx.fill();
    });
}

// Main function to start the simulation
function startSimulation() {

    console.log( areas )

    initAgents();
    let steps = 0;
    let interval = setInterval(() => {
        updateAgents();
        steps++;
        if (steps >= numSteps) clearInterval(interval); // Stop after a certain number of steps
    }, 100); // Update every 100 milliseconds
}


////

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let img = new Image();

img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    drawGrids()

    startSimulation();


};
img.src = 'lulustore.png';

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
