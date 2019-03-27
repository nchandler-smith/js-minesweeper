describe("Mine Sweeper Tests", function() {
    describe("Game Board Tests", function() {
        let length = 1;
        let cellLocation = 0;
        let board;
        let cell;

        beforeEach(function(){
            board = new Board(length);
            cell = new Cell();
            board.addCells(cell);
        })

        it("given square board then number of cells equal to square of length", function() {
            expect(board.getCells().length).toBe(length);
        });

        it("given cell with mine when reveal then game state is LOSE", function() {
            board.addMines();
            board.revealCell(cellLocation);

            expect(board.getGameState()).toEqual(GameState.LOSE);
        });

        it("given remaining unrevealed cells equals mines then game state is WIN", function() {
            board.revealCell(cellLocation);

            expect(board.getGameState()).toEqual(GameState.WIN);
        });
    });

    describe("Cell Tests", function() {
        let cell;

        beforeEach(function(){
            cell = new Cell();
        });
        it("given no mine in cell when reveal then miss", function() {
            expect(cell.reveal()).toBeFalsy();
        });

        it("given mine in cell when reveal then hit", function() {
           cell.placeMine();
           expect(cell.reveal()).toBeTruthy();
        });
    });
});
