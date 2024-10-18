//Credits:
//Button sample by Mellau via freesound.org
//Card press sample by NenadSimic via freesound.org
//Card snap sample by alparbalazs via freesound.org
//Background music sample by joshuaempyre via freesound.org
//Win jingle music sample by sonically_sound via freesound.org

let cards = [];
let font, font2;
let buttonPress, cardPress, cardSnap, gameMusic, winJingle;
let AttackTree, Badge, Building, LAN, Phish, PropSecrets, Cybercrime, winComp, loseComp, Chip;
let AttackTreeImg, BadgeImg, BuildingImg, LANImg, PhishImg, PropSecretsImg, CybercrimeImg, winCompImg, loseCompImg, ChipImg;
let center1, center2, center3, center4, center5;
let screen = 0;
let widthConstraint, heightConstraint;
let alphaValue = 0;
let fadeSpeed = 5;
let confirm = false;
let cancel = false;
let cardPressed = false;
let playOnce = true;
audio = true;

//start = 0
//instructions = 1
//game = 2
//restart = 3
//lose = 4

function setCardsoffScreen() { //moves images based on which screen is displayed
  LAN.pos = { x: -100, y: -100 };
  Building.pos = { x: -100, y: -100 };
  Badge.pos = { x: -100, y: -100 };
  PropSecrets.pos = { x: -100, y: -100 };
  Phish.pos = { x: -100, y: -100 };
  AttackTree.pos = { x: -300, y: -300 };
  if (screen === 0) {
    Cybercrime.scale = .00055 * width;
    Cybercrime.pos = { x: width * .5, y: height * .5 };
  }
  else {
    Cybercrime.pos = { x: -100000, y: -200 };
  }
  if (screen === 3) {
    winComp.pos = { x: width * .5, y: height * .5 };
  }
  else {
    winComp.pos = { x: -100000, y: -200 };
  }
  if (screen === 4) {
    loseComp.pos = { x: width * .5, y: height * .5 };
    Chip.pos = { x: width / 2, y: height / 2 };
  }
  else {
    loseComp.pos = { x: -100000, y: -200 };
    Chip.pos = { x: -100000, y: -200 };
  }

}

function mousePressed() {

  if (screen === 0) { //on the start screen
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height - 120 && mouseY < height - 80) {
      buttonPress.play();
      showInstructionScreen();
      screen = 1;
    }
  }
  else if (screen === 1 || screen === 3 || screen == 4) {// if on the instructions/restart/lose screen
    //press begin button or restart button pressed
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height - 120 && mouseY < height - 80) {
      buttonPress.play();
      if (screen == 3) {
        winJingle.stop();
        gameMusic.loop();
      }
      screen = 2;
      Badge.position = createVector(width * .3025, height - 110);
      Building.position = createVector(width * .49, height - 110);
      LAN.position = createVector(width * .6775, height - 110);
      Phish.position = createVector(width * .39625, height - 45);
      PropSecrets.position = createVector(width * .58375, height - 45);
      AttackTree.pos = { x: width / 2, y: height / 2 - 10 };
      Cybercrime.pos = { x: width / 2, y: height / 2 + 100 };
    }
  }
  else if (screen == 2 && confirm && !cancel) { //checks if user wins or loses from submit prompt
    if (mouseX > width / 2 + 20 && mouseX < width / 2 + 140 && mouseY > height - 80 && mouseY < height - 40) {
      buttonPress.play();
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
    else if (mouseX > width / 2 - 120 && mouseX < width / 2 && mouseY > height - 80 && mouseY < height - 40) { //cancel button
      buttonPress.play();
      confirm = false;
      cancel = true;
    }
  }

  //If on the game screen
  if (screen === 2) {
    // Check if the "Learn More" button is clicked
    cardPressed = true;
    if (mouseX > width - 150 && mouseX < width - 10 && mouseY > height - 55 && mouseY < height - 20) {
      buttonPress.play();
      // Display a link to a website for further learning
      window.open('https://www.cisa.gov/sites/default/files/2023-01/MitigationsForVulnerabilitiesCSNetsISA_S508C.pdf');
    }
  }
}


