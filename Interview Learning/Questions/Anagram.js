// Anagram
// Grouping Anagrams in a List
// Write a function groupAnagrams that takes a list of strings as input and groups together the anagrams.

// Examples:
// Input:
// ["eat", "tea", "tan", "ate", "nat", "bat"] 

// Output:
// [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]

function groupAnagrams(list) {
    // Create an empty object to serve as a map to store anagrams
    const map = {};
    // Loop through each word in the list
    list.forEach(item => {
        // Sort the characters of the word to create a unique identifier for anagrams
        const ordered = item.split('').sort().join('');
        // If the sorted word is not a key in the map, create a new array for it
        if (!map[ordered]) map[ordered] = [];
        // Push the word to its corresponding anagram group
        map[ordered].push(item);
    });
    // Return an array of all the values in the map (anagram groups)
    return Object.values(map);
}

const result = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
document.getElementById('anagram').addEventListener('click', () => console.log(result));