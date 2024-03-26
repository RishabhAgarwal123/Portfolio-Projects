import BooleanQuestion from "./BooleanQuestion";
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import TextQuestion from './TextQuestion';
import RangeQuestion from './RangeQuestion';

// if we need to add another type, we just need to
// create the class with the rules for that type
// and that's it
const questions = [
    new BooleanQuestion('This code is awesome!'),
    new MultipleChoiceQuestion('What is your favourite language?', ['C#', 'SQL', 'Javascript', 'Python']),
    new TextQuestion('Describe your favourite JS feature.'),
    new RangeQuestion('What is the speed limit in your city?')
];

function printQuiz() {
    questions.forEach(question => {
        console.log(question.Description);
        question.printQuestionChoices();
        console.log('');
    })
}

// this is the real meaning of open for extension and closed for modification
printQuiz(questions);