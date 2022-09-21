// let mouse = {
//   x: undefined,
//   y: undefined
// }

// window.addEventListener('mousemove', function(e) {
//   mouse.x = e.clientX;
//   mouse.y = e.clientY;
// });

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");


// Circle 
function Circle(radius, color, canvasContext) {
    this.x = Math.random() * window.innerWidth;;
    this.y = Math.random() * window.innerHeight;
    this.dx = (Math.random() - 0.5) * 8;
    this.dy = (Math.random() - 0.5) * 6;
    this.radius = radius;
    this.color = color;
    this.ctx = canvasContext;

    this.draw = function () {
        // draw circle on canvas
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    this.update = function () {
        // update circle cordinates 
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.draw();
    }
}

let circleRadius = 40;
const circleArray = [];
function init() {
    for (let i = 0; i < 10; i++) {
        circleArray.push(new Circle(circleRadius, "teal", ctx));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let circle of circleArray) {
        circle.update();
    }
}

init();
animate();
