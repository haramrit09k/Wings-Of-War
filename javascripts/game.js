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
var user1 = "";
var user2 = "";
var user;
var player;
var timeoutflag= 1;
var blast;
var u1t;
var u2t;
var bullet_fire;
var bullet_hit;
var plane1_takeoff= 0;
var plane2_takeoff= 0;
var nuke_status1= 0;
var nuke_status2= 0;
var nuke_drop;
var game_played_status_for_replay= 0;
var go_to_home;


//HOME PAGE
var gameState0 = function()
{

};

//LEADERBOARD
var gameState1 = function(){
    
};

//CUSTOMIZATION PAGE
var gameState2 = function(){
 
};

//MAIN GAME
var gameState3=function() {

};

//INSTRUCTIONS
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
    // console.log("timeDifference= "+timeDifference);
 
    //Time elapsed in seconds
    me.timeElapsed = Math.abs(timeDifference / 1000);
    // console.log("timeElapsed= "+me.timeElapsed);
 
    //Time remaining in seconds
    //var timeRemaining = me.totalTime - me.timeElapsed; 
    var timeRemaining = 150 - me.timeElapsed;
    // console.log("timeRemaining= "+timeRemaining);
 
    //Convert seconds into minutes and seconds
    minutes = Math.floor(timeRemaining / 60);
    // console.log("minutes= "+minutes);

    seconds = Math.floor(timeRemaining) - (60 * minutes);
    // console.log("seconds= "+seconds);

    //Display minutes, add a 0 to the start if less than 10
    var result = (minutes < 10) ? "0" + minutes : minutes; 
 
    //Display seconds, add a 0 to the start if less than 10
    result += (seconds < 10) ? ":0" + seconds : ":" + seconds;
 
    me.timeLabel.text = result;
    // console.log("result= "+result);
    }
};

gameState4.prototype={
    preload:preload4,
    create:create4,
    update:update4
};

game.state.add('gameState0',gameState0);     //home   
game.state.add('gameState1',gameState1);    // leaderboard    
game.state.add('gameState2',gameState2);        
game.state.add('gameState3',gameState3);     // main game
game.state.add('gameState4',gameState4);      //inst  

game.state.start('gameState0'); // CHANGE IT TO 0 LATER




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function preload0()
{
	game.load.image('back', 'assets/background/b2.jpg');
	game.load.image('logo', 'assets/background/logo1.png');
	game.load.image('battle_button', 'assets/buttons/battle5.png');
	game.load.image('inst_button', 'assets/buttons/instructions.png');
	game.load.image('leaderboard_button', 'assets/buttons/leaderboard.png');
	// game.load.image('inst_button', 'assets/buttons/instrctions.jpg');
	game.load.image('fullButton', 'assets/buttons/full.png');

};

function create0()
{
	while(user1== null ||user1=="")
	{
		user1  = prompt("Enter name of player 1");
		console.log(user1);
	}
	while (user2 == null ||user2=="")
	{
		console.log("1");
		user2  = prompt("Enter name of player 2");
		console.log(user2);
		while(user1==user2)
			user2  = prompt("Enter name of player 2");
			

		console.log("2");
	}
    	 
    
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

	home_background = game.add.sprite(0, 0, 'back');
	home_background.scale.setTo(1.9,1.6);

	logo = game.add.sprite(50, 60, 'logo');
	logo.scale.setTo(1,1);

	battle_button = game.add.button(1020, 400, 'battle_button', startgame, this, 2, 1, 0);
	battle_button.scale.setTo(0.5,0.5);
	battle_button = game.add.button(950, 500, 'inst_button', startinst, this, 2, 1, 0);
	battle_button.scale.setTo(0.5,0.5);
	battle_button = game.add.button(945, 600, 'leaderboard_button', startlead, this, 2, 1, 0);
	battle_button.scale.setTo(0.5,0.5);

	fullButton = game.add.button(1250, 20, 'fullButton', goFull, this, 2, 1, 0);
	fullButton.scale.setTo(0.1,0.1);


    

};

