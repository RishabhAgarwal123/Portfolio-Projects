// Debounce III - Implement debounce() with leading & trailing option

// Implement an enhanced version of debounce() function in JavaScript which accepts an additional parameter 'option' with properties 
// 'leading' and 'trailing'.

// The 'leading' property is a boolean flag that indicates whether the debounced function should be executed immediately on the 
// first call. If it is true, the function will execute immediately, otherwise, it will wait for the specified time interval.

// The 'trailing' property is also a boolean flag that indicates whether the debounced function should be executed after the delay. 
// If it is true, the function will be executed after the specified time interval, otherwise, it will not be executed.

// The default behaviour of the function should be equivalent to the basic debounce() function with {leading: false, trailing: true}.

// For example, if we have an array of function calls with corresponding delay times, the debounced function should return an array 
// of function calls that have been executed.

// Please note that the setTimeout() and clearTimeout() methods are not accurate in browser environments, and an alternative 
// implementation will be used to test the function.

// This is a JavaScript coding pattern from BFE.dev
/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @param {boolean} option.leading
 * @param {boolean} option.trailing
 * @returns {(...args: any[]) => any}
 */

function debounce4(func, wait, option = { leading: false, trailing: true }) {
    // Declare a variable timer to store the timeout ID
    let timer;
    // Define and return an anonymous function that will be called when the debounced function is called
    return function (...args) {
        // Declare a variable invoked to check if the function was invoked
        let invoked = false;
        // Determine if the function should be run immediately
        let shouldRunImmediately = option.leading && !timer;
        if (shouldRunImmediately) {
            // Call the function immediately if option.leading is true and timer is not set
            func.call(this, ...args);
            // Set invoked to true
            invoked = true;
        }
        // Clear the previous timeout
        clearTimeout(timer);
        // Set a new timeout with the wait time
        timer = setTimeout(() => {
            // Call the function if option.trailing is true and the function was not invoked
            if (option.trailing && !invoked) {
                func.call(this, ...args);
            }
            // Reset the timer
            timer = null;
        }, wait);
    }
}

// Define the function you want to debounce
function myFunction() {
    console.log("Debouned4 function called!");
}

// Debounce the function with a wait time of 500 milliseconds and leading and trailing options
const debouncedFunction4 = debounce4(myFunction, 500, { leading: true, trailing: true });

// Call the debounced function whenever needed
document.getElementById('btnDebounce4').addEventListener('click', () => debouncedFunction4());

// The above code is a JavaScript function that implements a debounce mechanism. The function takes in three parameters: a 
// callback function to be executed after the debounce period, a wait time that determines the debounce period, and an options 
// object that specifies whether to invoke the callback function immediately when the function is called for the first time or 
// after the debounce period, or both.

// The function returns a new function that is wrapped around the callback function, which is actually executed when the returned 
// function is called. The wrapped function uses a timer to delay the execution of the callback function. If the wait period elapses 
// before the wrapped function is called again, the callback function is executed. However, if the wrapped function is called again 
// before the wait period elapses, the timer is reset, and the wait period starts again.

// The options object allows the developer to configure the behavior of the wrapped function. By default, the callback function is 
// executed only after the debounce period (trailing: true), and not immediately when the function is called for the first 
// time (leading: false). However, the developer can change this behavior by setting the leading and trailing options to true or 
// false, as needed.