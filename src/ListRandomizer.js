function ListRandomizer() {
}

ListRandomizer.prototype.randomizeIndices = function (size, upperBound) {
    const randomSet = new Set();
    const limit = size > upperBound ? upperBound : size;

    while (randomSet.size < limit) {
        randomSet.add(Math.floor(Math.random() * upperBound));
    }

    return randomSet;
};