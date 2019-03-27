describe("Mine Sweeper", function() {
    describe("Game Board", function() {
        it("should have one cell", function() {
            let board = new Board();
            expect(board.numberOfCells).toEqual(1);
        });
    });
});

