// Excluding Items Based on Criteria
// Write a function excludeItems that takes in an array of items and an array of exclusion criteria. The function should exclude 
// items from the original array based on the specified criteria and return the filtered array.

// Input:
// items (array of objects): An array of items, where each item is represented as an object with properties such as color, type, 
// and age.
// excludes (array of objects): An array of exclusion criteria, where each criterion is represented as an object with 
// properties k and v. The k the property represents the key (property name) to exclude, and the v the property represents the 
// corresponding value to exclude.

// Output:
// Returns an array of items that do not match the specified exclusion criteria.

// Example:
// const items = [ {color: 'red', type: 'tv', age: 18}, {color: 'silver', type: 'phone', age: 20}, {color: 'blue', type: 'book', age: 17} ]; 
// const excludes = [ {k: 'color', v: 'blue'}, {k: 'type', v: 'phone'} ]; 
// console.log(excludeItems(items, excludes)); // Output: [{color: 'red', type: 'tv', age: 18}]

let itemsList = [
    { color: 'red', type: 'tv', age: 18 },
    { color: 'silver', type: 'phone', age: 20 },
    { color: 'blue', type: 'book', age: 17 }
];

const excludes = [
    { k: 'color', v: 'blue' },
    { k: 'type', v: 'phone' },
];

function excludeItems(items, excludes) {
    // Helper function to build the exclusion map based on the excludes array
    function buildExclusionMap() {
        const map = {};
        excludes.forEach(item => {
            if (!map[item.k]) map[item.k] = [];
            if (map[item.k].includes(item.v)) return false;
            map[item.k].push(item.v);
        });
        return map;
    }
    // Build the exclusion map
    const exclusionMap = buildExclusionMap();
    // Filter the items array based on the exclusion criteria
    return items.filter(row => {
        for (const key in row) {
            const val = row[key];

            if (exclusionMap[key] && exclusionMap[key].includes(val)) return false;
        }

        return true;
    });
}

document.getElementById('excludeItems').addEventListener('click', () => { console.log(excludeItems(itemsList, excludes)) });

// The solution follows a two-step process: building the exclusion map and filtering the items array.

// Building the Exclusion Map:
// The buildExclusionMap function is responsible for constructing the exclusion map based on the provided exclusion criteria. It iterates over each exclusion criterion and populates the exclusion map accordingly. The exclusion map is a JavaScript object where each key corresponds to an array of values that need to be excluded for that key.

// Filtering the Items Array:
// The excludeItems function utilizes the exclusion map to filter the items array. It iterates over each item in the array and checks if any of its properties match the exclusion criteria. If a match is found, the item is excluded from the filtered array. Otherwise, it is included in the filtered array.

// The implementation takes advantage of JavaScript's filter function to streamline the filtering process. It uses a combination of iteration, object property access, and comparison to determine if an item should be included or excluded.

// The resulting filtered array is then returned as the output of the excludeItems function.

// The time complexity of the solution is dependent on the number of items in the array and the number of exclusion criteria. In the worst case, where all items match the exclusion criteria, the time complexity is O(n * m), where n is the number of items and m is the number of exclusion criteria.

// The space complexity of the solution is determined by the size of the exclusion map. In the worst case, where all unique property-value combinations are included in the exclusion map, the space complexity is O(m), where m is the number of exclusion criteria.