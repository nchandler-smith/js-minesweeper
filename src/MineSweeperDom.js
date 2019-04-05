function DomManipulation() {
    this.GAME_SPACE_ID = "GameSpace";
}

DomManipulation.prototype.init = function (board) {
    let cellsView = [];

    buildGame(this);

    function buildGame(scope) {
        const HEIGHT = 3;
        const WIDTH = 3;

        function createGameBoard() {
            const gameBoard = document.createElement('div');
            gameBoard.id = "GameBoard";

            createCellGrid(gameBoard);

            return gameBoard;
        }

        function createCellGrid(gameBoard) {
            for (let heightIndex = 0; heightIndex < HEIGHT; heightIndex++) {
                for (let widthIndex = 0; widthIndex < WIDTH; widthIndex++) {
                    const cell = createCell(heightIndex, widthIndex);
                    gameBoard.appendChild(cell);
                    cellsView.push(cell);
                }
                gameBoard.appendChild(createBoardBreak());
            }
        }

        function createCell(heightIndex, widthIndex) {
            const cell = document.createElement('button');
            const cellIndex = (heightIndex * HEIGHT) + widthIndex;
            cell.id = "Cell" + (((heightIndex * HEIGHT) + widthIndex));
            cell.className = "Cell";

            setGameCellEventListener(cell, cellIndex);

            board.boardModel.add_callback(function () {
                cell.disabled = board.boardModel.cellsDisabled;
            });

            return cell;

            function setGameCellEventListener(cell, cellIndex) {
                cell.addEventListener("click", () => {
                    const gameState = board.revealCell(cellIndex);
                    cell.disabled = true;
                    if (gameState !== GameState.IN_PROGRESS) {
                        showMines();
                    }
                });
            }
        }

        function createBoardBreak() {
            return document.createElement('br');
        }

        function createGameStateMessage() {
            const gameStateMessage = document.createElement('t');
            gameStateMessage.id = "GameState";
            gameStateMessage.innerHTML = "Game in progress...";

            board.boardModel.add_callback(function () {
                gameStateMessage.innerHTML = board.boardModel.gameStateText;
            });

            return gameStateMessage;
        }

        function createGameResetButton() {
            const gameResetButton = document.createElement('button');
            gameResetButton.id = "ResetGame";
            gameResetButton.innerHTML = "Reset Game";
            gameResetButton.style.visibility = "hidden";

            setResetGameEventListener(gameResetButton);

            board.boardModel.add_callback(function () {
                gameResetButton.style.visibility = board.boardModel.resetButtonVisibility;
            });

            return gameResetButton;

            function setResetGameEventListener(resetButton) {
                resetButton.addEventListener("click", () => {
                    window.location.reload();
                });
            }
        }

        function createGameSpace(scope) {
            const div = document.createElement('div');
            div.id = scope.GAME_SPACE_ID;

            return div;
        }

        const gameSpace = createGameSpace(scope);
        const gameBoard = createGameBoard();
        const boardBreak = createBoardBreak();
        const gameStateMessage = createGameStateMessage();
        const gameResetButton = createGameResetButton();

        gameSpace.appendChild(gameBoard);
        gameSpace.appendChild(boardBreak);
        gameSpace.appendChild(gameStateMessage);
        gameSpace.appendChild(boardBreak);
        gameSpace.appendChild(gameResetButton);
        document.body.appendChild(gameSpace);
    }

    function showMines() {
        const mineIndices = board.getMines();
        mineIndices.forEach(index => cellsView[index].innerHTML = "*");
    }
};

DomManipulation.prototype.kill = function () {
    let div = document.getElementById(this.GAME_SPACE_ID);
    document.body.removeChild(div);
};

