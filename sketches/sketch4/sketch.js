let buttonX, buttonY; // Position of the circle button
let buttonRadius; // Will be dynamic based on screen
let isFlashing = false;
let flashSize;
let flashSpeed = 30;
let controlButtonX, controlButtonY, controlButtonWidth, controlButtonHeight;

let img; // The photo to reveal
let reveal = false; // Whether to reveal the photo

function preload() {
  img = loadImage('../../images/_MG_2561.jpg'); // Replace with your image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Set button size relative to canvas
  buttonRadius = min(width, height) / 10;
  flashSize = buttonRadius;
  
  // Position of the circle (lens)
  buttonX = width / 2 - 130;
  buttonY = height / 2;
  
  // Position and size of the control button ("Flash")
  controlButtonWidth = 100;
  controlButtonHeight = 40;
  controlButtonX = width / 2 + 240;
  controlButtonY = height / 5 - controlButtonHeight / 2;
  
  textAlign(CENTER, CENTER);
  textSize(16);
}

function draw() {
  background(0);
  drawInstructionText(); 

  // Draw the photo underneath (only revealed if flash done)
  if (reveal) {
    drawPhotoAtLens();
  }

  // Draw the green viewfinder bars
  fill(0);
  noStroke();
  rect(0, 0, width, height / 5);
  rect(0, (4 * height) / 5, width, height / 5);

  // Draw the flash control button
  fill(255);
  rect(controlButtonX, controlButtonY, controlButtonWidth, controlButtonHeight, 10);

  fill(0);
  text("Flash", controlButtonX + controlButtonWidth / 2, controlButtonY + controlButtonHeight / 2);

  // Draw concentric lens outlines
  noFill();
  stroke(255);
  strokeWeight(1);
  for (let i = 0; i < 5; i++) {
    ellipse(buttonX, buttonY, buttonRadius * 2 + i * 20, buttonRadius * 2 + i * 20);
  }

  // Draw the flashing middle circle
  fill(255);
  noStroke();
  ellipse(buttonX, buttonY, flashSize * 2);

  // Animate the flash
  if (isFlashing) {
    flashSize -= flashSpeed;
    if (flashSize <= 5) {
      flashSpeed = -flashSpeed; // Reverse to expand
    }
    if (flashSize >= buttonRadius) {
      // Flash complete
      isFlashing = false;
      flashSize = buttonRadius;
      flashSpeed = 2*abs(flashSpeed);
      reveal = true; // Start revealing the photo!
    }
  }
}

function drawInstructionText() {
  // Main white bright text
  fill(255);
  text("Hold the flash button.", width/2, height/2+320);
  textSize(32);
  textAlign(CENTER, BOTTOM); 
}

function mousePressed() {
  // Check if the flash control button is clicked
  if (
    mouseX > controlButtonX &&
    mouseX < controlButtonX + controlButtonWidth &&
    mouseY > controlButtonY &&
    mouseY < controlButtonY + controlButtonHeight
  ) {
    isFlashing = true;
    reveal = false; // Reset reveal
  }
}
function drawPhotoAtLens() {
  let photoX = 0; // Start from left edge
  let photoY = height / 5; // Just below the top bar
  let photoW = width; // Full width
  let photoH = (3 * height) / 5; // Between the two green bars

  // Cover-style draw the image first (resizing properly)
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
  
  let imgOffsetX = (width - drawWidth) / 2;
  let imgOffsetY = (height - drawHeight) / 2;

  // Now copy a portion of the scaled image into the camera body
  copy(
    img,
    int((photoX - imgOffsetX) * img.width / drawWidth),
    int((photoY - imgOffsetY) * img.height / drawHeight),
    int(photoW * img.width / drawWidth),
    int(photoH * img.height / drawHeight),
    photoX,
    photoY,
    photoW,
    photoH
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Recalculate layout on resize
  buttonRadius = min(width, height) / 10;
  flashSize = buttonRadius;
  buttonX = width / 2 - 80;
  buttonY = height / 2;
  controlButtonX = width / 2 + 100;
  controlButtonY = height / 5 - controlButtonHeight / 2;
}


