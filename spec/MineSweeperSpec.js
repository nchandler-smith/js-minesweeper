describe("Mine Sweeper Tests", function () {
    describe("Game Board Tests", function () {
        let length = 1;
        let cellLocation = 0;
        let board;

        beforeEach(function () {
            board = new Board(length);
            board.addCells(Cell);
        });

        it("given square board then number of cells equal to square of length", function () {
            expect(board.getCells().length).toBe(length);
        });

        it("given cell with mine when reveal then game state is LOSE", function () {
            board.addMines([0]);
            board.revealCell(cellLocation);

            expect(board.getGameState()).toEqual(GameState.LOSE);
        });

        it("given remaining unrevealed cells equals mines then game state is WIN", function () {
            board.revealCell(cellLocation);
            expect(board.getGameState()).toEqual(GameState.WIN);
        });

        it("given location of mines addMines places mines in those locations", function () {
            let mineLocation = 0;
            board.addMines([mineLocation]);
            board.revealCell(mineLocation);

            expect(board.getGameState()).toEqual(GameState.LOSE);
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
