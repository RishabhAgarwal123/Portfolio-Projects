// Filtering Matching JSON (Algorithmic) [Medium, Apple]
// You are given an array of objects data, where each object represents a person with attributes like name, company, position, and 
// level. Additionally, you have a match object that specifies the criteria for finding matches based on certain attributes. Your 
// task is to implement a function findMatches that filters the data array and returns only the objects that match all the specified 
// criteria.

// Write a program that, given the data array and the match object, returns an array containing only the objects that match all the 
// criteria specified in the match object.

// Input:
// An array data containing objects representing individuals with various attributes.
// An object match that specifies the criteria for finding matches.

// Output:
// An array containing the objects from data that match all the criteria specified in the match object.

// Example:
// Input:data:
// [
//     { name: 'John', company: 'Google', position: 'Software Engineer', level: 'Entry', }, 
//     { name: 'Ann', company: 'Waymo', position: 'Product Manager', level: 'Entry', } 
// ] 
// match:
// { position: 'Product Manager', level: 'Entry', } 
// Output:
// [{ name: 'Ann', company: 'Waymo', position: 'Product Manager', level: 'Entry', }]

// Define an array of objects representing individuals with various attributes
const jsonMatchingData = [{
    name: 'John',
    company: 'Google',
    position: 'Software Engineer',
    level: 'Entry',
},
{
    name: 'Ann',
    company: 'Waymo',
    position: 'Product Manager',
    level: 'Entry',
}
];

// Define the criteria for finding matches in the data
const matchJson = {
    position: 'Product Manager',
    level: 'Entry',
};

// Implement the findMatches function to filter the data array based on the match criteria
function findMatchingJson(data, search) {
    return data.filter(row => {
        const itemKeys = Object.keys(row);
        const searchKeys = Object.keys(search);
        const allKeysAndValuesMatch = searchKeys.every(key => {
            const keysMatch = itemKeys.includes(key);
            if (!keysMatch) return false;
            const rowVal = row[key];
            const searchVal = search[key];
            return rowVal === searchVal;
        });
        return allKeysAndValuesMatch;
    });
}

// Call the findMatches function with the data and match objects, and log the resul

document.getElementById('matchingJson').addEventListener('click', () => console.log(findMatchingJson(jsonMatchingData, matchJson)));

// The provided code tackles the problem of filtering an array of objects based on specified criteria. It introduces a findMatches 
// function that takes in two parameters: data and search. The data parameter represents the array of objects to be filtered, while 
// the search parameter contains the criteria for finding matches.

// The findMatches function begins by using the filter method on the data array, allowing us to iterate through each object and 
// filter out the ones that match the specified criteria.

// Inside the filter method's callback function, the code retrieves the keys of the current object being evaluated using 
// Object.keys(row) and the keys of the search object using Object.keys(search). These keys represent the attributes that need to 
// match for an object to be considered a match.

// Next, the code uses the every method on the searchKeys array to iterate through each key and check if all keys and values match 
// between the current object and the search object. This is done using another callback function that checks if the itemKeys 
// (keys of the current object) include the current key (keysMatch = itemKeys.includes(key)). If the keys don't match, the function 
// returns false, indicating that the criteria are not met.

// If the keys match, the code retrieves the corresponding values from the current object (rowVal = row[key]) and the search object 
// (searchVal = search[key]). It then compares these values (rowVal === searchVal) to determine if they match. If they don't match, 
// the function returns false.

// The every method continues iterating through all the keys, and if all the key-value pairs match, the every method returns true, 
// indicating that the object matches the criteria.

// Finally, the filter method collects all the objects for which the every method returned true and returns them as an array, 
// representing the filtered results.

// In the provided example, the findMatches function is called with the data array and the match object. The function filters the 
// data array based on the criteria specified in the match object, which are "position: 'Product Manager'" and "level: 'Entry'". 
// The only object that satisfies both criteria is the one with the name 'Ann', so it is returned in an array.

// The code provides a reusable and flexible solution for filtering data based on specific criteria. By modifying the match object, 
// different combinations of attributes and values can be used to find matches in the data array.

// Overall, this code snippet demonstrates an approach to filter objects in an array based on specific criteria, which is a useful 
// skill to have when working with data manipulation and searching in frontend development.


// Time Complexity: The time complexity of the filter method is O(n), where n is the number of objects in the data array. 
// This is because the filter method iterates through each object in the array once. Within the filter method's callback function, 
// we perform operations such as retrieving keys, checking for key inclusion, and comparing values, all of which have a constant 
// time complexity. Therefore, the overall time complexity of the findMatches function is O(n), as it depends linearly on the size 
// of the input data.

// Space Complexity: The space complexity of the findMatches function is also O(n), where n is the number of objects in the data array. 
// This is because the function returns a new array containing the filtered objects that match the criteria. In the worst case scenario, 
// if all objects in the data array match the criteria, the returned array would have the same length as the input array. Therefore, 
// the space complexity of the function scales linearly with the input size.