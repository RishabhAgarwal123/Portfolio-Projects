import Entity from "./Entity";
import { hasHealth } from './Capabilities';


export default class Wall extends Entity {
    constructor(name, health) {
        super(name);

        this.health = health;
    }
}

Object.assign(Wall.prototype, hasHealth);