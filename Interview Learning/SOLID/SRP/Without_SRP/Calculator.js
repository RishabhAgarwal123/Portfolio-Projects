// Let's say we have a Calculator class that performs calculations and also handles file operations, such as reading and writing 
// data to a file. 
// However, this violates the SRP because it has two responsibilities.
const fs = require('fs');

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

    saveToFile(filePath, data) {
        // Write data to a file
        // This is just a placeholder, you need to implement the actual file writing logic
        fs.writeFileSync(filePath, data);
        console.log("Data saved to file:", data);
    }

    loadFromFile(filePath) {
        // Read data from a file
        // This is just a placeholder, you need to implement the actual file reading logic
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            console.log(`Data read from ${filePath}: ${data}`);
            return data;
        } catch (error) {
            console.error(`Error reading from ${filePath}:`, error);
            return null;
        }
    }
}

// Usage example:
const calculator = new Calculator();
console.log("Addition result:", calculator.add(5, 3)); // Output: 8
console.log("Multiplication result:", calculator.multiply(5, 3)); // Output: 15
calculator.saveToFile('Path to file', { result: 8 }); // Output: Data saved to file: { result: 8 }
calculator.loadFromFile('Path to file'); // Output: Data loaded from file: Data loaded from file