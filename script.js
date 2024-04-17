let cards = [];
let AttackTree, Badge, Building, LAN, Phish, PropSecrets, Cybercrime, winComp, loseComp;
let AttackTreeImg, BadgeImg, BuildingImg, LANImg, PhishImg, PropSecretsImg, CybercrimeImg, winCompImg, loseCompImg;
let center1, center2, center3, center4, center5;
let screen = 0;
let widthConstraint, heightConstraint;
let alphaValue = 0;
let fadeSpeed = 5;
let confirm = false;
let cancel = false;

//start = 0
//instructions = 1
//game = 2
//restart = 3
//lose = 4

function setCardsoffScreen() {
  LAN.pos = { x: -100, y: -100 };
  Building.pos = { x: -100, y: -100 };
  Badge.pos = { x: -100, y: -100 };
  PropSecrets.pos = { x: -100, y: -100 };
  Phish.pos = { x: -100, y: -100 };
  AttackTree.pos = { x: -300, y: -300 };
  if (screen === 0) {
    Cybercrime.pos = { x: width / 2, y: 160 + 95 };
  }
  else {
    Cybercrime.pos = { x: -100000, y: -200 };
  }
  if (screen === 3) {
    winComp.pos = { x: width / 2 + 10, y: 160 + 85 };
  }
  else {
    winComp.pos = { x: -100000, y: -200 };
  }
  if (screen === 4) {
    loseComp.pos = { x: width / 2, y: 160 + 85};
  }
  else {
    loseComp.pos = { x: -100000, y: -200 };
  }

}

function mousePressed() {

  if (screen === 0) { //on the start screen
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 + 120 && mouseY < height / 2 + 160) {
      showInstructionScreen();
      screen = 1;
    }
  }
  else if (screen === 1 || screen === 3 || screen == 4) {// if on the instructions/restart/lose screen
    //press begin button or restart button pressed
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 + 120 && mouseY < height / 2 + 160) {
      screen = 2;
      Badge.position = createVector(width / 4 - 67, height - (height / 3) + 95);
      Building.position = createVector(width / 2 - 140, height - (height / 3) + 155);
      LAN.position = createVector(width / 2 - 40, height - (height / 3) + 95);
      Phish.position = createVector(width / 2 + 53, height - (height / 3) + 155);
      PropSecrets.position = createVector(width / 2 + 150, height - (height / 3) + 95);
      AttackTree.pos = { x: width/2, y: 290 };
      Cybercrime.pos = { x: width / 2, y: 160 + 95 };
    }
  }
  else if (screen == 2 && confirm && !cancel) {
    if (mouseX > width / 2 + 20 && mouseX < width / 2 + 140 && mouseY > height / 2 + 210 && mouseY < height / 2 + 250) {
      if (
        dist(Badge.x, Badge.y, center1.x, center1.y) < 1 &&
        dist(Phish.x, Phish.y, center2.x, center2.y) < 1 &&
        dist(Building.x, Building.y, center3.x, center3.y) < 1 &&
        dist(LAN.x, LAN.y, center4.x, center4.y) < 1 &&
        dist(PropSecrets.x, PropSecrets.y, center5.x, center5.y) < 1
      ) {
        console.log("you win!");
        showScreenWin();
        screen = 3;
        confirm = false;
      }
      else {
        console.log("you lose!");
        showScreenLose();
        screen = 4;
        confirm = false;
      }
    }
    else if (mouseX > width / 2 - 120 && mouseX < width / 2 && mouseY > height / 2 + 210 && mouseY < height / 2 + 250) {
      confirm = false;
      cancel = true;
    }
  }

  //If on the game screen
  if (screen === 2) {
    // Check if the "Learn More" button is clicked
    if (mouseX > width - 150 && mouseX < width - 10 && mouseY > height - 55 && mouseY < height - 20) 
    {
      // Display a link to a website for further learning
      window.open('https://www.cisa.gov/sites/default/files/2023-01/MitigationsForVulnerabilitiesCSNetsISA_S508C.pdf');
    }
  }
}


