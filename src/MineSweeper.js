function Board(length) {
    this.length = length;
    this.cells = [];
    this.gameFinished = false;
}

Board.prototype.addCells = function(cell) {
    for(let i = 0; i < Math.pow(this.length, 2); i++) {
        this.cells.push(cell);
    }
};

Board.prototype.getCells = function() {
    return this.cells;
};

Board.prototype.addMines = function() {
    this.cells[0].placeMine();
};

Board.prototype.revealCell = function(cellIndex) {
    if(this.cells[cellIndex].reveal) {
        this.gameFinished = true;
    }
};

Board.prototype.isGameFinished = function() {
    return this.gameFinished;
};

function Cell() {
    this.hasMine = false;

    Cell.prototype.reveal = function() {
        return this.hasMine;
    };

    Cell.prototype.placeMine = function() {
        this.hasMine = true;
    };
}

