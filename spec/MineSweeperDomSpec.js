describe("Testing DOM manipulation", function () {
    let length = 1;
    let board;
    let cell;
    let dom;
    let testCellId;
    let testDivId;

    beforeEach(function () {
        testDivId = "GameBoard";
        testCellId = "Cell";
        board = new Board(length);
        cell = new Cell();
        board.addCells(cell);
        dom = new DomManipulation();
        dom.init(board);
    });

    afterEach(function () {
        dom.kill();
    });

    it("when init then have a button with no text", function () {
        const div = document.createElement('div');
        const cell = document.createElement('button');
        div.id = testDivId;
        cell.id = testCellId;

        div.appendChild(cell);

        expect(document.getElementById(testDivId)).toEqual(div);
    });

    it("given a cell without a mine, when revealed, button has empty text", function () {
        let clearChar = "";
        let cellDOM = document.getElementById(testCellId);

        cellDOM.click();

        expect(cellDOM.innerHTML).toEqual(clearChar);
    });

    it("given a cell with a mine, when revealed, button has * as text", function () {
        let mineChar = "*";
        let cellDOM = document.getElementById(testCellId);

        board.addMines();
        cellDOM.click();

        expect(cellDOM.innerHTML).toEqual(mineChar);
    });
});

