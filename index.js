
var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use(express.static('.')); 
 
app.get("/", function(req, res){
   res.redirect('index.html');
});

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});
var Grass = require("./class");
var Rain = require("./Rain");
var GrassEater = require("./GrassEater");
var Predator = require("./Predator")
var Arrow = require("./Arrow")




var matrix = [
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

const grassArr = [];
const grassEaterArr = [];
const predatorArr = [];
const rainArr = [];
const arrowArr = [];

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
          else if (matrix[y][x] == 4) {
              rainArr.push(new Rain(x, y, 4));
          }
          else if (matrix[y][x] == 5) {
              arrowArr.push(new Arrow(x, y, 5));
          }
      }
  }
  console.log(grassArr[0].chooseCell(0));
  io.sockets.emit('send matrix', matrix);
}


io.on("connection",function(socket){
   createObj(matrix)
})
