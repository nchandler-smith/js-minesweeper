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

    this.boardModel = new BoardModel();
    console.log(this.boardModel.gameStateText);
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
        // getAdjacentIndices(number, this.length).forEach(index => this.cells[index].setAdjacentMines(1));
    });

    // function getAdjacentIndices(cellIndex, length) {
    //     let adjacentIndices = [];
    //
    //     adjacentIndices.push(cellIndex + 1);
    //     adjacentIndices.push(Math.sqrt(length));
    //     adjacentIndices.push(Math.sqrt(length) + 1);
    //
    //     return adjacentIndices;
    // }
};

function checkGameWin(mineIsRevealed) {
    if (!mineIsRevealed) {
        if (this.unToggledCells === this.numberOfMines) {
            this.gameState = GameState.WIN;
            this.boardModel.gameStateText = "Player Wins :)";
            this.boardModel.resetButtonVisibility = "visible";
            this.boardModel.cellsDisabled = true;
        }
    }
}

function checkGameLose(mineIsRevealed) {
    if (mineIsRevealed) {
        this.gameState = GameState.LOSE;
        this.boardModel.gameStateText = "Player Loses :(";
        this.boardModel.resetButtonVisibility = "visible";
        this.boardModel.cellsDisabled = true;
    }
}

function updateGameState(mineIsRevealed) {
    checkGameLose.call(this, mineIsRevealed);
    checkGameWin.call(this, mineIsRevealed);
}

Board.prototype.revealCell = function (cellIndex) {
    this.unToggledCells--;
    let mineIsRevealed = this.cells[cellIndex].reveal();

    updateGameState.call(this, mineIsRevealed);

    return this.gameState;
};

Board.prototype.getMines = function () {
    return this.mineIndices;
};

function Cell() {
    this.hasMine = false;
    this.adjacentMines = 0;

    Cell.prototype.reveal = function () {
        return this.hasMine;
    };

    Cell.prototype.placeMine = function () {
        this.hasMine = true;
    };

    Cell.prototype.setAdjacentMines = function (numberOfMines) {
        this.adjacentMines = numberOfMines;
    };

    Cell.prototype.getAdjacentMines = function () {
        return this.adjacentMines;
    };
}


