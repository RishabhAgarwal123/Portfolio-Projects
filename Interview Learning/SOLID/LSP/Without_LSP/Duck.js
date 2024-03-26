import Bird from "./Bird";

export default class Duck extends Bird {
    quack() {
        console.log('I can quack');
    }
}