function handleDragging(card) {
  if (card.mouse.dragging()) { //The card is constrained within the game window
    cancel = false;
    confirm = false;
    widthConstraint = constrain(mouseX + card.mouse.x, card.width / 2, width - card.width / 2);
    heightConstraint = constrain(mouseY + card.mouse.y, card.height / 2, height - card.height / 2);
    card.position = createVector(widthConstraint, heightConstraint);
    card.rotationLock = true;
  } else {
    card.vel.x = 0;
    card.vel.y = 0;
    card.rotationLock = true;
  }
}

function snapToCenter(card) {
  // Snap into position and check if there is not already a card in the center position
  if (!mouseIsPressed) {
    let snapped = false;
    switch (true) {
      case dist(card.x, card.y, center1.x, center1.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center1.x, center1.y) < 40):
        card.position = center1;
        snapped = true;
        break;
      case dist(card.x, card.y, center2.x, center2.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center2.x, center2.y) < 40):
        card.position = center2;
        snapped = true;
        break;
      case dist(card.x, card.y, center3.x, center3.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center3.x, center3.y) < 40):
        card.position = center3;
        snapped = true;
        break;
      case dist(card.x, card.y, center4.x, center4.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center4.x, center4.y) < 40):
        card.position = center4;
        snapped = true;
        break;
      case dist(card.x, card.y, center5.x, center5.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center5.x, center5.y) < 40):
        card.position = center5;
        snapped = true;
        break;
      default:
        break;
    }

    if (!snapped) {
      // Return the card to its original position
      card.position = card.originalPosition;
    }
  }
}

function checkIfConfirm() {
  let numSnapped = 0;
  for (let card of cards) {
    if ((card.x == center1.x && card.y == center1.y) || (card.x == center2.x && card.y == center2.y) || (card.x == center3.x && card.y == center3.y) || (card.x == center4.x && card.y == center4.y) || (card.x == center5.x && card.y == center5.y)) {
      numSnapped++;
    }
  }
  if (numSnapped == 5) {
    confirm = true;
  }
}

function preload() {
  AttackTreeImg = loadImage('assets/AttackTree/1/Attacktree.png');
  BadgeImg = loadImage('assets/AttackTree/1/Badge.png');
  BuildingImg = loadImage('assets/AttackTree/1/Building.png');
  LANImg = loadImage('assets/AttackTree/1/LAN.png');
  PhishImg = loadImage('assets/AttackTree/1/Phish.png');
  PropSecretsImg = loadImage('assets/AttackTree/1/PropSecrets.png');
  CybercrimeImg = loadImage('assets/CyberLaws/1/Cybercrime.png');
  winCompImg = loadImage('assets/AttackTree/lockedComputer.png');
  loseCompImg = loadImage('assets/AttackTree/LoseComp.png')
}

