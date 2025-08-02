let img;
let pix = [];
let size = 1;
let rectX, rectY;
let rectW = 100;
let rectH = 100;

function preload() {
  img = loadImage("../../images/untitled10.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize(windowWidth, 0);

  // Center the reveal
  rectX = width / 2 - (rectW * size) / 2;
  rectY = height / 2 - (rectH * size) / 2;

  fetchPixels();
}

function draw() {
  background(0);
  drawInstructionText(); 

  noStroke();

  // Circle radius and center
  let radius = (rectW * size) /2;
  let centerX = rectX + rectW * size / 2;
  let centerY = rectY + rectH * size / 2;

  // Draw only pixels inside the circle
  for (let i = 0; i < rectW; i++) {
    for (let j = 0; j < rectH; j++) {
      let x = rectX + i * size;
      let y = rectY + j * size;

      // Check if this pixel is inside the circle
      let dx = x + size/2 - centerX;
      let dy = y + size/2 - centerY;
      if (dx * dx + dy * dy <= radius * radius) {
        fill(pix[i][j]);
        ellipse(x + size / 8, y + size / 8, size, size);
      }
    }
  }
}

function drawInstructionText() {
  push();
  resetMatrix();  // resets translate/rotate
  fill(255);
  textSize(32);
  textAlign(CENTER, BOTTOM);
  text("Click to random sample.", width/2, height/2+320);
  pop();
}

function mousePressed() {
  // Move reveal window randomly
  rectX = random(0, width - rectW * size);
  rectY = random(0, height - rectH * size);
  fetchPixels();
}

function fetchPixels() {
  for (let i = 0; i < rectW; i++) {
    pix[i] = [];
    for (let j = 0; j < rectH; j++) {
      let x = rectX + i * size;
      let y = rectY + j * size;
      pix[i][j] = img.get(x, y);
    }
  }
}