function startinst()
{
	game.state.start('gameState4');
}

function startlead()
{
	game.state.start('gameState1');
}

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
    game.load.image('leaderboard', 'assets/background/leaderboard.jpg');
    game.load.image('replay', 'assets/buttons/replay.png');
    game.load.image('home', 'assets/buttons/home.png');
};

function create1()
{
	// user1 = "akash";
    // user2 = "aarish";

    count= 0;


    var leaderboard_background = game.add.sprite(0, 0, 'leaderboard');
    leaderboard_background.scale.setTo(0.818,0.75);

    go_to_home = game.add.button(1160, 25, 'home', go_home, this, 2, 1, 0);
	go_to_home.scale.setTo(0.5,0.5);


    if(game_played_status_for_replay == 1)
    {
    	replay = game.add.button(1160, 650, 'replay', play_again, this, 2, 1, 0);
		replay.scale.setTo(0.5,0.5);
	}	
	
	game.add.text(800,100,"Leaderboard",{font: "Algerian" ,fontSize: '40px', fill:'#FFF'});
	game.add.text(800,250,"Player",{font: "Algerian" ,fontSize: '30px', fill:'#FFF'});
	game.add.text(1000,250,"Wins",{font: "Algerian" ,fontSize: '30px', fill:'#FFF'});
    
    if (player1==1) 
    {
        // game.add.text(800,100,"Player 1 Wins",{font: "Algerian" ,fontSize: '25px', fill:'#FFF'});
        user = user1;
        player = player1;
    }
    else
    {
        // game.add.text(800,100,"Player 2 Wins",{font: "Algerian" ,fontSize: '25px', fill:'#FFF'});
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
                                    return b.wins - a.wins;
                                });
                            console.log(response);  
                            while(response[counter]!=""&&counter<5){
                                game.add.text(800,counter*75+320,response[counter].user,{font: "Algerian" ,fontSize: '25px', fill:'#FFF'});
                                game.add.text(1020,counter*75+320,response[counter].wins,{font: "Algerian" ,fontSize: '25px', fill:'#FFF'});
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

        // game.add.text(600,150,"Total no. of wins = "+wins,{font: "Algerian" ,fontSize: '25px', fill:'#FFF'});

    
};

function update1()
{

};

function play_again()
{
	nuke_status1= 0;
	nuke_status2= 0;
	game.state.start("gameState0");
}

