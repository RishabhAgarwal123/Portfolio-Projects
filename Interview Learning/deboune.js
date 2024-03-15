// Debouncing: Debouncing is just nothing more than limiting the rate when a function is executed or called this function
// is generally going to be a expensive function

// Examples
// Search Input Field: In a web application's search feature, as the user types into the search input field, you may want 
// to fetch search results from an API. However, you don't want to send a request for every keystroke, as it can lead to 
// unnecessary API calls and strain on the server. Instead, you can debounce the function that fetches search results, so 
// that it only executes after a short delay once the user has finished typing.

// Resize Events: When handling the resize event in a web application to perform certain actions based on the window size, 
// you may want to debounce the function that responds to the resize event. This ensures that the function is only called once 
// after the user has finished resizing the window, preventing unnecessary re-renders or recalculations.

// Scroll Events: Similarly, when handling the scroll event to implement infinite scrolling or other dynamic behaviors based 
// on the user's scroll position, debouncing the function that reacts to scroll events can prevent excessive function calls and 
// improve performance.

// Autosave Functionality: In an application with autosave functionality, where changes made by the user are automatically saved 
// periodically, you can debounce the function responsible for saving changes to the backend. This ensures that the autosave 
// operation is triggered only after a certain period of inactivity, reducing the frequency of unnecessary save requests.

// Button Clicks: In cases where a user action triggers a complex or time-consuming operation, such as submitting a form or 
// performing an expensive calculation, you can debounce the function associated with the button click event to prevent multiple 
// rapid submissions or calculations.

// Search Suggest Dropdowns: When implementing search suggest dropdowns or autocomplete features in a web application, 
// debouncing the function that generates and displays suggestions based on user input helps prevent flickering or flashing of 
// suggestions as the user types.

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
// expensiveFunctionAsCallback: The function that we want to debounce. It will be executed after the specified delay 
// if there are no subsequent calls within that delay.
// delay: The delay(in milliseconds) after which the debounced function will be executed if there are no subsequent calls.
// firstCall: A boolean indicating whether to execute the debounced function immediately on the first call.If true, 
// the function will be executed immediately, otherwise, it will wait until the delay expires.

// 2. Initialization:
// let timer;: This initializes a variable timer to keep track of the setTimeout timer.

// 3. Return Function:
// return function (...args) { ... }: This returns a closure, a function that has access to the timer variable and the 
// parameters passed to the debounce function.

// 4. Closure Function:
// let firstCallStart = !timer && firstCall === true;: This checks if it's the first call and if firstCall parameter is set to true.
// If both conditions are true, it indicates that this is the first call and the function should execute immediately.

// if (firstCallStart) expensiveFunctionAsCallback.call(this, ...args);: If it's the first call, and firstCall is set to true, 
// it executes the expensiveFunctionAsCallback immediately with the provided arguments.

// if (timer) clearTimeout(timer);: If there is an existing timer, it clears the timer to restart the countdown.
// timer = setTimeout(() => { ... }, delay);: This sets a new timer using setTimeout.After the specified delay, the function 
// inside the setTimeout will be executed.

// If firstCall is false(or not provided), the expensiveFunctionAsCallback will be called after the delay.
// If firstCall is true, it will skip the first execution after the delay, as it has already been executed.
// After executing the debounced function, it resets the timer to null.

// 5. Execution:
// The closure function returned by debounce is intended to be assigned to a variable and used as a debounced version of 
// expensiveFunctionAsCallback.
