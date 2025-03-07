let ball;
function setup() {
    new Canvas(windowWidth*0.48, windowHeight);

    world.gravity.y = 5; 
    ball = new Sprite(100, 100);
    ball.diameter = 30;
    ball.color = color(255, 0, 0);

    stick = new Sprite (-50,200, 300, 20);
    stick.collider='statics';
    stick.rotation = 5;

    stick3 = new Sprite (100,500, 300, 20);
    stick3.collider='statics';
    stick3.rotation = 10;
}

enableDebugForAllSprites();

function draw(){

}

function enableDebugForAllSprites() {
    for (let sprite of allSprites) {
        sprite.debug = true;
    }
}

function update(){
    clear();

    if(ball.collided(stick)){
        stick.rotation = 20;
        stick.collider = 'dynamic';
    }
    if(ball.collided(stick3)){
        stick3.rotation = 140;
        stick.collider = 'statics';
    }
}
