// Build myCall, myApply and myBind from scratch
// Write a function that implements three common methods of the Function prototype in JavaScript: myCall, myApply, and myBind. 
// These methods should behave like their native counterparts

const thisCall = document.getElementById('call'); 
const thisApply = document.getElementById('apply'); 
const thisBind = document.getElementById('bind'); 

// Define myCall function on Function prototype
Function.prototype.myCall = function (thisContext, ...args) {
    // Create a unique key for the context object using Symbol()
    const key = Symbol();
    // Set the value of the context object at the key to the current function
    thisContext[key] = this;
    // Call the current function on the context object with the specified arguments
    const output = thisContext[key](...args);
    // Delete the function from the context object
    delete thisContext[key];
    // Return the output of the function call
    return output;
}

// Define myApply function on Function prototype
Function.prototype.myApply = function (thisContext, args = []) {
    // Call myCall function with the context object and the spread out arguments
    return this.myCall(thisContext, ...args);
}

// Define myBind function on Function prototype
Function.prototype.myBind = function (thisContext, ...args) {
    // Return a function that takes a second set of arguments and calls myCall with both sets of arguments
  return (...secondArgs) => this.myCall(thisContext, ...args, ...secondArgs);
}

function greet(name) {
    return `Hello, ${name}!`;
}

const person = {
    name: 'Alice'
};

const greetingByCall = greet.myCall(person, `${person.name} from myCall`);
const greetingByApply = greet.myApply(person, [`${person.name} from myApply`]);
const greetingByBind = greet.myBind(person, `${person.name} from myBind`);

thisCall.addEventListener('click', () => alert(greetingByCall));
thisApply.addEventListener('click', () => alert(greetingByApply));
thisBind.addEventListener('click', () => alert(greetingByBind()));

// This code defines three new methods (myCall(), myApply(), and myBind()) on the Function prototype. These methods are used to 
// change the context of a function or to bind arguments to it.

// The myCall() method takes a context object as its first argument and any number of additional arguments. It sets the function's 
// this value to the provided context object and calls the function with the provided arguments.

// The myApply() method is similar to myCall(), but takes an array of arguments instead of individual arguments. It also calls the 
// function with the provided arguments and sets its this value to the provided context object.

// The myBind() method is used to create a new function that, when called, will have its this value set to the provided context 
// object and its arguments partially bound with the provided arguments. It returns a new function that takes a second set of 
// arguments and calls the original function with both sets of arguments.