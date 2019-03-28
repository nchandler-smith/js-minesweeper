function DomManipulation() {}

DomManipulation.prototype.init = function(board, cell, numberOfMines) {
    const form = document.createElement('form');
    const input = document.createElement('button');


    form.id = "GameBoard";
    input.id = "Cell1";

    const LENGTH = 1;
    const NUMBER_MINES = numberOfMines;
    board = new Board(LENGTH);


    input.addEventListener("click", () => {
        // board.revealCell(0)
        if(board.getCells()[0].reveal()) {
            input.value = "*";
        }

    });
    form.appendChild(input);
    return {
        form
    }
};

