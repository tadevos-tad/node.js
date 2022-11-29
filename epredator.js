module.exports=class epredator {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.directions = [];
    }

    getNewCoordinatess() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinatess();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    random(i,j){
        let found = this.chooseCell(i);
        let result = Math.floor(Math.random()*found.length)
        return found[result];
    }
    mul() {
        let newCell = this.random(0);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 6;
            epredatorArr.push(new epredator(newX, newY));
            this.energy = 10;
        }
        else if (newCell){
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            predatorArr.push(new Predator(newX, newY));
            this.energy = 12;
        }
        
        
    }
    
    move() {
        // var found = this.chooseCell(0);
        var newCell = this.random(0);
        
        if(newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
        this.energy--;

        if (this.energy < 0) {
            this.die();
        }
    }

    eat() {

        // var found = this.chooseCell(2);
        var newCell = this.random(3,2);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 6;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.energy++;

            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 16) {
                this.mul();
            }
        }
        else {
            this.move();
        }
    }


     die() {     
        
        for (var i in epredatorArr) {
             if (this.x == epredatorArr[i].x && this.y == epredatorArr[i].y) {
                epredatorArr.splice(i, 1);
                break;
            }
         }
         matrix[this.y][this.x] = 0;
        
     };
}