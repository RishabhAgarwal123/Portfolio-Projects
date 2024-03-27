export default class Entity {
    constructor(name, attackDamage, health) {
        this.name = name;
        this.attackDamage = attackDamage;
        this.health = health;
    }

    move() {
        console.log(`${this.name} moved`);
    }

    attack(targetEntity) {
        console.log(`${this.name} attacked ${targetEntity} for ${this.attackDamage} damage`);

        targetEntity.takeDamage(this.attackDamage);
    }

    takeAmount(amount) {
        this.health -= amount;

        console.log(`${this.name} has ${this.health} health remaining`);
    }
}