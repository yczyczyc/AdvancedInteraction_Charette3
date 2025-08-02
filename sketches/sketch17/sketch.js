let symmetry = 5;
let angle;
let bgImage;
let revealed = false;

function preload() {
  bgImage = loadImage('../../images/bg.jpG');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Resize image to fit width but keep aspect ratio
  bgImage.resize(windowWidth, 0);

  angleMode(DEGREES);
  angle = 360 / symmetry;
  background(0);
  strokeWeight(30);
  stroke(255);
}

function draw() {
  if (revealed) {
    // Draw image with preserved proportions (after resize in setup)
    image(bgImage,0,0);
    // blendMode(MULTIPLY);
  } else {
    drawInstructionText(); 
  }

  translate(width / 2, height / 2);

  if (mouseIsPressed) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;

    for (let i = 0; i < symmetry; i++) {
      rotate(angle);
      line(mx, my, pmx, pmy);
      push();
      scale(1, -1);
      line(mx, my, pmx, pmy);
      pop();
    }
  }

  if (!revealed) checkCoverage();
}

function drawInstructionText() {
  push();
  resetMatrix();  // resets translate/rotate
  fill(255);
  textSize(32);
  textAlign(CENTER, BOTTOM);
  text("Draw to reveal", width/2, height/2+320);
  pop();
}
function checkCoverage() {
  loadPixels();
  let totalPixels = width * height;
  let drawnPixels = 0;

  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i] > 0 || pixels[i + 1] > 0 || pixels[i + 2] > 0) {
      drawnPixels++;
    }
  }

  let coverage = drawnPixels / totalPixels;
  if (coverage >= 0.6) {
    revealed = true;
  }
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    background(0);
    revealed = false;
  }
}

