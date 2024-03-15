// Debouncing: Debouncing is just nothing more than limiting the rate when a function is executed or called this function
// is generally going to be a expensive function

let count = 0;
function expensiveFuntion() {
    setTimeout(() => {
        console.log(count);
        count++;
    }, 500);
}

function debounce(expensiveFunctionAsCallback, delay, firstCall) {
    let timer;
    return function (...args) {
        let firstCallStart = !timer && firstCall === true;
        if (firstCallStart)
            expensiveFunctionAsCallback.call(this, ...args);
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            if (!firstCall) expensiveFunctionAsCallback.call(this, ...args);
            timer = null;
        }, delay);
    }
}

const debounceFunction = debounce(expensiveFuntion, 200, true);

// Function explanation
// 1. Function Signature:

// debounce(expensiveFunctionAsCallback, delay, firstCall): The debounce function takes three parameters:
// expensiveFunctionAsCallback: The function that we want to debounce.It will be executed after the specified delay if there are no subsequent calls within that delay.
//     delay: The delay(in milliseconds) after which the debounced function will be executed if there are no subsequent calls.
//         firstCall: A boolean indicating whether to execute the debounced function immediately on the first call.If true, the function will be executed immediately, otherwise, it will wait until the delay expires.
//             Initialization:

// let timer;: This initializes a variable timer to keep track of the setTimeout timer.
// Return Function:

// return function (...args) { ... }: This returns a closure, a function that has access to the timer variable and the parameters passed to the debounce function.
// Closure Function:

// let firstCallStart = !timer && firstCall === true;: This checks if it's the first call and if firstCall parameter is set to true. If both conditions are true, it indicates that this is the first call and the function should execute immediately.
// if (firstCallStart) expensiveFunctionAsCallback.call(this, ...args);: If it's the first call, and firstCall is set to true, it executes the expensiveFunctionAsCallback immediately with the provided arguments.
// if (timer) clearTimeout(timer);: If there is an existing timer, it clears the timer to restart the countdown.
//     timer = setTimeout(() => { ... }, delay);: This sets a new timer using setTimeout.After the specified delay, the function inside the setTimeout will be executed.
// If firstCall is false(or not provided), the expensiveFunctionAsCallback will be called after the delay.
// If firstCall is true, it will skip the first execution after the delay, as it has already been executed.
// After executing the debounced function, it resets the timer to null.
//     Execution:

// The closure function returned by debounce is intended to be assigned to a variable and used as a debounced version of expensiveFunctionAsCallback.
