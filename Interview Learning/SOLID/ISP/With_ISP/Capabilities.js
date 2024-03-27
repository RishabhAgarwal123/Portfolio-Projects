export const mover = {
    move() {
        console.log(`${this.name} moved`);
    }
}

export const attacker = {
    attack(targetEntity) {
        console.log(`${this.name} attacked ${this.targetEntity} for ${this.attackDamage} damage`);
        targetEntity.takeDamage(this.attackDamage);
    }
}

export const hasHealth = {
    takeDamage(amount) {
        this.health -= amount;

        console.log(`${this.name} has ${this.health} health remaining`);
    }
}