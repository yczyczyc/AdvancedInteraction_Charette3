let img;  
let pix = []; let cols, rows; let size = 3; 
let rectX, rectY, rectW, rectH; 

function preload(){
  img = loadImage("../../images/IMG_4627.JPG"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize (windowWidth,0); 
  
  // rectX = 10; 
  // rectY = 10; 
  rectW = 300; 
  rectH = 300; 
  
  // cols = floor(width / size); 
  // rows = floor (height / size); 
  
//   cols = rectW; 
//   rows = rectH; 

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
  // Main white bright text
  fill(255);
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
  // rectW = random (20,40); 
  // rectH = random (10,20); 
  
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