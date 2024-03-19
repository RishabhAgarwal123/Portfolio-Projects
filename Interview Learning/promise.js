function promisify(callback) {
    // Return a new function that returns a Promise
    return function (...args) {
        // Create a new Promise object with resolve and reject functions
        return new Promise((resolve, reject) => {
            // Define a callback function that handles both error and value
            const handleErrorAndValue = (error, value) => {
                // If there is an error, reject the Promise with the error
                if (error) reject(error);
                // Otherwise, resolve the Promise with the value
                resolve(value);
            }
            // Call the original callback function with the arguments and the new callback funtion
            callback.call(this, ...args, handleErrorAndValue);
        });
    }
}
document.getElementById('promisify').addEventListener('click', () => alert(promisify));
// The promisify function takes a callback function as an argument and returns a new function that returns a Promise. 
// When this new function is called, it calls the original callback function with the provided arguments, as well as a new 
// callback function (handleErrorAndValue) that will resolve or reject the Promise depending on whether the callback function 
// produced an error or a value. The call method is used to set the this value of the callback function to the current this value.

// My Race
Promise.myRace = function (promises) {
    // Create a new promise
    return new Promise((resolve, reject) => {
        // For each promise in the input array
        promises?.forEach((promise) => {
            // When a promise resolves, resolve the outer promise
            promise.then(resolve).catch(reject);
        });
    });
}
document.getElementById('race').addEventListener('click', () => alert(Promise.myRace));
// myRace takes an array of promises and returns a new promise that resolves or rejects as soon as one of the promises in the 
// input array resolves or rejects.

// My any
Promise.myAny = function (promises) {
    // Create a new promise
    return new Promise((resolve, reject) => {
        // Keep track of how many promises were rejected
        let rejectedPromises = 0;
        // For each promise in the input array
        promises.forEach((promise) => {
            // When a promise resolves, resolve the outer promise
            promise.then(resolve).catch(_ => {
                // When a promise is rejected, increment the rejected count
                rejectedPromises++;
                // If all promises were rejected, reject the outer promise
                if (rejectedPromises === promises.length) {
                    reject('All Promises Rejected');
                }
            });
        });
    });
}
document.getElementById('any').addEventListener('click', () => alert(Promise.myAny));
// myAny takes an array of promises and returns a new promise that resolves as soon as one of the promises in the input array resolves.
// If all the promises in the array are rejected, then the new promise will be rejected with the message "all promises rejected".

// My all
Promise.myAll = function (promises) {
    // Create a new promise
    return new Promise((resolve, reject) => {
        // Keep track of the resolved values
        let values = [];
        // Keep track of how many promises have been resolved
        let resolvedCount = 0;
        // For each promise in the input array
        promises.forEach((promise, i) => {
            // When a promise resolves, store its value and check if all promises have resolved
            promise.then(value => {
                values[i] = value;
                resolvedCount++;
                // If all promises have resolved, resolve the outer promise with the stored values
                if (resolvedCount === promises.length) resolve(values);
            }).catch(reject);
        });
    });
}
document.getElementById('all').addEventListener('click', () => alert(Promise.myAll));
// myAll takes an array of promises and returns a new promise that resolves when all of the promises in the input array resolve, 
// or rejects as soon as any one of the promises in the array is rejected. If all the promises resolve successfully, then the new 
// promise will resolve with an array of their resolved values.

// My allSettled
Promise.myAllSettled = function (promises) {
    // Create a new promise
    return new Promise((resolve, reject) => {
        // Keep track of the values and status of each promise
        let values = [];
        // Keep track of how many promises have resolved or rejected
        let totalRun = 0;
        // For each promise in the input array
        promises.forEach((promise, i) => {
            // When a promise resolves, store its value and status as fulfilled
            promise.then(val => {
                values[i] = { status: 'fulfilled', value: val }
                // When a promise rejects, store its error and status as rejected
            }).catch(error => {
                values[i] = { state: 'failed', value: error }
                // Regardless of whether the promise resolves or rejects, increment the total count of promises that have run
            }).finally(_ => {
                totalRun++;
                // If all promises have run, resolve the outer promise with the stored values and statuses
                if (totalRun === promises.length) resolve(values);
            });
        });
    });
}
document.getElementById('allSettled').addEventListener('click', () => alert(Promise.myAllSettled));
// myAllSettled takes an array of promises and returns a new promise that resolves with an array of objects, each representing the
// outcome of a promise in the input array. If a promise resolves, then its corresponding object will have a status property with 
// a value of "fulfilled" and a value property with the resolved value. If a promise is rejected, then its corresponding object 
// will have a status property with a value of "rejected" and an error property with the rejection reason. The new promise will 
// resolve when all of the input promises have settled (i.e., either resolved or rejected).

const STATE = {
    PENDING: 'pending',
    SUCCESS: 'fulfilled',
    REJECTED: 'rejected'
}

class MyPromise {
    #value = null;
    #state = STATE.PENDING;
    #successCallbacks = [];
    #rejectedCallbacks = [];

    constructor(executorFunc) {
        try {
            executorFunc(
                val => this.#resolve(val),
                val => this.#reject(val)
            )
        } catch (error) {
            this.#reject(error);
        }
    }

    #resolve(val) {
        this.#value = val;
        this.#state = STATE.SUCCESS;
        this.#successCallbacks.forEach(cb => cb());
    }

    #reject(val) {
        this.#value = val;
        this.#state = STATE.REJECTED;
        this.#rejectedCallbacks.forEach(cb => cb());
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            const successCallback = () => {
                if (!onFulfilled) return resolve(this.#value);
                queueMicrotask(() => {
                    try {
                        resolve(onFulfilled(this.#value));
                    } catch (error) {
                        reject(error);
                    }
                });
            }

            const failedCallback = () => {
                if (!onRejected) return reject(this.#value);
                queueMicrotask(() => {
                    try {
                        resolve(onRejected(this.#value));
                    } catch (error) {
                        reject(error);
                    }
                });
            }

            switch (this.state) {
                case STATE.PENDING:
                    this.#successCallbacks.push(successCallback);
                    this.#rejectedCallbacks.push(failedCallback);
                    break;
                case STATE.SUCCESS:
                    successCallback();
                    break;
                case STATE.REJECTED:
                    failedCallback();
                    break;
                default:
                    throw new Error('Unknown state');
            }
        });
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    get state() {
        return this.#state;
    }

    get value() {
        return this.#value;
    }
}

function fooA(a) {
    return new MyPromise((resolve, reject) => {
        if (a === -1) reject('Cannot use -1');
        setTimeout(() => {
            resolve(a);
        }, 400);
    });
}

function fooB(b) {
    return new MyPromise((resolve, reject) => {
        if (b === -1) reject(error);
        setTimeout(() => {
            resolve(b);
        }, 400);
    });
}

function callFooA() {
    fooA(-1).then((resp, error) => {
        if (error) return alert(error);
        alert(resp);
    }).catch(error => alert(error));
}

document.getElementById('promise').addEventListener('click', () => callFooA());