var socket = io();
var side = 20;
var stats = {}

function setup() {
    frameRate(5);
    createCanvas(500, 500);

}

document.getElementById("season").innerText = "Spring";

function update(matrix) {

      for (let y = 0; y < matrix.length; y++) {

        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("grey")
            }
            else if (matrix[y][x] == 1) {
                fill("green")
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill(" blue");
            } else if (matrix[y][x] == 6) {
                fill("pink");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            else if (matrix[y][x] == 7) {
                fill("wight");
            }

            rect(x * side, y * side, side, side)

        }

    }

}
function changeStats(stats){
    document.getElementById('grassCount').innerText = "grass: " + stats.grass;
    document.getElementById('grasseaterCount').innerText = "grasseater: "+stats.grasseater;
    document.getElementById('predatorCount').innerText = "predator: "+stats.predator;
    document.getElementById('epredatorCount').innerText = "epredator: "+stats.epredator;
}
socket.on("send matrix", update);
socket.on('send stats', changeStats);

function toSpring() {
    socket.emit("toSpring");
    document.getElementById("season").innerText = "Spring";
}
function toSummer() {
    socket.emit("toSummer");
    document.getElementById("season").innerText = "Summer";
}
function toAutumn() {
    socket.emit("toAutumn");
    document.getElementById("season").innerText = "Autumn";
}   
function toWinter() {
    socket.emit("toWinter");
    document.getElementById("season").innerText = "Winter";
}