function setup() {
  createCanvas(650, 620);

  ////////////////////////////////////////////
  ////////////////// GAME 1 //////////////////
  ////////////////////////////////////////////

  center1 = createVector(553, 286);
  center2 = createVector(553, 377);
  center3 = createVector(315, 230);
  center4 = createVector(315, 368);
  center5 = createVector(98, 298);

  AttackTree = new Sprite(width / 2 - 80, 315);
  AttackTree.addImage(AttackTreeImg);
  AttackTree.collider = 'k';
  AttackTree.scale = .39;
  //AttackTreeImg.resize(650, 0);

  winComp = new Sprite(width / 2, 160 + 95);
  winComp.addImage(winCompImg);
  winComp.collider = 'k';


  loseComp = new Sprite(width / 2, 160 + 95);
  loseComp.addImage(loseCompImg);
  loseComp.collider = 'k';

  cards = new Group();
  cards.collider = 'k';

  Cybercrime = new Sprite(width / 2, 160 + 95);
  Cybercrime.addImage(CybercrimeImg);
  Cybercrime.collider = 'k';
  CybercrimeImg.resize(200, 0);

  Badge = new cards.Sprite(width / 4 - 67, height - (height / 3) + 95);
  Badge.addImage(BadgeImg);
  Badge.scale = 0.4;
  cards[0] = Badge;
  Badge.originalPosition = createVector(width / 4 - 40, height - (height / 3) + 80);

  Building = new cards.Sprite((width / 2 - 140), height - (height / 3) + 155);
  Building.addImage(BuildingImg);
  Building.scale = 0.4;
  cards[1] = Building;
  Building.originalPosition = createVector(width / 2 - 195, height - (height / 3) + 170);

  LAN = new cards.Sprite(width / 2 - 40, height - (height / 3) + 95);
  LAN.addImage(LANImg);
  LAN.scale = 0.4;
  cards[2] = LAN;
  LAN.originalPosition = createVector(width / 2 - 40, height - (height / 3) + 125);

  Phish = new cards.Sprite(width / 2 + 53, height - (height / 3) + 155);
  Phish.addImage(PhishImg);
  Phish.scale = 0.4;
  cards[3] = Phish;
  Phish.originalPosition = createVector(width / 2 + 53, height - (height / 3) + 170);

  PropSecrets = new cards.Sprite(width / 2 + 150, height - (height / 3) + 95);
  PropSecrets.addImage(PropSecretsImg);
  PropSecrets.scale = 0.4;
  cards[4] = PropSecrets;
  PropSecrets.originalPosition = createVector(width / 2 + 150, height - (height / 3) + 80);


  LAN.pos = { x: -100, y: -100 };
  Building.pos = { x: -100, y: -100 };
  Badge.pos = { x: -100, y: -100 };
  Phish.pos = { x: -100, y: -100 };
  PropSecrets.pos = { x: -100, y: -100 };
  AttackTree.pos = { x: -200, y: -200 };
  Cybercrime.pos = { x: -400, y: -400 };
  winComp.pos = { x: -400, y: -400 };
  loseComp.pos = { x: -400, y: -400 };

  ////////////////////////////////////////////
  ////////////////// GAME 2 //////////////////
  ////////////////////////////////////////////


}


function draw() {
  // Set up the screen
  clear();
  background("white");


  if (screen === 0) {
    showStartScreen();
  }
  else if (screen === 1) {
    showInstructionScreen();
  }
  else if (screen === 2) {
    // Define the text content
    // Set text properties
    const c = color(0, 179, 115);
    background(c);
    noStroke();
    strokeWeight(1);
    fill(255);
    rect(20, 10, 620, 74, 10);
    rect(0, 120, 650, 340, 10);
    // Display text content
    textSize(12);
    noStroke();
    fill(0);
    textAlign(CENTER, TOP); // Text alignment
    text("This is an example of an attack tree where the objective is to disclose proprietary secrets of an organization that has two buildings with separate Local Area Networks (LANs). The root of the tree is the goal of the attack, while the leaves represent ways to achieve that goal. Complete the tree by ordering the answers to identify the missing attacks and what they lead to.\n"
        , 30, 20, 600, 360);

    // Learn More Button Border
    stroke(255);
    strokeWeight(2);
    fill(255);
    //rect(width - 150, height - 45, 140, 40, 10);
    // Learn More Button
    noStroke();
    fill(255);
    rect(width - 150 + 1, height - 54, 138, 38, 10);       // Learn More Button Text
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Learn More", width - 80, height - 35);

    fill(255);
    noStroke();
    circle (center1.x, center1.y, 35);
    circle (center2.x, center2.y, 35);
    circle (center3.x, center3.y, 35);
    circle (center4.x, center4.y, 35);
    circle (center5.x, center5.y, 35);

    fill(0);
    noStroke();
    textSize(24);
    textAlign(CENTER);
    text("1", center1.x - 1, center1.y + 2);
    text("2", center2.x, center2.y + 2);
    text("3", center3.x, center3.y + 2);
    text("4", center4.x, center4.y + 2);
    text("5", center5.x, center5.y + 2);

    for (let card of cards) {
      handleDragging(card);
      snapToCenter(card);
    }
  }

  checkIfConfirm();
  //Check if we win!!!
  if (confirm && !cancel) {
    const c = color(0, 179, 115);
    fill(255);
    noStroke();
    rect((width / 2) - 140, height / 2 + 165, 300, 100, 10);
    fill(0);
    textSize(20);
    textAlign(LEFT);
    text('Submit Answer?', width / 2 - 60, height - 120);
    fill(c);
    rect(width / 2 + 20, height / 2 + 210, 120, 40, 10);
    fill(255);
    textSize(17);
    text("Submit", width / 2 + 52, height / 2 + 232);
    const r = color(195, 16, 16);
    fill(r);
    rect(width / 2 - 120, height / 2 + 210, 120, 40, 10);
    fill(255);
    text("Cancel", width / 2 - 90, height / 2 + 232);
  }

  else if (screen === 3) {
    showScreenWin();
  }

  else if (screen == 4) {
    showScreenLose();
  }
}

