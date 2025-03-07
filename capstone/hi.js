// Import p5.play library
function preload() {
    // Load p5.play library
    p5.play = loadScript('https://cdnjs.cloudflare.com/ajax/libs/p5.play/1.4.0/p5.play.js');
}

function setup() {
    createCanvas(800, 600);
    // Create a sprite
    sprite = createSprite(width / 2, height / 2, 50, 50);
}

function draw() {
    background(200);
    // Draw the sprite
    drawSprites();
}