// Flatten With Depth Recursively and Iteratively.

// Implement a function that can flatten a given array with nested sub-arrays. The function should accept two parameters: 
// the first parameter is the array to be flattened, and the second parameter is the depth of the nested sub-arrays to be flattened. 
// Implement the same function both recursively and iteratively.

function flatRecursively(arr, depth = 0) {
    const results = [];
    // Check if the input array is an array and the depth is greater than or equal to 0
    if (Array.isArray(arr) && depth >= 0) {
        depth--;
        // If so, loop through the input array and call flatRecursively on each item.
        // The depth is decreased by one for each recursive call.
        // The spread operator is used to push each item returned by the recursive call into the results array.
        arr.forEach(item => results.push(...flatRecursively(item, depth)));
    } else {
        // If the input array is not an array or the depth is less than 0, push the array into the results array.
        results.push(arr);
    }
    // Return the flattened results array.
    return results;
}

function flatItertively(arr, depth = 0) {
    const results = [];
    // Create a new array with each item in the input array and its corresponding depth.
    const arrWithDepths = arr.map(item => ([item, depth]));
    // Initialize a stack with the array with depths.
    const stack = [...arrWithDepths];

    while (stack.length) {
        // Get the next item and its depth from the stack.
        let [current, depth] = stack.shift();

        if (Array.isArray(current) && depth > 0) {
            // If the item is an array and the depth is greater than 0, loop through the array and add each item to the stack
            // with its depth decreased by 1.
            current.forEach(item => {
                depth--;
                stack.push([item, depth]);
            })
        } else {
            // If the item is not an array or the depth is less than or equal to 0, push the item into the results array.
            results.push(current)
        }
    }
    // Return the flattened results array.
    return results;
}

// TESTS
function callRecursive() {
    alert(`Input: ([1, [2], [3, [4]]], 0) \nOutput: ${flatRecursively([1, [2], [3, [4]]], 0)}`) // [1, [2], [3, [4]]]
    alert(`Input: ([1,[2],[3,[4]]], 1) \nOutput: ${flatRecursively([1, [2], [3, [4]]], 1)}`) // [1, 2, 3, [4]]
    alert(`Input: ([1,[2],[3,[4]]], 2), 0) \nOutput: ${flatRecursively([1, [2], [3, [4]]], 2)}`) // [1, 2, 3, 4] 
}

function callIteratively() {
    alert(`Input: ([1, [2], [3, [4]]], 0)) \nOutput: ${flatItertively([1, [2], [3, [4]]], 0)}`) // [1, 2, 3, [4]]
    alert(`Input: ([1, [2], [3, [4]]], 1) \nOutput: ${flatItertively([1, [2], [3, [4]]], 1)}`) // [1, 2, 3, [4]]
    alert(`Input: ([1, [2], [3, [4]]], 2) \nOutput: ${flatItertively([1, [2], [3, [4]]], 2)}`) // [1, [2], [3, [4]]]
}

document.getElementById('flat_1_5_iterative').addEventListener('click', () => callIteratively());
document.getElementById('flat_1_5_recursive').addEventListener('click', () => callRecursive());

// The flatRecursively function is a recursive function that takes an array and a depth parameter and flattens the array to 
// the specified depth. It starts by defining an empty array called results. It checks if the input array is an array and if 
// the depth is greater than or equal to 0. If both conditions are true, it decrements the depth variable. It then iterates 
// over each item in the input array using the forEach method. If the current item is an array and the depth is greater than 
// or equal to 0, it calls the flatRecursively function with the current item and the decremented depth value and spreads the 
// returned array into the results array. If the current item is not an array, it pushes the current item into the results array. 
// The function then returns the results array.

// The flatIteratively function is an iterative function that takes an array and a depth parameter and flattens the array to the 
// specified depth. It starts by defining an empty array called results. It uses the map method to create a new array with each 
// element in the input array and its corresponding depth value. It then defines a new array called stack and assigns it the 
// elements of the new array created by the map method. It starts a while loop that runs as long as the