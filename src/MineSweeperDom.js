function DomManipulation() {}

DomManipulation.prototype.init = function(board) {
    const div = document.createElement('div');
    const mineCell = document.createElement('button');
    div.id = "GameBoard";
    mineCell.id = "MineCell";

    div.appendChild(mineCell);

    mineCell.addEventListener("click", () => {
        if(board.getCells()[0].reveal()) {
            mineCell.value = "*";
        } else {
            mineCell.value = '';
        }
    });

    document.body.appendChild(div);
};

DomManipulation.prototype.kill = function () {
    let div = document.getElementById("GameBoard");
    document.body.removeChild(div);
}

