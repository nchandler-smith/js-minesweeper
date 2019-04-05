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
    this.mineIndices = indices;
    indices.forEach(number => {
        this.cells[number].placeMine();
        this.numberOfMines++;
        getAdjacentIndices(number, this.length).forEach(index => this.cells[index].incrementMines());
    });

    function getAdjacentIndices(cellIndex, length) {
        const sideLength = Math.sqrt(length);
        let adjacentIndices = [];
        const isOnLeftEdgeOfBoard = (cellIndex + sideLength) % sideLength === 0;
        const isOnRightEdgeOfBoard = (cellIndex + sideLength) % sideLength === sideLength - 1;
        const isOnTopEdgeOfBoard = cellIndex < sideLength;
        const isOnBottomEdgeOfBoard = cellIndex >= (length - sideLength);

        if(isOnLeftEdgeOfBoard && isOnTopEdgeOfBoard) {
            adjacentIndices.push(cellIndex + 1);
            adjacentIndices.push(cellIndex + sideLength);
            adjacentIndices.push(cellIndex + sideLength + 1)
        }

        if(isOnTopEdgeOfBoard && !isOnLeftEdgeOfBoard && !isOnRightEdgeOfBoard) {
            adjacentIndices.push(cellIndex - 1);
            adjacentIndices.push(cellIndex + 1);
            adjacentIndices.push(cellIndex + sideLength);
            adjacentIndices.push(cellIndex + sideLength - 1);
            adjacentIndices.push(cellIndex + sideLength + 1);
        }

        if(isOnTopEdgeOfBoard && isOnRightEdgeOfBoard) {
            adjacentIndices.push(cellIndex - 1);
            adjacentIndices.push(cellIndex + sideLength);
            adjacentIndices.push(cellIndex + sideLength - 1)
        }

        if(isOnLeftEdgeOfBoard && !isOnTopEdgeOfBoard && !isOnBottomEdgeOfBoard) {
            adjacentIndices.push(cellIndex + 1);
            adjacentIndices.push(cellIndex - sideLength);
            adjacentIndices.push(cellIndex - sideLength + 1);
            adjacentIndices.push(cellIndex + sideLength);
            adjacentIndices.push(cellIndex + sideLength + 1);
        }

        if(!isOnLeftEdgeOfBoard && !isOnRightEdgeOfBoard && !isOnTopEdgeOfBoard && !isOnBottomEdgeOfBoard) {
            adjacentIndices.push(cellIndex - 1);
            adjacentIndices.push(cellIndex + 1);
            adjacentIndices.push(cellIndex - sideLength);
            adjacentIndices.push(cellIndex - sideLength - 1);
            adjacentIndices.push(cellIndex - sideLength + 1);
            adjacentIndices.push(cellIndex + sideLength);
            adjacentIndices.push(cellIndex + sideLength - 1);
            adjacentIndices.push(cellIndex + sideLength + 1);
        }

        if(isOnRightEdgeOfBoard && !isOnTopEdgeOfBoard && !isOnBottomEdgeOfBoard) {
            adjacentIndices.push(cellIndex - 1);
            adjacentIndices.push(cellIndex - sideLength);
            adjacentIndices.push(cellIndex - sideLength - 1);
            adjacentIndices.push(cellIndex + sideLength);
            adjacentIndices.push(cellIndex + sideLength - 1);
        }

        if(isOnLeftEdgeOfBoard && isOnBottomEdgeOfBoard) {
            adjacentIndices.push(cellIndex + 1);
            adjacentIndices.push(cellIndex - sideLength);
            adjacentIndices.push(cellIndex - sideLength + 1)
        }

        if(isOnBottomEdgeOfBoard && !isOnLeftEdgeOfBoard && !isOnRightEdgeOfBoard) {
            adjacentIndices.push(cellIndex - 1);
            adjacentIndices.push(cellIndex + 1);
            adjacentIndices.push(cellIndex - sideLength);
            adjacentIndices.push(cellIndex - sideLength - 1);
            adjacentIndices.push(cellIndex - sideLength + 1);
        }

        if(isOnBottomEdgeOfBoard && isOnRightEdgeOfBoard) {
            adjacentIndices.push(cellIndex - 1);
            adjacentIndices.push(cellIndex - sideLength);
            adjacentIndices.push(cellIndex - sideLength - 1)
        }

        return adjacentIndices;
    }
};

function checkGameWin(mineIsRevealed) {
    if (!mineIsRevealed) {
        if (this.unToggledCells === this.numberOfMines) {
            this.gameState = GameState.WIN;
        }
    }
}

function checkGameLose(mineIsRevealed) {
    if (mineIsRevealed) {
        this.gameState = GameState.LOSE;
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

    Cell.prototype.incrementMines = function () {
        this.adjacentMines++;
    };

    Cell.prototype.getAdjacentMines = function () {
        return this.adjacentMines;
    };
}


