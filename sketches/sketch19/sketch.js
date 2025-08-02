

let cards = []; // Each card has image and holes
let imgs = [];
let numCards = 5;
let centerX, centerY;
let maxCardHeight;
let hoverStates = [];

function preload() {
  for (let i = 0; i < numCards; i++) {
    imgs[i] = loadImage(`img${i}.png`);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  centerX = width / 2;
  centerY = height * 0.8;
  maxCardHeight = height * 0.5;

  // Build cards with random hole data
  for (let i = 0; i < imgs.length; i++) {
    let holes = [];
    for (let j = 0; j < 10; j++) {
      holes.push({
        x: random(-0.4, 0.4), // relative width
        y: random(-0.9, -0.1), // relative height
        size: random(8, 14)    // irregular hole size
      });
    }
    cards.push({ img: imgs[i], holes: holes });
  }

  hoverStates = new Array(cards.length).fill(false);
}

function draw() {
  background(0);
  updateHoverStates();

  let angleSpread = PI / 6;
  let startAngle = -angleSpread / 2;

  // Draw from back to front
  for (let i = cards.length - 1; i >= 0; i--) {
    let depthIndex = cards.length - 1 - i;
    let angle = startAngle + (i * angleSpread) / (cards.length - 1);

    // Maintain aspect ratio
    let aspect = imgs[0].width / imgs[0].height;
    let cardH = maxCardHeight;
    let cardW = cardH * aspect;

    // Horizontal offset for fan layout
    let xOffset = (i - (cards.length - 1) / 2) * 24;

    push();
    translate(centerX + xOffset, centerY);
    rotate(angle);

    // Depth scaling and vertical parallax
    let depthScale = map(depthIndex, 0, cards.length - 1, 1.2, 0.8);
    let depthLift = map(depthIndex, 0, cards.length - 1, -40, 40);

    // Hover lift/scale
    let lift = hoverStates[i] ? -60 : 0;
    let scaleAmt = hoverStates[i] ? 1.1 : 1;

    translate(0, lift + depthLift);
    scale(scaleAmt * depthScale);

    // ---- Draw yellow backing (aligned to fan angle) ----
    push();
    translate(30, 20); // offset along fan spacing
    fill(255, 220, 0);
    noStroke();
    rectMode(CENTER);
    rect(0, -cardH / 2, cardW, cardH, 2);

    // Glow under holes (extra bright yellow)
    for (let h of cards[i].holes) {
      let hx = h.x * cardW;
      let hy = h.y * cardH;
      noStroke();
      fill(255, 240, 150, 230);
      ellipse(hx, hy, h.size * 2, h.size * 2);
    }
    pop();

    // ---- Draw image ----
    drawingContext.shadowOffsetX = 8;
    drawingContext.shadowOffsetY = map(depthIndex, 0, cards.length - 1, 6, 16);
    drawingContext.shadowBlur = map(depthIndex, 0, cards.length - 1, 10, 30);
    drawingContext.shadowColor = `rgba(0,0,0,${map(depthIndex,0,cards.length-1,0.2,0.4)})`;

    tint(255, map(depthIndex, 0, cards.length - 1, 180, 255));
    imageMode(CENTER);
    image(cards[i].img, 0, -cardH / 2, cardW, cardH);

    // ---- Erase holes from image (make them transparent) ----
    erase();
    for (let h of cards[i].holes) {
      let hx = h.x * cardW;
      let hy = h.y * cardH;
      ellipse(hx, hy, h.size, h.size);
    }
    noErase();

    noTint();
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 0;

    pop();
  }
}

function updateHoverStates() {
  for (let i = 0; i < cards.length; i++) {
    hoverStates[i] = isMouseOverCard(i);
  }
}

function isMouseOverCard(i) {
  let angleSpread = PI / 6;
  let startAngle = -angleSpread / 2;
  let angle = startAngle + (i * angleSpread) / (cards.length - 1);

  let aspect = imgs[0].width / imgs[0].height;
  let cardH = maxCardHeight;
  let cardW = cardH * aspect;
  let xOffset = (i - (cards.length - 1) / 2) * 20;

  let dx = mouseX - (centerX + xOffset);
  let dy = mouseY - centerY;
  let localX = dx * cos(-angle) - dy * sin(-angle);
  let localY = dx * sin(-angle) + dy * cos(-angle);

  return (
    localX > -cardW / 2 &&
    localX < cardW / 2 &&
    localY > -cardH &&
    localY < 0
  );
}

function mousePressed() {
  // Move clicked card to back
  for (let i = 0; i < cards.length; i++) {
    if (hoverStates[i]) {
      let card = cards.splice(i, 1)[0];
      cards.unshift(card);
      return;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerX = width / 2;
  centerY = height * 0.8;
  maxCardHeight = height * 0.5;
}
