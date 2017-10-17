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
var healthBar;
var c,v,k,l;
var bullet1;
var bullet2;
var player1=0;
var player2=0;
var ratio1;
var ratio2;
var seconds;
var minutes;
var user1;
var user2;
var user;
var player;
var timeoutflag= 1;


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
    update:update3,

    createTimer: function(){
 
    var me = this;
    
    me.timeLabel = me.game.add.text(game.world.width/2 - 30, 25, "01:30", {font: "100px Arial", fill: "#000"}); 
    me.timeLabel.anchor.setTo(0.5, 0);
    me.timeLabel.align = 'center';
    me.timeLabel.scale.setTo(0.4,0.4);

 
    },
    updateTimer: function(){
 
    var me = this;
 
    var currentTime = new Date();
    var timeDifference = me.startTime.getTime() - currentTime.getTime();
    console.log("timeDifference= "+timeDifference);
 
    //Time elapsed in seconds
    me.timeElapsed = Math.abs(timeDifference / 1000);
    console.log("timeElapsed= "+me.timeElapsed);
 
    //Time remaining in seconds
    //var timeRemaining = me.totalTime - me.timeElapsed; 
    var timeRemaining = 65- me.timeElapsed;
    console.log("timeRemaining= "+timeRemaining);
 
    //Convert seconds into minutes and seconds
    minutes = Math.floor(timeRemaining / 60);
    console.log("minutes= "+minutes);

    seconds = Math.floor(timeRemaining) - (60 * minutes);
    console.log("seconds= "+seconds);

    //Display minutes, add a 0 to the start if less than 10
    var result = (minutes < 10) ? "0" + minutes : minutes; 
 
    //Display seconds, add a 0 to the start if less than 10
    result += (seconds < 10) ? ":0" + seconds : ":" + seconds;
 
    me.timeLabel.text = result;
    console.log("result= "+result);
    }
};

gameState4.prototype={
    preload:preload4,
    create:create4,
    update:update4
};

game.state.add('gameState0',gameState0);         
game.state.add('gameState1',gameState1);    // leaderboard    
game.state.add('gameState2',gameState2);        
game.state.add('gameState3',gameState3);        
game.state.start('gameState1'); // CHANGE IT TO 0 LATER



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function preload0()
{
	game.load.image('back', 'assets/background/b2.jpg');
	game.load.image('logo', 'assets/background/logo3.png');
	game.load.image('battle_button', 'assets/buttons/battle3.png');
	game.load.image('inst_button', 'assets/buttons/instrctions.jpg');
};

function create0()
{
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

	home_background = game.add.sprite(0, 0, 'back');
	home_background.scale.setTo(1.9,1.6);

	logo = game.add.sprite(50, 45, 'logo');
	logo.scale.setTo(1.2,1.2);

	battle_button = game.add.button(1100, 500, 'battle_button', startgame, this, 2, 1, 0);
	battle_button.scale.setTo(0.8,0.8);

    user1  = prompt("Enter name of player 1");
    user2  = prompt("Enter name of player 2");

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
    game.load.image('leaderboard', 'assets/background/leaderboard.jpeg');
};

