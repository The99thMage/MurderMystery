var database;

var game, gateState;
var player, playerCount;
var players;
var form;
var timer;

var charecterList, charecters;
var allPlayers;

var rolesAssigned;

function setup() {
  //create canvas
  createCanvas(displayWidth * 0.8, displayHeight * 0.65);

  //create database
  database = firebase.database();

  //set variables
  gameState = 0;
  timer = 10;
  players = [];
  charecterList = [];
  
  //create a new game
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  //draw background
  background(100,200,100);  

  //start the count down
  if(playerCount >= 3 && gameState === 0){
    game.countdown();
  }

  if(gameState === 1){
    game.play();
  }
}