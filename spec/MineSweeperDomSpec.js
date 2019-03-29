describe("Testing DOM manipulation", function () {
    let length = 1;
    let board;
    let cell;
    let dom;
    beforeEach(function () {
        board = new Board(length);
        cell = new Cell();
        board.addCells(cell);
        dom = new DomManipulation();
        dom.init(board);
    });

    afterEach(function () {
        dom.kill()
    })

    it("when init then have a button with no text", function () {
        const div = document.createElement('div');
        const mineCell = document.createElement('button');
        div.id = "GameBoard";
        mineCell.id = "MineCell";

        div.appendChild(mineCell);

        expect(document.getElementById("GameBoard")).toEqual(div);

    });

    it("given a cell without a mine, when revealed, button has empty text", function () {
        let cellDOM = document.getElementById("MineCell");

        cellDOM.click();

        expect(cellDOM.value).toEqual("");

    });

    it("given a cell with a mine, when revealed, button has * as text", function () {
        let cellDOM = document.getElementById("MineCell");
        board.addMines();
        cellDOM.click();

        expect(cellDOM.value).toEqual("*");

    });
});