function go_home()
{
	game.state.start("gameState0");
}


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
    game.load.audio('bullet_fire', 'assets/audio/bullet_fire.mp3');
	game.load.audio('bullet_hit', 'assets/audio/bullet_hit.mp3');
	game.load.audio('nuke_drop', 'assets/audio/nuke.mp3');
    game.load.image('bullet', 'assets/fireball1.png');
    game.load.image('nuke', 'assets/nuke1.png');
    game.load.image('nukem', 'assets/nukem1.png');
    game.load.spritesheet('blast', 'assets/bullet_hit.png',512,512);
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

    game_played_status_for_replay= 1;

	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 100;

	//Plane Audio
    plane_flying = game.add.audio('plane_flying', 1, true);
    plane_flying1 = game.add.audio('plane_flying', 1, true);
    bullet_hit = game.add.audio('bullet_hit', 1, true);
	bullet_fire = game.add.audio('bullet_fire', 1, true);
	nuke_drop = game.add.audio('nuke_drop', 1, true);
	// plane_flying.addMarker('plane_flying', 0, 2);
	

	sky = game.add.sprite(0, 0, 'sky');
	sky.scale.setTo(3.2,3.2);

    bmd_1 = game.add.bitmapData(1400,40);
    bmd_1.ctx.beginPath();
    bmd_1.ctx.rect(0,0,300,40);
    bmd_1.ctx.fillStyle = 'black';
    bmd_1.ctx.fill();

    // user1 = "akash";
    // user2 = "aarish";

    u1t = game.add.text(50,25,user1,{ font:'25px Algerian', fill: '#fff'});
    u1t.anchor.setTo(0,0);
    healthBar_1 = game.add.sprite(0,0,bmd_1);
    healthBar_1.anchor.y = 0.5;

    // console.log(game.world.width);

    bmd_2 = game.add.bitmapData(1400,40);
    bmd_2.ctx.beginPath();
    bmd_2.ctx.rect(1066,0,300,40);
    bmd_2.ctx.fillStyle = 'black';
    bmd_2.ctx.fill();

    u2t = game.add.text(1310,25,user2,{ font:'25px Algerian', fill: '#fff'});
    u2t.anchor.setTo(0.99,0);
    healthBar_2 = game.add.sprite(0,0,bmd_2);
    healthBar_2.anchor.y = 0.5;

	plane1 = game.add.sprite(25, 702, 'plane1');
	plane2 = game.add.sprite(game.world.width-100, 702, 'plane2');  //Aarish 
	plane1.scale.setTo(0.15,0.15);
	plane2.scale.setTo(0.15,0.15);  //Aarish
    // plane1.anchor.setTo(0.5, 0.5);
	// plane2.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(plane1);
	plane1.enableBody=true;
    plane1.body.bounce.y = 0;
    // plane1.body.gravity.y = 10;
    // plane1.body.collideWorldBounds = true;

	game.physics.arcade.enable(plane2);
	plane2.enableBody=true;
    plane2.body.bounce.y = 0;
   	// plane2.body.gravity.y = 10;

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
    //  The bullet will be automatically killed when it leaves the world bounds
    bullet1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    //  Because our bullet is drawn facing up, we need to offset its rotation:
    bullet1.bulletAngleOffset = 0;
    //  The speed at which the bullet is fired
    bullet1.bulletSpeed = 1400;
    bullet1.trackSprite(plane1, 55, 18, true);
    

    bullet2 = game.add.weapon(1, 'bullet');
    //  The bullet will be automatically killed when it leaves the world bounds
    bullet2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    //  Because our bullet is drawn facing up, we need to offset its rotation:
    bullet2.bulletAngleOffset = 0;
    //  The speed at which the bullet is fired
    bullet2.bulletSpeed = -1400;
    bullet2.trackSprite(plane2, 0, 18, true);
    nuke1 = game.add.weapon(1, 'nuke');
    nuke1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    nuke1.bulletAngleOffset = 0;
    // nuke1.bulletSpeed = 1500;
    // nuke1.bulletGravity= 1000;
    // nuke1.body.gravity.y = 1000;
    nuke1.bulletSpeed = 1500;
    nuke1.trackSprite(plane1, 50, 18, true);

    // nuke1.scale.setTo(0.15,0.15);

    nuke2 = game.add.weapon(1, 'nukem');
    nuke2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    nuke2.bulletAngleOffset = 0;
    nuke2.bulletSpeed = -1500;
    nuke2.trackSprite(plane2, -25, 18, true);

    // nuke2.scale.setTo(0.15,0.15);

    // weapon.bullets.setAll('body.gravity.y', 200);

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
        if (minutes<0) //&&timeoutflag==1) 
        {
            console.log("time up");
            game.state.start('gameState1');
            plane_flying.stop();
			plane_flying1.stop();
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
        bullet_fire.play('', 0, 1, false);
    }

    if (v.isDown && nuke_status1 == 0 && (minutes ==0  || seconds < 20)) 
    {
        nuke1.fire();
        nuke_status1= 1;
        nuke_drop.play('', 0, 1, false);
        // bullet_fire.play('', 0, 1, false);
    }

    if (k.isDown) 
    {
        bullet2.fire();
        bullet_fire.play('', 0, 1, false);
    }

    if (l.isDown && nuke_status2 == 0 && (minutes ==0  || seconds < 20)) 
    {
        nuke2.fire();
        nuke_status2= 1;
        nuke_drop.play('', 0, 1, false);
        console.log("In here");
        // bullet_fire.play('', 0, 1, false);
    }

	game.physics.arcade.overlap(plane1, ground, touch_ground_1, null, this);
	game.physics.arcade.overlap(plane2, ground, touch_ground_2, null, this);    
    game.physics.arcade.overlap(plane1, bullet2.bullets, hit_1, null , this);
    game.physics.arcade.overlap(plane2, bullet1.bullets, hit_2, null , this);
    game.physics.arcade.overlap(plane1, nuke2.bullets, hit_nuke_1, null , this);
    game.physics.arcade.overlap(plane2, nuke1.bullets, hit_nuke_2, null , this);

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
    		plane_flying1.play('', 0, 1, true);
    		count++;
    	}
    	else {
        plane_flying1.resume();
    	}
    }
    else
    {
    	plane_flying1.pause();
    }

    		// console.log("Count = "+count);

    if (plane1.y <30)
    {
    	// count++;
    	game.physics.arcade.velocityFromAngle(plane1.angle, 300, plane1.body.velocity);
    	// console.log(game.physics.arcade.velocityFromAngle);
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
        plane_flying.stop();
	plane_flying1.stop();
    }

    game.world.setBounds(0, 0, 1366, 768);
    game.world.wrap(plane1, 0, true);
    game.world.wrap(plane2, 0, true);

    console.log(plane1.angle);
    // console.log(plane2.angle);

}

