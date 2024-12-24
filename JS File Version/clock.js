const canvas = document.getElementById('clockCanvas');
const ctx = canvas.getContext('2d');
const radius = canvas.width / 2;

ctx.translate(radius, radius);

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'grey';
    ctx.fill();

    ctx.strokeStyle = 'black';
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = 'purple';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    let ang;
    let num;
    ctx.font = radius * 0.15 + 'px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    const hourPos = ((hour % 12) + minute / 60) * Math.PI / 6;
    const minutePos = (minute + second / 60) * Math.PI / 30;
    const secondPos = second * Math.PI / 30;

    drawHand(ctx, hourPos, radius * 0.5, radius * 0.07);
    drawHand(ctx, minutePos, radius * 0.8, radius * 0.07);
    drawHand(ctx, secondPos, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function updateClock() {
    ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
    drawClock();
    requestAnimationFrame(updateClock);
}

drawClock();
updateClock();
