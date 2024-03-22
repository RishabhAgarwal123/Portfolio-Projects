class EventTarget {
    eventMap = {}; // Initialize an object to store event names and their callbacks.

    // Add a method to add event listeners to the eventsMap.
    customAddEventListener(name, callback) {
        if (!this.eventMap[name]) {
            this.eventMap[name] = [];
        }
        if (this.eventMap[name]) {
            const eventDoesntExists = this.eventMap[name].indexOf(callback) === -1; // Check if callback already exists
            if (eventDoesntExists) this.eventMap[name].push(callback); // Add new callback to existing array of callbacks event name.
            else this.eventMap[name] = [callback]; // If no callbacks exist for event name, create new array with new callback.
        }
    }

    // Add a method to remove event listeners from the eventsMap.
    customRemoveEventListener(name, callback) {
        if (this.eventMap[name]) {
            // Find the index of the callback to remove.
            let callbackIdx = this.eventMap[name].indexOf(callback);
            // Check if the callback exists in the array
            let canRemoveCallback = callbackIdx !== -1;
            if (canRemoveCallback) {
                if (this.eventMap[name].length === 1) {
                    // If the array has only one callback, remove the entire event from the eventsMap.
                    delete this.eventMap[name];
                } else {
                    // If the array has multiple callbacks, remove only the specified callback.
                    this.eventMap[name].splice(callbackIdx, 1);
                }
            }
        }
    }

    // Add a method to dispatch events from the eventsMap.
    customDispatchEvent(name) {
        if (this.eventMap[name]) {
            this.eventMap[name].forEach(cb => cb()); // Execute each callback in the array for the specified event name.
        }
    }
}

// Create an instance of the EventTarget class
const eventTarget = new EventTarget();

// Define event listeners
const callback1 = () => console.log('Callback 1 executed');
const callback2 = () => console.log('Callback 2 executed');

// Add event listeners
eventTarget.customAddEventListener('event1', callback1);
eventTarget.customAddEventListener('event2', callback2);

// Dispatch events
eventTarget.customDispatchEvent('event1'); // Should log 'Callback 1 executed'
eventTarget.customDispatchEvent('event2'); // Should log 'Callback 2 executed'

// Remove an event listener
eventTarget.customRemoveEventListener('event1', callback1);

// Dispatch the event again
eventTarget.customDispatchEvent('event1'); // No callback should be executed

// Dispatch an event that doesn't have any listeners
eventTarget.customDispatchEvent('event3'); // Should do nothing

// Log the eventMap to verify the state
console.log(eventTarget.eventMap);

document.getElementById('eventTarget').addEventListener('click', () => console.log(eventTarget.eventMap));


// The class has three methods:

// addEventListener(name, callback): This method adds an event listener for the event name specified in the name parameter, and 
// associates it with a callback function that will be executed when the event is triggered. It first checks if the eventsMap object 
// already has an array associated with the event name, and if so, it checks if the callback function is already in the array. If not, 
// the callback function is added to the array. If there is no array associated with the event name, it creates a new array and adds 
// the callback function to it.

// removeEventListener(name, callback): This method removes an event listener previously registered with addEventListener. It first 
// checks if the eventsMap object already has an array associated with the event name, and if so, it tries to find the callback 
// function in the array. If the function is found, it removes it from the array. If the array is empty after removing the function, 
// it deletes the entry in the eventsMap object.

// dispatchEvent(name): This method triggers an event, which executes all the callback functions registered with the addEventListener 
// method for the specified event name. It checks if the eventsMap object has an array associated with the event name, and if so, it 
// executes each callback function in the array using a forEach loop.
