describe("Testing DOM manipulation", function() {
    it("when init then have a button with no text", function() {
        dom = new DomManipulation();

        const button = document.createElement('button');
        button.id = "Cell1";
        const form = document.createElement('form');
        form.id = "GameBoard";
        form.appendChild(button);

        expect(dom.init().form).toEqual(form);
    });

    it("given a cell with a mine, when revealed, button has * as text", function() {
        dom = new DomManipulation();
        const activeCellLocation = 0;

        const desiredCell = document.createElement('button');
        desiredCell.id = "Cell1";
        desiredCell.value = "";

        // replace next two lines with listener spoof logic
        dom.board.addMines();
        dom.board.revealCell(activeCellLocation);

        expect(desiredCell.value).toEqual("*");


    });
});