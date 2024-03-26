import Duck from "./Duck";
import Penguin from './Penguin';


function makeBirdFly(bird) {
    bird.fly();
}

const duck = new Duck();
const penguin = new Penguin();

makeBirdFly(duck);
makeBirdFly(penguin);