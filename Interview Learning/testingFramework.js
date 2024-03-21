// Build a testing framework, describe, it, and expect -
// Implement a simple testing framework for frontend code that allows you to define test suites and test cases, and provides 
// assertion methods for validating expected outcomes. Write the necessary functions and classes to achieve this.

// Example 1:
// describe('Hello world', () => { it('input exists', () => { let input = null; expect(input).toExist(); }); }); 
// Expected Output:
// beginning test suite Hello world beginning test case input exists failed running test suite Hello world on test case 
// input exists with error message expected value to exist but got null 

// Example 2:
// describe('Hello world', () => { it('input is as expected', () => { let input = 'foo'; let expected = 'fooo'; 
// expect(input).toBe(expected); }); }); 
// Expected Output:
// beginning test suite Hello world beginning test case input is as expected failed running test suite Hello world on test 
// case input is as expected with error message expected "foo" to be "fooo" 

// Example 3:
// describe('Hello world', () => { it('input is as expected', () => { let input = 'foo'; let expected = 'string'; 
// expect(input).toBeType(expected); }); }); 
// Expected Output:
// beginning test suite Hello world beginning test case input is as expected failed running test suite Hello world on test case 
// input is as expected with error message expected "foo" to be of type "string" but got "object"

function describe(testSuiteName, func) {
    // Logs a message indicating the beginning of the test suite
    console.log(`Begining test suite ${testSuiteName}`);
    try {
        // Executes the callback function containing the test cases
        func();
        // Logs a message indicating the successful completion of the test suite
        console.log(`Successfully completed test suite ${testSuiteName}`);
    } catch (error) {
        const { testCaseName, errorMessage } = error;
        // Logs an error message if an error occurs during the test suite execution
        console.error(
            `failed running test suite ${testSuiteName} on test case ${testCaseName} with error message ${errorMessage}`
        );
    }
}

function it(testCaseName, func) {
    // Logs a message indicating the beginning of the test case
    console.log(`Begining test case ${testCaseName}`);
    try {
        // Executes the callback function containing the assertions
        func();
        // Logs a message indicating the successful completion of the test case
        console.log(`Successfully completed test case ${testCaseName}`);
    } catch (errorMessage) {
        const error = { testCaseName, errorMessage };
        // Throws an error object if an assertion fails during the test case execution
        throw error;
    }
}

function expect(actual) {
    // Returns a new instance of the Expect class, initialized with the actual value
    return new Expect(actual);
}

class Expect {
    value = null;

    constructor(value) {
        this.value = value;
    }

    // Asserts that the value exists (not null or undefined)
    toExist() {
        if (this.value == null) {
            throw `Expected value to exist but got ${JSON.stringify(this.value)}`
        }
    }

    // Asserts that the value is equal to the expected value
    toBe(expected) {
        if (this.value !== expected) {
            throw `expected ${JSON.stringify(this.value)} to be ${JSON.stringify(expected)}`;
        }
    }

    // Asserts that the value is of the expected type
    toBeType(type) {
        if (typeof this.value !== type) {
            throw `expected ${JSON.stringify(this.value)} to be of type ${type} but got ${typeof this.value}`;
        }
    }
}

// The provided code introduces a simple testing framework for frontend code that enables developers to define test suites 
// and test cases, and provides assertion methods for validating expected outcomes.

// The testing framework consists of several functions and a class that work together to facilitate testing. Let's explore each 
// component and understand how they contribute to the overall functionality of the framework.

//     1. describe function: This function allows developers to define a test suite, which is a grouping of related test cases. It 
//     takes two parameters: testSuiteName, a string that represents the name of the test suite, and func, a callback function that 
//     contains the test cases associated with the suite.

// Inside the describe function, a message is logged to the console indicating the beginning of the test suite. Then, the callback 
// function func is executed, which should contain the individual test cases. If an error occurs during the execution of the test cases,
// the catch block is triggered. The error object contains information about the failing test case, such as the testCaseName and the 
// errorMessage. This information is logged to the console, providing details about the failed test case within the test suite.

//     1. it function: This function allows developers to define individual test cases within a test suite. It takes two parameters: 
//     testCaseName, a string that represents the name of the test case, and func, a callback function that contains the assertions 
//     to be made within the test case.

// Similar to the describe function, the it function logs a message to the console indicating the beginning of the test case. It then 
// executes the provided callback function, which typically includes one or more assertions to verify the expected behavior. If an 
// assertion fails and throws an error, the catch block is triggered. The error message is captured and transformed into an error 
// object that includes the testCaseName and errorMessage. This error object is then thrown to propagate the error to the higher-level 
// describe function.

// 1. expect function: This function is used to create an instance of the Expect class, which provides assertion methods for validating expected outcomes. It takes an actual value as a parameter and returns a new instance of the Expect class, initialized with the provided actual value.
// 2. Expect class: This class encapsulates various assertion methods that can be invoked on an instance of Expect. The provided code includes three assertion methods: toExist(), toBe(expected), and toBeType(type).
//     - The toExist() method checks if the value is null or undefined. If the value is null or undefined, an error is thrown, indicating that the value was expected to exist.
//     - The toBe(expected) method compares the actual value with the expected value. If the values are not strictly equal, an error is thrown, providing details about the expected and actual values.
//     - The toBeType(type) method verifies whether the actual value has the expected type. If the types do not match, an error is thrown, indicating the expected and actual types.
// These assertion methods help developers define clear expectations and validate their code's behavior within test cases.

// Overall, the provided code establishes a simple and flexible testing framework that allows frontend developers to define test 
// suites, test cases, and assertions. By using the describe, it, and expect functions, developers can structure and organize their 
// tests effectively. The Expect class provides assertion methods to check values, types, and existence, enabling precise validation 
// of expected outcomes.

function runTestCases() {
    describe('Hello World', () => {
        it('input exists', () => {
            let input = null;
            expect(input).toExist();
        });

        it('input is as expected', () => {
            let input = 'foo';
            let expected = 'fooo';
            expect(input).toBe(expected);
        });

        it('input type is as expected', () => {
            let input = 'foo';
            let expected = 'string';
            expect(input).toBeType(expected);
        });
    });
}

document.getElementById('runTests').addEventListener('click', () => {
    // Clear previous test results if any
    console.clear();
    // Run the test cases
    runTestCases();
})