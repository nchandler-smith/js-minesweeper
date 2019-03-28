function DomManipulation() {}

DomManipulation.prototype.init = function() {
    const form = document.createElement('form');
    const input = document.createElement('button');

    form.id = "GameBoard";
    input.id = "Cell1";
    // build out board with cell(s)

    input.addEventListener("click", () => {
        // call board reveal
    });
    form.appendChild(input);
    return {
        form
    }
};

