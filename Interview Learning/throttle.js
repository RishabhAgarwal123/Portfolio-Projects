// Throttling: It is just taking a expensive function and limiting the rate of execution of that function. It is just calling the
// function with in some time intervals in between.

// Examples
// Scroll Events: When handling the scroll event in a web application, such as implementing lazy loading of images or data as 
// the user scrolls down a page, you may want to throttle the function that reacts to scroll events. Throttling ensures that the 
// function is called at regular intervals, preventing excessive function calls and improving performance.

// Resize Events: Similar to scroll events, when handling the resize event to perform certain actions based on the window size, 
// throttling the function that responds to resize events can prevent excessive re-renders or recalculations and improve performance.

// Mousemove Events: In interactive web applications where user actions trigger updates to the UI or other dynamic behaviors, 
// such as drawing or dragging elements, throttling the function that responds to mousemove events can prevent excessive updates 
// and improve responsiveness.

// API Requests: Throttling is commonly used in client-server communication to limit the rate at which API requests are made to 
// a server. For example, when integrating with third-party APIs that have rate limits, throttling ensures that the application 
// does not exceed the allowed number of requests per unit of time.

// User Input Events: Throttling is often applied to user input events, such as keystrokes in a search input field or clicks on 
// a button, to prevent rapid or repeated triggering of associated actions. Throttling ensures that the action is executed at a 
// controlled rate, improving user experience and preventing performance degradation.

// Form Validation: When implementing form validation in a web application, throttling the function that performs validation 
// checks on user input fields can prevent excessive validation requests and improve responsiveness, particularly in large or 
// complex forms.

// Event Handlers: Throttling is commonly used in event handling systems to limit the rate at which event handlers are executed, 
// preventing events from being processed too quickly and overwhelming the system.

const throttleBox = document.getElementById('throttle');

function expensiveFuntion(event) {
    if (!event) return;
    console.log(`Horizontal(X) location on page: ${event.x} and Vertical(Y) location on page: ${event.y}`)
}

function throttle(expensiveFunctionAsCallback, delay) {
    let timer, lastTimeCalled = 0;
    return function (...args) {
        let currentTime = Date.now();
        let differenceTime = currentTime - lastTimeCalled;
        let remainingDelay = delay - differenceTime;

        const invokingExpensiveFunction = () => {
            expensiveFunctionAsCallback.call(this, ...args);
            lastTimeCalled = Date.now();
        }

        if (remainingDelay > 0) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => invokingExpensiveFunction, remainingDelay);
        } else invokingExpensiveFunction();
    }
}

const throttleFunction = throttle(expensiveFuntion, 1000);
throttleBox.addEventListener('mousemove', throttleFunction);

// 1. const throttleBox = document.getElementById('throttle');: This line retrieves a DOM element with the ID 'throttle' and 
// assigns it to the variable throttleBox. This element will be used as the target for the mousemove event listener.

// 2. function expensiveFunction(event) { ... }: This is a callback function named expensiveFunction, which logs the horizontal 
// and vertical coordinates of the mouse pointer whenever it is called. It takes an event parameter, representing the mouse event, 
// and logs the x and y coordinates of the mouse pointer.

// 3. function throttle(expensiveFunctionAsCallback, delay) { ... }: This is a higher-order function named throttle. It takes 
// two parameters:
// expensiveFunctionAsCallback: The callback function to be throttled.
// delay: The delay (in milliseconds) between consecutive invocations of the throttled function.
// Inside the throttle function, it initializes variables timer and lastTimeCalled. The timer variable keeps track of the timeout 
// set by setTimeout, while lastTimeCalled stores the timestamp of the last time the throttled function was called.
// The throttle function returns another function, which acts as the throttled version of the provided expensiveFunctionAsCallback. 
// This inner function takes any number of arguments (...args) representing the arguments passed to the throttled function.

// 4. throttleBox.addEventListener('mousemove', throttleFunction);: This line adds an event listener to the throttleBox element 
// for the mousemove event. When the mouse moves over the throttleBox element, the throttleFunction is called. 
// The throttleFunction is the throttled version of the expensiveFunction.

// 5. Throttling Mechanism:

// Inside the throttled function returned by throttle, it calculates the difference in time (differenceTime) since the last 
// invocation of the throttled function.
// It then calculates the remaining delay (remainingDelay) by subtracting differenceTime from the specified delay.
// If the remainingDelay is greater than zero, it schedules the execution of the throttled function after the remainingDelay 
// milliseconds using setTimeout. If there's an existing timer, it clears it to avoid invoking the function multiple times.
// If the remainingDelay is zero or negative, it immediately invokes the throttled function.