let circles = []; // Array to hold the circle objects
let maxCircles = 1024; // Maximum number of circles
let initialRadius;
let img;
let maskLayer;

function preload() {
  img = loadImage('../../images/IMG_6638 copy.jpeg'); // Replace with your image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Calculate radius large enough to cover the entire screen
  initialRadius = dist(0, 0, width, height) / 3;

  maskLayer = createGraphics(windowWidth, windowHeight);
  maskLayer.background(0);
  
  circles.push({
    x: width / 2,
    y: height / 2,
    radius: initialRadius,
  });
}

function drawInstructionText() {
  // Main white bright text
  fill(255);
  text("Click!Click!Click!", width/2, height/2+320);
  textSize(32);
  textAlign(CENTER, BOTTOM); 
}

function draw() {
  background(0);
  
  // Draw the image like "background-size: cover"
  drawCoverImage(img);
  drawInstructionText(); 

  // Update the mask
  maskLayer.background(0);

  // Draw transparent circles on the mask
  maskLayer.erase();
  for (let circle of circles) {
    maskLayer.ellipse(circle.x, circle.y, circle.radius * 2);
  }
  maskLayer.noErase();

  // Apply the mask
  image(maskLayer, 0, 0, width, height);
}


function drawCoverImage(img) {
  let canvasRatio = width / height;
  let imgRatio = img.width / img.height;
  
  let newWidth, newHeight;
  
  if (canvasRatio > imgRatio) {
    // Canvas is wider relative to image
    newWidth = width;
    newHeight = width / imgRatio;
  } else {
    // Canvas is taller relative to image
    newHeight = height;
    newWidth = height * imgRatio;
  }
  
  // Center the image
  let x = (width - newWidth) / 2;
  let y = (height - newHeight) / 2;
  
  image(img, x, y, newWidth, newHeight);
}

function mousePressed() {
  if (circles.length >= maxCircles) {
    resetCircles();
  } else {
    let newCircles = [];
    for (let circle of circles) {
      let newRadius = circle.radius / 2;
      newCircles.push(
        { x: circle.x - newRadius, y: circle.y - newRadius, radius: newRadius },
        { x: circle.x + newRadius, y: circle.y - newRadius, radius: newRadius },
        { x: circle.x - newRadius, y: circle.y + newRadius, radius: newRadius },
        { x: circle.x + newRadius, y: circle.y + newRadius, radius: newRadius }
      );
    }
    circles = newCircles;
  }
}

function resetCircles() {
  circles = [{
    x: width / 2,
    y: height / 2,
    radius: initialRadius
  }];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  initialRadius = dist(0, 0, width, height) / 2;

  maskLayer = createGraphics(windowWidth, windowHeight);
  maskLayer.background(0);

  resetCircles();
}
