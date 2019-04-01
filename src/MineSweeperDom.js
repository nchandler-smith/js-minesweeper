function DomManipulation() {
}

DomManipulation.prototype.init = function (board) {

    const {cellsView, gameStateMessage} = buildBoard();
    setEventListeners();

    function buildBoard() {
        const div = document.createElement('div');
        let cellsView = [];

        for (let i = 0; i < board.getCells().length; i++) {
            const cell = document.createElement('button');
            cell.id = "Cell" + i;
            div.appendChild(cell);
            cellsView.push(cell);
        }

        const boardBreak = document.createElement('br');
        const gameStateMessage = document.createElement('b');
        div.id = "GameBoard";

        gameStateMessage.id = "GameState";
        gameStateMessage.innerHTML = "Game in progress...";

        div.appendChild(boardBreak);
        div.appendChild(gameStateMessage);
        document.body.appendChild(div);

        return {cellsView, gameStateMessage};
    }

    function setEventListeners() {
        for (let i = 0; i < cellsView.length; i++) {
            cellsView[i].addEventListener("click", () => {
                const gameState = board.revealCell(i);
                if (gameState === GameState.LOSE) {
                    cellsView[i].innerHTML = "*";
                    gameStateMessage.innerHTML = "Player Loses :(";
                } else if (gameState === GameState.WIN) {
                    cellsView[i].innerHTML = '';
                    gameStateMessage.innerHTML = "Player Wins :)";
                }
            });
        }
    }
};

DomManipulation.prototype.kill = function () {
    let div = document.getElementById("GameBoard");
    document.body.removeChild(div);
};

