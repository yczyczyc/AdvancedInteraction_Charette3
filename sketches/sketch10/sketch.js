// let imgs = [];
// let holeX, holeY;

let imgs = [];
let holeX, holeY;
let raggedEdge = [];

function preload() {
  imgs[0] = loadImage('../../images/_MG_9410.png');
  imgs[1] = loadImage('../../images/_MG_9745.png');
  imgs[2] = loadImage('../../images/_MG_9410.png');
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Set a random hole position
  holeX = random(-50, 50);
  holeY = random(-70, 70);

  // Pre-generate ragged edge points
  generateRaggedEdge();
}

function draw() {
  background(0);

  orbitControl(); // Drag to rotate

  ambientLight(150);
  directionalLight(255, 255, 255, 0, 0, -1);

  // Optional shelf
  push();
  noStroke();
  fill(100);
  translate(0, 100, 0);
  box(600, 10, 200);
  pop();

  // Trajectory line
  // push();
  // stroke(255, 0, 0);
  // strokeWeight(2);
  // line(holeX, holeY, -400, holeX, holeY, 400);
  // pop();

  // Draw books
  let spacing = 220;
  for (let i = 0; i < imgs.length; i++) {
    push();
    translate((i - 1) * spacing, 0, 0);
    rotateY(-QUARTER_PI / 2);
    drawImageWithHoleAndRaggedBorder(imgs[i]);
    drawInstructionText(); 
    pop();
  }
}

function drawInstructionText() {
  // Main white bright text
  fill(255);
  text("This is a 3d viewport.", width/2, height/2+320);
  textSize(32);
  textAlign(CENTER, BOTTOM); 
}

function drawImageWithHoleAndRaggedBorder(img) {
  let pg = createGraphics(150, 200);
  pg.pixelDensity(1);
  
  // Draw full image
  pg.image(img, 0, 0, 150, 200);

  // Cut a hole
  pg.erase();
  pg.ellipse(pg.width/2 + holeX, pg.height/2 + holeY, 40);
  pg.noErase();

  texture(pg);

  // Draw a custom ragged shape
  beginShape();
  for (let pt of raggedEdge) {
    vertex(pt.x, pt.y, 0, pt.u, pt.v); // x,y,z + u,v for texture mapping
  }
  endShape(CLOSE);
}

function generateRaggedEdge() {
  let w = 150;
  let h = 200;
  let offset = 8; // How much raggedness
  
  raggedEdge = [];

  // Top edge
  for (let x = 0; x <= w; x += 10) {
    let y = random(-offset, offset);
    raggedEdge.push({x: x - w/2, y: y - h/2, u: x, v: 0});
  }
  // Right edge
  for (let y = 0; y <= h; y += 10) {
    let x = random(-offset, offset);
    raggedEdge.push({x: w/2 + x, y: y - h/2, u: w, v: y});
  }
  // Bottom edge
  for (let x = w; x >= 0; x -= 10) {
    let y = random(-offset, offset);
    raggedEdge.push({x: x - w/2, y: h/2 + y, u: x, v: h});
  }
  // Left edge
  for (let y = h; y >= 0; y -= 10) {
    let x = random(-offset, offset);
    raggedEdge.push({x: -w/2 + x, y: y - h/2, u: 0, v: y});
  }
}
