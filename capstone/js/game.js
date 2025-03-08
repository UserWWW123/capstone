

let block, arrow, crate, doorClosed, doorwayMiddle, stairs, shipYellow;

function preload(){
    
}

function setup() {
    
    new Canvas(windowWidth*0.48, windowHeight);
    background('#dbb691ff');

    world.gravity.y = 5;

    block = new Sprite(100,270, 50, 'pentagon');
    block.width = 100;
    block.height = 100;
    block.image = 'assets/block_E.png';
    block.image.scale = 0.8;
    block.rotationSpeed = 0;
    block.friction = 0.5;
    block.collider = 'static';

    stairs = new Sprite(100,400,[-100,30])
    stairs.image = 'assets/stairs_E.png';
    stairs.image.scale = 2;
    stairs.collider = 'static';

    arrow = new Sprite(200,490, [-100,30]);
    arrow.offset.y =10;
    arrow.image = 'assets/arrow_W.png';
    arrow.collider = 'static';
    arrow.image.scale = 2.5;

    crate = new Sprite(300,600,[0,100]);
    crate.image = 'assets/crate_E.png';
    crate.collider = 'static';
    crate.image.scale = 2.5;

    doorway = new Sprite(420,480,[-200,-27]);
    doorway.offset.y = 20;
    doorway.image = 'assets/doorwayMiddle_W.png';
    doorway.collider = 'static';
    doorway.image.scale = 2;

    doorClosed = new Sprite(485,400);
    doorClosed.width = 0;
    doorClosed.height = 150;
    doorClosed.image = 'assets/doorClosed_S.png';
    doorClosed.collider = 'static';
    doorClosed.image.scale = 2;

    alien = new Sprite(620,420);
    alien.image = 'assets/shipYellow.png';
    alien.collider = 'static';
    alien.image.scale = 2;

    block.layer = 3;
    stairs.layer = 1;
    crate.layer = 2;
    arrow.layer = 1;
    doorway.layer = 1;
    doorClosed.layer = 1;
    alien.layer = 0;

    enableDebugForAllSprites();

}

function draw(){
    background('#dbb691ff');
}

function enableDebugForAllSprites() {
    for (let sprite of allSprites) {
        sprite.debug = true;
    }
}

function update(){
    block.rotationSpeed =0;

    debug = true;

    if(block.colliding(crate)){
        block.vel.x = 8;
        block.vel.y = -1;
        block.rotation = 0;
    }
    if(block.colliding(arrow)){
        block.vel.x = 3;
        block.vel.y = 2;
    }
     if (block.colliding(doorClosed)) {
            doorClosed.image = 'assets/doorOpen_S.png';
            doorClosed.image.scale = 2;
            doorClosed.x = 470;
        if(doorClosed.image = 'assets/doorOpen_S.png'){
        block.vel.x = -10;
        block.vel.y = -10;
        alien.x = width/2;
        alien.y = height-height/3;
        alien.layer = 2;
        }
        if(alien.x === width/2){
            const winmessage = document.getElementById('win').innerHTML = "Mission Accomplished! <br> Go to next level";
            document.getElementById('win').style.backgroundColor = "rgba(244, 237, 223, 0.835)";
            const nextButton = document.getElementById('nextButton').innerHTML =">";
        }
    }
}

    // Check the order of blocks in the codingSection
    function checkOrder() {
        const blocksInCodingSection = Array.from(codingSection.children); // get all added block in the coding Section
        const correctp =  document.getElementById('correct');

        if (blocksInCodingSection.length !== ifFunction.length){
            return;
        }

        let allCorrect = true;

        blocksInCodingSection.forEach((block, index) => {
          const blockName = block.querySelector('.draggable').innerText.trim(); // get the block name
  
          //add correct/wrong effect:
          if (blockName !== ifFunction[index]) {
            block.classList.add('wrong'); 
           block.classList.remove('right'); 
          } else {
            block.classList.remove('wrong');
            block.classList.add('right'); 
            correctp.style.display = "block";
          }
        });
        // Check if blocks are in the correct order
        const Correct = allCorrect && blocksInCodingSection.every((block, index) => block.querySelector('.draggable').innerText.trim() === ifFunction[index]);
  
        correctp.addEventListener("click", function(){
          location.reload();});
  
        if (Correct) {
          gameStart();
          correctp.style.display = "none";
        } else {
          gameFreeze();
        }
      }

function gameStart(){
    block.collider = 'dynamic';
}
function gameFreeze(){
    block.collider = 'static';
}