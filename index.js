var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

season = 0;
exanak = 0;
pct=0;
pct1=0;

var Grass = require("./class");
var Rain = require("./Rain");
var GrassEater = require("./GrassEater");
var Predator = require("./Predator")
var Arrow = require("./Arrow");
var epredator = require('./epredator');
var mashrum = require('./mashrum');






matrix = [
    [9, 4, 0, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 4],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 3, 0, 0, 7, 0, 0, 7, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 2, 7, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 2, 0, 0, 0, 0, 1, 0],
    [0, 6, 1, 3, 1, 1, 7, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 2, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 6, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 7, 0, 0, 0, 0, 6, 0, 1, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 7, 0],
    [0, 0, 1, 0, 2, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 2, 3, 2, 2, 0, 7, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 2, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 7, 1, 0, 0, 0, 7, 0, 1, 0, 7, 0, 0, 0, 0, 0, 1, 7, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 7, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
];

grassArr = [];
grassEaterArr = [];
predatorArr = [];
epredatorArr = [];
rainArr = [];
arrowArr = [];
mashrumArr = []



function createObj(matrix) {
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
            else if (matrix[y][x] == 6) {
                epredatorArr.push(new epredator(x, y, 6));
            }
            else if (matrix[y][x] == 7) {
                mashrumArr.push(new mashrum(x, y, 7));
            }
            else if (matrix[y][x] == 4) {
                rainArr.push(new Rain(x, y, 4));
            }
            else if (matrix[y][x] == 5) {
                arrowArr.push(new Arrow(x, y, 5));
            }
        }
    }

    io.sockets.emit('send matrix', matrix);
}

function game() {



    // Spring
    if (season == 0) {
        mashrumArr = [];


    }
    // Summer
    if (season == 1) {
                for (let i = 0; i < rainArr.length; i++) {
                    matrix[rainArr[i].y][rainArr[i].x] = 0; 
                    rainArr[i].die();
                }

    }
    // Autumn
    if (season == 2) {


        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 7) {
                    mashrumArr.push(new mashrum(x, y, 7));
                }

            }

        }

    }
    //Winter
    if (season == 3) {

        for (let i = 0; i < grassEaterArr.length; i++) {
            
            matrix[grassEaterArr[i].y][grassEaterArr[i].x] = 0; 
            grassEaterArr[i].die();
        }

    }
      



    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat();
    }
    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].eat();

    } for (let i = 0; i < epredatorArr.length; i++) {
        epredatorArr[i].eat();

        for (let i = 0; i < mashrumArr.length; i++) {
            mashrumArr[i].destroy();

        }
    }
    for (let i = 0; i < rainArr.length; i++) {
        rainArr[i].eat();

    }
    for (let i = 0; i < arrowArr.length; i++) {
        arrowArr[i].eat();
    }

    io.sockets.emit('send matrix', matrix);
    io.sockets.emit('send stats', {
      grass: grassArr.length,
      grasseater: grassEaterArr.length,
      predator:predatorArr.length,
      epredator:epredatorArr.length,
      seasonNow: season,
      seasonChanged: exanak,  
    })
    fs.writeFileSync('stats.json', JSON.stringify({
        
            grass: grassArr.length,
            grasseater: grassEaterArr.length,
            predator:predatorArr.length,
            epredator:epredatorArr.length,
            seasonNow: season,
            seasonChanged: exanak,   
      }))
}
function toSpring() {
    if(season !=0){
        season = 0
        exanak++;
    }
}
function toSummer() {
    season = 1
}
function toAutumn() {
    season = 2
}
function toWinter() {
    season = 3;
}

setInterval(game, 500)

io.on("connection", function (socket) {
    createObj(matrix)
    socket.on('toSpring', toSpring);
    socket.on('toSummer', toSummer);
    socket.on('toAutumn', toAutumn);
    socket.on('toWinter', toWinter);
    
})
