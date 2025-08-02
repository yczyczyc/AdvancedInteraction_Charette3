let img;
let maskLayer;

function preload() {
  img = loadImage('../../images/0519_01.png'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize (windowWidth, 0); 
  maskLayer = createGraphics(windowWidth, windowHeight);
  maskLayer.background(150); // Coating color (gray)
}

function draw() {
  background(0);
  image(img, 0, height / 2 - img.height / 2);
  // Draw the image scaled to full window width, height proportional
  image(maskLayer, 0, 0);
  drawInstructionText(); 


}

function drawInstructionText() {
  // Main white bright text
  fill(255);
  text("Click and hold to scratch draw", width/2, height/2+320);
  textSize(32);
  textAlign(CENTER, BOTTOM); 
}


function mouseDragged() {
  maskLayer.erase();
  maskLayer.ellipse(mouseX, mouseY, 140, 140);
  maskLayer.noErase();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Resize image and mask when window changes
  img.resize(windowWidth, 0);
  maskLayer = createGraphics(windowWidth, windowHeight);
  maskLayer.background(150);
}
