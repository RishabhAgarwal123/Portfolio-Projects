// String Repeater (Algorithmic) [Easy, Apple, Video]
// Write a function called myRepeat that extends the String prototype. The function should take an integer times as an argument and 
// return a new string that repeats the original string times number of times.

// Input:
// A string to be repeated.
// An integer times indicating the number of repetitions.
// Output:
// A new string that repeats the original string times number of times.
// Example:
// Input: "hello world ".myRepeat(2)
// Output: "hello world hello world "

String.prototype.myRepeat = function(times) {
    const repeats = [];
    for (let i = 0; i < times; i++) {
        repeats.push(this);
    }   
    return repeats.join('');
}

document.getElementById('stringRepeater').addEventListener('click', () => { 
    console.log("hello world ".myRepeat(2)) 
});

// The myRepeat function extends the functionality of the String prototype by adding a custom method. It enables the user to repeat a string a specified number of times. The implementation follows these steps:

// Initialize an empty array repeats to store the repeated strings.
// Use a for loop to iterate times number of times.
// Inside the loop, push a copy of the original string (this) into the repeats array.
// After the loop, join the elements of the repeats array using an empty string as the separator. This creates a single string with the repeated content.
// Return the resulting repeated string.
// The provided code demonstrates the usage of the myRepeat method by calling it on the string "hello world " with an argument of 2. The output, "hello world hello world ", shows that the original string is repeated twice.

// It's worth noting that the myRepeat method does not modify the original string but returns a new string with the repeated content. The implementation utilizes a loop to build the repeated string, ensuring that the desired number of repetitions is achieved.

// Overall, the myRepeat method provides a convenient way to repeat strings in JavaScript, enhancing the capabilities of the String object.