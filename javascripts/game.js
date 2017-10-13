var game = new Phaser.Game(1366,768, Phaser.AUTO );

var home_background;
var customize_button;
var inst_button;
var battle_button;
var logo;
var ground;
var sky;
var plane1;
var plane2; //aarish 
var count = 0;
var weapon;
var cursors;
var fireButton;
var w,a,ss,d;

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
	game.load.image('plane2', 'assets/plane/p3.png');  //Aarish
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
	plane2 = game.add.sprite(game.world.width-100, 702, 'plane2');  //Aarish 
	plane1.scale.setTo(0.15,0.15);
	plane2.scale.setTo(0.15,0.15);  //Aarish
	// plane2.anchor.setTo(0.5, 1);

    game.physics.arcade.enable(plane1);
	plane1.enableBody=true;
    plane1.body.bounce.y = 0;
    // plane1.body.collideWorldBounds = true;

	game.physics.arcade.enable(plane2);
	plane2.enableBody=true;
    plane2.body.bounce.y = 0;

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
    bullet1 = game.add.weapon(1, 'bullet');
    // weapon.scale.setTo(0.3,0.3);             //NOT WORKING
    // weapon.setSize(3, 3, 0 , 6);             //NOT WORKING

    //  The bullet will be automatically killed when it leaves the world bounds
    bullet1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  Because our bullet is drawn facing up, we need to offset its rotation:
    bullet1.bulletAngleOffset = 90;

    //  The speed at which the bullet is fired
    bullet1.bulletSpeed = 700;

    bullet1.trackSprite(plane1, 50, 0, true);
    

    bullet2 = game.add.weapon(1, 'bullet');
    // weapon.scale.setTo(0.3,0.3);             //NOT WORKING
    // weapon.setSize(3, 3, 0 , 6);             //NOT WORKING

    //  The bullet will be automatically killed when it leaves the world bounds
    bullet2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  Because our bullet is drawn facing up, we need to offset its rotation:
    bullet2.bulletAngleOffset = 270;

    //  The speed at which the bullet is fired
    bullet2.bulletSpeed = -700;
    bullet2.trackSprite(plane2, 50, 0, true);

    // fireButton_1 = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    // fireButton_2 = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    w= game.input.keyboard.addKey(Phaser.Keyboard.W);
    a= game.input.keyboard.addKey(Phaser.Keyboard.A);
    ss= game.input.keyboard.addKey(Phaser.Keyboard.S);
    d= game.input.keyboard.addKey(Phaser.Keyboard.D);

    c= game.input.keyboard.addKey(Phaser.Keyboard.C);
    v= game.input.keyboard.addKey(Phaser.Keyboard.V);
	c= game.input.keyboard.addKey(Phaser.Keyboard.C);
	k= game.input.keyboard.addKey(Phaser.Keyboard.K);
	l= game.input.keyboard.addKey(Phaser.Keyboard.L);


	// c is bullet for plane1
	// v is nuke for plane1
	// k is bullet for plane2
	// l is nuke for plane2
};

function update3()
{   
    // weapon.bulletAngleOffset = plane1.angle;

    //Plane1//////////////////

    if (c.isDown) 
    {
        bullet1.fire();
    }

    if (k.isDown) 
    {
        bullet2.fire();
    }

	game.physics.arcade.overlap(plane1, ground, touch_ground_1, null, this);
	game.physics.arcade.overlap(plane2, ground, touch_ground_2, null, this);

	
    if (a.isDown && plane1.y>650)
    {
        plane1.body.angularVelocity = -20;
    }
    else if (d.isDown&&plane1.y>650)
    {
        plane1.body.angularVelocity = 20;
    }
    else if (a.isDown&&plane1.y<=650)
    {
        plane1.body.angularVelocity = -50;
    }
    else if (d.isDown&&plane1.y<=650)
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
	
	if (w.isDown)
    {
        game.physics.arcade.velocityFromAngle(plane1.angle, 300, plane1.body.velocity);
    }

    if (w.isDown)
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


//Plane2//////////////////////////////////
	
	
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)&&plane2.y>650)
    {
        plane2.body.angularVelocity = -20;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)&&plane2.y>650)
    {
        plane2.body.angularVelocity = 20;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)&&plane2.y<=650)
    {
        plane2.body.angularVelocity = -50;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)&&plane2.y<=650)
    {
        plane2.body.angularVelocity = 50;
    }   
    else
    {
    	if (plane2.body.angularVelocity > 0)
    	{
    		plane2.body.angularVelocity = plane2.body.angularVelocity - 1;
    	}
	    else if (plane2.body.angularVelocity < 0) 
	    {
	    	plane2.body.angularVelocity = plane2.body.angularVelocity + 1;
	    }
    }
	
	if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        game.physics.arcade.velocityFromAngle(plane2.angle, -300, plane2.body.velocity);
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



    if (plane2.y <30)
    {
    	game.physics.arcade.velocityFromAngle(plane2.angle, 100, plane2.body.velocity);
    	plane2.y = plane2.y + 10;
    }    

    //////////////////////////////////////////////////////////////////

    // game.debug.bodyInfo(plane1, 32, 32);

    // game.debug.body(plane1);
    // game.debug.body(ground);

    game.world.setBounds(0, 0, 1366, 768);
    game.world.wrap(plane1, 0, true);
    game.world.wrap(plane2, 0, true);

};

function touch_ground_1()
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

function touch_ground_2()
{
    // plane_flying.pause();

	console.log("touched");
	plane2.body.velocity.x = 0;
	plane2.body.velocity.y = -50;

	if (plane2.y>710) 
	{
		plane2.y = 709;
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
