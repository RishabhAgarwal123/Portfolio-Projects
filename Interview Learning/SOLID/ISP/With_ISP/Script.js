import Character from "./Character";
import Turret from "./Turret";
import Wall from "./Wall";

const turret = new Turret('Turret', 5);
const character = new Character('Character', 3, 100);
const wall = new Wall('Wall', 200);

turret.attackDamage(character);
character.move();
character.attack(wall);

// now, each class only implements what's needed