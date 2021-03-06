var trex, trex_run, ground, ground_img, ground2, score=0;
var cloud, cloud_img, cactus, c1, c2, c3, c4, c5, c6;
var cgroup, cagroup, play=1, end=7, gamestate = play ;
var trex_collided,gameover,restart,gameoveri,restarti,hs=0;
var point, jump, die;

function preload(){
  
  trex_run = loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_img = loadImage("ground2.png");
  cloud_img = loadImage("cloud.png");
  c1 = loadImage("obstacle1.png");
  c2 = loadImage("obstacle2.png");
  c3 = loadImage("obstacle3.png");
  c4 = loadImage("obstacle4.png");
  c5 = loadImage("obstacle5.png");
  c6 = loadImage("obstacle6.png");
  trex_collided = loadAnimation("trex_collided.png");
  gameoveri = loadImage("gameOver.png");
  restarti = loadImage("restart.png");
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  point = loadSound("checkPoint.mp3");
  
}
function setup(){
  
  createCanvas(600,200);
  
  trex = createSprite(50,132,10,10);
  trex.addAnimation("run",trex_run);
  trex.scale = 0.6;
  trex.addAnimation("dead",trex_collided);
  trex.debug=true;
  
  ground = createSprite(300,160,600,20);
  ground.addImage(ground_img);
  
  ground2 = createSprite(100,175,150,5);
  ground2.visible = false;
  
  cgroup = new Group();
  cagroup = new Group();
  
  gameover = createSprite(300,100,10,10);
  gameover.addImage(gameoveri);
  gameover.scale = 0.7;
  
  restart = createSprite(300,100,10,10);
  restart.addImage(restarti);
  restart.scale = 0.5;
  
}

function draw(){
  
  background("skyblue");
  
  if (hs<score){
    
    hs=score;
  }
  else{
   
    hs=hs;
  }
  
  if (gamestate===play) {
   
    gameover.visible=false;
    restart.visible=false;
    
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(2+ Math.round(score/300));

     if (score>0 && score%100===0) {
       
       point.play();
     }
     if (ground.x<0) {
    ground.x = ground.width/2;
  }
     if (keyDown("space") && trex.y>144) {
    trex.velocityY = -10;
    jump.play();
    }
  trex.velocityY = trex.velocityY + 0.3;
  
  spawnClouds();
  
  spawnCactus();
  
    if (trex.isTouching(cagroup)) {
      
      gamestate=end;
      die.play();
    }
   }
  
  if (gamestate===end) {
    
    ground.velocityX = 0;
    cagroup.setVelocityXEach(0);
    cgroup.setVelocityXEach(0);
    cagroup.setLifetimeEach(-1);
    cgroup.setLifetimeEach(-1);
    trex.changeAnimation("dead",trex_collided);
    gameover.visible=true;
    restart.visible=true;
    trex.velocityY=0;
    if (mousePressedOver(restart)) {
      
      reset();
    }
    
  }
  
  fill(0);
  stroke(4);
  text("Score:"+ score,500,20);
  text("Highscore:"+hs,380,20);
  
  trex.collide(ground2);
  
  drawSprites();
}

function reset()  {
  
  gamestate = play;
  score = 0;
  trex.changeAnimation("run",trex_run);
  cgroup.destroyEach();
  cagroup.destroyEach();
}


function spawnClouds(){
  
  if (frameCount%100===0) {
    
  cloud = createSprite(600,Math.round(random(15,80)),10,10);
  cloud.velocityX = -3;
  cloud.addImage(cloud_img);
  cloud.scale = 0.6;
    
  cloud.depth = trex.depth ;
  trex.depth = trex.depth + 1 ;
  cloud.lifetime = 222;
  cgroup.add(cloud);
  }
}

function spawnCactus(){
  
 if (frameCount%200===0){
  
  cactus = createSprite(600,140,10,10);
  cactus.velocityX = ground.velocityX;
  cactus.scale = 0.5;
  cactus.lifetime = 300;
  var a = Math.round(random(1,6));
  switch(a) {
    case 1: cactus.addImage(c1);
    break;
    case 2: cactus.addImage(c2);
    break;
    case 3: cactus.addImage(c3);
    break;
    case 4: cactus.addImage(c4);
    break;
    case 5: cactus.addImage(c5);
    break;
    case 6: cactus.addImage(c6);
    break;
  default: break;
  
  }
  cagroup.add(cactus);
 }
}
