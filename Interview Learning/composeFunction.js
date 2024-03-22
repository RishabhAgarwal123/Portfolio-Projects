// Compose Function

// Combining Functions for Value Transformation

// You are given three functions: a, b, and c. Each function performs a specific mathematical operation on an input value. Your 
// task is to implement a compose function that combines these functions in a way that allows you to apply them sequentially to 
// an initial value.

// Write a program that, given the functions a, b, and c, and an initial value, returns the result of applying these functions 
// in the order specified.

// Input:
//     - Three functions: a, b, and c, each taking a numeric value as input and returning a numeric result.
//     - An initial value, 5, for the composition.

// Output:
// -   The final result after applying the functions in order.

// Example:
// Input:a = x => x * 4
// b = x => x + 4
// c = x => x - 1
// Initial value: 5

// Output:23

// Explanation:
//     -Given the functions a, b, and c, and the initial value of 5, the composition is as follows:Apply function a to the initial 
//     value: a(5) = 5 * 4 = 20.
//     -Apply function b to the result of the previous step: b(20) = 20 + 4 = 24.
//     -Apply function c to the result of the previous step: c(24) = 24 - 1 = 23.
// The final result is 23, which matches the expected output.

// Define three functions to perform mathematical operations on input values
const multiply = x => x * 4;
const adding = x => x + 4;
const substract = x => x - 1;

// Implement the compose function to combine the provided functions
function compose(...args) {
    return function (b) {
        let storeVal;
        args.forEach(fn => {
            // If no stored value, apply the current function to the input value
            if (!storeVal) storeVal = fn(b);
            // If a stored value exists, apply the current function to the stored value
            else storeVal = fn(storeVal);
        });
        return storeVal;
    }
}

// Perform the composition of functions on the initial value and log the result
document.getElementById('composeFunction').addEventListener('click', () => alert(compose(multiply, adding, substract)(5)));
// console.log(compose(a, b, c)(5)); // Output: 23

// Inside the compose function, a forEach loop is used to iterate over the args array, which contains the provided functions 
// (a, b, and c).
// For each function fn in the loop, the code checks if there is a stored value (storedVal). If there is no stored value, 
// it means it's the first function in the composition, so the current function fn is applied to the initial value b by invoking 
// fn(b). The result is then assigned to storedVal.
// If there is a stored value, it means that the loop is currently on a subsequent function in the composition. In this case, the 
// current function fn is applied to the stored value by invoking fn(storedVal), and the result is updated in storedVal.
// This process repeats for each function in the composition, allowing the transformation to be chained sequentially.
// Finally, the composed value stored in storedVal is returned from the compose function.
// The compose(a, b, c)(5) expression demonstrates the usage of the compose function. It composes the functions a, b, and c together 
// and passes an initial value of 5. The result is 23, which represents the final value obtained after applying the composition of 
// functions to the initial value.
// By using the compose function, you can easily combine functions and create powerful compositions for value transformation. This 
// approach promotes code reusability, modularity, and provides a clean way to express complex transformations by breaking them down 
// into smaller, composable functions.

// The provided code showcases a simplified implementation of function composition, and it can serve as a starting point for more 
// sophisticated compositions in your frontend interview preparations.