function showStartScreen() {
  setCardsoffScreen();
  const c = color(0, 179, 115);
  background(c);

  // Set text properties
  fill(255); // White color
  textSize(32); // Font size
  textAlign(CENTER, CENTER); // Text alignment
  text("Attack Tree\n\n", width / 2, height / 2 - 200);

  // Instructions button
  fill(255);
  noStroke();
  rect(width / 2 - 75, height / 2 + 120, 150, 40, 10);
  fill(0);
  textSize(20);
  text("Instructions", width / 2, height / 2 + 140);

  fill(255);
  rect(200, 100, 250, 300, 10);
}


function showInstructionScreen() {
  setCardsoffScreen();
  background("white");
  const c = color(0, 179, 115);
  // Set text properties
  fill(c); // Black color
  textSize(32); // Font size
  textAlign(CENTER, CENTER); // Text alignment
  text("Instructions\n\n", width / 2, height / 2 - 200);

  // Begin button
  fill(c);
  rect(width / 2 - 50, height / 2 + 120, 100, 40, 10);
  fill(255);
  textSize(20);
  text("Begin", width / 2, height / 2 + 140);


  textSize(18); // Adjusted font size
  textAlign(CENTER, TOP); // Adjusted text alignment

  // Additional text
  fill(color(0));
  let textX = 50; // X position for the additional text
  let textY = height / 2 - 150; // Starting Y position for the additional text
  let textLeading = 24; // Line spacing
  let textWidth = width - 100; // Width of the text block
  let additionalText = "Your objective is to correctly place each card into its designated slot. To play, click and hold on a card, then drag it to the numbered slot where you think it belongs. Release the mouse to drop the card into place.\n\nRemember, each card has a specific slot it must occupy. When all cards have been placed, you'll see an option to check your answers. If you're correct, you'll have the option to play again.";

  text(additionalText, textX, textY, textWidth, height - textY); // Display additional text with specified width and height


}

function showScreenWin() {
  // Move extra icons off screen when win page is up
  setCardsoffScreen();
  const c = color(0, 179, 115);
  background(c);

  fill(255);
  rect(width / 2 - 175, height / 2 - 133, 350, 230, 10);

  //Set text properties
  fill(255, alphaValue);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("You Win!\n\nThanks for playing!", width / 2, height / 2 - 200);

  //Animate alpha value for fading effect
  alphaValue += fadeSpeed;
  if (alphaValue > 255 || alphaValue < 0) {
    fadeSpeed *= -1; //Reverse the fade direction
  }

  //display win image
  let imgX = 650 / 2 - winComp.width / 2;
  let imgY = height / 2 - winComp.height / 2 - 20;
  image(winCompImg, imgX, imgY);

  //Restart button
  fill(255);
  rect(width / 2 - 50, height / 2 + 120, 100, 40, 10);
  fill(0);
  textSize(20);
  text("Restart", width / 2, height / 2 + 140);
}

function showScreenLose() {
  setCardsoffScreen();
  const r = color(195, 16, 16);
  background(r);

  fill(255);
  rect(width / 2 - 175, height / 2 - 130, 350, 230, 10);
  
  //Set text properties
  fill(255, alphaValue);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Not Quite!\n\nTry again?", width / 2, height / 2 - 230);

  //Animate alpha value for fading effect
  alphaValue += fadeSpeed;
  if (alphaValue > 255 || alphaValue < 0) {
    fadeSpeed *= -1; //Reverse the fade direction
  }

  //display lose image
  let imgX = 650 / 2 - loseComp.width / 2;
  let imgY = height / 2 - loseComp.height / 2 - 20;
  image(loseCompImg, imgX, imgY);

  //Instructions button
  fill(255);
  rect(width / 2 - 75, height / 2 + 120, 150, 40, 10);
  fill(0);
  textSize(20);
  text("Restart", width / 2, height / 2 + 140);
}
