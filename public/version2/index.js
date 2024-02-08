
let agents = [];
let numAgents = 6;
let numSteps = 250;
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
const maxSpeed = 6;
let loops = 0 
let img = new Image();
const millisecond_pause = 50
let ixyPositions = [] 

const positionFitting = { x: 580, y: 118 };
const positionMen = { x: 845, y: 161 };
const positionEntrance = { x: 960, y: 430 };
const positionCheckout = { x: 800, y: 520 };
const positionWomen = { x: 550, y: 428 };
const leastX = 605
const mostX = 925
const leastY = 128
const mostY = 480


let waypoints =  [
    {
      "i": 1,
      "x": "968",
      "y": "351"
    },
    {
      "i": 2,
      "x": "899",
      "y": "385"
    },
    {
      "i": 3,
      "x": "794",
      "y": "397"
    },
    {
      "i": 4,
      "x": "725",
      "y": "423"
    },
    {
      "i": 5,
      "x": "651",
      "y": "433"
    },
    {
      "i": 6,
      "x": "652",
      "y": "477"
    },
    {
      "i": 7,
      "x": "566",
      "y": "449"
    },
    {
      "i": 8,
      "x": "548",
      "y": "419"
    },
    {
      "i": 9,
      "x": "557",
      "y": "385"
    },
    {
      "i": 10,
      "x": "540",
      "y": "376"
    },
    {
      "i": 11,
      "x": "533",
      "y": "333"
    },
    {
      "i": 12,
      "x": "544",
      "y": "312"
    },
    {
      "i": 13,
      "x": "528",
      "y": "284"
    },
    {
      "i": 14,
      "x": "528",
      "y": "235"
    },
    {
      "i": 15,
      "x": "562",
      "y": "193"
    },
    {
      "i": 16,
      "x": "568",
      "y": "166"
    },
    {
      "i": 17,
      "x": "555",
      "y": "115"
    },
    {
      "i": 18,
      "x": "543",
      "y": "79"
    },
    {
      "i": 19,
      "x": "508",
      "y": "57"
    },
    {
      "i": 20,
      "x": "520",
      "y": "51"
    },
    {
      "i": 21,
      "x": "517",
      "y": "70"
    },
    {
      "i": 22,
      "x": "504",
      "y": "68"
    },
    {
      "i": 23,
      "x": "548",
      "y": "81"
    },
    {
      "i": 24,
      "x": "566",
      "y": "111"
    },
    {
      "i": 25,
      "x": "574",
      "y": "177"
    },
    {
      "i": 26,
      "x": "607",
      "y": "210"
    },
    {
      "i": 27,
      "x": "659",
      "y": "227"
    },
    {
      "i": 28,
      "x": "679",
      "y": "314"
    },
    {
      "i": 29,
      "x": "677",
      "y": "391"
    },
    {
      "i": 30,
      "x": "728",
      "y": "410"
    },
    {
      "i": 31,
      "x": "767",
      "y": "424"
    },
    {
      "i": 32,
      "x": "808",
      "y": "430"
    },
    {
      "i": 33,
      "x": "905",
      "y": "431"
    },
    {
      "i": 34,
      "x": "895",
      "y": "459"
    },
    {
      "i": 35,
      "x": "804",
      "y": "463"
    },
    {
      "i": 36,
      "x": "830",
      "y": "499"
    },
    {
      "i": 37,
      "x": "941",
      "y": "494"
    },
    {
      "i": 38,
      "x": "964",
      "y": "422"
    }
  ]

    
    let orangeBall = {
        x: waypoints[0].x, // Starting position
        y: waypoints[0].y,
        radius: 20,
        color : 'rgba(0, 0, 0, 0.3)',
        currentWaypointIndex: 0
    };
    
    function drawOrangeBall() {
        ctx.beginPath();
        ctx.arc(orangeBall.x, orangeBall.y, orangeBall.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = orangeBall.color;
        ctx.fill();
    }
    



function getRandomNumberBetween(min, max) {
    return Math.random() * (max - min + 1) + min;
}

let areas = [] 
let isSimulationRunning = false;
let interval;


function drawLetters() {
    ctx.font = '48px Arial';
    const myBlack = 'rgba(0, 0, 0, 0.3)';
    ctx.fillStyle = myBlack
    ctx.fillText('F', positionFitting.x, positionFitting.y);
    ctx.fillText('M', positionMen.x, positionMen.y);
    ctx.fillText('E', positionEntrance.x - 40, positionEntrance.y);
    ctx.fillText('C', positionCheckout.x, positionCheckout.y);
    ctx.fillText('W', positionWomen.x, positionWomen.y);
}

function startSimulation() {
    startTimer()

}

img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
   
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
    areas.push(fitting)
    areas.push(men)
    areas.push(entrance)
    areas.push(checkout)
    areas.push(women)
}

function moveOrangeBall() {
    if (orangeBall.currentWaypointIndex < waypoints.length - 1) {
        let nextWaypoint = waypoints[orangeBall.currentWaypointIndex + 1];

        // Convert waypoint positions to numbers
        let waypointX = parseInt(nextWaypoint.x, 10);
        let waypointY = parseInt(nextWaypoint.y, 10);

        // Calculate the distance between the current position and the next waypoint
        let dx = waypointX - orangeBall.x;
        let dy = waypointY - orangeBall.y;

        // Calculate the distance to move in each step. Let's use a smaller step size for smoother movement.
        let stepSize = 2; // Smaller step size for smoother movement
        let distance = Math.sqrt(dx * dx + dy * dy);
        let stepX = (dx / distance) * stepSize;
        let stepY = (dy / distance) * stepSize;

        // Update the position of the agent
        if (distance > stepSize) {
            orangeBall.x += stepX;
            orangeBall.y += stepY;
        } else {
            // If the distance is less than stepSize pixels, directly move to the next waypoint
            orangeBall.x = waypointX;
            orangeBall.y = waypointY;
            orangeBall.currentWaypointIndex++;
        }

        // Redraw the scene
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0); // Redraw the background
        drawGrids(); // Redraw grids if needed
        drawLetters(); // Redraw letters if needed
        drawOrangeBall(); // Draw the orange ball at the new position
    } else {
        console.log("Reached the final waypoint");
        clearInterval(orangeBallMovement); // Stop moving when the last waypoint is reached
    }
}

function redrawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    drawGrids();
    drawLetters();
    drawOrangeBall();
}




let orangeBallMovement = setInterval(moveOrangeBall, millisecond_pause);


function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
let index = 0  
canvas.addEventListener('click', function(evt) {
    console.log("hello")
    const mousePos = getMousePos(canvas, evt);
    // const message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    // console.log(message);
    index++ 
    const x = mousePos.x.toFixed(0)
    const y = mousePos.y.toFixed(0)
    const obj = {
        i:index, 
        x:x, 
        y:y
    }
    ixyPositions.push(obj)
});


function emit() { 
    console.log( JSON.stringify( ixyPositions, null, 2 ))
    i = 0 
    ixyPositions = [] 
}