module.exports = class mashrum {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    destroy() {
        for (var i in this.directions) {
            var desX = this.directions[i][0]
            var desY = this.directions[i][1]
            if (desX >= 0 && desX < matrix[0].length && desY >= 0 && desY < matrix.length) {
                
                if (matrix[desY][desX] == 2) {
                    matrix[desY][desX] = 0
                    for (var i in grassEaterArr) {
                        if (desX == grassEaterArr[i].x && desY == grassEaterArr[i].y) {
                            grassEaterArr.splice(i, 1);
                        }
                    }
                }
                if (matrix[desY][desX] == 3) {
                    matrix[desY][desX] = 0
                    for (var i in predatorArr) {
                        if (desX == predatorArr[i].x && desY == predatorArr[i].y) {
                            predatorArr.splice(i, 1);
                        }
                    }
                }
               
            }
        }
    }
    
}


     
