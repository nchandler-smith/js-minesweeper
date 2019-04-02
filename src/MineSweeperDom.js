function DomManipulation() {
}

DomManipulation.prototype.init = function (board) {

    const {cellsView, gameStateMessage} = buildBoard();
    setEventListeners();

    function buildBoard() {
        const HEIGHT = 3;
        const WIDTH = 3;

        const div = document.createElement('div');
        let cellsView = [];
        const boardBreak = document.createElement('br');

        for(let heightIndex = 0; heightIndex < HEIGHT; heightIndex++) {
            for(let widthIndex = 0; widthIndex < WIDTH; widthIndex++) {
                const cell = document.createElement('button');
                cell.id = "Cell" + (((heightIndex * HEIGHT) + widthIndex));
                cell.className = "Cell";
                div.appendChild(cell);
                cellsView.push(cell)
            }
            const rowBreak = document.createElement('br');
            div.appendChild(rowBreak);
        }

        const gameStateMessage = document.createElement('t');
        div.id = "GameBoard";

        gameStateMessage.id = "GameState";
        gameStateMessage.innerHTML = "Game in progress...";

        const gameResetButton = document.createElement('button');
        gameResetButton.id = "ResetGame";
        gameResetButton.innerHTML = "Reset Game";
        gameResetButton.style.visibility = "hidden";

        div.appendChild(boardBreak);
        div.appendChild(gameStateMessage);
        div.appendChild(boardBreak);
        div.appendChild(gameResetButton);
        document.body.appendChild(div);

        return {cellsView, gameStateMessage};
    }

    function setEventListeners() {
        for (let i = 0; i < cellsView.length; i++) {
            cellsView[i].addEventListener("click", () => {
                const gameState = board.revealCell(i);
                cellsView[i].disabled = true;
                if (gameState === GameState.LOSE) {
                    cellsView[i].innerHTML = "*";
                    gameStateMessage.innerHTML = "Player Loses :(";
                    cellsView.forEach(element => element.disabled = true);
                    document.getElementById("ResetGame").style.visibility = "visible";
                } else if (gameState === GameState.WIN) {
                    gameStateMessage.innerHTML = "Player Wins :)";
                    document.getElementById("ResetGame").style.visibility = "visible";
                    cellsView.forEach(element => element.disabled = true);
                }
            });
        }
    }
};

DomManipulation.prototype.kill = function () {
    let div = document.getElementById("GameBoard");
    document.body.removeChild(div);
};

