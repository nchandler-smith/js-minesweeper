function Board(length) {
    this.length = length;
    this.cells = [];
}

Board.prototype.addCells = function(cell) {
    for(let i = 0; i < Math.pow(this.length, 2); i++) {
        this.cells.push(cell);
    }
};

Board.prototype.getCells = function() {
    return this.cells;
};

function Cell() {
    this.hasMine = false;
}

Cell.prototype.reveal = function() {
    return this.hasMine;
};

Cell.prototype.placeMine = function() {
    this.hasMine = true;
};