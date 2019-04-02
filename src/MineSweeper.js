const GameState = {
    IN_PROGRESS: 0,
    WIN: 1,
    LOSE: 2
};

function Board(length) {
    this.length = length;
    this.cells = [];
    this.gameState = GameState.IN_PROGRESS;
    this.unToggledCells = length;
    this.numberOfMines = 0;
    this.mineIndices = [];
}

Board.prototype.addCells = function (cellClass) {
    for (let i = 0; i < this.length; i++) {
        this.cells.push(new cellClass());
    }
};

Board.prototype.getCells = function () {
    return this.cells;
};

Board.prototype.addMines = function (indices) {
    indices.forEach(number => {
        this.cells[number].placeMine();
        this.numberOfMines++;
        this.mineIndices.push(number);
    });
};

Board.prototype.revealCell = function (cellIndex) {
    if (this.cells[cellIndex].reveal()) {
        this.gameState = GameState.LOSE;
    } else {
        this.unToggledCells--;
        if (this.unToggledCells === this.numberOfMines) {
            this.gameState = GameState.WIN;
        }
    }

    return this.gameState;
};

Board.prototype.getMines = function() {
    return this.mineIndices;
};

function Cell() {
    this.hasMine = false;

    Cell.prototype.reveal = function () {
        return this.hasMine;
    };

    Cell.prototype.placeMine = function () {
        this.hasMine = true;
    };
}


