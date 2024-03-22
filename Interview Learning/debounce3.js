// Debounce II

// Write a JavaScript function that takes two parameters: a function to be debounced and a wait time. The function should return 
// a new function that can be used in place of the original function. The new function will only execute after a certain amount of 
// time has passed since the last time it was called. If the new function is called again before the specified wait time has passed,
// the timer should reset and the function should not be executed until the wait time has elapsed. Additionally, the returned 
// function should have two additional methods: cancel() and flush(). cancel() should cancel the debounced function, and flush() 
// should execute the debounced function immediately.

// Export the debounce function as the default export of this module.
function debounce3(func, wait) {
    // Declare variables for the timer, function arguments, and context.
    let timer;
    let fnArgs;
    let thisContext;

    // Define a function to invoke the debounced function.
    function invoke() {
        // If the timer does not exist, return and do nothing.
        if (!timer) return;
        // Stop the existing timer to prevent the function from being invoked.
        clear();
        // Invoke the function with the specified context and arguments.
        func.apply(thisContext, fnArgs);
    }

    // Define a function to clear the timer.
    function clear() {
        clearTimeout(timer);
        timer = null;
    }

    // Define the debouncer function that will be returned.
    function debouncer3(...args) {
        // Save the context and arguments for later use.
        thisContext = this;
        fnArgs = args;
        // Clear any existing timer to reset the debounce timer.
        clear();
        // Set a new timer to invoke the debounced function after the specified wait time.
        timer = setTimeout(() => {
            invoke();
        }, wait);
    }
    // Add cancel and flush methods to the debouncer function for convenient use.
    debouncer3.cancel = clear;
    debouncer3.flush = invoke;
    // Return the debouncer function for use.
    return debouncer3;
}

// Define your original function
function myFunction3() {
    console.log("Function called!");
}

// Debounce your function with a wait time of 500 milliseconds
const debouncedFunction3 = debounce3(myFunction3, 500);

// Call your debounced function whenever needed
document.getElementById('btnDebounce3').addEventListener('click', () => debouncedFunction3());


// The above code is a function called debounce that takes two arguments: func, which is the function to be debounced, and wait, 
// which is the time in milliseconds to wait before invoking the debounced function.

// When the debounce function is called, it returns a new function called debouncer. This debouncer function can be called with 
// any number of arguments, and it will ensure that the func passed to debounce is only called after a certain amount of time 
// has elapsed since the last call to debouncer.

// The debouncer function works by setting a timer when it is called, and storing the context and arguments of the call. If 
// debouncer is called again before the timer expires, it will cancel the existing timer and start a new one with the updated 
// arguments. If the timer does expire, the func passed to debounce will be called with the saved context and arguments.

// Additionally, the debouncer function has two additional methods attached to it: cancel, which can be used to cancel any 
// pending invocation of the debounced function, and flush, which can be used to immediately invoke the debounced function 
// if there is a pending invocation.

// Overall, the debounce function is a useful utility for preventing functions from being called too frequently, which can 
// improve performance and reduce unwanted side effects.