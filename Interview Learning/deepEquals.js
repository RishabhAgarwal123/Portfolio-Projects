// Deep Equals
// Write a deepEquals function that compares two inputs, inputs can be null, undefined, objects, arrays, NaN, primitives.

function deepEquals(valueOne, valueTwo) {
    // NaN
    if (Number.isNaN(valueOne) && Number.isNaN(valueTwo)) return true;

    // Undefined
    if (valueOne === 'undefined' || valueTwo === 'undefined') return valueOne === valueTwo;

    // Null
    if (valueOne === null || valueTwo === null) return valueOne === valueTwo;

    // Array
    if (Array.isArray(valueOne) && Array.isArray(valueTwo)) {
        if (valueOne.length !== valueTwo.length) return false;
        for (let i = 0; i < valueOne.length; i++) {
            if (!deepEquals(valueOne[i], valueTwo[i])) return false;
        }
        return true;
    }
    if (Array.isArray(valueOne) || Array.isArray(valueTwo)) return false;

    // Object
    if (typeof valueOne === 'object' && typeof valueTwo === 'object') {
        const objOneKeys = Object.keys(valueOne);
        const objTwoKeys = Object.keys(valueTwo);
        if (objOneKeys.length !== objTwoKeys.length) return false;
        for (const key of objOneKeys) {
            if (objTwoKeys.indexOf(key) === -1) return false;
            if (!deepEquals(valueOne[key], valueTwo[key])) return false;
        }
        return true;
    }
    if (typeof valueOne === 'object' || typeof valueTwo === 'object') return false;

    return valueOne === valueTwo;
}

// function deepEquals(valueOne, valueTwo) {: This declares a function named deepEquals that takes in two parameters, 
// valueOne and valueTwo.

// if(Number.isNaN(valueOne) && Number.isNaN(valueTwo)) {: If both valueOne and valueTwo are NaN, return true.

// if(valueOne === 'undefined' || valueTwo === 'undefined') {: If either valueOne or valueTwo is the string 'undefined', 
// return valueOne === valueTwo.

// if(valueOne === null || valueTwo === null) {: If either valueOne or valueTwo is null, return valueOne === valueTwo.

// if(Array.isArray(valueOne) && Array.isArray(valueTwo)) {: If both valueOne and valueTwo are arrays, iterate over each element 
// and check if they are deeply equal. If any element is not equal, return false. Otherwise, return true.

// if(Array.isArray(valueOne) || Array.isArray(valueTwo)) {: If only one of valueOne or valueTwo is an array, return false.

// if(typeof valueOne === 'object' && typeof valueTwo === 'object') {: If both valueOne and valueTwo are objects, compare their 
// keys and values. If any key or value is not equal, return false. Otherwise, return true.

// if(typeof valueOne === 'object' || typeof valueTwo === 'object') {: If only one of valueOne or valueTwo is an object, return false.
// return valueOne === valueTwo;: If none of the above conditions match, return whether valueOne is equal to valueTwo.