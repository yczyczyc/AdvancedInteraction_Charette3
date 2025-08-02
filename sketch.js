sketch.js
let img;

// function preload() {
//   img = loadImage('untitled4.png'); 
// }

function preload() {
    img = loadImage("images/untitled4.png");
  }  

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // Display the image
  background (0);
  image(img, 0, 0, mouseX, mouseY);
}