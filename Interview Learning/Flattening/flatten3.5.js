// Flatten III.5 is a follow-up of Flatten III
// Now that you have built a flatting function, we would like you to build to additional functions

// 1. getBatch
// The getBatch function returns a Promise that resolves to the item at a given index from the input array. This function allows us 
// to retrieve items asynchronously, which is useful for processing large datasets without blocking the main thread.

// 2. The getValueList function is an async function that takes a range of indices (fromIndex to toIndex) and returns a flattened 
// list of values within that range.

const inputFlatten3_5 = [
    {
        "value": "value0",
        "children": []
    },
    {
        "value": "value1",
        "children": [{
            "value": "value2",
            "children": [{
                "value": "value3",
                "children": []
            }]
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

// This recursive function takes a nested JSON structure and flattens it into a list of values.
function flattenRecursive(input, flattened = []) {
    if (Array.isArray(input)) {
        input.forEach(item => {
            const result = { value: item.value }; // Create an object with the value property.
            flattened.push(result); // Push the result into the flattened array.
            item.children.forEach(child => {
                const result = { value: child.value }; // Create an object with the child's value.
                flattened.push(result); // Push the result into the flattened array.
                flattenRecursive(child.children, flattened); // Recursively call the function on children.
            });
        });
    }
    return flattened; // Return the flattened array.
}

// This function returns a Promise that resolves to the item at a given index from the input array.
const getBatch = (index) => {
    return new Promise((resolve, reject) => {
        try {
            const item = inputFlatten3_5[index];
            resolve(item);
        } catch (error) {
            reject(error);
        }
    });
}

// This async function takes a range of indices (fromIndex to toIndex) and returns a flattened list of values within that range.
async function getValueList(fromIndex, toIndex) {
    const promises = [];
    for (let i = fromIndex; i <= toIndex; i++) {
        promises.push(getBatch(i)); // Create an array of Promises for the specified range.
    }
    try {
        const results = await Promise.all(promises); // Wait for all Promises to resolve.
        const flattened = [];
        for (const result of results) {
            flattened.push(...flattenRecursive([result])); // Flatten each result and push it into the flattened array.
        }
        return flattened; // Return the flattened list of values.
    } catch (error) {
        throw new Error(error);
    }
}

document.getElementById('flat_3_5').addEventListener('click', () => getValueList(0, 2)
    .then(flattenedValues => {
        console.log("Flattened Values:", flattenedValues);
    })
    .catch(error => {
        console.error("Error:", error);
    }));

// Flattening a nested JSON structure involves extracting all values from the structure while preserving their order. In the 
// provided code, we accomplish this task using a combination of recursive functions and Promises.

// Flatten Recursive Function:

// The flattenRecursive function takes a nested JSON structure (input) and recursively flattens it into a list of values (flattened). 
// It starts by iterating through each item in the input array. For each item, it creates an object with a value property and pushes 
// it into the flattened array. Then, it checks if the item has children and, if so, recursively calls itself on the children.

// Get Batch Function:

// The getBatch function returns a Promise that resolves to the item at a given index from the input array. This function allows us 
// to retrieve items asynchronously, which is useful for processing large datasets without blocking the main thread.

// Get Value List Function:

// The getValueList function is an async function that takes a range of indices (fromIndex to toIndex) and returns a flattened list 
// of values within that range. It achieves this by creating an array of Promises for the specified range of indices and waiting for 
// all Promises to resolve using Promise.all. Once all items are retrieved, it flattens each result using the flattenRecursive 
// function and pushes them into a final flattened array.

// By combining these functions and concepts, we can efficiently flatten a deeply nested JSON structure while ensuring the order 
// of values is preserved. This can be particularly useful in scenarios where you need to process and display hierarchical data in 
// a more manageable format.