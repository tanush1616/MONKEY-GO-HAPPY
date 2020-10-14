var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  //createCanvas(600, 400);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  obstaclesGroup=createGroup();
  bananaGroup=createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.height,monkey.width);
  monkey.debug=true;
  
  SURVIVAL = 0;
  

  
}

function draw() {
  background(180);

   if(ground.x<0) {
    ground.x=ground.width/2;
  }
 
  if(keyDown("space")&& monkey.y>=161) {
      monkey.velocityY = -12;
    
  }
    
    monkey.velocityY = monkey.velocityY+0.8;
    
  monkey.collide(ground); 
  spawnbanana();
    spawnObstacles();
    
  drawSprites();
    stroke("white");
    textSize(20);
    fill("white");
  text("Score: "+ score, 500,50);   

     if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);
    }
   
    stroke("black");
    textSize(20);
    fill("black");
    SURVIVALTime=Math.ceil(frameCount/frameRate());
    text("SURVIVAL TIME: "+SURVIVALTime, 100,50);
    
   }




function spawnObstacles(){
   if (frameCount % 300 === 0){
   obstacle = createSprite(800,320,10,40);
   obstacle.velocityX = -6 
     
    obstacle.addImage(obstacleImage);
obstacle.scale = 0.15;
obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}

function spawnbanana() {

  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.velocityX = -5;
     banana.lifetime = 200;
    
    monkey.depth = banana.depth + 1;
      banana.addImage(bananaImage);
    
    banana.scale = 0.05;
  
    bananaGroup.add(banana);
  }
}

