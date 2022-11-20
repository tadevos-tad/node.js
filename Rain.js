module.exports=class Rain{
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.energy = 9;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x , this.y+1]
           
        ]

    }
     chooseCell(character) {
    this.getNewCoordinates();
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
    mul() {
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
            rainArr.push(new Rain(newX, newY));
            this.energy = 12;
        }
        
        
    }
    
    move() {
        var found = this.chooseCell(0);
        var newCell = random(found);
        
        if(newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
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

        var found = [...this.chooseCell(3), ...this.chooseCell(2), ...this.chooseCell(1)];
        var newCell = random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
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
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 20) {
                this.mul();
            }
        }
        else {
            this.move();
        }
        
    }


     die() {     
        
        for (var i in rainArr) {
             if (this.x == rainArr[i].x && this.y == rainArr[i].y) {
                rainArr.splice(i, 1);
                break;
            }
         }
         matrix[this.y][this.x] = 0;
        
     };
}