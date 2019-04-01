describe("Testing DOM manipulation", function () {
    const LENGTH = 3;
    const CLEAR_CHAR = "";
    const MINE_CHAR = "*";
    const GAME_IN_PROGRESS_MESSAGE = "Game in progress...";
    const GAME_WIN_MESSAGE = "Player Wins :)";
    const GAME_LOSE_MESSAGE = "Player Loses :(";
    const TEST_DIV_ID = "GameBoard";
    const TEST_CELL0_ID = "Cell0";
    const TEST_CELL1_ID = "Cell1";
    const GAME_STATE_MESSAGE_ID = "GameState";

    let board;
    let dom;

    beforeEach(function () {
        board = new Board(LENGTH);
        board.addCells(Cell);
        dom = new DomManipulation();
        dom.init(board);
    });

    afterEach(function () {
        dom.kill();
    });

    it("when init then have a button with no text", function () {
        const div = document.createElement('div');
        const cell0 = document.createElement('button');
        const cell1 = document.createElement('button');
        const boardBreak = document.createElement('br');
        const gameStateMessage = document.createElement('b');
        div.id = TEST_DIV_ID;
        cell0.id = TEST_CELL0_ID;
        cell1.id = TEST_CELL1_ID;
        gameStateMessage.id = "GameState";
        gameStateMessage.innerHTML = GAME_IN_PROGRESS_MESSAGE;

        div.appendChild(cell0);
        div.appendChild(cell1);
        div.appendChild(boardBreak);
        div.appendChild(gameStateMessage);

        expect(document.getElementById(TEST_DIV_ID)).toEqual(div);
    });

    it("given a cell without a mine, when revealed, button has empty text", function () {
        let cellDOM = document.getElementById(TEST_CELL0_ID);

        cellDOM.click();

        expect(cellDOM.innerHTML).toEqual(CLEAR_CHAR);
    });

    it("given a cell with a mine, when revealed, button has * as text", function () {
        let cellDOM = document.getElementById(TEST_CELL0_ID);

        board.addMines([0]);
        cellDOM.click();

        expect(cellDOM.innerHTML).toEqual(MINE_CHAR);
    });

    it("given a cell with a mine, when revealed, player loses", function () {
        let cellDOM = document.getElementById(TEST_CELL0_ID);
        let messageDOM = document.getElementById(GAME_STATE_MESSAGE_ID);

        board.addMines([0]);
        cellDOM.click();

        expect(messageDOM.innerHTML).toEqual(GAME_LOSE_MESSAGE);
        expect(board.getGameState()).toEqual(GameState.LOSE);
    });

    it("given cell with a mine, when revealed, cell button has * as text", function () {
        let cellDOM = document.getElementById(TEST_CELL1_ID);

        board.addMines([1]);
        cellDOM.click();

        expect(cellDOM.innerHTML).toEqual(MINE_CHAR);
    });

    it("given three cells and one mine, when non-mine cell is revealed, game continues", function () {
        let cellDOM = document.getElementById(TEST_CELL0_ID);

        board.addMines([1]);
        cellDOM.click();

        expect(board.getGameState()).toEqual(GameState.IN_PROGRESS);
    });
});

