let img;
let brightnessValue = 0;
let targetBrightness = 0;

let pressStartTime = 0;     // When mouse was pressed
let holdThreshold = 1000;   // 1 second in ms

function preload() {
  img = loadImage('../../images/bubbles.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Helvetica');
  textAlign(CENTER, CENTER);
  textSize(32);
}

function draw() {
  background(0);

  drawCoverImage(img);

  let darkness = map(brightnessValue, 0, 100, 255, 0);
  fill(0, darkness);
  rect(0, 0, width, height);

  brightnessValue = lerp(brightnessValue, targetBrightness, 0.05);

  fill(255);
  text(
    brightnessValue < 90
      ? "Hold click for 1 second to reveal the image"
      : "Image fully revealed",
    width / 2,
    height/2 + 300
  );
}

function drawCoverImage(img) {
  let canvasRatio = width / height;
  let imgRatio = img.width / img.height;

  let drawWidth, drawHeight;
  if (canvasRatio > imgRatio) {
    drawWidth = width;
    drawHeight = width / imgRatio;
  } else {
    drawHeight = height;
    drawWidth = height * imgRatio;
  }

  image(img, width / 2 - drawWidth / 2, height / 2 - drawHeight / 2, drawWidth, drawHeight);
}

function mousePressed() {
  // Record when press starts
  pressStartTime = millis();
}

function mouseReleased() {
  // Calculate hold duration
  let holdTime = millis() - pressStartTime;

  if (holdTime >= holdThreshold) {
    // Reveal if held for >= 1 second
    targetBrightness = 100;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