function create1()
{
    var leaderboard_background = game.add.sprite(0, 0, 'leaderboard');
    leaderboard_background.scale.setTo(4,4);

    if (player1==1) 
    {
        // game.add.text(600,150,"Player 1 Wins",{font: "Algerian" ,fontSize: '25px', fill:'#FFF'});
        user = user1;
        player = player1;
    }
    else
    {
        // game.add.text(600,150,"Player 2 Wins",{font: "Algerian" ,fontSize: '25px', fill:'#FFF'});
        user = user2;
        player = player2;
    }

    $.ajax({
                            // console.log("0");
                            type: 'POST',
                            url: '/send',
                            data: { user:user, status:player },
                            dataType: 'json',
                           
                            });  
    var wins;

        $.ajax({
                            // console.log("0");
                            type: 'GET',
                            url: '/get',
                            dataType: 'json',
                            success:function(response){
                            var counter = 0;
                            response.sort(function(a, b){
                                    return b.score - a.score;
                                });
                            console.log(response);  
                            while(response[counter]!=""&&counter<5){
                                game.add.text(550,counter*75+225,response[counter].user,{font: "Algerian" ,fontSize: '25px', fill:'#FFF'});
                                game.add.text(800,counter*75+225,response[counter].score,{font: "Algerian" ,fontSize: '25px', fill:'#FFF'});
                                counter++;
                            }
                            // console.log(response[0].user);
                            // console.log(response[0].score);
                            // console.log(response[0].user);

                            // while(response[j]!==null)
                            // {

                            // }
                        }
                           
                            });  

        game.add.text(600,150,"Total no. of wins = "+wins,{font: "Algerian" ,fontSize: '25px', fill:'#FFF'});

    
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
	game.load.image('sky', 'assets/background/orange2.png');
	game.load.image('plane1', 'assets/plane/p2.png');
	game.load.image('plane2', 'assets/plane/p3.png');  //Aarish
	game.load.audio('plane_flying', 'assets/audio/plane_flying.mp3');
    game.load.image('bullet', 'assets/fireball1.png');
};

