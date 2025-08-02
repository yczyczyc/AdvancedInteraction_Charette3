let img;
let maskLayer;
let circleRadius = 90; // Starting radius
let targetRadius = 90; // Where the circle is trying to go
let expanding = false; // Tracks whether expanding or shrinking

function preload() {
  img = loadImage('../../images/_MG_9745.png'); // Replace with your image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  maskLayer = createGraphics(windowWidth, windowHeight);
  maskLayer.background(0);
}

function draw() {
  background(0);
  
  // Draw the image (cover style)
  drawCoverImage(img);

  // Animate the circle radius toward targetRadius
  circleRadius = lerp(circleRadius, targetRadius, 0.1); // Smooth interpolation

  // Reset the mask
  maskLayer.clear();
  maskLayer.background(0);

  // Erase a circle at the mouse position
  maskLayer.erase();
  maskLayer.ellipse(mouseX, mouseY, circleRadius * 2);
  maskLayer.noErase();

  // Draw the mask on top
  image(maskLayer, 0, 0, width, height);
  drawInstructionText(); 

}

function drawInstructionText() {
  // Main white bright text
  fill(255);
  text("Click anywhere.Then click again.", width/2, height/2+320);
  textSize(32);
  textAlign(CENTER, BOTTOM); 
}

function mousePressed() {
  // Toggle between small and full screen radius
  let maxRadius = dist(0, 0, width, height); // Big enough to cover screen diagonally
  
  if (targetRadius === 90) {
    targetRadius = maxRadius; // Expand
  } else {
    targetRadius = 90; // Shrink back
  }
}

function drawCoverImage(img) {
  let canvasRatio = width / height;
  let imgRatio = img.width / img.height;
  let newWidth, newHeight;
  
  if (canvasRatio > imgRatio) {
    newWidth = width;
    newHeight = width / imgRatio;
  } else {
    newHeight = height;
    newWidth = height * imgRatio;
  }
  
  let x = (width - newWidth) / 2;
  let y = (height - newHeight) / 2;
  
  image(img, x, y, newWidth, newHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Recreate the mask layer
  maskLayer = createGraphics(windowWidth, windowHeight);
}
