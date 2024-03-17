// Define a variable "button" and select an HTML element with an ID of "button"
const button = document.getElementById('btn');

// Define a function called "debounce" that takes in a "callback" function, a "delay" time, and a boolean "immediate" flag with a default value of false.
function debounce(expensiveFunctionAsCallback, delay, immediate = false) {
    // Initialize a variable "timer" with a null value.
    let timer = null;

    // Return a new function that takes in any number of arguments.
    return function (...args) {
        // Set a boolean variable "shouldCallImmediately" to true if there is no timer and the immediate flag is true.
        let shouldCalledImmediately = !timer && immediate;

        // If the "shouldCallImmediately" is true, execute the callback function with the arguments passed into the returned function.
        if (shouldCalledImmediately) expensiveFunctionAsCallback.call(this, args);
        // If there is a timer, clear it.
        if (timer) clearTimeout(timer);

        // Set a new timer using the setTimeout method with a function that executes the callback and sets the timer to null after the specified delay time has passed.
        timer = setTimeout(() => {
            if (!immediate) expensiveFunctionAsCallback.call(this, args);
            timer = null;
        }, delay)
    }
}

// Define a constant called "tapped" that logs "tapped" to the console when executed.
const buttonClicked = (e) => console.log('Debouncing button clicked');
// Define a new constant called "debouncedTapped" that uses the debounce function with a delay time of 400ms on the 
// "tapped" function.
const debouncedButtonClicked = debounce(buttonClicked, 1000);
// Add an event listener to the "button" element that listens for a click event and executes the "debouncedTapped" function when the button is clicked.
button.addEventListener('click', debouncedButtonClicked);

// This code defines a function called debounce, which takes in three parameters: a callback function, a delay time in milliseconds, 
// and an optional immediate boolean flag with a default value of false. The purpose of the function is to return a new function that 
// can be used to "debounce" the original callback function.

// The returned function will have a delay between each invocation of the original callback function, with the delay time specified 
// by the delay parameter. If the immediate flag is set to true, the original callback function will be called immediately once at 
// the start, and then delayed by the specified delay time between each subsequent invocation.

// The function works by setting a variable called timer to null at the start. Then, each time the returned function is invoked, it 
// checks whether the immediate flag is set to true and whether timer is null. If both conditions are true, it immediately calls the 
// original callback function with the passed arguments. Otherwise, if timer is not null, it clears the timer. After that, it sets a 
// new timer using the setTimeout method with a function that executes the original callback function and sets the timer variable to 
// null after the specified delay time has passed. If immediate is true, the original callback function will be executed immediately 
// at the beginning of the process before the timer is set up.

// This "debouncing" technique is commonly used to prevent a function from being called too frequently, such as in the case of user 
// input events like scrolling or typing, where it's desirable to wait a certain amount of time before performing some action to avoid 
// excessive and unnecessary processing.