function hit_1(plane1, bullet2)
{
    bullet_hit.play('', 0, 1, false);
    // console.log("In hit1");
    blast = game.add.sprite(plane1.x,plane1.y,'blast');
    blast.scale.setTo(0.05,0.05);
    blast.animations.add('blastHim',[0,1,2,3,4,5,6,7,8],100,false);
    blast.animations.play('blastHim');
    setTimeout(function(){ 
        blast.scale.setTo(0.00000005,0.00000005);
        blast.visible=false;
     },5);

    bullet2.kill();
    healthBar_1.width-= 60;

    // console.log("Healthbar1: ",healthBar_1.width);

    if(healthBar_1.width <= 0)
    {
        player2 = 1;
        game.state.start('gameState1');
        plane_flying.stop();
	plane_flying1.stop();
        console.log("game over player 2 wins");  
    }
}

function hit_2(plane2, bullet1)
{
    bullet_hit.play('', 0, 1, false);
    console.log("In hit2");
    blast = game.add.sprite(plane2.x,plane2.y,'blast');
    blast.scale.setTo(0.05,0.05);
    blast.animations.add('blastHim',[0,1,2,3,4,5,6,7,8],100,false);
    blast.animations.play('blastHim');
    setTimeout(function(){ 
        blast.scale.setTo(0.00000005,0.00000005);
        blast.visible=false;
     },5);

    bullet1.kill();
    healthBar_2.width+=16.8;

    console.log("Healthbar2: ",healthBar_2.width);

    if(healthBar_2.width >= 1800)
    {
        player1 = 1;
        game.state.start('gameState1');
        plane_flying.stop();
	plane_flying1.stop();
         console.log("game over player 1 wins"); 
    }
}

function hit_nuke_1(plane1, nuke2)
{
    // bullet_hit.play('', 0, 1, false);
    // console.log("In hit1");
    // blast = game.add.sprite(plane1.x,plane1.y,'blast');
    // blast.scale.setTo(0.05,0.05);
    // blast.animations.add('blastHim',[0,1,2,3,4,5,6,7,8],100,false);
    // blast.animations.play('blastHim');
    // setTimeout(function(){ 
    //     blast.scale.setTo(0.00000005,0.00000005);
    //     blast.visible=false;
    //  },5);

    nuke2.kill();
    nuke_drop.stop();
    healthBar_1.width= 0;

    player2 = 1;
    game.state.start('gameState1');
    plane_flying.stop();
	plane_flying1.stop();
    console.log("game over player 2 wins");

    // console.log("Healthbar1: ",healthBar_1.width);
}

