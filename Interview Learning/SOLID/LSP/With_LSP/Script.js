
import Duck from '../Without_LSP/Duck';
import Penguin from './Penguin';

function makeBirdFly(bird) {
    bird.fly();
}

function makeBirdSwim(bird) {
    bird.swim();
}

const duck = new Duck();
const penguin = new Penguin();

makeBirdFly(duck);
makeBirdSwim(penguin);

// however this is not the perfect solution
// because a duck can swim and fly
// but in OOP, we can't inherit from multiple classes