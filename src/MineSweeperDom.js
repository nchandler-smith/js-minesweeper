function DomManipulation() {}

DomManipulation.prototype.init = function() {
    const form = document.createElement('form');
    const input = document.createElement('button');

    form.id = "GameBoard";
    input.id = "Cell1";
    form.appendChild(input);
    return {
        form
    }
};
