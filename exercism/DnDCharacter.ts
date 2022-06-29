// Import stylesheets
import './style.css';




export class DnDCharacter {
  public hitpoints: number;
  public strength: number;
  public dexterity: number;
  public constitution: number;
  public intelligence: number;
  public wisdom: number;
  public charisma: number;

  constructor() {
    this.strength = DnDCharacter.generateNumber();
    this.dexterity = DnDCharacter.generateNumber();
    this.constitution = DnDCharacter.generateNumber();
    this.intelligence = DnDCharacter.generateNumber();
    this.wisdom = DnDCharacter.generateNumber();
    this.charisma = DnDCharacter.generateNumber();
    this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution);
  }

  public static generateAbilityScore(): number {
    let numbers: number[] = [];
    for (var i = 0; i < 4; i++) {
      numbers.push(DnDCharacter.getRandomNumber(1, 6));
    }
    numbers.sort();
    numbers.splice(0, 1);
    return numbers.map((f) => f).reduce((a, b) => a + b);
  }

  static generateNumber(): number {
    let numbers: number[] = [];
    for (var i = 0; i < 4; i++) {
      numbers.push(DnDCharacter.getRandomNumber(1, 6));
    }
    numbers.sort();
    numbers.splice(0, 1);
    return numbers.map((f) => f).reduce((a, b) => a + b);
  }

  static getRandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  public static getModifierFor(abilityValue: number): number {
    return Math.floor((abilityValue - 10) / 2);
  }
}
