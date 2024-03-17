// Flatten Any Input(Objects, Arrays, Primitives)

// Write a function that takes an arbitrarily nested object or array and returns a flattened version of it.

// For example:

// flatten([1, [2, 3], [[4, 5], 6]]) should return [1, 2, 3, 4, 5, 6]
// flatten({ a: 1, b: { c: 2, d: { e: 3 } } }) should return { a: 1, c: 2, e: 3 }
// flatten([1, { a: 2, b: [3, 4] }, [5, { c: 6 }]]) should return [1, 2, 3, 4, 5, 6]
// flatten([[[[[[[[[[1]]]]]]]]]]) should return [1]
// flatten(null) should return null

function flatten(value) {
    if (typeof value !== 'object' || value === null) { // if value is not an object or is null, return the value as is
        return value;
    }
    if (Array.isArray(value)) { // if value is an array, call flattenArray on it
        return flattenArray(value)
    }
    return flattenObject(value) // otherwise, call flattenObject on it
}

function flattenArray(input, flattened = []) {
    // Takes an array and an optional empty flattened array
    if (Array.isArray(input)) {
        // If input is an array
        input.forEach(item => flattenArray(item, flattened)); // Recursively call flattenArray on each item in the array
    } else if (typeof input === 'object' && input !== null) {
        // If input is an object and not null
        let flattenedObj = flattenObject(input); // Call flattenObject on the input
        if (Array.isArray(Object.values(flattenedObj))) {
            flattened.push(flatten(Object.values(flattenedObj))); // Push the result to the flattened array
        }
    } else {
        // If the input is not an array or an object, push the input to the flattened array
        flattened.push(input);
    }
    return flattened; // Return the flattened array
}

function flattenObject(input) { // takes an object
    let flattenObj = {}; // initialize an empty object
    for (let key in input) { // loop through each key in the object
        let value = input[key];  // get the value for the current key
        let flattenedValue = flatten(value);  // recursively call flatten on the value
        if (typeof flattenedValue === 'object' && flattenedValue !== null && !Array.isArray(flattenedValue)) { // if the flattened value is an object and not an array
            flattenObj = { ...flattenObj, ...flattenedValue }; // merge the flattened value into the flattenedObj using the spread operator
        } else { // if the flattened value is not an object or is an array
            flattenObj[key] = flattenedValue; // set the flattened value as the value for the current key in flattenedObj
        }
    }
    return flattenObj; // return the flattened object
}

const callFlatten = () => {
    // console.log(`Input is ${[1, [2, 3], [[4, 5], 6]]}: `, flatten([1, [2, 3], [[4, 5], 6]])) // should return [1, 2, 3, 4, 5, 6]
    // console.log(`Input is ${`{ a: 1, b: { c: 2, d: { e: 3 } } }`}: `, flatten({ a: 1, b: { c: 2, d: { e: 3 } } })) // should return { a: 1, c: 2, e: 3 }
    console.log(`Input is [1, { a: 2, b: [3, 4] }, [5, { c: 6 }]]: `, flatten([1, { a: 2, b: [3, 4] }, [5, { c: 6 }]])) // should return [1, 2, 3, 4, 5, 6]
    // console.log(`Input is ${[[[[[[[[[[1]]]]]]]]]]}: `, flatten([[[[[[[[[[1]]]]]]]]]])) // should return [1]
    // console.log(`Input is ${null}: `, flatten(null)) // should return null
}

document.getElementById('flat_4').addEventListener('click', () => callFlatten());