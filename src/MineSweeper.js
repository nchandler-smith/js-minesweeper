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

