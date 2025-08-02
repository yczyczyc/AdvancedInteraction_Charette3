let img;  
let pix = []; let cols, rows; let size = 6; 
let rectX, rectY, rectW, rectH; 

function preload(){
  img = loadImage("../../images/_M7E7695.jpg"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize (windowWidth,0); 
  
  rectX = 100; 
  rectY = 100; 
  rectW = 140; 
  rectH = 120; 
  
  // cols = floor(width / size); 
  // rows = floor (height / size); 
  
  cols = rectW; 
  rows = rectH; 

  fetchPixels(); 
}

function draw() {
  background(250);
  drawInstructionText();

  noStroke(); 
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
  // Main white bright text
  fill(0);
  text("Click click anywhere", width/2, height/2+320);
  textSize(32);
  textAlign(CENTER, BOTTOM); 
}

function mousePressed(){
  fetchPixels (); 
}

function fetchPixels(){
  rectX = floor (random (0, width - rectW)); 
  rectY = floor (random (0, height - rectH)); 
  rectW = random (20,40); 
  rectH = random (10,20); 
  
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