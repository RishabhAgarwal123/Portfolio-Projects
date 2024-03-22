// Flattening a Nested Object Structure in JavaScript

// Imagine you're building a frontend application that needs to display a hierarchical list of items. Each item can have children, 
// forming a nested structure. However, you want to display these items in a flat list without losing their relationships. Your task 
// is to create a function that takes a nested structure as input and returns a flattened array of objects, preserving the original 
// order of items.

// Input Examples:
// Example 1
const input1 = [
    {
        "value": "value0",
        "children": []
    },
    // ... other items ...
];

/// Expected output
// Example 1
const output1 = [
    { "value": "value0" },
    // ... other items ...
];

// Example 2
const input2 = [
    {
        "value": "value1",
        "children": [
            {
                "value": "value2",
                "children": [
                    {
                        "value": "value3",
                        "children": []
                    }
                ]
            },
            {
                "value": "value4",
                "children": []
            }
        ]
    },
    // ... other items ...
];

/// Expected output
// Example 2
const output2 = [
    { "value": "value1" },
    { "value": "value2" },
    { "value": "value3" },
    { "value": "value4" },
    // ... other items ...
];

// Given input data representing a nested structure
const input = [
    {
        "value": "value0",
        "children": []
    },
    {
        "value": "value1",
        "children": [
            {
                "value": "value2",
                "children": [
                    {
                        "value": "value3",
                        "children": []
                    }
                ]
            },
            {
                "value": "value4",
                "children": []
            }
        ]
    },
    {
        "value": "value5",
        "children": []
    }, {
        "value": "value6",
        "children": []
    }
];

// Function to recursively flatten the nested structure
function flattenRecursively(input, flattened = []) {
    if (Array.isArray(input)) {
        // Loop through each item in the input array
        input.forEach(item => {
            // Create an object with the "value" property
            const result = { value: item.value };
            // Push the object to the flattened array
            flattened.push(result);
            // Loop through the children of the current item
            item.children.forEach(child => {
                // Create an object with the child's "value" property
                const result = { value: child.value };
                // Push the object to the flattened array
                flattened.push(result);
                // Recursively call the function to process child's children
                flattenRecursively(child.children, flattened);
            });
        });
    }
    return flattened;
}

// Function to recursively flatten the nested structure (alternative approach)
function flattenRecursive2(input) {
    const flattened = [];
    // Recursive function to process nodes
    const process = (item) => {
        // Create an object with the "value" property
        const result = { value: item.value };
        // Push the object to the flattened array
        flattened.push(result);
        // Recursively process children
        item.children.forEach(child => process(child));
    }
    // Loop through input items and process them
    input.forEach(item => process(item));
    return flattened;
}

// Function to flatten the nested structure using Depth-First Search (DFS)
function flattenDFS(input) {
    // Check if input is undefined or null
    if (input === undefined || input === null) {
        return [];
    }
    // Create a queue containing the input elements
    const Q = [...input];
    const output = [];
    // Process nodes in the queue
    while (Q.length > 0) {
        // Dequeue a node from the front of the queue
        const node = Q.shift();
        // Check if node is undefined or null
        if (node === undefined || node === null) {
            continue;
        }
        // Push the node's value to the output array
        output.push({ value: node.value });
        // Add the children of the node to the front of the queue in reverse order
        for (let i = node.children.length; i >= 0; i--) {
            Q.unshift(node.children[i]);
        }
    }
    return output;
}

const testAllRecursiveFunctions = () => {
    flattenRecursively(input).forEach((obj, index) => {
        console.log(`Using FlattenRecursively1: Object ${index + 1}:`, obj);
    });
    console.log('-------------------------------------')
    flattenRecursive2(input).forEach((obj, index) => {
        console.log(`Using FlattenRecursively2: Object ${index + 1}:`, obj);
    });
    console.log('-------------------------------------')
    flattenDFS(input).forEach((obj, index) => {
        console.log(`Using FlattenDFS: Object ${index + 1}:`, obj);
    });
}

document.getElementById('flat_3').addEventListener('click', () => testAllRecursiveFunctions());

// 1. Recursive Flattening (flattenRecursively):
// The flattenRecursive function uses a recursive strategy to traverse the input nested structure. It iterates through each item 
// in the array and creates a new object with the "value" property. It then recursively processes the children of each item, 
// appending their "value" properties to the flattened array. This approach maintains the order of items but relies on recursion, 
// which can be resource-intensive for deeply nested structures.

// 2. Depth-First Search (flattenDFS):
// The flattenDFS function uses an iterative approach to mimic a depth-first search traversal. It starts with a queue (Q) containing 
// the root-level items. The loop continues until the queue is empty. At each iteration, a node is dequeued from the front of the 
// queue, and its "value" is added to the output array. The children of the node are then added to the front of the queue in reverse 
// order. This approach also preserves the order of items and avoids recursion, making it memory-efficient.

// 3. Improved Recursive Flattening (flattenRecursive2):
// The flattenRecursiveV2 function takes an alternative recursive approach. It defines a nested process function to handle the 
// recursion. For each item, it creates an object with the "value" property and pushes it to the flattened array. Then, it 
// recursively processes the children of the item. This approach maintains order, similar to the other methods, while avoiding 
// the use of an external accumulator variable.

// In conclusion, the problem of flattening a nested structure involves multiple strategies, each with its trade-offs in terms of 
// recursion, memory efficiency, and code simplicity. Depending on the size of the data and the performance requirements, you can 
// choose the approach that best suits your needs. The provided code samples demonstrate various ways to tackle this problem in 
// JavaScript.