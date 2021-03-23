var tower, towerImage;
var door,doorImage,doorsGroup;
var climber,climberImage,climbersGroup;
var ghost,ghostImage;
var invisibleBlock, invisibleBlockGroup;
var gamestate = "play";

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");

}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("background",towerImage);
  tower.velocityY = 1;
    
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImage);
  ghost.scale = 0.4;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}
function draw(){
  background("white");
  if(gamestate === "play"){
    if(tower.y > 400){
    tower.y = 300;
  }
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
  }
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY + 0.8;
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
    climbersGroup.velocityY = 0;
  }
  
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
    ghost.destroy();
    gamestate = "end";
  }
  spawnDoors();
  drawSprites();
  }
  if(gamestate === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("game over",230,250)
  }
}
function spawnDoors(){
  if(frameCount%240 == 0){
    door = createSprite(200,-50);
    door.addImage("door", doorImage);
    door.velocityY = 1;
    door.x = Math.round(random(120,400));
    ghost.depth = door.depth;
    ghost.depth +=1;
    door.lifetime = 800;
    doorsGroup.add(door);
    climber = createSprite(200,10);
    climber.addImage("climber", climberImage);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = climber.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.setCollider("rectangle",0,0,climber.width,1);
    invisibleBlock.debug = true;
    //invisibleBlock.visible = false;
    invisibleBlockGroup.add(invisibleBlock);
  }
}