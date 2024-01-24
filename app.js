<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cipher Wheel</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            background-image: url('pic23.jpg'); /* Set the path to your background image */
            background-size: cover;
            background-position: center;
        }

        form {
            margin: 100px;
            font-size: 18px;
        }

        label {
            font-size: 80px;
            color: beige;
        }

        input {
            margin-right: 50px;
            font-size: 50px;
        }
    </style>
</head>
<body>
    <form id="myForm">
        <label for="lname">Enter Inner Circle Letters: </label>
        <input type="text" id="outerSequence" name="outerSequence" placeholder="Enter Inner Sequence">
        <br><br>
        <label for="fname">Enter Outer Circle Letters: </label>
        <input type="text" id="innerSequence" name="innerSequence" placeholder="Enter Outer sequence">
        <br><br>

        <input type="button" value="Update Sequences" onclick="updateSequences()">
    </form>
    <canvas id="cipherCanvas"></canvas>

    <script>
        const canvas = document.getElementById("cipherCanvas");
        const ctx = canvas.getContext("2d");

        const outerRadius = 500;
        const innerRadius = 200;
        const gap = 2;
        const numSegments = 26;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let rotationAngleOuter = 0;
        let rotationAngleInner = 0;
        let isDraggingOuter = false;
        let isDraggingInner = false;

        let sequenceOuter = "abcdefghijklmnopqrstuvwxyz";
        let sequenceInner = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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
            ctx.fillStyle = "#black"; // Blue color
            ctx.font = "bold 90px 'Arial'"; // Changed font to Arial

            for (let i = 0; i < numSegments; i++) {
                const angle = (i * 2 * Math.PI) / numSegments + rotationAngleOuter;
                const x = centerX + outerRadius * Math.cos(angle);
                const y = centerY + outerRadius * Math.sin(angle);

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle + Math.PI / 2);
                ctx.fillText(sequenceOuter.charAt(i), 0, 0);
                ctx.restore();
            }

            // Draw inner circle with lines connecting to outer circle
            ctx.fillStyle = "#ecf0f1"; // Light gray color
            ctx.strokeStyle = "#bdc3c7"; // Lighter gray color
            ctx.font = "bold 100px 'Arial'"; // Changed font to Arial

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
                ctx.strokeStyle = "#fff"; // White color for the line (radius)
                ctx.stroke();

                ctx.save();
                ctx.translate(innerX, innerY);
                ctx.rotate(innerAngle + Math.PI / 2);
                ctx.fillText(sequenceInner.charAt(i), 0, 0);
                ctx.restore();
            }

            // Draw circumference for inner circle
            ctx.strokeStyle = "#0f0"; // Green color
            ctx.beginPath();
            ctx.arc(centerX, centerY, outerRadius + gap + innerRadius, 0, 2 * Math.PI);
            ctx.stroke();
        }

        function animate() {
            drawCipherWheel();
            requestAnimationFrame(animate);
        }
        canvas.addEventListener("mousedown", (event) => {
    const startX = event.clientX - canvas.getBoundingClientRect().left;
    const startY = event.clientY - canvas.getBoundingClientRect().top;

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
    if (isDraggingOuter || isDraggingInner) {
        const x = event.clientX - canvas.getBoundingClientRect().left - canvas.width / 2;
        const y = event.clientY - canvas.getBoundingClientRect().top - canvas.height / 2;

        if (isDraggingOuter) {
            rotationAngleOuter = Math.atan2(y, x);
        } else if (isDraggingInner) {
            rotationAngleInner = Math.atan2(y, x);
        }
    }
});

canvas.addEventListener("mouseup", () => {
    isDraggingOuter = false;
    isDraggingInner = false;
});

        function updateSequences() {
    // Get the input values
    const outerValue = document.getElementById("outerSequence").value.trim();
    const innerValue = document.getElementById("innerSequence").value.trim();

    // Update sequences without changing the case
    sequenceOuter = outerValue;
    sequenceInner = innerValue;

    if (sequenceOuter.length !== numSegments || sequenceInner.length !== numSegments) {
        alert("Both outer and inner sequences must have exactly 26 characters.");
        return;
    }

    drawCipherWheel();
}



        animate();
    </script>
</body>
</html>
