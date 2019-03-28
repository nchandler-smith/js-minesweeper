describe("Testing DOM manipulation", function() {
    it("when init then have a button with no text", function() {
        let dom = new DomManipulation();

        const button = document.createElement('button');
        button.id = "Cell1";
        const form = document.createElement('form');
        form.id = "GameBoard";
        form.appendChild(button);

        expect(dom.init().form).toEqual(form);
    });

    it("given a cell with a mine, when revealed, button has * as text", function() {


        /*let cellDOM = DomManipulation.cell("cell1");

        let newCell = new Cell();
        let board = new Board(1);
        board.addCells(newCell);
        board.addMines();

        // Create some sort of binding between cell.value and our newCell
        cellDOM.addEventListener("click", ()=> {
            board.revealCell(0);
        });*/
        let dom = new DomManipulation();
        let form = dom.init().form[0];
        document.body.appendChild(form);
        let cellDOM = document.getElementById("Cell1");

        cellDOM.click();

        expect(cellDOM.value).toEqual("*");


    });
});