describe("Mine Sweeper Tests", function () {
    describe("Game Board Tests", function () {
        let sideLength = 3;
        const cellLocation = 0;
        let board;

        beforeEach(function () {
            board = new Board(sideLength);
            board.addCells(Cell);
        });

        it("given square board then number of cells equal to square of sideLength", function () {
            expect(board.getCells().length).toBe(Math.pow(sideLength, 2));
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

        it("given cells with mines, getMines returns indices of cells containing a mine", function () {
            let mineLocations = [0];
            board.addMines(mineLocations);
            const mineIndices = board.getMines();

            expect(mineIndices).toEqual(mineLocations);
        });

        it("given a 3x3 board, when mine at 1, then cells adjacent to mine have one adjacent mine", function() {
            let mineLocations = [1];
            board.addMines(mineLocations);

            let adjacentCell0 = board.getCells()[0];
            let adjacentCell2 = board.getCells()[2];
            let adjacentCell3 = board.getCells()[3];
            let adjacentCell4 = board.getCells()[4];
            let adjacentCell5 = board.getCells()[5];
            let adjacentCell6 = board.getCells()[6];
            let adjacentCell7 = board.getCells()[7];
            let adjacentCell8 = board.getCells()[8];

            expect(adjacentCell0.getAdjacentMines()).toEqual(1);
            expect(adjacentCell2.getAdjacentMines()).toEqual(1);
            expect(adjacentCell3.getAdjacentMines()).toEqual(1);
            expect(adjacentCell4.getAdjacentMines()).toEqual(1);
            expect(adjacentCell5.getAdjacentMines()).toEqual(1);
            expect(adjacentCell6.getAdjacentMines()).toEqual(0);
            expect(adjacentCell7.getAdjacentMines()).toEqual(0);
            expect(adjacentCell8.getAdjacentMines()).toEqual(0);
        });

        it("given a 3x3 board, when mine at 2, then cells adjacent to mine have one adjacent mine", function() {
            let mineLocations = [2];
            board.addMines(mineLocations);

            let adjacentCell0 = board.getCells()[0];
            let adjacentCell1 = board.getCells()[1];
            let adjacentCell3 = board.getCells()[3];
            let adjacentCell4 = board.getCells()[4];
            let adjacentCell5 = board.getCells()[5];
            let adjacentCell6 = board.getCells()[6];
            let adjacentCell7 = board.getCells()[7];
            let adjacentCell8 = board.getCells()[8];

            expect(adjacentCell1.getAdjacentMines()).toEqual(1);
            expect(adjacentCell4.getAdjacentMines()).toEqual(1);
            expect(adjacentCell5.getAdjacentMines()).toEqual(1);
            expect(adjacentCell0.getAdjacentMines()).toEqual(0);
            expect(adjacentCell3.getAdjacentMines()).toEqual(0);
            expect(adjacentCell6.getAdjacentMines()).toEqual(0);
            expect(adjacentCell7.getAdjacentMines()).toEqual(0);
            expect(adjacentCell8.getAdjacentMines()).toEqual(0);
        });

        it("given a 3x3 board, when mine at 3, then cells adjacent to mine have one adjacent mine", function() {
            let mineLocations = [3];
            board.addMines(mineLocations);

            let adjacentCell0 = board.getCells()[0];
            let adjacentCell1 = board.getCells()[1];
            let adjacentCell2 = board.getCells()[2];
            let adjacentCell4 = board.getCells()[4];
            let adjacentCell5 = board.getCells()[5];
            let adjacentCell6 = board.getCells()[6];
            let adjacentCell7 = board.getCells()[7];
            let adjacentCell8 = board.getCells()[8];

            expect(adjacentCell0.getAdjacentMines()).toEqual(1);
            expect(adjacentCell1.getAdjacentMines()).toEqual(1);
            expect(adjacentCell4.getAdjacentMines()).toEqual(1);
            expect(adjacentCell6.getAdjacentMines()).toEqual(1);
            expect(adjacentCell7.getAdjacentMines()).toEqual(1);
            expect(adjacentCell2.getAdjacentMines()).toEqual(0);
            expect(adjacentCell5.getAdjacentMines()).toEqual(0);
            expect(adjacentCell8.getAdjacentMines()).toEqual(0);
        });

        it("given a 3x3 board, when mine at 4, then cells adjacent to mine have one adjacent mine", function() {
            let mineLocations = [4];
            board.addMines(mineLocations);

            let adjacentCell0 = board.getCells()[0];
            let adjacentCell1 = board.getCells()[1];
            let adjacentCell2 = board.getCells()[2];
            let adjacentCell3 = board.getCells()[3];
            let adjacentCell5 = board.getCells()[5];
            let adjacentCell6 = board.getCells()[6];
            let adjacentCell7 = board.getCells()[7];
            let adjacentCell8 = board.getCells()[8];

            expect(adjacentCell0.getAdjacentMines()).toEqual(1);
            expect(adjacentCell1.getAdjacentMines()).toEqual(1);
            expect(adjacentCell2.getAdjacentMines()).toEqual(1);
            expect(adjacentCell3.getAdjacentMines()).toEqual(1);
            expect(adjacentCell5.getAdjacentMines()).toEqual(1);
            expect(adjacentCell6.getAdjacentMines()).toEqual(1);
            expect(adjacentCell7.getAdjacentMines()).toEqual(1);
            expect(adjacentCell8.getAdjacentMines()).toEqual(1);
        });

        it("given a 3x3 board, when mine at 5, then cells adjacent to mine have one adjacent mine", function() {
            let mineLocations = [5];
            board.addMines(mineLocations);

            let adjacentCell0 = board.getCells()[0];
            let adjacentCell1 = board.getCells()[1];
            let adjacentCell2 = board.getCells()[2];
            let adjacentCell3 = board.getCells()[3];
            let adjacentCell4 = board.getCells()[4];
            let adjacentCell6 = board.getCells()[6];
            let adjacentCell7 = board.getCells()[7];
            let adjacentCell8 = board.getCells()[8];

            expect(adjacentCell0.getAdjacentMines()).toEqual(0);
            expect(adjacentCell1.getAdjacentMines()).toEqual(1);
            expect(adjacentCell2.getAdjacentMines()).toEqual(1);
            expect(adjacentCell3.getAdjacentMines()).toEqual(0);
            expect(adjacentCell4.getAdjacentMines()).toEqual(1);
            expect(adjacentCell6.getAdjacentMines()).toEqual(0);
            expect(adjacentCell7.getAdjacentMines()).toEqual(1);
            expect(adjacentCell8.getAdjacentMines()).toEqual(1);
        });

        it("given a 3x3 board, when mine at 6, then cells adjacent to mine have one adjacent mine", function() {
            let mineLocations = [6];
            board.addMines(mineLocations);

            let adjacentCell0 = board.getCells()[0];
            let adjacentCell1 = board.getCells()[1];
            let adjacentCell2 = board.getCells()[2];
            let adjacentCell3 = board.getCells()[3];
            let adjacentCell4 = board.getCells()[4];
            let adjacentCell5 = board.getCells()[5];
            let adjacentCell7 = board.getCells()[7];
            let adjacentCell8 = board.getCells()[8];

            expect(adjacentCell0.getAdjacentMines()).toEqual(0);
            expect(adjacentCell1.getAdjacentMines()).toEqual(0);
            expect(adjacentCell2.getAdjacentMines()).toEqual(0);
            expect(adjacentCell3.getAdjacentMines()).toEqual(1);
            expect(adjacentCell4.getAdjacentMines()).toEqual(1);
            expect(adjacentCell5.getAdjacentMines()).toEqual(0);
            expect(adjacentCell7.getAdjacentMines()).toEqual(1);
            expect(adjacentCell8.getAdjacentMines()).toEqual(0);
        });

        it("given a 3x3 board, when mine at 7, then cells adjacent to mine have one adjacent mine", function() {
            let mineLocations = [7];
            board.addMines(mineLocations);

            let adjacentCell0 = board.getCells()[0];
            let adjacentCell1 = board.getCells()[1];
            let adjacentCell2 = board.getCells()[2];
            let adjacentCell3 = board.getCells()[3];
            let adjacentCell4 = board.getCells()[4];
            let adjacentCell5 = board.getCells()[5];
            let adjacentCell6 = board.getCells()[6];
            let adjacentCell8 = board.getCells()[8];

            expect(adjacentCell0.getAdjacentMines()).toEqual(0);
            expect(adjacentCell1.getAdjacentMines()).toEqual(0);
            expect(adjacentCell2.getAdjacentMines()).toEqual(0);
            expect(adjacentCell3.getAdjacentMines()).toEqual(1);
            expect(adjacentCell4.getAdjacentMines()).toEqual(1);
            expect(adjacentCell5.getAdjacentMines()).toEqual(1);
            expect(adjacentCell6.getAdjacentMines()).toEqual(1);
            expect(adjacentCell8.getAdjacentMines()).toEqual(1);
        });

        it("given a 3x3 board, when mine at 8, then cells adjacent to mine have one adjacent mine", function() {
            let mineLocations = [8];
            board.addMines(mineLocations);

            let adjacentCell0 = board.getCells()[0];
            let adjacentCell1 = board.getCells()[1];
            let adjacentCell2 = board.getCells()[2];
            let adjacentCell3 = board.getCells()[3];
            let adjacentCell4 = board.getCells()[4];
            let adjacentCell5 = board.getCells()[5];
            let adjacentCell6 = board.getCells()[6];
            let adjacentCell7 = board.getCells()[7];

            expect(adjacentCell0.getAdjacentMines()).toEqual(0);
            expect(adjacentCell1.getAdjacentMines()).toEqual(0);
            expect(adjacentCell2.getAdjacentMines()).toEqual(0);
            expect(adjacentCell3.getAdjacentMines()).toEqual(0);
            expect(adjacentCell4.getAdjacentMines()).toEqual(1);
            expect(adjacentCell5.getAdjacentMines()).toEqual(1);
            expect(adjacentCell6.getAdjacentMines()).toEqual(0);
            expect(adjacentCell7.getAdjacentMines()).toEqual(1);
        });

        it("given two mines added at 0 and 2, cells adjacent to both mines have two adjacent mines", function() {
            let mineLocations = [0, 2];

            board.addMines(mineLocations);

            let numberExpectedMines = 2;
            let adjacentCell1 = board.getCells()[1];
            let adjacentCell3 = board.getCells()[3];
            let adjacentCell4 = board.getCells()[4];
            let adjacentCell5 = board.getCells()[5];
            let adjacentCell6 = board.getCells()[6];
            let adjacentCell7 = board.getCells()[7];
            let adjacentCell8 = board.getCells()[8];

            expect(adjacentCell1.getAdjacentMines()).toEqual(numberExpectedMines);
            expect(adjacentCell4.getAdjacentMines()).toEqual(numberExpectedMines);


            numberExpectedMines = 1;
            expect(adjacentCell3.getAdjacentMines()).toEqual(numberExpectedMines);
            expect(adjacentCell5.getAdjacentMines()).toEqual(numberExpectedMines);

            numberExpectedMines = 0;
            expect(adjacentCell6.getAdjacentMines()).toEqual(numberExpectedMines);
            expect(adjacentCell7.getAdjacentMines()).toEqual(numberExpectedMines);
            expect(adjacentCell8.getAdjacentMines()).toEqual(numberExpectedMines);
        });

        it("given two mines added at 1 and 7 cells adjacent to both mines have two adjacent mines", function() {
            let mineLocations = [1, 7];

            board.addMines(mineLocations);

            let adjacentCell3 = board.getCells()[3];
            let adjacentCell4 = board.getCells()[4];
            let adjacentCell5 = board.getCells()[5];

            let numberExpectedMines = 2;
            expect(adjacentCell3.getAdjacentMines()).toEqual(numberExpectedMines);
            expect(adjacentCell4.getAdjacentMines()).toEqual(numberExpectedMines);
            expect(adjacentCell5.getAdjacentMines()).toEqual(numberExpectedMines);
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
            cell.placeMine();
            expect(cell.reveal()).toBeTruthy();
        });

        it("given cell with adjacent mines, cell adjacent number of adjacent mines", function() {
            const numberOfStartingMines = cell.getAdjacentMines();
            cell.incrementMines();
            const adjacentMines = numberOfStartingMines + cell.getAdjacentMines();
            expect(adjacentMines).toEqual(1);
        });


    });
});
