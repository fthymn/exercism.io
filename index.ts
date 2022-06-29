export class List<T> {
  valueList: any[] = [];

  public static create(...values: any[]): any {
    // Do *not* construct any array literal ([]) in your solution.
    // Do *not* construct any arrays through new Array in your solution.
    // DO *not* use any of the Array.prototype methods in your solution.

    // You may use the destructuring and spreading (...) syntax from Iterable.
    let instance = new List();
    instance.valueList = values;
    return instance;
  }

  public forEach(customCallbackFn: (value: T) => void): void {
    this.valueList.forEach(customCallbackFn);
  }

  public append(appendList: List<T>): any {
    appendList.valueList.forEach((elem) => this.valueList.push(elem));
    return this; //new List(this.valueList);
  }

  public concat(concatList: List<T>): any {
    concatList.valueList.map((m: any) =>
      m.forEach((f: any) => this.valueList.push(f))
    );
    return this;
  }

  public filter<u>(customCallbackFn: (value: T) => boolean) {
    let numberList = List.create().valueList;
    this.valueList.forEach((f) => {
      if (customCallbackFn(f)) numberList.push(f);
    });
    return numberList;
  }

  public length() {
    let len = 0;
    this.valueList.forEach((f) => len++);
    return len;
  }

  public map<N>(customCallbackFn: (value: T) => N) {
    let numberList = List.create().valueList;
    for (let i = 0; i <= this.valueList.length; i++)
      numberList[i] = customCallbackFn(this.valueList[i]);

    return numberList;
  }

  // foldl<U, V>(f: (acc: U, elem: T) => U, start: U): U {
  //   if (this.length() === 0) {
  //     return start;
  //   }
  //   return List.create(this.valueList.slice(1)).foldl(f, f(start, this.valueList[0]));
  // }
  public foldl<N, M>(customCallbackFn: (acc: N, el: T) => N, defaultValue: N) {
    if (this.valueList.length == 0) return defaultValue;

    this.valueList.forEach((f) => {
      defaultValue = customCallbackFn(defaultValue, f);
    });

    return defaultValue;
  }

  public foldr<N, M>(customCallbackFn: (acc: N, el: T) => N, defaultValue: N) {
    if (this.valueList.length == 0) return defaultValue;

    this.valueList.reverse().forEach((f) => {
      defaultValue = customCallbackFn(defaultValue, f);
    });

    return defaultValue;
  }

  reverse(): List<T> {
    if (this.length() === 0) {
      return this;
    }

    for (let i = 0; i < this.valueList.length; i++) {
      let changePoint = this.valueList.length - 1 - i;

      let source = this.valueList[i];
      let destination = this.valueList[changePoint];
      this.valueList[i] = destination;
      this.valueList[changePoint] = source;

      if (i + 1 > (this.valueList.length - 1) / 2) break;
    }

    return this;
  }
}
const list1 = List.create(1, 3, 5, 7);
console.log(list1.reverse());

const list2 = List.create([1, 2], [3], [], [1, 2, 3, 6, 5, 8], [4, 5, 6]);
console.log(list2.reverse());
