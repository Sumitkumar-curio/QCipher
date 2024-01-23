const canvas = document.getElementById("cipherCanvas");
const ctx = canvas.getContext("2d");

const outerRadius = 140; // Increased outer radius for the boundary
const innerRadius = 80;
const gap = 1; // Gap between the circles
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
    ctx.strokeStyle = "#00000"; // Red color
    ctx.lineWidth = 2; // Thicker line
    ctx.shadowColor = "#888888"; // Shadow color
    ctx.shadowBlur = 3; // Shadow blur
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
    ctx.stroke();


    // Draw outer circle
    ctx.fillStyle = "#00000";
    //ctx.font = "bold 20px Arial";
    ctx.font = "bold 40px 'Times New Roman'";

    for (let i = 0; i < numSegments; i++) {
        const angle = (i * 2 * Math.PI) / numSegments + rotationAngleOuter;
        const x = centerX + outerRadius * Math.cos(angle);
        const y = centerY + outerRadius * Math.sin(angle);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2);
        ctx.fillText(String.fromCharCode(97 + i), 0, 0); //LowerCase
       // ctx.fillText(String.fromCharCode(65 + i), 0, 0);
        ctx.restore();
    }

    // Draw inner circle with lines connecting to outer circle
    ctx.fillStyle = "#00000";
    ctx.strokeStyle = "#00000";
    ctx.font = "bold 45px 'Times New Roman'";
    
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
        ctx.strokeStyle = "#ffff00"; // Yellow color for the line (radius)

        ctx.stroke();

        ctx.save();
        ctx.translate(innerX, innerY);
        ctx.rotate(innerAngle + Math.PI / 2);
        ctx.fillText(String.fromCharCode(65 + i), 0, 0); // Uppper case
        //ctx.fillText(String.fromCharCode(97 + i), 0, 0);
        ctx.restore();

        // Draw line connecting inner circle to outer circle
        /* ctx.beginPath();
        ctx.moveTo(innerX, innerY);
        ctx.lineTo(outerX, outerY);
        ctx.stroke(); */
    }

    // Draw circumference for inner circle
    ctx.strokeStyle = "#e74c3c";
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius + gap + innerRadius, 0, 2* Math.PI);
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
