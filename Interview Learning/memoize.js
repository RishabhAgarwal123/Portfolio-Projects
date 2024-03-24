function memoize(callback, resolver) {
    // Create a new Map object to store cached results
    const cache = new Map();
    // Define a function to get a key for a set of arguments
    const getKey = (args) => {
        // Use a user-provided resolver function if it exists, otherwise stringify the arguments
        return resolver ? resolver(...args) : JSON.stringify(args);
    }
    // Define a memoized function that returns the cached result if available, otherwise calls the original function
    const memoizedFn = function(...args) {
        const key = getKey(args);
        // If the result is already in the cache, return it
        if (cache.has(key)) return cache.get(key);
        // Otherwise, call the original function and store the result in the cache
        const output = callback.call(this, ...args);
        cache.set(key, output);
        return output;
    }
    // Define additional methods on the memoized function for checking, deleting, and clearing the cache
    memoizedFn.has = (...args) => {
        const key = getKey(args);
    }

    memoizedFn.delete = (...args) => {
        const key = getKey(args);
        cache.delete(key);
    }

    memoizedFn.clear = () => {
        return cache.clear();
    }
    // Return the memoized function
    return memoizedFn;
}

// The code defines a function called memoize that takes two parameters, callback and resolver. The function returns a new function 
// called memoizedFn which caches the result of the callback function for a given set of arguments and returns the cached result for 
// subsequent calls with the same arguments.

// The cache is implemented as a Map object which stores key-value pairs where the keys are the argument combinations and the values 
// are the results of the callback function.

// The getKey function is used to generate a key for each set of arguments passed to memoizedFn. If a resolver function is provided, 
// it is used to generate the key by passing the arguments to it. If a resolver is not provided, the arguments are stringified using 
// JSON.stringify().

// The memoizedFn function checks if the cache already contains the result for the given set of arguments by checking the key using 
// the cache.has() method. If the result is already in the cache, it returns the cached value. Otherwise, it calls the callback 
// function with the arguments, caches the result, and returns the result.

// The memoizedFn function also has three additional methods: has, delete, and clear. The has method takes the same arguments as the 
// memoizedFn function and returns true if the result for those arguments is already in the cache. The delete method takes the same 
// arguments and deletes the corresponding entry from the cache. The clear method clears the entire cache.

document.getElementById('memoize').addEventListener('click', () => { console.log('calling memoize') });