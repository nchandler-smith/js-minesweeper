describe("Mine Sweeper Tests", function() {

    describe("Game Board Tests", function() {
        it("should have one cell", function() {
            let board = new Board();
            expect(board.numberOfCells).toEqual(1);
        });
    });

    describe("Cell Tests", function() {
        it("given no mine in cell when reveal then miss", function() {
            let cell = new Cell();
            expect(cell.reveal()).toBeFalsy();
        });

        it("given placeMine is called, cell should have mine", function() {
           let cell = new Cell();
           cell.placeMine();
           expect(cell.reveal()).toBeTruthy();
        });
    });
});

