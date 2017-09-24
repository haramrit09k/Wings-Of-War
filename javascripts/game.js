var game = new Phaser.Game(1366,768, Phaser.AUTO );

var home_background;
var customize_button;
var inst_button;
var battle_button;
var logo;
var ground;
var sky;
var plane1;
var count = 0;
var weapon;
var cursors;
var fireButton;

//HOME PAGE
var gameState0 = function()
{

};

//INSTRUCTIONS
var gameState1 = function(){
    
};

//CUSTOMIZATION PAGE
var gameState2 = function(){
 
};

//MAIN GAME
var gameState3=function() {

};

//END PAGE WITH SCORE AND NAVIGATION BUTTONS
var gameState4 = function()
{

};


gameState0.prototype={

    preload : preload0,
    create : create0,
    update : update0
};

gameState1.prototype={
    preload:preload1,
    create:create1,
    update:update1
};

gameState2.prototype={

    preload : preload2,
    create : create2,
    update : update2
};

gameState3.prototype={
    preload:preload3,
    create:create3,
    update:update3
};

gameState4.prototype={
    preload:preload4,
    create:create4,
    update:update4
};

game.state.add('gameState0',gameState0);         
game.state.add('gameState1',gameState1);        
game.state.add('gameState2',gameState2);        
game.state.add('gameState3',gameState3);        
game.state.start('gameState3'); // CHANGE IT TO 0 LATER



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function preload0()
{
	game.load.image('back', 'assets/background/b2.jpg');
	game.load.image('logo', 'assets/background/logo.png');
	game.load.image('battle_button', 'assets/buttons/battle3.png');
	game.load.image('inst_button', 'assets/buttons/instrctions.jpg');
};

function create0()
{
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

	home_background = game.add.sprite(0, 0, 'back');
	home_background.scale.setTo(1.9,1.6);

	logo = game.add.sprite(40, 15, 'logo');
	logo.scale.setTo(1,1);

	battle_button = game.add.button(1100, 500, 'battle_button', startgame, this, 2, 1, 0);
	battle_button.scale.setTo(0.8,0.8);

};

function update0()
{

};

function startgame()
{
	game.state.start('gameState3'); 

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function preload1()
{

};

function create1()
{

};

function update1()
{

};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function preload2()
{

};

function create2()
{

};

function update2()
{

};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function preload3()
{
	game.load.image('ground', 'assets/background/platform.png');
	game.load.image('sky', 'assets/background/sky.png');
	game.load.image('plane1', 'assets/plane/p2.png');
	game.load.audio('plane_flying', 'assets/audio/plane_flying.mp3');
    game.load.spritesheet('bullet', 'assets/bullet.png', 300, 300);
};

function create3()
{

	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 100;

	//Plane Audio
	plane_flying = game.add.audio('plane_flying', 1, true);
	// plane_flying.addMarker('plane_flying', 0, 2);
	

	sky = game.add.sprite(0, 0, 'sky');
	sky.scale.setTo(1.8,1.5);

	plane1 = game.add.sprite(0, 702, 'plane1');
	plane1.scale.setTo(0.15,0.15);
    game.physics.arcade.enable(plane1);
	plane1.enableBody=true;
    plane1.body.bounce.y = 0;
    // plane1.body.collideWorldBounds = true;

	ground = game.add.sprite(0, 735, 'ground');
	ground.scale.setTo(3.5,1);
    ground.enableBody=true;   
    game.physics.arcade.enable(ground);
    ground.body.immovable=true;
    ground.body.collideWorldBounds = true;
  	// ground.body.checkCollision.up = true;
 	// ground.body.checkCollision.down = true;
    
    // plane_flying.loopFull(0.8);


    //  Creates 1 single bullet, using the 'bullet' graphic
    weapon = game.add.weapon(1, 'bullet');
    // weapon.scale.setTo(0.3,0.3);             //NOT WORKING
    // weapon.setSize(3, 3, 0 , 6);             //NOT WORKING

    //  The bullet will be automatically killed when it leaves the world bounds
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  Because our bullet is drawn facing up, we need to offset its rotation:
    weapon.bulletAngleOffset = 90;

    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 700;

    weapon.trackSprite(plane1, 50, 0, true);

    fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);


};

function update3()
{   
    // weapon.bulletAngleOffset = plane1.angle;

    if (fireButton.isDown) 
    {
        weapon.fire();
    }

	game.physics.arcade.overlap(plane1, ground, touch_ground, null, this);
	
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)&&plane1.y>650)
    {
        plane1.body.angularVelocity = -20;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)&&plane1.y>650)
    {
        plane1.body.angularVelocity = 20;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)&&plane1.y<=650)
    {
        plane1.body.angularVelocity = -50;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)&&plane1.y<=650)
    {
        plane1.body.angularVelocity = 50;
    }
    else
    {
    	if (plane1.body.angularVelocity > 0) 
    	{
    		plane1.body.angularVelocity = plane1.body.angularVelocity - 1;
    	}
	    else if (plane1.body.angularVelocity < 0) 
	    {
	    	plane1.body.angularVelocity = plane1.body.angularVelocity + 1;
	    }
    }
	
	if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        game.physics.arcade.velocityFromAngle(plane1.angle, 300, plane1.body.velocity);
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
    	if (count == 0) {
    		plane_flying.play('', 0, 1, true);
    		count++;
    	}
    	else {
        plane_flying.resume();
    	}
    }
    else
    {
    	plane_flying.pause();
    }

    		console.log("Count = "+count);



    if (plane1.y <30)
    {
    	game.physics.arcade.velocityFromAngle(plane1.angle, 100, plane1.body.velocity);
    	plane1.y = plane1.y + 10;
    }

    // game.debug.bodyInfo(plane1, 32, 32);

    // game.debug.body(plane1);
    // game.debug.body(ground);

    game.world.setBounds(0, 0, 1366, 768);
    game.world.wrap(plane1, 0, true);

};

function touch_ground()
{
    // plane_flying.pause();

	console.log("touched");
	plane1.body.velocity.x = 0;
	plane1.body.velocity.y = -50;

	if (plane1.y>710) 
	{
		plane1.y = 709;
	}

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function preload4()
{

};

function create4()
{

};

function update4()
{

};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