function hit_nuke_2(plane2, nuke1)
{
    // bullet_hit.play('', 0, 1, false);
    // console.log("In hit1");
    // blast = game.add.sprite(plane1.x,plane1.y,'blast');
    // blast.scale.setTo(0.05,0.05);
    // blast.animations.add('blastHim',[0,1,2,3,4,5,6,7,8],100,false);
    // blast.animations.play('blastHim');
    // setTimeout(function(){ 
    //     blast.scale.setTo(0.00000005,0.00000005);
    //     blast.visible=false;
    //  },5);

    nuke1.kill();
    healthBar_2.width= 0;
	nuke_drop.stop();
    player1 = 1;
    game.state.start('gameState1');
    plane_flying.stop();
	plane_flying1.stop();
    console.log("game over player 1 wins");

    // console.log("Healthbar1: ",healthBar_1.width);
}

function touch_ground_1()
{
    // plane_flying.pause();
    if (plane1.angle>-10&&plane1.angle<15) 
    {
        plane1.angle = 0;
        plane1.body.velocity.x = 0;
        plane1.body.velocity.y = -15;

        if (plane1.y>720) 
        {
            plane1.y = 719;
        }
    }
    else{

            player2 = 1;
            game.state.start('gameState1');
            plane_flying.stop();
	plane_flying1.stop();
    
    }
	// console.log("touched");
	

}

function touch_ground_2()
{
    // plane_flying.pause();

	// console.log("touched");
    if (plane2.angle>-10&&plane2.angle<15) 
    {
        plane2.angle = 0;
        plane2.body.velocity.x = 0;
        plane2.body.velocity.y = -15;

        if (plane2.y>720) 
        {
            plane2.y = 719;
        }
    }
    else{

            player1 = 1;
            game.state.start('gameState1');
            plane_flying.stop();
	plane_flying1.stop();
    
    }

	

	

}

function goFull() {

    if (game.scale.isFullScreen){
            game.scale.stopFullScreen();
    }
    
    else{    
        game.scale.startFullScreen(false);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function preload4()
{
    game.load.image("background", "assets/background/instr_bg.jpg");
    game.load.image("movement1", "assets/instructions/wasd.png");
    game.load.image("movement2", "assets/instructions/arrow.png");
    game.load.image("c", "assets/instructions/c.png");
    game.load.image("v", "assets/instructions/v.png");
    game.load.image("k", "assets/instructions/k.png");
    game.load.image("l", "assets/instructions/l.png");
    game.load.image('home', 'assets/buttons/home.png');
};

function create4()
{

    var bg = game.add.sprite(0,0,'background');
    bg.scale.setTo(0.7,0.75);

    go_to_home = game.add.button(1160, 25, 'home', go_home, this, 2, 1, 0);
	go_to_home.scale.setTo(0.5,0.5);

    var movement1 = game.add.sprite(400,200,'movement1');
    movement1.scale.setTo(0.6,0.6);

    var movement2 = game.add.sprite(720,200,'movement2');
    movement2.scale.setTo(0.5,0.5);

    var c = game.add.sprite(450,400,'c');
    c.scale.setTo(0.1,0.1);

    var v = game.add.sprite(450,550,'v');
    v.scale.setTo(0.1,0.1);

    var k = game.add.sprite(780,400,'k');
    k.scale.setTo(0.1,0.1);

    var l = game.add.sprite(780,550,'l');
    l.scale.setTo(0.1,0.1);


    // game.stage.backgroundColor = "#4488AA";   //Setting solid background color
    var text2 = game.add.text(game.world.width/2-150,0,'INSTRUCTIONS\n',{font:'bold 48px Impact', fill: '#000', boundsAlignH: "center", boundsAlignV: "middle"  });
        
    var text3 = game.add.text(450,100,'Player 1\n',{ font:'28px Impact', fill: '#000'});
    var text4 = game.add.text(750,100,'Player 2\n',{ font:'28px Impact', fill: '#000'});

    text2 = game.add.text(200,250,'Movement\n',{ font:'28px Impact', fill: '#000'})
    text2 = game.add.text(200,400,'Bullets\n',{ font:'28px Impact', fill: '#000'})
    text2 = game.add.text(200,550,'Nuke\n',{ font:'28px Impact', fill: '#000'})
    // text3.anchor.setTo(0.5,0.5);


};

function update4()
{

};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
