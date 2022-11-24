var Parent = require ("./parent")
module.exports = class Grass extends Parent {
    random(i){
        let found = this.chooseCell(i);
        let result = Math.floor(Math.random()*found.length)
        return found[result];
    }
    mul() {
        this.multiply++;
        var newCell = this.random(0);
        
        if(this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0],newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.multiply = 0;
        }
    }
}

