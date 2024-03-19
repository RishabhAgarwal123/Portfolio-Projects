// Object Path By Key:-
// You are given an object that contains nested objects, and your task is to implement a function that finds the path to a 
// specified property within the object structure. The path is an array of keys representing the sequence of properties to reach 
// the desired property. If the property is not found, the function should return null.

const obj = {
    a: 1,
    b: 2,
    h: {
        i: 2
    },
    c: {
        d: {
            e: 3,
            f: {
                g: 4
            }
        }
    }
}

// Function to find the path to a property within a nested object
function findPath(obj, lookup, path = []) {
    // Iterate through each property in the current object
    for (const key in obj) {
        const val = obj[key];

        // Check if the current property matches the target lookup
        if (lookup === key) {
            // Return the path array if the property is found
            return path;
        }

        // Check if the property's value is of type 'object'
        if (typeof val === 'object') {
            // Recursively call the function with the nested object and update the path
            let result = findPath(val, lookup, path.concat(key));
            // If a result is found through recursion, return it
            if (result) {
                return result;
            }
        }
    }

    // If the property is not found, return null
    return null;
}

// Test the function by searching for property 'g' within the object
document.getElementById('objectPath').addEventListener('click', () => alert(findPath(obj, 'g')));

// The provided code defines a function findPath that searches for a specified property within a nested object structure and returns 
// the path leading to that property. Here's a step-by-step explanation of how the function works:

// 1. The object obj contains a nested structure with various properties, including nested objects.
// 2. The findPath function takes three parameters:
//     obj: The current object being searched.
//     lookup: The target property to find.
//     path: An array that stores the path to the current location in the object.
// 1. The function iterates through each property of the current object using a for...in loop.
// 2. For each property, the function checks if the property matches the lookup value.
//     If there's a match, the function returns the current path, which is an array representing the sequence of keys that lead to 
//     the desired property.
//     If there's no match, the function proceeds to check if the property's value is of type 'object'. If it is, the function 
//     recursively calls itself with the nested object and appends the current key to the path array.
// 1. The recursion continues until either the target property is found, or the entire nested structure has been searched.
// 2. If the target property is not found, the function returns null.
// 3. The function is tested with findPath(obj, 'e'), which searches for the property 'e' within the nested structure.

// Summary:
// The findPath function efficiently searches through the nested object structure and returns the path to a specified property if 
// found. It utilizes recursion to navigate through the nested objects, and the result is an array that indicates the path to the 
// target property. If the property is not found, the function returns null.