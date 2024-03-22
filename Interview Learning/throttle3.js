// Throttle II- Implement throttle() with leading & trailing option

// This is a continuation of the previous problem, where you are asked to implement an improved version of the throttle() function. 
// The new function should accept a third parameter, an options object, which contains two boolean properties - leading and trailing. 
// The leading property determines whether the throttled function should be called immediately or after a delay, and the trailing 
// property determines whether the throttled function should be called after the delay or immediately. The default behavior is to 
// call the throttled function both at the beginning and the end of the delay.

// The goal is to create a throttling function that can limit the rate at which a function is executed. The previous problem had a 
// basic implementation of the throttle() function, but this new version provides more flexibility to control the behavior of the 
// throttled function.

// To explain the behavior of the enhanced throttle() function, the text provides a few examples of how the options object can 
// affect the throttling behavior. The examples show how the leading and trailing options impact which function calls are executed, 
// and which ones are ignored. The text also notes that the behavior of the new function is not exactly the same as 
// lodash.throttle() due to differences in the accuracy of setTimeout() and clearTimeout() in the browser environment.

// To test your implementation, a test function is provided, which uses a run() function to simulate function calls and track 
// their timing. The run() function takes an array of strings, where each string represents a function call with its timing. 
// The function calls are executed using setTimeout(), and the throttled function is invoked based on the specified delay and 
// options. The output of the run() function is an array of strings representing the function calls that were actually executed, 
// along with their timing. The expected output for the given test input is provided as an example.

function throttle3(func, wait, option = { leading: true, trailing: true }) {
    let { leading, trailing } = option;
    let lastArgs = null;
    let timer = null;

    const setTimer = () => {
        if (lastArgs && trailing) {
            func.apply(this, lastArgs);
            lastArgs = null;
            timer = setTimeout(setTimer, wait);
        } else timer = null;
    }

    return function (...args) {
        if (!timer) {
            if (leading) {
                func.apply(this, args);
            }
            timer = setTimeout(setTimer, wait);
        } else lastArgs = args;
    }
}

// Define a function to be throttled
function exampleFunction(arg) {
    console.log(`Function executed with argument: ${arg}`);
}

function runThrottleFunction() {
    // Throttle the function
    const throttledFunction = throttle3(exampleFunction, 1000);

    // Call the throttled function multiple times in quick succession
    throttledFunction('First call'); // Should execute immediately
    throttledFunction('Second call'); // Should be throttled
    throttledFunction('Third call'); // Should be throttled
    throttledFunction('Fourth call'); // Should be throttled

    // After 1000ms, the throttled function should execute again with the last arguments
    setTimeout(() => {
        throttledFunction('Fifth call');
    }, 1000);

    // After another 1000ms, the throttled function should execute again with the last arguments
    setTimeout(() => {
        throttledFunction('Sixth call');
    }, 2000);
}

// function throttle(func, wait, option = { leading: true, trailing: true }) {

// The throttle function takes three parameters: a function to be throttled, a wait time (in milliseconds), and an options object 
// with two boolean properties, "leading" and "trailing".

// let { leading, trailing } = option;

// Destructure the "option" object to extract the "leading" and "trailing" properties.

// let lastArgs = null; var timer = null;

// Initialize two variables, "lastArgs" and "timer" to null.

// const setTimer = () => {
//     if (lastArgs && trailing) {
//         func.apply(this, lastArgs);
//         lastArgs = null;
//         timer = setTimeout(setTimer, wait);
//     } else { timer = null; }
// };

// Declare a helper function called "setTimer".If there are any "lastArgs" and the "trailing" property is true, then apply the 
// throttled function with the last arguments.Set "lastArgs" to null, and create a new timeout with the "wait" time.If the 
// "trailing" property is false, set the "timer" variable to null.

// return function (...args) { 
//     if (!timer) { 
//         if (leading) { 
//             func.apply(this, args); 
//         } 
//         timer = setTimeout(setTimer, wait); 
//     } else { lastArgs = args; } 
// } 

// Return a new function that takes any number of arguments. If there is no "timer" running, and the "leading" property is true, 
// apply the function with the arguments. Set a new timeout with the "wait" time and assign it to the "timer" variable. If there 
// is a "timer" running, store the arguments in the "lastArgs" variable.


document.getElementById('throttle3').addEventListener('click', () => runThrottleFunction());