function handleDragging(card) {
  if (card.mouse.dragging()) { //The card is constrained within the game window
    if (cardPressed) {
      cardPress.play();
      cardPressed = false;
    }
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
        if (card.x != center1.x && card.y != center1.y) {
          cardSnap.play();
        }
        card.position = center1;
        snapped = true;
        break;
      case dist(card.x, card.y, center2.x, center2.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center2.x, center2.y) < 40):
        if (card.x != center2.x && card.y != center2.y) {
          cardSnap.play();
        }
        card.position = center2;
        snapped = true;
        break;
      case dist(card.x, card.y, center3.x, center3.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center3.x, center3.y) < 40):
        if (card.x != center3.x && card.y != center3.y) {
          cardSnap.play();
        }
        card.position = center3;
        snapped = true;
        break;
      case dist(card.x, card.y, center4.x, center4.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center4.x, center4.y) < 40):
        if (card.x != center4.x && card.y != center4.y) {
          cardSnap.play();
        }
        card.position = center4;
        snapped = true;
        break;
      case dist(card.x, card.y, center5.x, center5.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center5.x, center5.y) < 40):
        if (card.x != center5.x && card.y != center5.y) {
          cardSnap.play();
        }
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

function checkIfConfirm() { //submit screen appears if all 5 cards have been snapped to a position
  let numSnapped = 0;
  for (let card of cards) {
    if (
      dist(card.x, card.y, center1.x, center1.y) < 1 ||
      dist(card.x, card.y, center2.x, center2.y) < 1 ||
      dist(card.x, card.y, center3.x, center3.y) < 1 ||
      dist(card.x, card.y, center4.x, center4.y) < 1 ||
      dist(card.x, card.y, center5.x, center5.y) < 1
    ) {
        numSnapped++;
    }
  }
  if (numSnapped == 5) {
    confirm = true;
  }
}

