
import Entity from './Entity';

export default class Turret extends Entity {
    constructor (name, attackDamage) {
        super(name, attackDamage, -1);
    }

    move() {
        return null;
    }

    attack() {
        return null;
    }
}