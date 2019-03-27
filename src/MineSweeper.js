function Board() {
    this.numberOfCells = 1;
}

function Cell() {
    this.hasMine = false;
}

Cell.prototype.reveal = function() {
    return this.hasMine;
};

Cell.prototype.placeMine = function() {
    this.hasMine = true;
}