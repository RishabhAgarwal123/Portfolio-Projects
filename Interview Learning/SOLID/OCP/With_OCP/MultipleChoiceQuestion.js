export default class MultipleChoiceQuestion {
    constructor(description, options) {
        this.Description = description;
        this.Options = options;
    }

    printQuestionChoices() {
        this.Options.forEach((option, index) => {
            console.log(`${index + 1}. ${option}`);
        });
    }
}