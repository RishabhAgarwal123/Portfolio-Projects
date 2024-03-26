import Bird from './Bird';

export default class Penguin extends Bird {
    fly() {
        throw new Error('I can not fly');
    }

    swim() {
        console.log('I can swim');
    }
}