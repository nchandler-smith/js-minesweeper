function DomManipulation() {}

DomManipulation.prototype.init = function(board) {
    const div = document.createElement('div');
    const cell = document.createElement('button');
    const gameStateMessage = document.createElement('b');
    div.id = "GameBoard";
    cell.id = "Cell";
    gameStateMessage.id = "GameState";
    gameStateMessage.innerHTML = "Game in progress...";

    div.appendChild(cell);
    div.appendChild(gameStateMessage);

    cell.addEventListener("click", () => {
        if(board.getCells()[0].reveal()) {
            cell.innerHTML = "*";
            gameStateMessage.innerHTML = "Player Loses :(";
        } else {
            cell.innerHTML = '';
            gameStateMessage.innerHTML = "Player Wins :)";
        }
    });

    document.body.appendChild(div);
};

DomManipulation.prototype.kill = function () {
    let div = document.getElementById("GameBoard");
    document.body.removeChild(div);
};

