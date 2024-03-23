// JSON.Stringify
// Write a JavaScript function that converts a JavaScript object into a JSON-formatted string. Your function should handle objects, 
// arrays, strings, numbers, booleans, and null values.

const sampleObj = {
    name: 'Sid',
    age: 29,
    engineer: true,
    foo: null,
    expertise: ['html', 'css', 'react'],
    address: {
        city: 'New york',
        state: 'NY'
    }
};

/*
Expected output
{
"name": "Sid",
"age": 29,
"engineer": true,
"foo": null,
"expertise": ["html", "css", "react"],
"address": {
    "city": "New york",
    "state": "NY"
    }
}
*/

class MyJson {
    stringify(input) {
        // Check if the input is an array
        if (Array.isArray(input)) {
            // If it's an array, map each item to its JSON representation and join them with commas
            const item = input.map(item => {
                return this.stringify(item);
            }).join(',');
            // Wrap the result in square brackets to form an array
            return '[' + item + ']';
        } else if (typeof input === 'object' && input !== null) {
            // Check if the input is an object (excluding null)
            const keys = Object.keys(input);
            // For objects, map each key-value pair to its JSON representation and join them with commas
            const items = keys.map(key => {
                return `"${key}": ${this.stringify(input[key])}`;
            }).join(',');
            // Wrap the result in curly braces to form an object
            return '{' + items + '}';
        } else {
            // If the input is not an array or object, treat it as a string and wrap it in double quotes
            return `"${input}"`;
        }
    }
}

// Converting JavaScript objects to JSON (JavaScript Object Notation) is a common task when working with web applications, APIs, 
// or data storage. JSON is a lightweight data interchange format that is easy for both humans to read and write and machines to 
// parse and generate. In this article, we'll explore how to implement a basic JSON stringify function in JavaScript, similar to 
// the built-in JSON.stringify method.

// JSON.stringify is a JavaScript method that takes an object as input and returns its JSON representation as a string. This 
// method can handle various data types, including objects, arrays, strings, numbers, booleans, and null values. To understand 
// how it works, let's break down the provided code and see how it accomplishes this task.

// Class Definition
// class MyJSON { stringify(input) { // ... } } 
// The code defines a class called MyJSON, which contains a stringify method for converting objects to JSON strings. This method 
// takes one argument, input, which is the JavaScript object you want to convert to JSON.

// Handling Arrays
// if (Array.isArray(input)) { // ... } 
// The function first checks if the input is an array using the Array.isArray method. If it is, the code enters this block and 
// proceeds to handle arrays.
// const items = input.map(item => { return this.stringify(item); }).join(','); 
// Inside this block, the map function is used to iterate over each item in the input array. For each item, the this.stringify 
// function is recursively called to obtain its JSON representation. The resulting JSON strings are then joined together with 
// commas to form an array.
// return '[' + items + ']'; 

// Finally, the JSON array is constructed by enclosing the joined items in square brackets.

// Handling Objects
// } else if (typeof input === 'object' && input !== null) { // ... } 
// If the input is not an array but is an object (excluding null), the code enters this block and proceeds to handle objects.

// const keys = Object.keys(input); const items = keys.map(key => { return `"${key}": ${this.stringify(input[key])}`; }).join(','); 
// Here, the Object.keys method is used to obtain an array of keys from the input object. For each key, the code recursively 
// calls this.stringify to obtain the JSON representation of the corresponding value. These key-value pairs are joined together 
// with commas.

// return '{' + items + '}'; 
// Finally, the JSON object is constructed by enclosing the joined key-value pairs in curly braces.

// Handling Other Data Types
// } else { return `"${input}"`; } 

// If the input is neither an array nor an object, it is treated as a primitive data type (string, number, boolean, or null). 
// In this case, the code wraps the input in double quotes to create a JSON string representation.
// Now that we've dissected the code, you can see how it converts JavaScript objects into JSON strings. This custom 
// MyJSON.stringify function provides a simplified understanding of how the built-in JSON.stringify method works under the hood. 
// While the built-in method is highly optimized and handles additional features such as custom replacers and indentation, this 
// basic implementation serves as a valuable learning exercise for understanding the core principles of JSON serialization.

const myJson = new MyJson();

document.getElementById('jsonStringify').addEventListener('click', () => console.log(myJson.stringify(sampleObj)));