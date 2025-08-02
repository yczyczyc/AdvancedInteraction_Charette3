let img1, img2;
let currentImg;
let maskGraphics;
let revealed = false;

function preload() {
  img1 = loadImage('../../images/_MG_9745.png'); // First image
  img2 = loadImage('../../images/_MG_9410.png'); // Second image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  currentImg = img1;

  // Create a graphics layer for the mask
  maskGraphics = createGraphics(windowWidth, windowHeight);
  maskGraphics.background(0); // Full black at start
}

function draw() {
  background(0);

  // Apply the mask to a copy of the current image
  let maskedImg = currentImg.get();
  maskedImg.mask(maskGraphics);
  image(maskedImg, 0, 0, width, height);

  // Draw the instruction text
  drawInstructionText();

  if (!revealed) {
    checkRevealProgress();
  }
}


function drawInstructionText() {

  // Main white bright text
  fill(255);
  text("Keep drawing on the image", width/2, height/2 +220);
  textSize(32);
  textAlign(CENTER, BOTTOM); 
}

function mouseDragged() {
  // Erase part of the mask where the mouse goes
  maskGraphics.erase();
  maskGraphics.ellipse(mouseX, mouseY, 500, 500);
  maskGraphics.noErase();
}

function checkRevealProgress() {
  let pixels = maskGraphics.get();
  pixels.loadPixels();

  let clearedPixels = 0;
  let totalPixels = pixels.width * pixels.height;

  for (let i = 0; i < pixels.pixels.length; i += 4) {
    let alpha = pixels.pixels[i + 3]; // Alpha channel
    if (alpha === 0) { // Transparent area
      clearedPixels++;
    }
  }

  let clearedRatio = clearedPixels / totalPixels;

  if (clearedRatio > 0.8) {
    revealed = true;
    switchImage();
  }
}

function switchImage() {
  // Switch to the other image
  if (currentImg === img1) {
    currentImg = img2;
  } else {
    currentImg = img1;
  }
  resetMask();
  revealed = false; // Allow for another round of revealing
}

function resetMask() {
  // Reset the mask to fully black
  maskGraphics.background(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  // Recreate mask at new size
  let newMask = createGraphics(windowWidth, windowHeight);
  newMask.background(0);
  maskGraphics = newMask;
}
