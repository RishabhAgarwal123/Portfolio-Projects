// Currying is a concept in computer science and functional programming
// where a function that takes multiple arguments is transformed into a
// sequence of functions, each taking a single argument.
//  sum(a)(b)(c)().
const invokeCurry = document.getElementById('curry');

function add(a, b, c) {
    return a + b + c;
}

function curry(callback) {
    // Define a new function that will be returned by the `curry` function.
    const currier = function (...args) {
        // If no arguments were passed in, call the original function and return its result.
        if (!args.length) return callback;
        // If some arguments were passed in, return a new function that will wait for more arguments.
        return function (...secondArgs) {
            // If no second arguments were passed in, call the original function with the first set of arguments and return its result.
            if (!secondArgs.length) return callback(...args);
            // If second arguments were passed in, return a new function that will wait for even more arguments.
            // This is done by calling the `currier` function recursively with the first set of arguments and the second set of arguments.
            return currier(...args, ...secondArgs)
        }
    }
    // Return the new `currier` function that was defined above.
    return currier
}

const addUsingCurry = curry(add);
invokeCurry.addEventListener('click', () => console.log(`Sum of sum(1)(2)(3) is : ${addUsingCurry(1)(2)(3)()}`));

// The curry function takes a callback function as its argument and returns a new function that can be called with arguments one at 
// a time. The new function waits until it has received all of the arguments it needs to call the original function, and then it 
// calls the original function with those arguments.

// The currier function is defined within the curry function. It takes an arbitrary number of arguments using the rest parameter 
// syntax (...args). If no arguments were passed in, it calls the original function with no arguments and returns its result. If 
// some arguments were passed in, it returns a new function that takes another set of arguments. If no second arguments were passed 
// in, it calls the original function with the first set of arguments and returns its result. If second arguments were passed in, 
// it calls currier recursively with the first set of arguments and the second set of arguments.

// The curry function uses closure to remember the original function that was passed in as an argument, so it can be called later 
// with all of the arguments that were passed in.