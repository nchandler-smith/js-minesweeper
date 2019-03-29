const GameState = {
    IN_PROGRESS: 0,
    WIN: 1,
    LOSE: 2
};

function Board(length) {
    this.length = length;
    this.cells = [];
    this.gameState = GameState.IN_PROGRESS;
}

Board.prototype.addCells = function(cellClass) {
    for(let i = 0; i < this.length; i++) {
        this.cells.push(new cellClass());
    }
};

Board.prototype.getCells = function() {
    return this.cells;
};

Board.prototype.addMines = function(...indices) {
    for (let index of indices) {
        this.cells[index].placeMine();
    }
};

Board.prototype.revealCell = function(cellIndex) {
    if(this.cells[cellIndex].reveal()) {
        this.gameState = GameState.LOSE;
    } else {
        this.gameState = GameState.WIN;
    }
};

Board.prototype.getGameState = function() {
    return this.gameState;
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


