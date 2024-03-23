// JSON Conversion - (Algorithmic) - [Medium - Robinhood]
// You are given a nested object, and your task is to create a function that flattens this object while appending prefixes to the 
// keys. The prefixes should be constructed by joining the keys of the nesting hierarchy using periods ('.'). The function should 
// return a new object where the keys are the flattened keys with prefixes, and the values are the corresponding values from the 
// input object.

// You are given a nested object, and your task is to create a function that flattens this object while appending prefixes to the 
// keys. The prefixes should be constructed by joining the keys of the nesting hierarchy using periods ('.'). The function should 
// return a new object where the keys are the flattened keys with prefixes, and the values are the corresponding values from the 
// input object.

// Input:
// obj: The input nested object to be flattened.
// prefix (optional): A string representing the current prefix. This parameter is used during recursion to accumulate the prefix 
// from the nested keys.
// Output:
// A new object where keys are flattened keys with prefixes, and values are corresponding values from the input object.

// Examples:
// Input
// const input = { a: { b: { c: 1 }, d: 2 } }; 
// Output: { "a.b.c": 1, "a.d": 2 } 
// Input:
// const input = { x: { y: 10, z: { w: 20 } } }; 
// Output: { "x.y": 10, "x.z.w": 20 }

// Define the main function to flatten nested objects with prefixes
function flattenWithPrefix(obj, prefix = '') {
    let result = {};
    // Iterate through each key-value pair in the object
    for (const key in obj) {
        const val = obj[key];
        const prefixVal = prefix + key;
        // If the value is an object, recursively flatten it with the updated prefix
        if (typeof val === 'object') {
            result = { ...result, ...flattenWithPrefix(val, prefixVal + '.') };
        } else {
            // If the value is not an object, assign it to the flattened key with prefix
            result[prefixVal] = val;
        }
    }

    return result;
}

// Test the function with the provided input
const inputJsonConversion = {
    a: {
        b: {
            c: 1
        },
        d: 2
    }
};

document.getElementById('jsonConversion').addEventListener('click', () => console.log(flattenWithPrefix(inputJsonConversion)));