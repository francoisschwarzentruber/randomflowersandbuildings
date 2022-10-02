window.onload = () => {
    const ctx = canvas.getContext("2d");
    //    ctx.fillStyle = "rgb(192, 222, 255)";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //drawLines1();
    //drawRect1();
    //drawFlowers();
    drawArchi();
    drawFlowers();
    //drawLines1();
}






function intersects(l1, l2) {
    let a = l1.x1;
    let b = l1.y1;
    let c = l1.x2;
    let d = l1.y2;

    let p = l2.x1;
    let q = l2.y1;
    let r = l2.x2;
    let s = l2.y2;

    if (a < p && a < r && c < p & c < r)
        return false;

    if (b < q && b < s && d < q & d < s)
        return false;

    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
}



function drawLines1() {
    const NBLINES = 50;
    const LENGTHLINES = 500;
    const STEP = 1;

    const shiftAngle = () => (Math.random() - 0.5) * 1;
    //const shiftAngle = () => (Math.random()-0.2) * 0.1;
    //const shiftAngle = () => (Math.random() < 0.9) ? 0 : (Math.random()-0.2) * 0.5;
    //const shiftAngle = () => (Math.random() < 0.9) ? 0 : (Math.random() < 0.5) ? Math.PI / 2 : -Math.PI / 2;


    const otherLines = [];

    function drawLine() {

        let pos = {
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height)
        };

        let angle = Math.random() * 1000;

        const lines = [];


        for (let i = 0; i < LENGTHLINES; i++) {
            if (pos.x < 0 || pos.x >= canvas.width)
                break;
            if (pos.y < 0 || pos.y >= canvas.height)
                break;

            angle += shiftAngle();

            const line = {
                x1: pos.x,
                y1: pos.y,
                x2: pos.x + STEP * Math.cos(angle),
                y2: pos.y + STEP * Math.sin(angle)
            }



            /*
           if (otherLines.some((l, i) => i < otherLines.length-1 && intersects(l, line))) {
                break;
            }*/

            otherLines.push(line);


            lines.push(line)
            draw(line);


            pos.x = line.x2;
            pos.y = line.y2;
        }

        //otherLines.push(...lines);
    }

    
    for (let i = 0; i < NBLINES; i++)
        drawLine();
}



function draw(line) {
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(Math.floor(line.x1), Math.floor(line.y1));
    ctx.lineTo(Math.floor(line.x2), Math.floor(line.y2));
    ctx.stroke();
}


function line(x1, y1, x2, y2) {
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

}

function drawRect1() {
    y = 0;
    while (y < 480) {
        x = Math.random() * 32;
        while (x < 640) {
            let x1 = x;
            let x2 = x + Math.random() * 64;
            line(x1, y, x2, y);
            x = x2 + Math.random() * 64;
        }

        y += Math.floor(8 + Math.random() * 8);
    }
}







function drawFlower(x, y) {
    const ctx = canvas.getContext("2d");

    function drawTop(cx, cy) {

        const rmax = 32 + Math.random() * 32;
        ctx.beginPath();
        ctx.moveTo(cx, cy);

        const nbPetales = 6; //4+Math.random()*2;
        for (let angle = 0; angle < 2 * Math.PI; angle += 0.01) {
            const r = rmax * Math.sqrt(Math.abs(Math.sin(angle * nbPetales)));
            ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
        }
        //ctx.fillStyle = `rgb($)`;

        ctx.fillStyle = "white";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, rmax / 3, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.stroke();

    }

    ctx.beginPath();
    let L = Math.random() > 0.5 ? 10 + Math.random() * 100 : Math.random() * 300;
    ctx.moveTo(x, 480);

    let angle = 0;
    for (let i = 0; i < L; i++) {

        angle += (Math.random() - 0.5) * 0.02;
        x += Math.sin(angle);
        y -= Math.cos(angle);

        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "green";
    ctx.stroke();


    if (Math.random() < 0.1 && L > 150)
        drawTop(x, y);
}


function drawFlowers() {
    for (let i = 0; i < 640; i++)
        drawFlower(Math.random() * 640, 480);
}











function drawArchi() {
    drawHouse(0, 0, 640, 480, ["f", "w", "c"]);
}


function drawWindow(x, y, w, h) {
    const ctx = canvas.getContext("2d");
    x += w / 10;
    y += h / 10;
    w -= 2 * w / 10;
    h -= 2 * h / 10;
    ctx.beginPath();
    ctx.rect(x, y, w / 2, h / 2);
    ctx.rect(x + w / 2, y, w / 2, h / 2);
    ctx.rect(x + w / 2, y + h / 2, w / 2, h / 2);
    ctx.rect(x, y + h / 2, w / 2, h / 2);
    ctx.fillStyle = "#BBEEFF";
    ctx.fill();
    ctx.stroke();

}

function drawHouse(x, y, w, h, what) {
    if (w < 32 && h < 32) {
        drawWindow(x, y, w, h);
        return;
    }

    const ctx = canvas.getContext("2d");


    if (Math.random() < 0.5 && h > 100 && what.indexOf("f") >= 0) { //fronton
        const L = 20;
        ctx.beginPath();
        ctx.moveTo(x + w / 2, y);
        ctx.lineTo(x, y + L);
        ctx.lineTo(x + w, y + L);
        ctx.lineTo(x + w / 2, y);
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.rect(x, y + L, w, h - L);
        ctx.fillStyle = "#DDDDDD";
        ctx.fill();
        ctx.stroke();
        drawHouse(x, y + L, w, h - L, ["c", "w"]);
    } else if (Math.random() < 0.5 && w > 100 && what.indexOf("c") >= 0) { //colonnes
        const C = 8;
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fillStyle = "#EEEEEE";
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.rect(x, y, C, h);
        ctx.rect(x + w - C, y, C, h);
        ctx.fillStyle = "#FFFF88";
        ctx.fill();
        ctx.stroke();
        drawHouse(x + C, y, w - 2 * C, h, ["w"]);
    } else if (Math.random() < 0.5 && w < 100 && (w / h < 1.5) && (h / w < 1.5) && what.indexOf("w") >= 0) { //window
        drawWindow(x, y, w, h);
    } else if (Math.random() < 0.5 && w > 32) {
        drawHouse(x, y, w / 2, h, ["f", "w", "c"]);
        drawHouse(x + w / 2, y, w / 2, h, ["f", "w", "c"]);
    } else if (h > 32) {
        drawHouse(x, y, w, h / 2, what);
        drawHouse(x, y + h / 2, w, h / 2, ["f", "w", "c"]);
    }

}