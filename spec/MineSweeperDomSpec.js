describe("Testing DOM manipulation", function () {
    const LENGTH = 1;
    const CLEAR_CHAR = "";
    const MINE_CHAR = "*";
    const GAME_IN_PROGRESS_MESSAGE = "Game in progress...";
    const GAME_WIN_MESSAGE = "Player Wins :)";
    const GAME_LOSE_MESSAGE = "Player Loses :(";
    const TEST_DIV_ID = "GameBoard";
    const TEST_CELL_ID = "Cell";
    const GAME_STATE_MESSAGE_ID = "GameState";

    let board;
    let cell;
    let dom;

    beforeEach(function () {
        board = new Board(LENGTH);
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
        const gameStateMessage = document.createElement('b');
        div.id = TEST_DIV_ID;
        cell.id = TEST_CELL_ID;
        gameStateMessage.id = "GameState";
        gameStateMessage.innerHTML = GAME_IN_PROGRESS_MESSAGE;

        div.appendChild(cell);
        div.appendChild(gameStateMessage);

        expect(document.getElementById(TEST_DIV_ID)).toEqual(div);
    });

    it("given a cell without a mine, when revealed, button has empty text", function () {
        let cellDOM = document.getElementById(TEST_CELL_ID);

        cellDOM.click();

        expect(cellDOM.innerHTML).toEqual(CLEAR_CHAR);
    });

    it("given a cell with a mine, when revealed, button has * as text", function () {
        let cellDOM = document.getElementById(TEST_CELL_ID);

        board.addMines();
        cellDOM.click();

        expect(cellDOM.innerHTML).toEqual(MINE_CHAR);
    });

    it("given a single cell without a mine, when revealed, player wins", function () {
        let cellDOM = document.getElementById(TEST_CELL_ID);
        let messageDOM = document.getElementById(GAME_STATE_MESSAGE_ID);

        cellDOM.click();

        expect(messageDOM.innerHTML).toEqual(GAME_WIN_MESSAGE);
    });

    it("given a single cell without a mine, when revealed, player wins", function () {
        let cellDOM = document.getElementById(TEST_CELL_ID);
        let messageDOM = document.getElementById(GAME_STATE_MESSAGE_ID);

        board.addMines();
        cellDOM.click();

        expect(messageDOM.innerHTML).toEqual(GAME_LOSE_MESSAGE);
    });
});

