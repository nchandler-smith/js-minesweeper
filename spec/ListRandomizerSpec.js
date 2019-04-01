describe("Randomizer Tests", function () {
    it("Given a length and maximum value return random numbers with size equal to length", function () {
        const length = 1;
        const upperBound = 1;
        const listRandomizer = new ListRandomizer();

        const actual = listRandomizer.randomizeIndices(length, upperBound);

        expect(actual.size).toEqual(length);
    });

    it("Given a length and maximum value random numbers with elements between 0 and max value", function () {
        const length = 5;
        const upperBound = 10;
        const listRandomizer = new ListRandomizer();

        const randomNumbers = listRandomizer.randomizeIndices(length, upperBound);

        const actual = Array.from(randomNumbers.values());

        expect(actual.every(number => number < upperBound)).toBe(true);
    });

    it("Given a length and maximum value return random numbers with whole number elements", function () {
        const length = 5;
        const upperBound = 10;
        const listRandomizer = new ListRandomizer();

        const randomNumbers = listRandomizer.randomizeIndices(length, upperBound);

        const actual = Array.from(randomNumbers.values());

        expect(actual.every(number => (number % 1) === 0)).toBe(true);
    });

    it("Given a length and maximum value return random numbers with no duplicate elements", function() {
        const length = 5;
        const upperBound = 5;
        const listRandomizer = new ListRandomizer();

        const actual = listRandomizer.randomizeIndices(length, upperBound);

        expect(actual.size).toEqual(length);
    });

    it("Given a length that exceeds the upper bound return random numbers of upper bound length", function() {
        let length = 10;
        let upperBound = 5;
        let listRandomizer = new ListRandomizer();

        const actual = listRandomizer.randomizeIndices(length, upperBound);

        expect(actual.size).toEqual(upperBound);
    });
});
