// Can you implement the Array methods - myMap(), myFilter(), and myReduce() - using Array.prototype in JavaScript. 
// They should mimic the native, .map, .reduce, .filter javascript functions.

const map = document.getElementById('map');
const filter = document.getElementById('filter');
const reduce = document.getElementById('reduce');

let arr = [1, 2, 3, 5, 6];

// Define myMap function on Array prototype
Array.prototype.myMap = function (callback) {
    // Create an empty array to store mapped items
    const mappedItems = [];
    // Loop through each item in the array
    for (let i = 0; i < this.length; i++) {
        // Call the callback function on the current item, index, and the array itself
        // Push the result of the callback function to the mappedItems array
        mappedItems.push(callback(this[i], i, this));
    }
    // Return the mappedItems array
    return mappedItems;
}

// Define myFilter function on Array prototype
Array.prototype.myFilter = function (callback) {
    // Create an empty array to store filtered items
    const filtered = [];
    // Loop through each item in the array
    for (let i = 0; i < this.length; i++) {
        const item = this[i];
        // Call the callback function on the current item, index, and the array itself
        // If the result of the callback function is true, push the current item to the mappedItems array
        if (callback(item, i, this) === true) filtered.push(item);
    }
    // Return the filtered items
    return filtered;
}

// Define myReduce function on Array prototype
Array.prototype.myReduce = function (callback, initialValue = 0) {
    // Initialize an accumulator variable with the initial value if provided, otherwise set it to the first element in the array
    let acc = initialValue;
    // If the initial value was not provided and this is the first item, set the accumulator to the current item
    // Otherwise, call the callback function on the accumulator, current item, index, and the array itself
    for (let i = 0; i < this.length; i++) {
        let item = this[i];
        if (i === 0 && initialValue === null) acc = item;
        else acc = callback(acc, item, i, this);
    }
    // Return the final value of the accumulator
    return acc;
}

let mapResult = arr.myMap((element, index) => element += index);
let filterResult = arr.myFilter((element, index) => element <= 5);
let reducedResult = arr.myReduce((total, element) => total + element);

map.addEventListener('click', () => alert(`Input: ${arr} \nResult from map: ${mapResult}`));
filter.addEventListener('click', () => alert(`Input: ${arr} \nResult from filter: ${filterResult}`));
reduce.addEventListener('click', () => alert(`Input: ${arr} \nResult from reduced: ${reducedResult}`));

// This code defines three custom functions (myMap, myFilter, and myReduce) on the prototype of the built-in Array object in 
// JavaScript. These functions mimic the behavior of their built-in counterparts: Array.prototype.map, Array.prototype.filter, 
// and Array.prototype.reduce, respectively.

// The myMap function takes a callback function as its argument and calls that function on each element of the array. The result 
// of the callback function is added to a new array, which is returned after all elements have been processed.

// The myFilter function also takes a callback function as its argument and calls that function on each element of the array. 
// If the result of the callback function is true, the current element is added to a new array. The new array is returned after 
// all elements have been processed.

// The myReduce function takes two arguments: a callback function and an optional initial value. The callback function is called 
// on each element of the array, with the accumulator and the current element passed as arguments. The result of the callback 
// function is used as the new accumulator value for the next iteration. The final value of the accumulator is returned after all 
// elements have been processed.

// Finally, the code demonstrates how to use these custom functions to map, filter, and reduce an array of numbers. The mappedArray 
// contains the result of adding each element to its index. The filteredArray contains only the elements less than. 
// The reducedArray contains the sum of all elements in the array.