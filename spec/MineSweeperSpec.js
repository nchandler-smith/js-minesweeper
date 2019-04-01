describe("Mine Sweeper Tests", function () {
    describe("Game Board Tests", function () {
        let length = 9;
        const cellLocation = 0;
        let board;

        beforeEach(function () {
            board = new Board(length);
            board.addCells(Cell);
        });

        it("given square board then number of cells equal to square of length", function () {
            expect(board.getCells().length).toBe(length);
        });

        it("given cell with mine when reveal then game state is LOSE", function () {
            let mineLocation = 0;
            board.addMines([mineLocation]);
            board.revealCell(cellLocation);

            expect(board.getGameState()).toEqual(GameState.LOSE);
        });

        it("given remaining unrevealed cells equals mines then game state is WIN", function () {
            const specialLength = 1;
            board = new Board(specialLength);
            board.addCells(Cell);

            board.revealCell(cellLocation);
            expect(board.getGameState()).toEqual(GameState.WIN);
        });

        it("given location of mines addMines places mines in those locations", function () {
            let mineLocation = 0;
            board.addMines([mineLocation]);
            board.revealCell(mineLocation);

            expect(board.getGameState()).toEqual(GameState.LOSE);
        });

        it("given random location of mines addMines places number of mines equal to number of locations", function () {
            const specialLength = 2;
            board = new Board(specialLength);
            board.addCells(Cell);

            const numberOfMines = 1;
            const upperBound = 2;
            const listRandomizer = new ListRandomizer();

            const randomNumbers = listRandomizer.randomizeIndices(numberOfMines, upperBound);

            board.addMines(randomNumbers);

            expect(board.numberOfMines).toEqual(numberOfMines);
        });

        it("given empty cell reveled when empty cells remain unrevealed then game state equals In Progress", function () {
            board.revealCell(0);
            const gameState = board.getGameState();

            expect(gameState).toEqual(GameState.IN_PROGRESS);
        });
    });

    describe("Cell Tests", function () {
        let cell;

        beforeEach(function () {
            cell = new Cell();
        });
        it("given no mine in cell when reveal then miss", function () {
            expect(cell.reveal()).toBeFalsy();
        });

        it("given mine in cell when reveal then hit", function () {
            cell.placeMine([0]);
            expect(cell.reveal()).toBeTruthy();
        });
    });
});
