export default class FileHandler {
    constructor() {

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