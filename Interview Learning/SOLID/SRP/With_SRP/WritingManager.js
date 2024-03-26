export default class WritingManager {
    preprocess(j) {
        //
    }

    saveToFile(journal, filename) {
        fs.writeFileSync(filename, journal.toString());
    }
}
