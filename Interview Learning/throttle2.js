// This will incalled once the window is resized

// Creating a function called throttle which takes a callback function and a delay time as parameters.
function throttle (expensiveCallbackFunction, delay) {
    // Creating a variable called timer
    let timer;
    // A variable named with lastTimeCalled that will hold the when the function was last time called and intialize to 0 at start.
    let lastTimeCalled = 0;
    // Define a function called throttler which takes any number of arguments
    const throttler = function(...args) {
        // Get the current time
        const currentTime = Date.now();
        // Calculate the time difference between the current call and the last call
        const differTimerBetweenLastTimeCalled = currentTime - lastTimeCalled;
        // Calculate the remaining delay time
        const remainingDelay = delay - differTimerBetweenLastTimeCalled;

        // A function to invoke the callback function that is recieved
        const invokingExpensiveCallbackFucntion = () => {
            // Call the original callback function with the provided arguments
            expensiveCallbackFunction.call(this, ...args);
            // Set the last time called wiht the current time
            lastTimeCalled = Date.now();
        }

        // If their is delay remaining, clear the previous timer and set the new timer for the remainging delay time.
        if (remainingDelay > 0) {
            // Clearing the previou timer
            clearTimeout(timer);
            // Invoking the function and updating timer
            timer = setTimeout(() => {
                invokingExpensiveCallbackFucntion()
            }, remainingDelay);
        } else {
            invokingExpensiveCallbackFucntion();
        }
    }

    // Cancel method to the throttler function which clears the timer.
    throttler.cancel = () => clearTimeout(timer);
    // returns the throttler function
    return throttler;
}

// Initialize the counter variable to 0
let counter = 0;

// A resized function
const resizeFunctionAsExpensive = (e) => {
    counter++;
    console.log('Resized Count: ', counter);
}

// Function that will call the throttle function
const throttledResized = throttle(resizeFunctionAsExpensive, 1000);

// Called when the window is resized
window.addEventListener('resize', throttledResized);

// The code is defining a JavaScript function called throttle, which takes a callback function and a delay time as parameters. 
// The throttle function returns a new function called throttler, which wraps the original callback function with a time throttling 
// mechanism, allowing the callback to be executed only once in a specified time interval.

// The throttler function uses the setTimeout method to schedule the execution of the original callback function after the specified 
// delay time has passed since the last call. If the throttler function is called again before the delay time has passed, it cancels 
// the previous timeout and schedules a new one for the remaining delay time.

// The throttler function also has a cancel method, which can be used to cancel the scheduled timeout and prevent the original 
// callback function from being called.

// The code also defines a new function called resized, which increments a counter and logs a message to the console when called. 
// The throttle function is used to create a new throttled version of the resized function that can be used as an event handler 
// for the window resize event. The throttled function ensures that the original resized function is called at most once every 
// 1000 milliseconds, reducing the frequency of the function calls and improving performance.