// Flattening an object in JavaScript (Algorithmic)
// Write a function that takes an object as input and flattens it so that there are no nested objects. The function should 
// return an object with all the key-value pairs of the input object, where any nested objects are flattened to a single level. 
// If a key has a value of null or undefined, it should still be included in the output object. Below are some input and expected 
// output examples:

// Input: { a: 1, b: { c: 2, d: 3, e: { f: null } }, g: 4, h: undefined } 
// Output: { a: 1, c: 2, d: 3, f: null, g: 4, h: undefined } 

// Input: { a: { b: { c: 1 }, d: { e: 2, f: 3 } } } 
// Output: { c: 1, e: 2, f: 3 } 

// Input: { a: { b: { c: { d: { e: 1 } } } } } 
// Output: { e: 1 }

// This function takes an object as input and flattens it so that there are no nested objects.
function flattenObject(input) {
    // If the input is not an object or it is null, return the input.
    if (typeof input === 'object' || input === null) {
        return input;
    }
    // Create an empty object to store the flattened key-value pairs.
    let flattened = {};
    // Loop through all the keys in the input object.
    for (const key in input) {
        // Recursively call the flattenObject function on the value of the current key.
        let result = flattenObject(input[key]);
        // If the result is an object, spread its properties into the flattened object.
        if (typeof result === 'object' && result !== null) {
            flattened = {
                ...flattened,
                ...result
            }
        }
        // If the result is not an object, assign it to the current key in the flattened object.
        else {
            flattened[key] = result;
        }
    }
    // Return the flattened object.
    return flattened;
}

// Example input object.
// let obj1 = {
//     a: 1,
//     b: {
//         c: 2,
//         d: 3,
//         e: {
//             f: null
//         }
//     },
//     g: 4,
//     h: undefined
// }

document.getElementById('flat_2').addEventListener('click', function () {
    let obj1 = {
        a: 1,
        b: {
            c: 2,
            d: 3,
            e: {
                f: null
            }
        },
        g: 4,
        h: undefined
    };

    // Call the flattenObject function
    let flattenedObj = flattenObject(obj1);

    // Log the flattened object to the console
    console.log(flattenedObj);
});

// The flattenObject function takes an input object and returns a new object with all the keys flattened. The input object can be 
// nested with any level of nesting, but the function will return a flattened object with all the keys at the top level.

// The function starts by checking if the input is an object and not null. If it is not an object, the function simply returns the 
// input. Otherwise, it initializes an empty object that will hold the flattened keys.

// The function then loops through each key in the input object. For each key, it recursively calls the flattenObject function on 
// the value of that key. This ensures that all nested objects are flattened as well.

// If the result of the recursive call is an object, the function merges it with the flattened object using the spread operator. 
// If the result is not an object, it simply adds it as a key-value pair to the flattened object.

// Finally, the function returns the flattened object with all the keys at the top level.