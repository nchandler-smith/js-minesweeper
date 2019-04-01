function ListRandomizer() {
}

ListRandomizer.prototype.randomizeIndices = function (size, upperBound) {
    const randomNumbers = new Set();
    const limit = size > upperBound ? upperBound : size;

    while (randomNumbers.size < limit) {
        randomNumbers.add(Math.floor(Math.random() * upperBound));
    }

    return randomNumbers;
};