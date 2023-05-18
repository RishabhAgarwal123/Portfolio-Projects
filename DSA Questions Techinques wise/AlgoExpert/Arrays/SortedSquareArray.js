// Write a function that takes in a non-empty array of integers that are sorted
// in ascending order and returns a new array of the same length with the squares
// of the original integers also sorted in ascending order.

// Input = [1, 2, 3, 5, 6, 8, 9]
// Output: [1, 4, 9, 25, 36, 64, 81]

function sortedSquaredArray(array) {
    const sortedSquares = new Array(array.length).fill(0);
    let smallIndex = 0;
    let largeIndex = array.length - 1;

    for (let i = array.length - 1; i >= 0; i--) {
        const smallValue = array[smallIndex];
        const largeValue = array[largeIndex];

        if (Math.abs(smallValue) > Math.abs(largeValue)) {
            sortedSquares[i] = smallValue * smallValue;
            smallIndex += 1;
        } else {
            sortedSquares[i] = largeValue * largeValue;
            largeIndex -= 1;
        }
    }
    return sortedSquares;
}