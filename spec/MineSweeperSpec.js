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
            const gameState = board.revealCell(cellLocation);

            expect(gameState).toEqual(GameState.LOSE);
        });

        it("given remaining unrevealed cells equals mines then game state is WIN", function () {
            const specialLength = 1;
            board = new Board(specialLength);
            board.addCells(Cell);

            const gameState = board.revealCell(cellLocation);
            expect(gameState).toEqual(GameState.WIN);
        });

        it("given location of mines addMines places mines in those locations", function () {
            let mineLocation = 0;
            board.addMines([mineLocation]);
            const gameState = board.revealCell(cellLocation);

            expect(gameState).toEqual(GameState.LOSE);
        });

        it("given random location of mines addMines places number of mines equal to number of locations", function () {
            const numberOfMines = 1;
            const upperBound = 2;
            const listRandomizer = new ListRandomizer();

            const randomNumbers = listRandomizer.randomizeIndices(numberOfMines, upperBound);

            board.addMines(randomNumbers);

            expect(board.numberOfMines).toEqual(numberOfMines);
        });

        it("given empty cell reveled when empty cells remain unrevealed then game state equals In Progress", function () {
            const cellLocation = 0;

            const gameState = board.revealCell(cellLocation);

            expect(gameState).toEqual(GameState.IN_PROGRESS);
        });

        // it("given cells with mines, getMines returns indexes of cells containing a mine", function () {
        //     let mineLocations = [0];
        //     board.addMines(mineLocations);
        //     const mineIndices = board.getMines();
        //
        //     expect(mineIndices).toEqual(mineLocations);
        // });
        //
        // it("given a single mine added, cells adjacent to mine have one adjacent mine", function() {
        //     let mineLocations = [0];
        //     board.addMines(mineLocations);
        //
        //     let adjacentCell1 = board.getCells()[1];
        //     let adjacentCell2 = board.getCells()[3];
        //     let adjacentCell3 = board.getCells()[4];
        //
        //     expect(adjacentCell1.getAdjacentMines()).toEqual(1);
        //     expect(adjacentCell2.getAdjacentMines()).toEqual(1);
        //     expect(adjacentCell3.getAdjacentMines()).toEqual(1);
        // });
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
            cell.placeMine();
            expect(cell.reveal()).toBeTruthy();
        });

        it("given cell with adjacent mines, cell adjacent number of adjacent mines", function() {
            cell.setAdjacentMines(1);
            const adjacentMines = cell.getAdjacentMines();
            expect(adjacentMines).toEqual(1);
        });
    });
});
