let img;
let blurLayer;
let blurAmount = 12; // How strong the blur is
let noiseActive = true;

function preload() {
  img = loadImage('../../images/bg1.jpg'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  blurLayer = createGraphics(windowWidth, windowHeight);
}

function draw() {
  background(0);
  drawInstructionText();


  // Draw the image in "cover" style
  drawCoverImage(img);

  if (noiseActive) {
    blurLayer.clear();
    blurLayer.image(img, random(-blurAmount, blurAmount), random(-blurAmount, blurAmount), width, height);
    
    // Apply slight blur effect
    blurLayer.filter(BLUR, 2);
    
    // Draw blurred layer on top
    image(blurLayer, 0, 0);
    drawInstructionText();

  }
}

function drawInstructionText() {
  // Main white bright text
  fill(255);
  text("Make it stop!", width/2, height/2+320);
  textSize(32);
  textAlign(CENTER, BOTTOM); 
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
  image(img, width/2 - drawWidth/2, height/2 - drawHeight/2, drawWidth, drawHeight);
}

function mousePressed() {
  noiseActive = !noiseActive; // Toggle blur movement
}