function preload() { //load fonts, images and sounds
  font = loadFont('assets/AttackTree/1/MechaRx20Regular-j9Zy9.otf');
  font2 = loadFont('assets/AttackTree/1/Metropolis-Regular.otf');
  AttackTreeImg = loadImage('assets/AttackTree/1/Attacktree.png');
  BadgeImg = loadImage('assets/AttackTree/1/Badge.png');
  BuildingImg = loadImage('assets/AttackTree/1/Building.png');
  LANImg = loadImage('assets/AttackTree/1/LAN.png');
  PhishImg = loadImage('assets/AttackTree/1/Phish.png');
  PropSecretsImg = loadImage('assets/AttackTree/1/PropSecrets.png');
  CybercrimeImg = loadImage('assets/CyberLaws/1/Cybercrime.png');
  winCompImg = loadImage('assets/AttackTree/lockedComputer.png');
  loseCompImg = loadImage('assets/AttackTree/LoseComp.png')
  ChipImg = loadImage('assets/AttackTree/1/Chip.png');
  buttonPress = loadSound('assets/AttackTree/1/buttonPress.wav');
  cardPress = loadSound('assets/AttackTree/1/cardPress.wav');
  cardSnap = loadSound('assets/AttackTree/1/cardSnap.wav');
  gameMusic = loadSound('assets/AttackTree/1/gameMusic.wav');
  winJingle = loadSound('assets/AttackTree/1/winJingle.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  center1 = createVector(width * .698, height * .479);
  center2 = createVector(width * .698, height * .652);
  center3 = createVector(width * .49, height * .371);
  center4 = createVector(width * .49, height * .635);
  center5 = createVector(width * .3025, height * .502);

  soundFormats('wav');
  gameMusic.loop();

  AttackTree = new Sprite(width / 2 - 80, 315);
  AttackTree.addImage(AttackTreeImg);
  AttackTree.collider = 'k';
  AttackTree.scale = .00035 * width;

  Chip = new Sprite(width / 2, height * .5);
  Chip.addImage(ChipImg);
  Chip.collider = 'k';

  winComp = new Sprite(width / 2, height * .5);
  winComp.addImage(winCompImg);
  winComp.collider = 'k';

  loseComp = new Sprite(width / 2, height * .5);
  loseComp.addImage(loseCompImg);
  loseComp.collider = 'k';

  cards = new Group();
  cards.collider = 'k';

  Cybercrime = new Sprite(width * .505, height * .5);
  Cybercrime.addImage(CybercrimeImg);
  Cybercrime.collider = 'k';
  Cybercrime.scale = .00055 * width;

  Badge = new cards.Sprite(width * .3025, height - 110);
  Badge.addImage(BadgeImg);
  Badge.scale = 0.00029 * width;
  cards[0] = Badge;
  Badge.originalPosition = createVector(width * .3025, height - 110);

  Building = new cards.Sprite(width * .49, height - 110);
  Building.addImage(BuildingImg);
  Building.scale = 0.00029 * width;
  cards[1] = Building;
  Building.originalPosition = createVector(width * .49, height - 110);

  LAN = new cards.Sprite(width * .6775, height - 110);
  LAN.addImage(LANImg);
  LAN.scale = 0.00029 * width;
  cards[2] = LAN;
  LAN.originalPosition = createVector(width * .6775, height - 110);

  Phish = new cards.Sprite(width * .39625, height - 45);
  Phish.addImage(PhishImg);
  Phish.scale = 0.00029 * width;
  cards[3] = Phish;
  Phish.originalPosition = createVector(width * .39625, height - 45);

  PropSecrets = new cards.Sprite(width * .58375, height - 45);
  PropSecrets.addImage(PropSecretsImg);
  PropSecrets.scale = 0.00029 * width;
  cards[4] = PropSecrets;
  PropSecrets.originalPosition = createVector(width * .58375, height - 45);

  LAN.pos = { x: -100, y: -100 };
  Building.pos = { x: -100, y: -100 };
  Badge.pos = { x: -100, y: -100 };
  Phish.pos = { x: -100, y: -100 };
  PropSecrets.pos = { x: -100, y: -100 };
  AttackTree.pos = { x: -200, y: -200 };
  Cybercrime.pos = { x: -400, y: -400 };
  winComp.pos = { x: -400, y: -400 };
  loseComp.pos = { x: -400, y: -400 };
  Chip.pos = { x: -400, y: -400 };

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
  else if (screen === 2) { // game screen
    playOnce = true;

    // set background
    const c = color(48, 116, 180);
    background(c);

    // load background image
    let imgX = 0;
    let imgY = 0;
    scale(.00016 * width);
    image(ChipImg, imgX, imgY);
    scale(1 / (.00016 * width));

    // Define the text content
    // Set text properties
    noStroke();
    strokeWeight(1);
    fill(255);
    rectMode(CENTER);
    rect(width / 2, 60, 1000, 100, 10);
    rectMode(CORNER);
    rect(200, 120, width - 400, height - 270, 10);

    // Display text content
    textSize(18);
    noStroke();
    fill(0);
    textAlign(CENTER, TOP); // Text alignment
    text("This is an example of an attack tree where the objective is to disclose proprietary secrets of an organization that has two buildings with separate Local Area Networks (LANs).\nThe root of the tree is the goal of the attack, while the leaves represent ways to achieve that goal.\nComplete the tree by ordering the answers to identify the missing attacks and what they lead to.\n"
      , width / 2 - 500, 20, 1000, 360);

    // Learn More Button Border
    stroke(255);
    strokeWeight(2);
    fill(255);

    // Learn More Button
    noStroke();
    fill(255);
    rect(width - 150 + 1, height - 54, 138, 38, 10);

    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Learn More", width - 80, height - 35);  // Learn More Button Text

    fill(255);
    noStroke();

    fill(0);
    noStroke();
    textSize(24);
    textAlign(CENTER);

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
    rect(width / 2 - 140, height - 130, 300, 110, 10);
    fill(0);
    textSize(20);
    textAlign(LEFT);
    text('Submit Answer?', width / 2 - 95, height - 105);
    fill(c);
    rect(width / 2 + 20, height - 80, 120, 40, 10);
    fill(255);
    textSize(17);
    text("Submit", width / 2 + 42, height - 60);
    const r = color(195, 16, 16);
    fill(r);
    rect(width / 2 - 120, height - 80, 120, 40, 10);
    fill(255);
    text("Cancel", width / 2 - 105, height - 60);
  }

  else if (screen === 3) {
    showScreenWin();
  }

  else if (screen == 4) {
    showScreenLose();
  }
}

function windowResized() { //Adjusts size of canvas and screen elements based on screen size 
  resizeCanvas(windowWidth, windowHeight);
  AttackTree.scale = .00035 * width;
  AttackTree.pos = { x: width / 2, y: height / 2 - 10 };
  Building.scale = 0.00029 * width;
  Building.originalPosition = createVector(width * .49, height - 110);
  Badge.scale = 0.00029 * width;
  Badge.originalPosition = createVector(width * .3025, height - 110);
  Phish.scale = 0.00029 * width;
  Phish.originalPosition = createVector(width * .39625, height - 45);
  PropSecrets.scale = 0.00029 * width;
  PropSecrets.originalPosition = createVector(width * .58375, height - 45);
  LAN.scale = 0.00029 * width;
  LAN.originalPosition = createVector(width * .6775, height - 110);
  center1 = createVector(width * .698, height * .479);
  center2 = createVector(width * .698, height * .652);
  center3 = createVector(width * .49, height * .371);
  center4 = createVector(width * .49, height * .635);
  center5 = createVector(width * .3025, height * .502);
}

function showStartScreen() {

  // set background
  setCardsoffScreen();
  const c = color(48, 116, 180);
  background(c);

  // load background image
  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  // back of center image
  rectMode(CENTER);
  fill(255);
  rect(width / 2, height / 2, width * .21, height * .5, 10);

  // title text
  fill(255);
  rect(width / 2, height / 8, 700, height / 10, 10);

  fill(0); // Black color
  textSize(60);
  textFont(font);
  textAlign(CENTER, CENTER); // Text alignment
  text("Attack Tree", width / 2, height / 8);

  // Instructions button
  fill(255);
  noStroke();
  rect(width / 2, height - 100, 200, 40, 10);

  fill(0);
  textSize(20);
  text("Instructions", width / 2, height - 100);
}


function showInstructionScreen() {
  // set background
  setCardsoffScreen();
  background("white");

  // load background image
  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  // title text
  fill(0);
  textFont(font);
  rectMode(CENTER);
  rect(width / 2, height / 4, 600, height / 10, 10);

  const c = color(48, 116, 180);

  // Set text properties
  fill(c); // Blue color
  textSize(32); // Font size
  textAlign(CENTER, CENTER); // Text alignment
  text("Instructions", width / 2, height / 4);

  // Begin button
  fill(0);
  rect(width / 2, height - 100, 200, 40, 10);

  fill(255);
  textSize(20);
  text("Begin", width / 2, height - 100);

  // instructions text
  textSize(22); // Adjusted font size
  textAlign(CENTER, CENTER); // Adjusted text alignment

  // Additional text
  fill(color(0));
  textFont(font2); // change font
  let textX = width / 2; // X position for the additional text
  let textY = height / 1.5; // Starting Y position for the additional text
  let textLeading = 24; // Line spacing
  let textWidth = 550; // Width of the text block
  let additionalText = "Your objective is to correctly place each card into its designated slot.\n\nTo play, click and hold on a card, then drag it to the numbered slot where you think it belongs.\nRelease the mouse to drop the card into place.\n\nRemember, each card has a specific slot it must occupy.\nWhen all cards have been placed, you'll see an option to check your answers.\n\nIf you're correct, you'll have the option to play again.";

  text(additionalText, textX, textY, textWidth, height - textY); // Display additional text with specified width and height


}

function showScreenWin() {
  if (playOnce) {
    gameMusic.stop();
    winJingle.loop();
  }
  playOnce = false;
  // Move extra icons off screen when win page is up
  setCardsoffScreen();
  const c = color(0, 179, 115);
  background(c);

  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  fill(255);
  rect(width * .33, height * .33, width * .35, height * .48, 10);

  //Set text properties
  fill(255, alphaValue);
  rect(width * .34, height * .1, width * .33, height * .2, 10);
  fill(0, alphaValue);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("You Win!\n\nThanks for playing!", width / 2, height * .2);

  //Animate alpha value for fading effect
  alphaValue += fadeSpeed;
  if (alphaValue > 255 || alphaValue < 0) {
    fadeSpeed *= -1; //Reverse the fade direction
  }

  //Restart button
  fill(255);
  rect(width / 2 - 100, height - 120, 200, 40, 10);
  fill(0);
  textSize(20);
  text("Restart", width / 2, height - 100);

  //display win image
  let imgX2 = winComp.width + 14;
  let imgY2 = winComp.height - 55;
  scale(.00095 * width);
  image(winCompImg, imgX2, imgY2);
}

function showScreenLose() {
  setCardsoffScreen();
  const r = color(195, 16, 16);
  background(r);

  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  fill(255);
  rect(width * .33, height * .33, width * .35, height * .48, 10);

  //Set text properties
  fill(255, alphaValue);
  rect(width * .4, height * .1, width * .2, height * .2, 10);
  fill(0, alphaValue);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Not Quite!\n\nTry again?", width / 2, height * .2);

  //Animate alpha value for fading effect
  alphaValue += fadeSpeed;
  if (alphaValue > 255 || alphaValue < 0) {
    fadeSpeed *= -1; //Reverse the fade direction
  }

  //Restart button
  fill(255);
  rect(width / 2 - 100, height - 120, 200, 40, 10);
  fill(0);
  textSize(20);
  text("Restart", width / 2, height - 100);

  //display lose image
  let imgX2 = loseComp.width + 20;
  let imgY2 = loseComp.height - 20;
  scale(.001 * width);
  image(loseCompImg, imgX2, imgY2);
}
