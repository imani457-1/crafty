let current = 1;

function nextScene() {
    document.getElementById("scene" + current).classList.remove("active");
    current++;
    document.getElementById("scene" + current).classList.add("active");
}

/* CAR + DUST */
const canvas = document.getElementById("dust");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const car = document.getElementById("car");
let x = 0;
let smoke = [];

function createSmoke(px, py) {
    smoke.push({
        x: px,
        y: py,
        radius: Math.random() * 10 + 5,
        alpha: 1
    });
}

function animateCar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "60px sans-serif";
    ctx.fillStyle = "rgba(200,200,200,0.3)";
    ctx.fillText("Happy Birthday Antonia", 100, canvas.height / 2);

    car.style.left = x + "px";
    createSmoke(x + 20, canvas.height - 120);
    x += 6;

    smoke.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200,200,200," + p.alpha + ")";
        ctx.fill();
        p.alpha -= 0.02;
        if (p.alpha <= 0) smoke.splice(i, 1);
    });

    if (x < window.innerWidth) requestAnimationFrame(animateCar);
}

animateCar();

/* FIREWORKS */
const fwCanvas = document.getElementById("fireworks");
const fwCtx = fwCanvas.getContext("2d");
fwCanvas.width = window.innerWidth;
fwCanvas.height = window.innerHeight;

let particles = [];

function createFirework() {
    let x = Math.random() * fwCanvas.width;
    let y = Math.random() * fwCanvas.height / 2;
    for (let i = 0; i < 60; i++) {
        particles.push({
            x, y,
            radius: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 360},100%,50%)`,
            speedX: (Math.random() - 0.5) * 6,
            speedY: (Math.random() - 0.5) * 6,
            life: 100
        });
    }
}

function animateFireworks() {
    fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
    particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;
        fwCtx.beginPath();
        fwCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        fwCtx.fillStyle = p.color;
        fwCtx.fill();
        if (p.life <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(animateFireworks);
}

setInterval(createFirework, 1500);
animateFireworks();