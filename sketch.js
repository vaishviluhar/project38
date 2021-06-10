//Create variables here
var database;
var dog, happyDog, sadDog;
var foodObj;
var foodS, foodStock;
var fedTime, lastFed, feed;
var addFood;
var feedDog;
var bedroom, garden, washroom, livingroom;
var milkBottle2;
var writeStock;
var milkImg
var gameState

function preload() {
  //load images here
  sadDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png")
  bedroom = loadImage("images/Bed Room.png")
  garden = loadImage("images/Garden.png")
  washroom = loadImage("images/Wash Room.png")
  livingroom = loadImage("images/Living Room.png")
  milkImg = loadImage("images/milk.png");

}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  foodObj = new Food();


  
  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;
  
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  foodStock.set(20);
  
  milkBottle1 = createSprite(140,435,10,10);
  milkBottle1.addImage("m",milkImg);
  milkBottle1.scale = 0.025;
  
  milkBottle2 = createSprite(210,280,10,10);
  milkBottle2.addImage("a",milkImg);
  milkBottle2.scale = 0.025;
  milkBottle2.visible = false;
  
  // feed = createButton("Feed the dog");
  // feed.position(700,95);
  // feed.mousePressed(feedDog);
  
  // addFood = createButton("Add Food");
  // addFood.position(800,95);
  // addFood.mousePressed(addFoods)
  
}


function draw() {
  background(46, 139, 87);
  foodObj.display();
  writeStock(foodS);
  //add styles here
  
  if (foodS === 0) {
    dog.addImage(happyDog);
    milkBottle2.visible = false;
  }
  else {
    dog.addImage(sadDog);
    milkBottle2.visible = true;
  }

  var readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  })

  if (gameState === 1) {
    dog.addImage(happyDog);
    dog.scale = 0.175;
    dog.y = 250;
  }
  if (gameState === 2) {
    dog.addImage(sadDog);
    dog.scale = 0.175;
    milkBottle2.visible = false;
    dog.y = 250;
  }

  var Bath=createButton("I want to take bath");
  Bath.position(580,125);
  if(Bath.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===3){
    dog.addImage(washroom);
    dog.scale=1;
    milkBottle2.visible=false;
  }

  var Sleep=createButton("I am very sleepy");
  Sleep.position(710,125);
  if(Sleep.mousePressed(function(){
    gameState=4;
    database.ref('/').update({'gameState':gameState});
  }));

  if(gameState===4){
    dog.addImage(bedroom);
    dog.scale=1;
    milkBottle2.visible=false;
  }

  var Play=createButton("Lets play !");
  Play.position(500,160);
  if(Play.mousePressed(function(){
    gameState=5;
    database.ref('/').update({'gameState':gameState});
  }));

  if(gameState===5){
    dog.addImage(livingroom);
    dog.scale=1;
    milkBottle2.visible=false;
  }

  var PlayInGarden=createButton("Lets play in park");
  PlayInGarden.position(585,160);
  if(PlayInGarden.mousePressed(function(){
    gameState=6;
    database.ref('/').update({'gameState':gameState});
  }));

  if(gameState===6){
    dog.y=175;
    dog.addImage(garden);
    dog.scale=1;
    milkBottle2.visible=false;
  }

  drawSprites();
  textSize(17);
  fill("black");
  text("Milk Bottles Remaining  "+foodS,200,200);
}

  // currentTime = hour();
  // if (currentTime == (lastFed + 1)) {
  //   update("Playing");
  //   foodObj.garden();

  // } else if (currentTime == (lastFed + 2)) {
  //   update("sleeping");
  //   foodObj.badroom();
  // } else if (currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)) {
  //   update("Bathing");
  //   foodObj.wahroom();
  // } else {
  //   update("hungry");
  //   foodObj.display();
  // }

  // if (gameState !== "Hungry") {

  //   feed.hide();
  //   addFood.hide();
  //   dog.remove();
  // } else {
  //   feed.show();
  //   addFood.show();
  //   dog.addImage(sadDog)
  // }



  // fedTime = database.ref('FeedTime');
  // fedTime.on("value", function (data) {
  //   lastFed = data.val();
  // })

 
 

 


  // fill(255, 255, 254);
  // textSize(15);
  // if (lastFed >= 12) {
  //   text("Last Feed:" + lastFed % 12 + "PM", 350, 30)
  // }
  // else if (lastFed === 0) {
  //   text("Last Feed: 12AM", 350, 30)
  // }
  // else {
  //   text("Last Feed:" + lastFed + "AM", 350, 30)
  // }

 

function readStock(data) {
  foodS = data.val();
  //foodObj.updateFoodStock(foodS);
}

function writeStock(x) {
  database.ref('/').update({
    food: x
  })

}

// function feedDog() {
//   dog.addImage(happyDog);

//   foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
//   database.ref('/').update({
//     Food: foodObj.getFoodStock(),
//     FeedTime: hour(),
//   })
// }

// function addFoods() {
//   foodS++;
//   database.ref('/').update({
//     Food: foodS
//   })
// }

// function update(state) {
//   database.ref('/').update({
//     gameState: state
//   })

// }


//ERRORS
//var gameState/
//sprites for milkbottle1&2
//read gamestate error
//database values
