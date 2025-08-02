let video;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Load video from shared folder
  video = createVideo('TDMovieOut.0.mp4');
  video.size(windowWidth/1.1, windowHeight/1.1);
  video.position(0,0);      // Place at top-left
  video.hide();              // Hide default HTML element
}

function draw() {
    background(0);
    drawInstructionText(); 
    image(video, 0, 0);        // Draw video on canvas
    video.loop();  
  }
  
  function drawInstructionText() {
    fill(255);
    textSize(32);
    textAlign(CENTER, BOTTOM);
    text("Click to play, there might be a short wait", width/2, height/2+320);
  }
  