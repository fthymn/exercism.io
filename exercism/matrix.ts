export class Matrix {
  rows: number[][];
  columns: number[][];
  constructor(input: string) {
      this.rows = input
          .split("\n")
          .map(row => row.split(" ")
          .map(value => Number(value)));
      this.columns = [];
      for (let i = 0; i < this.rows.length; i++) {
          this.columns.push(this.rows.map(row => row[i]));
      }
  }
}



let m = new Matrix('1 2 3\n4 5 6\n7 8 9\n8 7 6');
console.log(m.columns);
console.log(m.rows);