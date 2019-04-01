function DomManipulation() {}

DomManipulation.prototype.init = function(board) {
    // init calls the following functions:
    // buildBoard: creates and appends elements
    // addListeners: creates the event listeners

    // create gameController?!?!


    const {cellsView, gameStateMessage} = buildBoard();


    for (let i = 0; i < cellsView.length; i++) {
        cellsView[i].addEventListener("click", () => {
            board.revealCell(i);
            if(board.getGameState() === GameState.LOSE) {
                cellsView[i].innerHTML = "*";
                gameStateMessage.innerHTML = "Player Loses :(";
            } else if(board.getGameState() === GameState.WIN) {
                cellsView[i].innerHTML = '';
                gameStateMessage.innerHTML = "Player Wins :)";
            }
        });
    }


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
};

DomManipulation.prototype.kill = function () {
    let div = document.getElementById("GameBoard");
    document.body.removeChild(div);
};

