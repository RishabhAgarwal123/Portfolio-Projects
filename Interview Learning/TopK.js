// Given a log file containing various text entries, the task is to find the top K most frequently occurring words in the log. 
// You need to implement a function that takes the log file content and the value of K as input and returns an array of the top K words.

// Example:
// Input:
// const log =  May 12, 2023: User1 logged in. May 13, 2023: User2 logged in. May 13, 2023: User1 performed an action. May 14, 
// 2023: User3 logged in. May 15, 2023: User2 performed an action. May 15, 2023: User1 logged out. ; const k = 3; 
// Output:
// ['User1', 'logged', 'May'] 
// In the given example, the log file contains several entries with different words. We are interested in finding the top 3 most 
// frequently occurring words. The expected output is an array containing the words 'User1', 'logged', and 'May', as they appear 
// the most number of times in the log file.

// Find top K most used words in the log file

// Sample log content
const log = `
May 12, 2023: User1 logged in.
May 13, 2023: User2 logged in.
May 13, 2023: User1 performed an action.
May 14, 2023: User3 logged in.
May 15, 2023: User2 performed an action.
May 15, 2023: User1 logged out.
`;

function topKWords(input, k) {
    // Create an object to store word counts
    const wordCounts = {};
    // Split the input into an array of words
    let listOfWords = input.split(' ');
    // Count the occurrences of each word
    listOfWords.forEach(item => {
        if (!wordCounts[item]) wordCounts[item] = 0;
        wordCounts[item]++;
    });
    // Sort the words based on occurrence count in descending order
    const sortedWords = Object.keys(wordCounts).sort((a, b) => wordCounts[b] - wordCounts[a]);
    // Take the top K words from the sorted list
    const topWords = sortedWords.slice(0, k);

    return topWords;
}

// To solve the problem of finding the top K most used words in a log file, we can follow the following steps:

// Split the log file content into individual words: The first step is to split the log file content into individual words. This 
// can be done by using a delimiter, such as a space character, to separate the words. We can use the split() method in JavaScript 
// to split the log file content into an array of words.

// Count the occurrences of each word: Once we have the array of words, we need to count the occurrences of each word. To do this, 
// we can create a dictionary or object to store the count of each word. We iterate through the array of words and update the count 
// in the dictionary accordingly. If a word is encountered for the first time, we initialize its count to 1. If a word is encountered 
// again, we increment its count by 1.
// Sort the words based on occurrence count: After counting the occurrences of each word, we need to sort the words based on their 
// occurrence count in descending order. We can use the sort() method in JavaScript with a custom comparator function. 
// The comparator function compares the occurrence counts of two words and returns a negative, zero, or positive value to 
// determine their relative order.
// Extract the top K words: Once the words are sorted, we can extract the top K words from the sorted list. We can use the slice() 
// method in JavaScript to extract a subarray containing the top K words.
// Return the result: Finally, we return the array of the top K most used words as the result.

document.getElementById('top_k').addEventListener('click', () => { console.log(topKWords(log, 3)) });