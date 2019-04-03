function DomManipulation() {
}

DomManipulation.prototype.init = function (board) {

    const {cellsView, gameStateMessage, gameResetButton} = buildBoard();
    setGameCellEventListeners();
    setResetGameEventListener();

    function buildBoard() {
        let cellsView = [];
        const HEIGHT = 3;
        const WIDTH = 3;

        function createCellGrid() {
            for (let heightIndex = 0; heightIndex < HEIGHT; heightIndex++) {
                for (let widthIndex = 0; widthIndex < WIDTH; widthIndex++) {
                    const cell = createCell(heightIndex, widthIndex);
                    gameSpace.appendChild(cell);
                    cellsView.push(cell);
                }
                gameSpace.appendChild(createBoardBreak());
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

        function createGameSpace() {
            const div = document.createElement('div');
            div.id = "GameBoard";
            return div;
        }

        const gameSpace = createGameSpace();
        createCellGrid();
        const boardBreak = createBoardBreak();
        const gameStateMessage = createGameStateMessage();
        const gameResetButton = createGameResetButton();

        gameSpace.appendChild(boardBreak);
        gameSpace.appendChild(gameStateMessage);
        gameSpace.appendChild(boardBreak);
        gameSpace.appendChild(gameResetButton);
        document.body.appendChild(gameSpace);

        return {cellsView, gameStateMessage, gameResetButton};
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
                    gameResetButton.style.visibility = "visible";
                }
            });
        }
    }

    function setResetGameEventListener() {
        gameResetButton.addEventListener("click", () => {
            window.location.reload();
        });
    }

    function showMines() {
        const mineIndices = board.getMines();
        mineIndices.forEach(index => cellsView[index].innerHTML = "*");
    }

    function updateGameStateMessage(gameState) {
        if (gameState === GameState.LOSE)
            gameStateMessage.innerHTML = "Player Loses :(";
        else if (gameState === GameState.WIN)
            gameStateMessage.innerHTML = "Player Wins :)";
    }
};

DomManipulation.prototype.kill = function () {
    let div = document.getElementById("GameBoard");
    document.body.removeChild(div);
};

