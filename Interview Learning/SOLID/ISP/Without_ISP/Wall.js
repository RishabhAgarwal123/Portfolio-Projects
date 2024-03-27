
import Entity from './Entity';

export default class Wall extends Entity {
    constructor(name, health) {
        super(name, 0, health);
    }

    move() {
        return null;
    }

    attack() {
        return null;
    }
}