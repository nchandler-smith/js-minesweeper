function DomManipulation() {}

DomManipulation.prototype.init = function(board) {
    const div = document.createElement('div');
    const cell0 = document.createElement('button');
    const cell1 = document.createElement('button');
    const boardBreak = document.createElement('br');
    const gameStateMessage = document.createElement('b');
    div.id = "GameBoard";
    cell0.id = "Cell0";
    cell1.id = "Cell1";
    gameStateMessage.id = "GameState";
    gameStateMessage.innerHTML = "Game in progress...";

    div.appendChild(cell0);
    div.appendChild(cell1);
    div.appendChild(boardBreak);
    div.appendChild(gameStateMessage);

    cell0.addEventListener("click", () => {
        if(board.getCells()[0].reveal()) {
            cell0.innerHTML = "*";
            gameStateMessage.innerHTML = "Player Loses :(";
        } else {
            cell0.innerHTML = '';
            gameStateMessage.innerHTML = "Player Wins :)";
        }
    });

    cell1.addEventListener("click", () => {
        if(board.getCells()[1].reveal()) {
            cell1.innerHTML = "*";
            gameStateMessage.innerHTML = "Player Loses :(";
        } else {
            cell1.innerHTML = '';
            gameStateMessage.innerHTML = "Player Wins :)";
        }
    });

    document.body.appendChild(div);
};

DomManipulation.prototype.kill = function () {
    let div = document.getElementById("GameBoard");
    document.body.removeChild(div);
};

