var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000);

var Grass = require("./class");
var Rain = require("./Rain");
var GrassEater = require("./GrassEater");
var Predator = require("./Predator")
var Arrow = require("./Arrow")




 matrix = [
   [0, 0, 1, 4, 2, 4, 0, 1, 0, 4, 2, 4, 1, 0, 2, 4, 0, 1, 0, 4, 1,0,1,2,1],
   [0, 0, 1, 4, 2, 4, 0, 1, 0, 4, 2, 4, 1, 0, 2, 4, 0, 1, 0, 4, 1,1,0,1,0],
   [0, 0, 1, 4, 2, 4, 0, 1, 0, 4, 2, 4, 1, 0, 2, 4, 0, 1, 0, 4, 1,1,1,0,2],
   [1, 0, 2, 0, 4, 1, 0, 1, 2, 1, 2, 2, 1, 4, 2, 0, 4, 1, 0, 1, 0,0,0,1,1],
   [0, 1, 4, 3, 2, 0, 2, 3, 0, 1, 1, 2, 1, 3, 4, 1, 0, 1, 0, 0, 1,1,2,1,1],
   [3, 0, 1, 4, 1, 2, 4, 1, 1, 2, 3, 0, 1, 3, 2, 0, 4, 1, 0, 4, 0,1,3,1,1],
   [1, 1, 3, 2, 4, 1, 0, 1, 0, 0, 3, 1, 4, 3, 0, 4, 0, 1, 4, 2, 0,1,0,1,1],
   [2, 1, 1, 1, 2, 0, 1, 0, 2, 2, 1, 1, 0, 2, 2, 1, 0, 0, 2, 0, 1,1,1,1,1],
   [1, 0, 2, 1, 4, 1, 2, 1, 2, 0, 1, 1, 4, 2, 0, 1, 0, 1, 0, 2, 0,2,0,1,1],
   [0, 1, 0, 4, 2, 0, 1, 3, 4, 1, 3, 1, 0, 2, 4, 1, 0, 1, 0, 1, 0,1,0,1,1],
   [3, 0, 4, 0, 2, 1, 0, 1, 1, 0, 2, 1, 3, 2, 0, 1, 4, 1, 3, 0, 1,1,0,1,1],
   [1, 1, 0, 2, 4, 1, 3, 1, 0, 1, 0, 2, 4, 2, 4, 1, 2, 1, 0, 2, 0,1,0,1,1],
   [2, 1, 4, 0, 2, 2, 1, 0, 2, 0, 1, 1, 0, 2, 0, 1, 0, 1, 3, 0, 1,1,1,1,0],
   [0, 4, 1, 4, 2, 4, 3, 1, 0, 2, 1, 0, 1, 0, 2, 0, 2, 0, 2, 0, 2,2,1,0,0],
   [1, 0, 2, 2, 4, 1, 2, 1, 4, 0, 2, 0, 1, 2, 2, 0, 4, 1, 3, 0, 0,2,1,0,1],
   [2, 1, 3, 4, 2, 0, 2, 1, 2, 1, 2, 4, 1, 0, 2, 1, 1, 2, 0, 4, 2,0,0,0,1],
   [3, 4, 1, 0, 1, 4, 2, 1, 1, 1, 1, 2, 1, 0, 2, 4, 1, 2, 0, 0, 2,0,2,1,0],
   [1, 1, 4, 2, 0, 1, 4, 1, 4, 2, 1, 2, 0, 2, 0, 1, 1, 1, 1, 4, 0,1,1,0,1],
   [2, 1, 0, 1, 2, 0, 1, 0, 2, 1, 3, 1, 0, 2, 0, 1, 4, 0, 1, 0, 2,1,1,2,1],
   [1, 0, 2, 1, 3, 1, 3, 2, 0, 2, 1, 1, 0, 2, 0, 1, 0, 1, 2, 2, 2,0,1,0,1],
   [0, 1, 4, 0, 2, 0, 1, 3, 0, 4, 1, 1, 0, 2, 4, 1, 3, 1, 3, 1, 1,2,0,2,1],
   [2, 0, 1, 1, 1, 2, 0, 1, 1, 2, 1, 1, 3, 2, 0, 1, 2, 0, 2, 0, 0,2,2,0,1],
   [1, 1, 3, 2, 1, 3, 0, 1, 0, 2, 1, 1, 2, 2, 1, 2, 0, 1, 2, 0, 1,4,0,0,1],
   [0, 1, 3, 3, 2, 2, 1, 2, 2, 1, 2, 1, 2, 2, 0, 1, 0, 1, 3, 0, 0,0,3,1,1],
   [1, 1, 3, 2, 1, 3, 0, 1, 0, 2, 1, 1, 2, 2, 0, 2, 0, 1, 2, 0, 1,4,0,0,1],
   [0, 1, 3, 3, 2, 2, 1, 2, 2, 1, 2, 1, 2, 2, 0, 1, 0, 1, 3, 0, 0,0,3,1,1],
   [0, 5, 2, 1, 5, 0, 1, 3, 2, 3, 5, 0, 1, 2, 3, 1, 5, 1, 2, 5, 3,5,0,0,1]
];

 grassArr = [];
 grassEaterArr = [];
 predatorArr = [];
 rainArr = [];
 arrowArr = [];

function createObj(matrix){
   for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
          if (matrix[y][x] == 1) {
              grassArr.push(new Grass(x, y, 1));
          }
          else if (matrix[y][x] == 2) {
              grassEaterArr.push(new GrassEater(x, y, 2));
          }
          else if (matrix[y][x] == 3) {
              predatorArr.push(new Predator(x, y, 3));
          }
        //   else if (matrix[y][x] == 4) {
        //       rainArr.push(new Rain(x, y, 4));
        //   }
        //   else if (matrix[y][x] == 5) {
        //       arrowArr.push(new Arrow(x, y, 5));
        //   }
      }
  }
  
  io.sockets.emit('send matrix', matrix);
}

function game(){
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat();
    }
    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].eat();

    }
    // for (let i = 0; i < rainArr.length; i++) {
    //     rainArr[i].eat();
        
    // }
    // for (let i = 0; i < arrowArr.length; i++) {
    //     arrowArr[i].eat();
    // }
}

setInterval(game,1000)

io.on("connection",function(socket){
   createObj(matrix)
})
