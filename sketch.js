var bg,bgImg
var bob,bob_left,bob_right,bob_jump
var platform,platformImg,platformGroup
var coin,coinImg,coinGroup 
var laser,laserImg,laserGroup 
var rock,rockImg,rockGroup
var gem,gemImg,gemGroup
var gameState = "play"
var score = 0 
var life = 3 
var invisibleGroundTop,invisibleGroundBottom


function preload(){
bgImg = loadImage("assets/bg.png")
bob_right = loadAnimation("assets/boyright1.png","assets/boyright2.png","assets/boyright3.png","assets/boyright4.png")
bob_left = loadAnimation("assets/boyleft1.png","assets/boyleft2.png","assets/boyleft3.png","assets/boyleft4.png")
bob_jump = loadImage("assets/boyright1.png")
platformImg = loadImage("assets/platform.png")
coinImg = loadAnimation("assets/coin1.png","assets/coin2.png","assets/coin3.png","assets/coin4.png","assets/coin5.png","assets/coin6.png")
laserImg = loadImage("assets/lasered.png")
rockImg = loadImage("assets/rock.png")
gemImg = loadImage("assets/gem.png")
}

function setup(){
createCanvas(1920,960)
bg = createSprite(1920/2,960/2,1920,960)
bg.addImage(bgImg)
bob = createSprite(80,630,60,60)
bob.addAnimation("boyright",bob_right)
bob.addAnimation("boyleft",bob_left)
bob.addImage("bobjump", bob_jump)
bob.scale = 0.3
platformGroup = new Group()
coinGroup = new Group()
laserGroup = new Group()
rockGroup = new Group()
gemGroup = new Group()

invisibleGroundBottom = createSprite(10,680,30000,20)
invisibleGroundBottom.visible = false
}

function draw(){
background(0)
drawSprites()
bg.velocityX = -2
textSize(20)
fill(0)
strokeWeight(2)
stroke(0)
text("S C O R E :"+score,bob.x-150,bob.y)
text("L I F E :"+life,bob.x-150,bob.y+30)
if(gameState == "play"){
camera.position.x = bob.x
camera.position.y = bob.y
if(bob.position.y<=300){
   bob.position.y = 300
}
if(platformGroup.isTouching(bob)){
  bob.velocityY = 0
  bob.collide(platformGroup)
}
coinGroup.isTouching(bob,destroycoin)
gemGroup.isTouching(bob,destroygem)
rockGroup.isTouching(bob,destroyrock)
  if(keyDown("right")){
     bob.x+=5
     bob.changeImage("boyright")
  }

  if(keyDown("up")||keyDown("space")){
    bob.velocityY = -10
    bob.changeImage("bobjump")
  }
 bob.velocityY+=0.8
  if(bg.x<500){
      bg.x = 1000
    }
if(laserGroup.isTouching(bob) || score<0 || life<0){
  gameState = "end"
}
    
spawnplatforms()
spawngems()
spawnrocks()
spawnlaser()
}

if(gameState == "end"){
bob.destroy()
platformGroup.destroyEach()
coinGroup.destroyEach()
gemGroup.destroyEach()
laserGroup.destroyEach()
rockGroup.destroyEach()
bg.velocityX = 0
gameover()
}

bob.collide(invisibleGroundBottom)

}

function spawnplatforms(){
  if(frameCount%100 == 0 ){
   platform = createSprite(bob.x+300,300)
   platform.y = random(400,600)
   platform.addImage(platformImg)
   platform.scale = 0.5
   platform.velocityX = -2
   platform.lifetime = 1920/2
   bob.depth = platform.depth
   bob.depth+=1
   platformGroup.add(platform)
   
   coin = createSprite(platform.x,platform.y-100)
   coin.addAnimation("coin", coinImg)
   coin.scale = 0.03
   coin.lifetime = 1920/2
   coin.velocityX = -2
   coinGroup.add(coin)
  }
}

function spawngems(){
  if(frameCount%100 == 0){
    gem = createSprite(bob.x+600,random(400,600))
    gem.addImage(gemImg)
    gem.scale = 0.2
    gem.velocityX = -2 
    gem.lifetime = 1920/2 
    gemGroup.add(gem)
  }

}
function spawnrocks(){
  if(frameCount%300 == 0){
    rock = createSprite(bob.x+600,650)
    rock.addImage(rockImg)
    rock.scale = 0.2
    rock.velocityX = -2 
    rock.lifetime = 1920/2 
    rockGroup.add(rock)
  }
}

function spawnlaser(){
  if(frameCount%300 == 0){
    laser = createSprite(bob.x+600,random(400,600))
    laser.addImage(laserImg)
    laser.scale = 0.2
    laser.velocityX = -6 
    laser.lifetime = 1920/2 
    laserGroup.add(laser)
  }
}

function destroycoin(c){
c.destroy()
score+=5
}

function destroygem(g){
g.destroy()
score+=10
}

function destroyrock(r){
r.destroy()
score-=5
life-=1
}
 
function gameover(){
  swal({
    title:"Game Over!",
    text:"Thanks for playing",
    imageUrl:"assets/GameOver.png",
    imageSize:"150x150",
    confirmButtonText:"Play Again!"
  },
  function(isConfirm){
   if(isConfirm){
     location.reload()
   }
  }
  )
  
}