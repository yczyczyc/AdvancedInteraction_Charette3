let circles = [];
let circleRadius = 48;
let hoverSpinSpeed = 0.9;
let img;

let imgDrawX, imgDrawY, imgDrawWidth, imgDrawHeight;

function preload() {
  img = loadImage('../../images/untitled.png'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // Fullscreen and WEBGL
}

function draw() {
  background(255);

  // Draw background image
  push();
  resetMatrix(); // Reset transforms to draw in normal 2D mode
  drawCoverImage(img);
  pop();

  // Once the image is drawn and we know its size, setup lattice once
  if (circles.length === 0) {
    setupCircles();
  }

  translate(0, 0, 0); // Center for WEBGL lattice

  // Draw the spinning circles
  for (let c of circles) {
    push();
    translate(c.x, c.y, 0);

    let currentSpinSpeed = c.isHovered ? hoverSpinSpeed : 0;
    c.angle += currentSpinSpeed;

    rotateY(c.angle);

    stroke(255);
    strokeWeight(.5);
    noFill();
    ellipse(0, 0, circleRadius * 2, circleRadius * 2);

    fill(0,0);
    arc(0, 0, circleRadius * 2, circleRadius * 2, -HALF_PI, HALF_PI, PIE);

    fill(255); 
    arc(0, 0, circleRadius * 2, circleRadius * 2, HALF_PI, 3 * HALF_PI, PIE);

    pop();
  }
}

function drawCoverImage(img) {
  let imgAspect = img.width / img.height;

  // Set plane width to match canvas width
  let planeWidth = width;
  let planeHeight = width / imgAspect;

  texture(img);
  noStroke();
  plane(planeWidth, planeHeight); // Centered by default in WEBGL
}

function setupCircles() {
  circles = [];

  let cols = floor(width / (circleRadius * 2));
  let rows = floor((width / (img.width / img.height)) / (circleRadius * 2)); // same aspect as plane

  let totalWidth = cols * circleRadius * 2;
  let totalHeight = rows * circleRadius * 2;

  // Start from top-left corner but relative to center
  let startX = -totalWidth / 2 + circleRadius;
  let startY = -totalHeight / 2 + circleRadius;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      circles.push({
        x: startX + col * circleRadius * 2,
        y: startY + row * circleRadius * 2,
        angle: 0,
        isHovered: false
      });
    }
  }
}

function mouseMoved() {
  // Convert mouse coords to WEBGL center coords
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;

  for (let c of circles) {
    let d = dist(mx, my, c.x, c.y);
    c.isHovered = d < circleRadius;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  circles = [];  // clear old
  setupCircles(); // rebuild with new dimensions
}