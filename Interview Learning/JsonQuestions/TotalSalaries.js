// Total Salaries - (Algorithmic) - [Medium - FAANG]
// You are tasked with creating a function that calculates the total salary amount for all employees within a company's organizational 
// structure.The company's structure is represented as a nested object, where each department contains employees' salary information. 
// Your goal is to traverse this nested structure and compute the total sum of all employee salaries across all departments and
// sub - departments.

//     Input:
// data: A nested object representing the company's organizational structure. Each department contains an array of employees, where each employee is represented as an object with a name and salary property.
// Output:
// An integer representing the total sum of all employee salaries in the company.

// Example:
// const company = {
//     sales: [
//         { name: "John", salary: 1000 },
//         { name: "Alice", salary: 1600 }
//     ],
//     development: {
//         sites: [
//             { name: "Peter", salary: 2000 },
//             { name: "Alex", salary: 1800 }
//         ],
//         internals: [
//             { name: "Jack", salary: 1300 }
//         ]
//     }
// };
// const totalSalaries = calculateTotalSalaries(company); console.log(totalSalaries); // Output: 7700 


// FUNCTION SIGNATURE:
// function calculateTotalSalaries(data) { // Your code here }

let company = {
    // the same object, compressed for brevity
    sales: [
        { name: "John", salary: 1000 },
        { name: "Alice", salary: 1600 }
    ],
    development: {
        sites: [
            { name: "Peter", salary: 2000 },
            { name: "Alex", salary: 1800 }
        ],
        internals: [{ name: "Jack", salary: 1300 }]
    }
};

function getTotalSalaries(data) {
    let flatList = [];

    if (Array.isArray(data)) flatList.push(...flattenArraySalaries(data));
    else if (typeof data === 'object') flatList.push(...flattenObjSalaries(data));
    else flatList.push(data);

    return flatList.reduce((acc, item) => acc += item);
}

function flattenArraySalaries(data) {
    let flatList = [];

    if (Array.isArray(data)) data.forEach(item => flatList.push(...flattenArraySalaries(item)));
    else if (typeof data === 'object') {
        for (let key in data) {
            if (key == 'salary') flatList.push(...flattenObjSalaries(data[key]));
        }
    } else flatList.push(data);

    return flatList;
}

function flattenObjSalaries(data) {
    let flatList = [];

    if (Array.isArray(data)) flatList.push(...flattenArraySalaries(data));
    else if (typeof data === 'object') {
        for (let key in data) {
            flatList.push(...flattenObjSalaries(data[key]));
        }
    }
    else flatList.push(data);

    return flatList;
}

document.getElementById('totalSalaries').addEventListener('click', () => console.log(getTotalSalaries(company)));

// This code addresses the problem of calculating the total sum of all employee salaries in a company's organizational structure. 
// It employs a recursive approach to traverse the nested structure and accumulate salary values. Here's a step-by-step 
// explanation of how the code works:

// Main Function (calculateTotalSalaries):
// The function takes the input object data as a parameter.
// Flattening Process using Helper Function (flatten):
// Inside the main function, a helper function named flatten is defined.
// This function recursively traverses the nested structure.
// Flattening Arrays and Objects:
// If the data is an array, the flatten function iterates through each item and makes a recursive call.
// If the data is an object, the function iterates through its properties using a for...in loop.
// If the property key is "salary", the salary value is pushed into the flatSalaries array.
// If the property key is not "salary", the function makes a recursive call with the property's value.
// Calculating Total Salaries:
// After the flatten function has collected all the salary values, the main function calculates the total sum using the reduce method.
// Test and Output:
// The provided company data is used to test the function.
// The total sum of all employee salaries is logged to the console.
// In conclusion, this code provides a solution to calculate the total sum of all employee salaries within a company's 
// organizational structure. The recursive approach effectively handles the nested structure, allowing the code to traverse 
// through departments and sub-departments to accumulate the salary values.