function create3()
{

    // create: function() {    
    //     var barConfig = {x: 200, y: 100};
    //     this.myHealthBar = new HealthBar(this.game, barConfig);
    // }
    // var HealthBar = require('HealthBar.js');
    // var barConfig = {x: 200, y: 100};
    // this.myHealthBar = new HealthBar(this.game, barConfig);

	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 100;

	//Plane Audio
	plane_flying = game.add.audio('plane_flying', 1, true);
	// plane_flying.addMarker('plane_flying', 0, 2);
	

	sky = game.add.sprite(0, 0, 'sky');
	sky.scale.setTo(3.2,3.2);

    bmd_1 = game.add.bitmapData(1400,40);
    bmd_1.ctx.beginPath();
    bmd_1.ctx.rect(0,0,300,40);
    bmd_1.ctx.fillStyle = 'black';
    bmd_1.ctx.fill();

    healthBar_1 = game.add.sprite(0,0,bmd_1);
    healthBar_1.anchor.y = 0.5;

    // console.log(game.world.width);

    bmd_2 = game.add.bitmapData(1400,40);
    bmd_2.ctx.beginPath();
    bmd_2.ctx.rect(1066,0,300,40);
    bmd_2.ctx.fillStyle = 'black';
    bmd_2.ctx.fill();

    healthBar_2 = game.add.sprite(0,0,bmd_2);
    healthBar_2.anchor.y = 0.5;

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
    bullet1 = game.add.weapon(2, 'bullet');
    //  The bullet will be automatically killed when it leaves the world bounds
    bullet1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    //  Because our bullet is drawn facing up, we need to offset its rotation:
    bullet1.bulletAngleOffset = 0;
    //  The speed at which the bullet is fired
    bullet1.bulletSpeed = 1000;
    bullet1.trackSprite(plane1, 0, 18, true);
    

    bullet2 = game.add.weapon(2, 'bullet');
    //  The bullet will be automatically killed when it leaves the world bounds
    bullet2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    //  Because our bullet is drawn facing up, we need to offset its rotation:
    bullet2.bulletAngleOffset = 0;
    //  The speed at which the bullet is fired
    bullet2.bulletSpeed = -1000;
    bullet2.trackSprite(plane2, 0, 18, true);

    // game.physics.enable(bullet1, Phaser.Physics.ARCADE);
    // game.physics.enable(bullet2, Phaser.Physics.ARCADE);
    game.physics.enable(bullet1, Phaser.Physics.ARCADE);
    // game.physics.enable(weapon.bullet2, Phaser.Physics.ARCADE);

    w= game.input.keyboard.addKey(Phaser.Keyboard.W);
    a= game.input.keyboard.addKey(Phaser.Keyboard.A);
    ss= game.input.keyboard.addKey(Phaser.Keyboard.S);
    d= game.input.keyboard.addKey(Phaser.Keyboard.D);

    c= game.input.keyboard.addKey(Phaser.Keyboard.C);
    v= game.input.keyboard.addKey(Phaser.Keyboard.V);
	// c= game.input.keyboard.addKey(Phaser.Keyboard.C);
	k= game.input.keyboard.addKey(Phaser.Keyboard.K);
	l= game.input.keyboard.addKey(Phaser.Keyboard.L);

	// c is bullet for plane1
	// v is nuke for plane1
	// k is bullet for plane2
	// l is nuke for plane2

    var me = this;
 
    me.startTime = new Date();
    me.totalTime = 120;
    me.timeElapsed = 0;
 
    me.createTimer();
 
    me.gameTimer = game.time.events.loop(100, function()
    {

        me.updateTimer();
        if (minutes==0&&seconds==59) //&&timeoutflag==1) 
        {
            // console.log("time up");
            // game.state.start('gameState3');
            // timeoutflag=0;
        }
    });

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
    game.physics.arcade.overlap(plane1, bullet2.bullets, hit_1, null , this);
    game.physics.arcade.overlap(plane2, bullet1.bullets, hit_2, null , this);

	// game.physics.arcade.overlap(plane1, plane2, hit_1, null , this);

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

    		// console.log("Count = "+count);



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

    		// console.log("Count = "+count);



    if (plane2.y <30)
    {
    	game.physics.arcade.velocityFromAngle(plane2.angle, 100, plane2.body.velocity);
    	plane2.y = plane2.y + 10;
    }    

    //////////////////////////////////////////////////////////////////

    // game.debug.bodyInfo(plane1, 32, 32);

    // game.debug.body(plane1);
    // game.debug.body(ground);

    //  game.debug.bodyInfo(healthBar_2, 100, 100);

    // game.debug.body(healthBar_2);
    ratio1=1- (1400-healthBar_1.width)/1400;
    ratio2= (1800-healthBar_2.width)/400;
    // console.log("r1= "+ratio1);
    // console.log("r2= "+ratio2);
    // ratio1= healthBar_1.width/healthBar_2.width;
    // console.log("ratio= "+ratio1);


    // REMEMBER TO UNCOMMENT LATER
    if(minutes == 0 && seconds <= 0)
    {

        if(ratio1 > ratio2)
            player1= 1;

        else
            player2= 1;

        game.state.start('gameState1');
    }

    game.world.setBounds(0, 0, 1366, 768);
    game.world.wrap(plane1, 0, true);
    game.world.wrap(plane2, 0, true);

}

function hit_1(plane1, bullet2)
{
    // console.log("In hit1");

    bullet2.kill();
    healthBar_1.width-= 10;

    // console.log("Healthbar1: ",healthBar_1.width);

    if(healthBar_1.width <= 0)
    {
        player2 = 1;
        game.state.start('gameState1');
        console.log("game over player 2 wins");  
    }
}

function hit_2(plane2, bullet1)
{
    console.log("In hit2");

    bullet1.kill();
    healthBar_2.width+= 2.8;

    console.log("Healthbar2: ",healthBar_2.width);

    if(healthBar_2.width >= 1800)
    {
        player1 = 1;
        game.state.start('gameState1');
         console.log("game over player 1 wins"); 
    }
}

function touch_ground_1()
{
    // plane_flying.pause();

	// console.log("touched");
	plane1.body.velocity.x = 0;
	plane1.body.velocity.y = -15;

	if (plane1.y>720) 
	{
		plane1.y = 719;
	}

}

function touch_ground_2()
{
    // plane_flying.pause();

	// console.log("touched");
	plane2.body.velocity.x = 0;
	plane2.body.velocity.y = -15;

	if (plane2.y>720) 
	{
		plane2.y = 719;
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
