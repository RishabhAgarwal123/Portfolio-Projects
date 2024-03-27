import { attacker } from "./Capabilities";
import Entity from "./Entity";

export default class Turret extends Entity {
    constructor(name, attackDamage) {
        super(name);
        this.attackDamage = attackDamage;
    }
}

Object.assign(Turret.prototype, attacker);