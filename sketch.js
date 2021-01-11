var start = 3;
var PLAY = 1;
var END = 0;
 var pap;
var gameState = PLAY;
var highscore;
var count;
var death;
var bombs;

var trex, trex_running, trex_collided,trexu,paps;
var ground, invisibleGround, groundImage;
var bran;
var cloudsGroup, cloudImage;
var obstaclesGroup,grow, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var jumpSound , checkPointSound, dieSound;
var portal,port;

var score=0;

var gameOver, restart;
var lol;

localStorage["HighestScore"] = 0;

function preload(){
  trex_running = loadAnimation("trexi.png","trexii.png","trexiii.png");
  trex_collided = loadAnimation("trex_collided.png");
  bran = loadImage("abc.png");
  trexu = loadImage("trex.png");
  pap = loadImage("play.png");
  port = loadImage("portal.png");
  bombs = loadImage("bomb-min.png");
  groundImage = loadImage("ground2.png");
  
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
   jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(displayWidth, displayHeight-243);
  death=0
  trex = createSprite(50,displayHeight-290,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.addAnimation("hi", trexu);
 
  trex.scale = 0.10;
//trex.debug = true;
  
  
  ground = createSprite(displayWidth,displayHeight-300,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
 restart.scale = 0.5
  paps = createSprite(300,140);
  paps.addImage(pap);
  paps.scale = 0.5;
 
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,displayHeight-290,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
    grow = new Group();
lol= new Group();
  
  
  
  score = 0;
highscore = 0;
 
   trex.setCollider("rectangle",0,0,250,250);
  
  count = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
 
  
  
  
 if(score>400){
   bid();
   background("grey");
   
 }
  if(score>500){
    bid()
  }
  fill("lightgreen")
  text("Score: "+ score, 500,50);
  text ("HIGHSCORE: "+ highscore,100,50);
  text("DEATHS xD : " + death,250,50)
 
  
  
  
if (lol.isTouching(ground)){
lol.setVelocityXEach(-7)
  lol.setVelocityYEach(0)
      }
  
  
    if (mousePressedOver(paps)){
      gameState = PLAY;
      
     paps.visible= false;
      paps.x = 1000000000000000;
      obstaclesGroup.destroyEach();
      reset();
      death = 0 ;
      highscore = 0;
      
      
      
    }
  
    if (gameState===PLAY){
    if(frameCount % 5 === 0){
      count = count + 1
    }
     if (keyDown(DOWN_ARROW)){
      trex.changeAnimation("hi",trexu);
      trex.setCollider("rectangle",0,0,87,50);
    }
    if(keyWentUp(DOWN_ARROW)){
      trex.changeAnimation("running", trex_running);
       trex.setCollider("rectangle",0,0,550,550);
      
    }
      
    score = count
    ground.velocityX = -(6 + 3*score/200)
   if((touches.length > 0 || keyDown("SPACE")) && trex.y  >= height-120 && ground.isTouching (trex)  ) {
      jumpSound.play()
      trex.velocityY = -12.7;
                 trex.setCollider("rectangle",0,0,550,550);
         
       touches = [];
    }
     if(score % 100 ==0 && score>0 ){
      checkPointSound.play();
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
   // bid();
      bom();
  if(lol.isTouching(trex)){
    obstaclesGroup.destroyEach();
    grow.destroyEach();
    lol.destroyEach();
    
  }
    if(obstaclesGroup.isTouching(trex)|| grow.isTouching(trex)){
       gameState = END;
      death = death + 1;
      dieSound.play()
    }
    
      
  }
 if (gameState === END) {
    
    restart.visible = true;
   restart.scale = 0.25;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
  grow.setVelocityXEach(0);
    grow.setRotationSpeedEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    grow.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
      if(highscore<score){
        highscore=score
         }
    }
  }
  
  
 
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(displayWidth,displayHeight-543,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 700;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(displayWidth,displayHeight-315,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/200);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 400;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  grow.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  count= 0;
  
}
function bid(){

    if (frameCount % 99 === 0){
      var bird = createSprite(displayWidth,displayHeight-325,20,20);
   
      bird.velocityX=-(6 + 3*score/200);
      bird.addAnimation("lol",bran)
      bird.scale=0.19;
      bird.rotationSpeed=-30;
     // bird.debug=true;
      bird.lifetime=900
      
      
       grow.add(bird)
    }
 
    
}
function bom (){
  if (score>600){
    if(frameCount%599==0){
      var bomb = createSprite(displayWidth-100,displayHeight-390 )
     
      bomb.debug = true
      
                          
      bomb.velocityY=0
      bomb.velocityX=-5
      bomb.addImage("no",bombs);
      bomb.scale = 0.02
     
      lol.add(bomb);
      
      bomb.setCollider("rectangle",0,0,200,300)
      
                       
    }
  }
}