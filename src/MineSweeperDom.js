function DomManipulation() {}

DomManipulation.prototype.init = function(board) {
    const div = document.createElement('div');
    const cell = document.createElement('button');
    div.id = "GameBoard";
    cell.id = "Cell";

    div.appendChild(cell);

    cell.addEventListener("click", () => {
        if(board.getCells()[0].reveal()) {
            cell.innerHTML = "*";
        } else {
            cell.innerHTML = '';
        }
    });

    document.body.appendChild(div);
};

DomManipulation.prototype.kill = function () {
    let div = document.getElementById("GameBoard");
    document.body.removeChild(div);
};

