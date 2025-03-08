<div class="codingSection">
<div class = "codingList" ondragover="allowDrop(event)" ondrop="drop(event)">
</div>
<div class = "dropButton"></div>
</div>

<div class = "codingList" ondragover="allowDrop(event)" ondrop="drop(event)"></div>


const forBlocks = ["ifButton", "conditionButton", "variable", "number", "action", "else", "let", "const"];
const ballBlocks= ["ball"];
const levelBlocks = ["level"];
const boxBlocks = ["box"];
const movement = ["rotate", "velocity", "number", "draw"]

var config = {
    type: Phaser.AUTO,
    parent: 'gameContainer',
    width: 850,
    height: 700,
    physics: {
        default: 'matter',
        matter:{
            gravity: {
                x: 0,
                y: 1
            },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    transparent: true
};

var game = new Phaser.Game(config);
var block, stairs, arrow, crate, doorClosed, shipYellow, doorwayMiddle, path, graphics;

function preload ()
{
    this.load.image('block', 'assets/block_E.png');
    this.load.image('stairs', 'assets/stairs_E.png');
    this.load.image('arrow', 'assets/arrow_W.png');
    this.load.image('crate', 'assets/crate_E.png');
    this.load.image('shipYellow', 'assets/shipYellow.png');
    this.load.image('doorClosed', 'assets/doorClosed_S.png');
    this.load.image('doorwayMiddle', 'assets/doorwayMiddle_W.png');
    this.load.spritesheet('alien', 
        'assets/spritesheet_aliens.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create ()
{
    /*
    let stairsShape=[
		{ "x":256, "y":427 }, { "x":226, "y":413 }, { "x":130, "y":512 }, { "x":256, "y":449 },
		{ "x":193, "y":356 }, { "x":161, "y":341 }, { "x":0, "y":368 }, { "x":0, "y":449 }, { "x":126, "y":512 }, { "x":130, "y":512 }, { "x":193, "y":376 },
	    { "x":161, "y":341 }, { "x":161, "y":321 }, { "x":130, "y":305 }, { "x":126, "y":305 }, { "x":0, "y":368 },
	    { "x":225, "y":392 }, { "x":193, "y":376 }, { "x":130, "y":512 }, { "x":226, "y":413 }
	];
    let crateShape =[
        { "x":0, "y":111 }, { "x":63, "y":143 }, { "x":67, "y":143 }, { "x":67, "y":0 }, { "x":63, "y":0 }, { "x":1, "y":31 },
		{ "x":130, "y":111 }, { "x":130, "y":32 }, { "x":67, "y":0 }, { "x":67, "y":143 }
	];
    let blockShape =[
        { "x":130, "y":512 }, { "x":256, "y":449 }, { "x":256, "y":290 }, { "x":129, "y":226 }, { "x":126, "y":226 }, { "x":0, "y":449 }, { "x":126, "y":512 },
        { "x":0, "y":289 }, { "x":0, "y":449 }, { "x":126, "y":226 }
    ];
    let doorwayShape = [
        { "x":256, "y":290 }, { "x":223, "y":274 }, { "x":95, "y":338 }, { "x":95, "y":378 }, { "x":126, "y":394 }, { "x":130, "y":394 }, { "x":256, "y":331 }
    ]
    let doorShape = [
        { "x":192, "y":432 }, { "x":192, "y":449 }, { "x":222, "y":464 }, { "x":226, "y":464 }, { "x":256, "y":449 }, { "x":256, "y":290 },
		{ "x":142, "y":409 }, { "x":95, "y":242 }, { "x":95, "y":400 }, { "x":126, "y":416 }, { "x":130, "y":416 },
		{ "x":95, "y":242 }, { "x":142, "y":409 }, { "x":146, "y":409 }, { "x":256, "y":290 }, { "x":129, "y":226 }, { "x":126, "y":226 },
		{ "x":146, "y":409 }, { "x":192, "y":432 }, { "x":256, "y":290 }
    ]
    let alienShape = [
        { "x":4, "y":56 }, { "x":0, "y":62 }, { "x":2, "y":71 }, { "x":11, "y":89 }, { "x":26, "y":108 }, { "x":51, "y":95 }, { "x":16, "y":57 } ,
        { "x":2, "y":71 }, { "x":0, "y":73 }, { "x":0, "y":82 }, { "x":5, "y":87 }, { "x":11, "y":89 } ,
        { "x":124, "y":83 }, { "x":124, "y":73 }, { "x":122, "y":69 }, { "x":108, "y":57 }, { "x":101, "y":52 }, { "x":72, "y":95 }, { "x":112, "y":89 }, { "x":119, "y":87 },
        { "x":122, "y":69 }, { "x":124, "y":67 }, { "x":124, "y":61 }, { "x":120, "y":56 }, { "x":108, "y":57 } ,
        { "x":51, "y":95 }, { "x":26, "y":108 }, { "x":40, "y":107 }, { "x":49, "y":100 } ,
        { "x":72, "y":95 }, { "x":74, "y":100 }, { "x":83, "y":107 }, { "x":97, "y":108 }, { "x":102, "y":106 }, { "x":111, "y":97 }, { "x":112, "y":89 } ,
        { "x":11, "y":94 }, { "x":14, "y":100 }, { "x":21, "y":106 }, { "x":26, "y":108 }, { "x":11, "y":89 } ,
        { "x":32, "y":50 }, { "x":90, "y":49 }, { "x":93, "y":41 }, { "x":93, "y":24 }, { "x":88, "y":13 }, { "x":68, "y":0 }, { "x":53, "y":0 }, { "x":33, "y":13 } ,
        { "x":68, "y":0 }, { "x":88, "y":13 }, { "x":80, "y":5 } ,
        { "x":33, "y":13 }, { "x":53, "y":0 }, { "x":41, "y":5 } ,
        { "x":29, "y":20 }, { "x":27, "y":36 }, { "x":29, "y":45 }, { "x":32, "y":50 }, { "x":33, "y":13 } ,
        { "x":90, "y":49 }, { "x":32, "y":50 }, { "x":19, "y":54 }, { "x":16, "y":57 }, { "x":51, "y":95 }, { "x":72, "y":95 }, { "x":101, "y":52 } 
    ]
        */

    stairs = this.matter.add.image(150, 450, 'stairs').setStatic(true).setFriction(1);
    stairs.setOrigin(0.46, 0.5);

    crate = this.matter.add.image(280, 550, 'crate').setDepth(1).setStatic(true).setFriction(1);
    crate.setOrigin(0.62,0.35);

    block = this.matter.add.image(100, 250, 'block').setBounce(0.5).setFriction(0.5).setStatic(false);
    block.setScale(0.4);
    block.setOrigin(0.57,0.55)

    blockShape = blockShape.map(vertex => ({
        x: vertex.x * 0.4,
        y: vertex.y * 0.4        
    }));
    doorwayMiddle = this.matter.add.image(380, 500, 'doorwayMiddle').setStatic(true).setDepth(1).setFriction(1);
    doorClosed = this.matter.add.image(470, 370, 'doorClosed').setStatic(true).setDepth(0);
    doorClosed.setOrigin(0.56,0.52);

    shipYellow = this.matter.add.image(620, 350, 'shipYellow').setStatic(true).setDepth(0);
    shipYellow.setOrigin(0.5,0.6);

    this.matter.body.setVertices(stairs.body, stairsShape);
    this.matter.body.setVertices(crate.body, crateShape);
    this.matter.body.setVertices(block.body, blockShape);
    this.matter.body.setVertices(doorwayMiddle.body, doorwayShape);
    this.matter.body.setVertices(doorClosed.body, doorShape);
    this.matter.body.setVertices(shipYellow.body, alienShape);

    this.matter.world.on('collisionstart', function(event, bodyA, bodyB){
        if ((bodyB.gameObject === block && bodyA.gameObject === stairs)){
        bodyA.gameObject.setTint(0xff0000);
        bodyB.gameObject.setTint(0x00ff00);

        block.setCollisionCategory(0); // Ignore bodyA
        stairs.setCollisionCategory(0); // Ignore bodyB
        block.setStatic(true);
        block.setVelocityX(8);
        block.setVelocityY(1);
    }
    })

    graphics = this.add.graphics();
    let line1 = new Phaser.Curves.Line([140,360,265, 530]);
    graphics.setDepth(1);
    path = this.add.path();
    path.add(line1);
    
 }

function update ()
{
    graphics.clear();
    graphics.lineStyle(2, 0xffffff, 1);
    path.draw(graphics);

}