const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gridSize = 30; // Adjust this value to change the size of the grid
const repelRadius = 5; // Adjust this value to change the repelling effect radius

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 1;

    for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
            // Horizontal lines
            ctx.beginPath();
            const deltaY = repelEffectX(y);
            ctx.moveTo(0, y + deltaY);
            ctx.lineTo(canvas.width, y + deltaY);
            ctx.stroke();

            // Vertical lines
            ctx.beginPath();
            const deltaX = repelEffectY(x);
            ctx.moveTo(x + deltaX, 0);
            ctx.lineTo(x + deltaX, canvas.height);
            ctx.stroke();
        }
    }
}

function repelEffectY(coord) {
    const distance = Math.abs(coord - (coord % gridSize) - mouseX);
    if (distance < repelRadius) {
        const repelFactor = 1 - Math.pow(distance / repelRadius, 2);
        return repelFactor * gridSize * (coord < mouseX ? -1 : 1);
    }
    return 0;
}

function repelEffectX(coord) {
    const distance = Math.abs(coord - (coord % gridSize) - mouseY);
    if (distance < repelRadius) {
        const repelFactor = 1 - Math.pow(distance / repelRadius, 2);
        return repelFactor * gridSize * (coord < mouseY ? -1 : 1);
    }
    return 0;
}


let mouseX = -100;
let mouseY = -100;

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    drawGrid();
});

canvas.addEventListener('mouseleave', () => {
    mouseX = -100;
    mouseY = -100;
    drawGrid();
});

drawGrid();
