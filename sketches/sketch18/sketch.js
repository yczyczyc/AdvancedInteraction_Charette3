let img;
let rectW = 30;   // width of drifting shapes
let rectH = 30;   // height of drifting shapes
let shapes = [];   // array to hold floating shapes
let tiltX = 0;
let tiltY = 0;

function preload() {
  img = loadImage("../../images/underwater010.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight*2);
  background(0);

  img.resize(windowWidth, 0); // Fit width, keep aspect ratio
}

function draw() {
  // Draw static background image
  image(img, 0, 0);
  drawInstructionText(); 

  // Draw and update all floating shapes
  for (let s of shapes) {
    // Update position
    s.y -= s.vy;
    s.vy += 0.07; // gentle upward acceleration
    s.x += s.vx;  // small horizontal drift

    // Draw shape
    fill(255, 200); // semi-transparent white
    noStroke();
    rect(s.x, s.y, rectW, rectH); // or ellipse(s.x, s.y, rectW, rectH)
  }
}

function drawInstructionText() {
  // Main white bright text
  fill(255);
  text("Click click anywhere, especially near the bottom of the canvas", width/2, height/2+320);
  textSize(32);
  textAlign(CENTER, BOTTOM); 
}
// Spawn a drifting shape at mouse location
function mousePressed() {
  shapes.push({
    x: mouseX - rectW / 2,
    y: mouseY - rectH / 2,
    vx: random(-0.5, 0.5),  // horizontal drift
    vy: random(2, 4)        // upward velocity
  });
}