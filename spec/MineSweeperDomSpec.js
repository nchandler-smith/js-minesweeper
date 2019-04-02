describe("Testing DOM manipulation", function () {
    const HEIGHT = 3;
    const WIDTH = 3;
    const LENGTH = HEIGHT * WIDTH;
    const CLEAR_CHAR = "";
    const MINE_CHAR = "*";
    const GAME_IN_PROGRESS_MESSAGE = "Game in progress...";
    const GAME_WIN_MESSAGE = "Player Wins :)";
    const GAME_LOSE_MESSAGE = "Player Loses :(";
    const TEST_DIV_ID = "GameBoard";
    const TEST_CELL0_ID = "Cell0";
    const TEST_CELL1_ID = "Cell1";
    const GAME_STATE_MESSAGE_ID = "GameState";
    const GAME_RESET_BUTTON_TEXT = "Reset Game";
    const CELL_BUTTON_CLASS_NAME = "Cell";

    let board;
    let dom;

    beforeEach(function () {
        board = new Board(LENGTH);
        board.addCells(Cell);
        dom = new DomManipulation();
        dom.init(board);
    });

    function rollOutWinningGame() {
        const cellList = Array.from(document.getElementsByClassName(CELL_BUTTON_CLASS_NAME));
        const mineLocations = [0];
        board.addMines(mineLocations);

        const cellsWithoutMines = cellList.filter(element => element.id !== TEST_CELL0_ID);
        cellsWithoutMines.forEach(cell => cell.click());
    }

    function rollOutLosingGame() {
        const cellWithMine = document.getElementById(TEST_CELL0_ID);
        const mineLocations = [0];

        board.addMines(mineLocations);
        cellWithMine.click();
    }

    function createFreshBoard() {
        const div = document.createElement('div');
        const boardBreak = document.createElement('br');
        div.id = TEST_DIV_ID;

        for(let heightIndex = 0; heightIndex < HEIGHT; heightIndex++) {
            for(let widthIndex = 0; widthIndex < WIDTH; widthIndex++) {
                const cell = document.createElement('button');
                cell.id = "Cell" + (((heightIndex * HEIGHT) + widthIndex));
                cell.className = CELL_BUTTON_CLASS_NAME;
                div.appendChild(cell);
            }
            const rowBreak = document.createElement('br');
            div.appendChild(rowBreak);
        }

        const gameStateMessage = document.createElement('t');
        gameStateMessage.id = "GameState";
        gameStateMessage.innerHTML = GAME_IN_PROGRESS_MESSAGE;

        const gameResetButton = document.createElement('button');
        gameResetButton.id = "ResetGame";
        gameResetButton.innerHTML = GAME_RESET_BUTTON_TEXT;
        gameResetButton.style.visibility = "hidden";


        div.appendChild(boardBreak);
        div.appendChild(gameStateMessage);
        div.appendChild(boardBreak);
        div.appendChild(gameResetButton);

        return div;
    }

    afterEach(function () {
        dom.kill();
    });

    it("should have a grid of cells as a gameboard", function () {
        const div = createFreshBoard();

        expect(document.getElementById(TEST_DIV_ID)).toEqual(div);
    });

    it("given a cell without a mine, when revealed, button has empty text", function () {
        let cellWithoutMine = document.getElementById(TEST_CELL0_ID);

        cellWithoutMine.click();

        expect(cellWithoutMine.innerHTML).toEqual(CLEAR_CHAR);
    });

    it("given a cell with a mine, when revealed, button has * as text", function () {
        let cellWithMine = document.getElementById(TEST_CELL0_ID);

        board.addMines([0]);
        cellWithMine.click();

        expect(cellWithMine.innerHTML).toEqual(MINE_CHAR);
    });

    it("given a cell with a mine, when revealed, player loses", function () {
        let messageDOM = document.getElementById(GAME_STATE_MESSAGE_ID);

        rollOutLosingGame();

        expect(messageDOM.innerHTML).toEqual(GAME_LOSE_MESSAGE);
        expect(board.gameState).toEqual(GameState.LOSE);
    });

    it("given multiple non-mine cells and one mine, when a single non-mine cell is revealed, game continues", function () {
        let cellDOM = document.getElementById(TEST_CELL0_ID);

        board.addMines([1]);
        cellDOM.click();

        expect(board.gameState).toEqual(GameState.IN_PROGRESS);
    });

    it("given cell with a no mine, when revealed, cell button is disabled", function () {
        let cellDOM = document.getElementById(TEST_CELL1_ID);

        cellDOM.click();

        expect(cellDOM.disabled).toEqual(true);
    });

    it("given player loses, when game ends, then all buttons are disabled", function () {
        const cellElements = Array.from(document.getElementsByClassName(CELL_BUTTON_CLASS_NAME));

        rollOutLosingGame();

        const allCellsDisabled = cellElements.every(element => element.disabled === true);
        expect(allCellsDisabled).toBeTruthy();
    });

    it("given mine exists and player wins, when game ends, then all buttons are disabled", function () {
        const cellElements = Array.from(document.getElementsByClassName(CELL_BUTTON_CLASS_NAME));

        rollOutWinningGame();

        const allCellsDisabled = cellElements.every(element => element.disabled === true);
        expect(allCellsDisabled).toBeTruthy();
    });

    it("given player loses, then reset button is visible", function () {
        const resetButton = document.getElementById("ResetGame");

        rollOutLosingGame();

        expect(resetButton.style.visibility).toEqual("visible");
    });

    it("given player wins, then reset button is visible", function () {
        const resetButton = document.getElementById("ResetGame");

        rollOutWinningGame();

        expect(resetButton.style.visibility).toEqual("visible");
    });

    it("when all cells without mines are revealed , then player wins", function () {
        let messageDOM = document.getElementById(GAME_STATE_MESSAGE_ID);

        rollOutWinningGame();

        expect(messageDOM.innerHTML).toEqual(GAME_WIN_MESSAGE);
        expect(board.gameState).toEqual(GameState.WIN);
    });

    it("given game ends, then all mines are revealed", function () {
        let cellWithMine = document.getElementById(TEST_CELL0_ID);

        rollOutWinningGame();

        expect(cellWithMine.innerHTML).toEqual(MINE_CHAR);
    });
});

