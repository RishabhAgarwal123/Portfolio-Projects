// Given a string which might have duplicate letters, write a function to find the first duplicate.

function firstDuplicate(str) {
    let chars = str?.split('');
    let charsMap = {};
    for (let i = 0; i < chars.length; i++) {
        let char = chars[i];
        if (charsMap[char]) return char;
        else charsMap[char] = 1;
    }
    return null;
}

// Test the function with input 'abcdebfe'
document.getElementById('duplicateChar').addEventListener('click', () => alert(firstDuplicate('abcdebfe')));

// Algo
// 1. The input string 'abcdefe' is passed to the firstDuplicate function for analysis.
// 2. The string is split into an array of individual characters using the split('') method. This allows easier access and 
// traversal through the characters.
// 3. An empty object charsMap is created to store the occurrences of characters encountered so far.
// 4. A for loop iterates through each character in the chars array.
// 5. For each character, the code checks whether it already exists in the charsMap object (indicating a duplicate).
// 6. If the character is found in charsMap, it means a duplicate has been encountered, and the function immediately returns the 
// duplicate character using the return char; statement.
// 8. If the character is not found in charsMap, it is marked as encountered by setting its value to 1 in the charsMap object.
// 9. After the loop completes, if no duplicate character has been found, the function returns null to indicate that no duplicates 
// exist in the string.
// 10.The function is tested with the input 'abcdefe', and the result is logged to the console.

// The provided code successfully finds the first duplicate character in a given string. It does so by using a map (charsMap) to 
// keep track of the characters encountered and efficiently identifies the first duplicate character using the map. The time 
// complexity is O(n) due to the single loop that iterates through the characters, and the space complexity is O(n) due to the map 
// storing unique characters.