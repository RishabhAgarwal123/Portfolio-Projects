import { attacker, hasHealth, mover } from "./Capabilities";
import Entity from "./Entity";
export default class Character extends Entity {
    constructor (name, attackDamage, health) {
        super(name);

        this.attackDamage = attackDamage;
        this.health = health;
    }
}

Object.assign(Character.prototype, mover);
Object.assign(Character.prototype, attacker);
Object.assign(Character.prototype, hasHealth);