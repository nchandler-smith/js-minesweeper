function DomManipulation() {
    this.GAME_SPACE_ID = "GameSpace";
}

DomManipulation.prototype.init = function (board) {
    let cellsView = [];

    buildGame(this);
    setGameCellEventListeners();
    setResetGameEventListener();

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
            cell.id = "Cell" + (((heightIndex * HEIGHT) + widthIndex));
            cell.className = "Cell";
            return cell;
        }

        function createBoardBreak() {
            return document.createElement('br');
        }

        function createGameStateMessage() {
            const gameStateMessage = document.createElement('t');
            gameStateMessage.id = "GameState";
            gameStateMessage.innerHTML = "Game in progress...";
            return gameStateMessage;
        }

        function createGameResetButton() {
            const gameResetButton = document.createElement('button');
            gameResetButton.id = "ResetGame";
            gameResetButton.innerHTML = "Reset Game";
            gameResetButton.style.visibility = "hidden";
            return gameResetButton;
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

        return {cellsView};
    }

    function setGameCellEventListeners() {
        for (let i = 0; i < cellsView.length; i++) {
            cellsView[i].addEventListener("click", () => {
                const gameState = board.revealCell(i);
                cellsView[i].disabled = true;
                if (gameState !== GameState.IN_PROGRESS) {
                    showMines();
                    updateGameStateMessage(gameState);
                    cellsView.forEach(element => element.disabled = true);
                    const gameResetButton = document.getElementById("ResetGame");
                    gameResetButton.style.visibility = "visible";
                } else {
                    if(board.getCells()[i].getAdjacentMines() != 0) {
                        cellsView[i].innerHTML = board.getCells()[i].getAdjacentMines();
                    }
                }
            });
        }
    }

    function setResetGameEventListener() {
        const gameResetButton = document.getElementById("ResetGame");
        gameResetButton.addEventListener("click", () => {
            window.location.reload();
        });
    }

    function showMines() {
        const mineIndices = board.getMines();
        mineIndices.forEach(index => cellsView[index].innerHTML = "*");
    }

    function updateGameStateMessage(gameState) {
        const gameStateMessage = document.getElementById("GameState")
        if (gameState === GameState.LOSE)
            gameStateMessage.innerHTML = "Player Loses :(";
        else if (gameState === GameState.WIN)
            gameStateMessage.innerHTML = "Player Wins :)";
    }
};

DomManipulation.prototype.kill = function () {
    let div = document.getElementById(this.GAME_SPACE_ID);
    document.body.removeChild(div);
};

