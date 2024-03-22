// Merge Sorted Arrays[Algorithmic] - (Easy, Tiktok]
// Given an array of arrays containing integers, write a function merge(arrList) that merges all the integers from the nested 
// arrays into a single flat array and returns the sorted array in ascending order.

/*
Input:
merge(
    [
        [1, 1, 1, 100, 1000, 10000],
        [1, 2, 2, 2, 200, 200, 1000],
        [1000000, 10000001],
        [2, 3, 3]
    ]
)

Output:
[1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 100, 200, 200, 1000, 1000, 10000, 1000000, 10000001]
*/

// The merge function takes an array of arrays as input and returns a sorted, flat array.
function mergeSortedArray(arrList) {
    const flatList = [];
    // Iterate through each item in the array
    arrList.forEach(item => {
        if (Array.isArray(item)) {
            // If the item is an array, recursively call merge to flatten it
            let result = mergeSortedArray(item);
            flatList.push(...result); // Push the flattened result into the flatList
        } else flatList.push(item); // If the item is an integer, push it to the flatList
    });
    // Return the sorted flatList
    return flatList.sort((a, b) => a - b);
}

function callMergeSortedArray() {
    const arr = [
        [1, 1, 1, 100, 1000, 10000],
        [1, 2, 2, 2, 200, 200, 1000],
        [1000000, 10000001],
        [2, 3, 3]
    ];
    const res = mergeSortedArray(arr);
    return alert(`Input is: [
        [1, 1, 1, 100, 1000, 10000],
        [1, 2, 2, 2, 200, 200, 1000],
        [1000000, 10000001],
        [2, 3, 3]
    ]\nOutput is: ${res}`)
}


document.getElementById('mergeSorted').addEventListener('click', () => callMergeSortedArray())