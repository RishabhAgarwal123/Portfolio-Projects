// To adhere to the SRP, we would separate these responsibilities into two different classes:
import FileHandler from './SaveCalculations';

class Calculator {
    constructor() {
        // Initialize any necessary variables or properties
    }

    add(a, b) {
        // Perform addition calculation
        return a + b;
    }

    multiply(a, b) {
        // Perform multiplication calculation
        return a * b;
    }
}

// Usage example:
const calculator = new Calculator();
console.log("Addition result:", calculator.add(5, 3)); // Output: 8
console.log("Multiplication result:", calculator.multiply(5, 3)); // Output: 15

// Some other class has saving and loading functionality
const fileHandler = new FileHandler();
fileHandler.saveToFile('Path to file', { result: 8 });
fileHandler.loadFromFile('Path to file');