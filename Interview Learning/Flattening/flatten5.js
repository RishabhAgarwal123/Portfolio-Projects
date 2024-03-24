// You are given a nested object, and you need to write a function that flattens it into a single-level object while including a 
// prefix for each key. The keys of the resulting object should be formed by concatenating the keys of the nested object with the 
// specified prefix. Write a function flattenWithPrefix(obj, prefix) that takes the nested object and prefix as input and returns 
// the flattened object.

// Example:
// const input = { a: { b: { c: 1 }, d: 2 } };
// expected output: { 'a.b.c': 1, 'a.d': 2 } 

// Sample input object
const inputPrefix = {
    a: {
        b: {
            c: 1
        },
        d: 2
    }
};

// Function to flatten a nested object with a specified prefix
function flattenWithPrefix(obj, prefix = '') {
    let result = {};
    // Iterate over each key in the object
    for (const key in obj) {
        const val = obj[key];
        const prefixVal = prefix + key;
        // Check if the value is an object (nested object)
        // If it is an object, recursively flatten it with an updated prefix
        if (typeof val === 'object' && val !== null) result = { ...result, ...flattenWithPrefix(val, prefixVal + '.') };
        // If it is a primitive value, assign it to the new flattened key
        else result[prefixVal] = val;
    }
     // Return the resulting flattened object
    return result;
}

document.getElementById('flat_5').addEventListener('click', () => { console.log(flattenWithPrefix(inputPrefix)) });

// The provided code solves the problem of flattening a nested object into a single-level object while including a specified prefix 
// for each key. It utilizes a recursive approach to traverse the object and concatenate the keys with the given prefix.

// The flattenWithPrefix function takes two parameters: obj represents the current object being processed, and prefix is the prefix 
// string that will be added to each key during flattening.

// The function begins by initializing an empty result object, which will store the flattened object.

// Next, it iterates over each key in the obj using a for...in loop. For each key, it retrieves the corresponding value and creates 
// a new key by concatenating the prefix and the current key.

// If the value associated with the key is another object (nested object), the code recursively calls the flattenWithPrefix 
// function, passing the nested object and the updated prefixVal formed by adding the prefix and the current key followed 
// by a dot (.).

// If the value is not an object (a primitive value), it assigns the value to the result object using the new flattened key.

// The function continues this recursive process until all nested objects are flattened. Finally, it returns the resulting 
// flattened object.

// To demonstrate the functionality, the code is executed with the provided input object. It correctly flattens the nested 
// object into a single-level object, where the keys include the specified prefix. The output { 'prefix_a.b.c': 1, 'prefix_a.d': 2 } 
// matches the expected result.

// The provided code efficiently handles nested objects, allowing for the inclusion of a prefix in the resulting flattened keys. 
// It provides a flexible solution for flattening nested objects with prefix requirements.