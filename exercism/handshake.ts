const commandsArray: Map<number, string> = new Map()
  .set(1, 'wink')
  .set(10, 'double blink')
  .set(100, 'close your eyes')
  .set(1000, 'jump');

export function commands(decNumber: any): string[] {
  let binaryStr: string = (decNumber >>> 0).toString(2);
  console.log(binaryStr);
  let returnValue = [];

  let reverseIndex = Number(binaryStr) < 10000 ? true : false;

  for (let i = 0; i < binaryStr.length; i++) {
    let index = reverseIndex ? binaryStr.length - 1 - i : i;
    if (binaryStr[index] == '1') {
      let iValue = String(binaryStr[index]).padEnd(
        binaryStr.length - index,
        '0'
      );
      let item = commandsArray.get(Number(iValue));
      if (item) {
        console.log(item);
        returnValue.push(item);
      }
    }
  }
  return returnValue;
}

export default class SecretHandshake {
  readonly codes: Map<number, string> = new Map([
    [1, 'wink'],
    [2, 'double blink'],
    [4, 'close your eyes'],
    [8, 'jump'],
  ]);
  readonly REVERSE_ARRAY = 16;
  constructor(private code: number) {}
  commands() {
    const answer: string[] = [];
    this.codes.forEach((v, k) => {
      if (this.code & k) {
        answer.push(v);
      }
    });
    return this.code & this.REVERSE_ARRAY ? answer.reverse() : answer;
  }
}

let c = new SecretHandshake(3);
console.log(c.commands());
console.log(commands(3));
