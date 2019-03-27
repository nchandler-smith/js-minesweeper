describe("Mine Sweeper Tests", function() {
    describe("Game Board Tests", function() {
        let length = 1;

        it("should have length", function() {
            let cell = new Cell();
            let board = new Board(length);

            board.addCells(cell);

            expect(board.getCells().length).toBe(length);
        });
    });

    describe("Cell Tests", function() {
        it("given no mine in cell when reveal then miss", function() {
            let cell = new Cell();
            expect(cell.reveal()).toBeFalsy();
        });

        it("given mine in cell when reveal then hit", function() {
           let cell = new Cell();
           cell.placeMine();
           expect(cell.reveal()).toBeTruthy();
        });
    });
});

