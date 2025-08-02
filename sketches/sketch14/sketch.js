let img;  
let pix = []; let cols, rows; let size = 3; 
let rectX, rectY, rectW, rectH; 

function preload(){
  img = loadImage("../../images/IMG_4627.JPG"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize (windowWidth,0); 

  fetchPixels(); 
}

function draw() {
  background(0);
  noStroke(); 
  drawInstructionText(); 

  // image(img, 0, height / 2 - img.height / 2);
  
  for (let i=0; i <cols; i++){
    for (let j=0; j<rows; j++){
      let x = rectX + i*size; 
      let y = rectY + j*size; 
      fill (pix[i][j]); 
      rect (x,y,size, size)
    }
  }
}

  function drawInstructionText() {
    push();
    resetMatrix();  // resets translate/rotate
    fill(255);
    textSize(32);
    textAlign(CENTER, BOTTOM);
    text("Use up/down arrow keys.", width/2, height/2+320);
    pop();
  }

function mousePressed(){
  fetchPixels (); 
}

function keyPressed() {
  if (keyCode === UP_ARROW) size = max(1, size - 1);
  if (keyCode === DOWN_ARROW) size += 1;
  fetchPixels();
}

function fetchPixels(){

  rectW = 100;
  rectH = 100;
  // rectX = floor(random(0, width - rectW * size));
  // rectY = floor(random(0, height - rectH * size));
  rectX = 0; 
  rectY = 0; 
  
  cols = rectW; 
  rows = rectH; 
  
  for (let i=0; i<cols; i++){
    pix[i]=[]; 
    for(let j=0; j<rows; j++){
          let x = rectX + i*size; 
          let y = rectY + j*size; 
          pix[i][j]=img.get(x,y); 
  }
}
      // print (pix); 
}