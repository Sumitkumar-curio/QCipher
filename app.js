const canvas = document.getElementById("cipherCanvas");
const ctx = canvas.getContext("2d");

const outerRadius = 300;
const innerRadius = 100;
const gap = 2;
const numSegments = 26;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let rotationAngleOuter = 0;
let rotationAngleInner = 0;
let isDraggingOuter = false;
let isDraggingInner = false;

function drawCipherWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw outer boundary with styling
    ctx.strokeStyle = "#3498db"; // Blue color
    ctx.lineWidth = 2;
    ctx.shadowColor = "#2980b9"; // Darker blue shadow color
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw outer circle
    ctx.fillStyle = "f6578"; // Blue color
    ctx.font = "bold 55px 'Arial'"; // Changed font to Arial

    for (let i = 0; i < numSegments; i++) {
        const angle = (i * 2 * Math.PI) / numSegments + rotationAngleOuter;
        const x = centerX + outerRadius * Math.cos(angle);
        const y = centerY + outerRadius * Math.sin(angle);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2);
        const sequenceOuter = "abcdefghijklmnopqrstuvwxyz";
        ctx.fillText(sequenceOuter.charAt(i), 0, 0);
        ctx.restore();
    }

    // Draw inner circle with lines connecting to outer circle
    ctx.fillStyle = "#ecf0f1"; // Light gray color
    ctx.strokeStyle = "#bdc3c7"; // Lighter gray color
    ctx.font = "bold 70px 'Arial'"; // Changed font to Arial

    for (let i = 0; i < numSegments; i++) {
        const outerAngle = (i * 2 * Math.PI) / numSegments + rotationAngleOuter;
        const outerX = centerX + outerRadius * Math.cos(outerAngle);
        const outerY = centerY + outerRadius * Math.sin(outerAngle);

        const innerAngle = (i * 2 * Math.PI) / numSegments + rotationAngleInner;
        const innerX = centerX + (outerRadius + gap + innerRadius) * Math.cos(innerAngle);
        const innerY = centerY + (outerRadius + gap + innerRadius) * Math.sin(innerAngle);

        // Draw line connecting center to inner circle
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(innerX, innerY);
        ctx.strokeStyle = "#white"; // Red color for the line (radius)
        ctx.stroke();

        ctx.save();
        ctx.translate(innerX, innerY);
        ctx.rotate(innerAngle + Math.PI / 2);

        const sequenceInner = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        ctx.fillText(sequenceInner.charAt(i), 0, 0);

        ctx.restore();
    }

    // Draw circumference for inner circle
    ctx.strokeStyle = "#pink"; // Green color
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius + gap + innerRadius, 0, 2 * Math.PI);
    ctx.stroke();
}

function animate() {
    drawCipherWheel();
    requestAnimationFrame(animate);
}

canvas.addEventListener("mousedown", (event) => {
    const startX = event.clientX;
    const startY = event.clientY;

    const distanceToOuterCenter = Math.sqrt(
        Math.pow(startX - canvas.width / 2, 2) + Math.pow(startY - canvas.height / 2, 2)
    );

    const distanceToInnerCenter = Math.sqrt(
        Math.pow(startX - canvas.width / 2, 2) + Math.pow(startY - canvas.height / 2, 2)
    );

    isDraggingOuter = distanceToOuterCenter <= outerRadius;
    isDraggingInner =
        distanceToInnerCenter >= outerRadius + gap && distanceToInnerCenter <= outerRadius + gap + innerRadius;
});

canvas.addEventListener("mousemove", (event) => {
    if (isDraggingOuter) {
        const deltaX = event.clientX - canvas.width / 2;
        const deltaY = event.clientY - canvas.height / 2;
        rotationAngleOuter = Math.atan2(deltaY, deltaX);
    } else if (isDraggingInner) {
        const deltaX = event.clientX - canvas.width / 2;
        const deltaY = event.clientY - canvas.height / 2;
        rotationAngleInner = Math.atan2(deltaY, deltaX);
    }
});

canvas.addEventListener("mouseup", () => {
    isDraggingOuter = false;
    isDraggingInner = false;
});

animate();
