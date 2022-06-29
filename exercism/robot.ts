export class Robot {
  private robotName: string;
  constructor() {
    this.robotName = RobotNameGen.getName();
  }
  public get name(): string {
    return this.robotName;
  }
  public resetName(): void {
    this.robotName = RobotNameGen.getName();
  }
  public static releaseNames(): void {
    RobotNameGen.releaseNames();
  }
}
class RobotNameGen {
  private static names: string[];
  private static nameIndex = 0;
  private static _initialize = (() => {
    RobotNameGen.names = [];
    let letters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
    let numbers = [...'0123456789'];
    const characterdigit = letters.flatMap((c1) =>
      letters.flatMap((c2) => c1 + c2)
    );
    const numberdigit = numbers.flatMap((n1) =>
      numbers.flatMap((n2) => numbers.flatMap((n3) => n1 + n2 + n3))
    );
    RobotNameGen.names = characterdigit.flatMap((l) =>
      numberdigit.flatMap((f) => l + f)
    );

    RobotNameGen.names = RobotNameGen.shuffle(RobotNameGen.names);
  })();
  private static shuffle(array: string[]) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
  public static getName(): string {
    return RobotNameGen.names[RobotNameGen.nameIndex++];
  }
  public static releaseNames() {
    RobotNameGen.nameIndex = 0;
  }
}
