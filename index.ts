class Location {
  x: number;
  y: number;
}

class Grid {
  word: string;
  locations: Location[];
  constructor() {
    this.locations = [];
  }
}

export class WordSearch {
  grid: string[] = [];
  verticalGrid: string[] = [];
  diagonalGrid: Grid[] = [];

  constructor(_grid: string[] = []) {
    this.grid = _grid;
  }

  public find(words: string[]) {
    let matchItem: any = {};
    if (!this.grid) return matchItem;

    this.prepareVerticalGrid();
    this.prepareDiagonalGrid();
    words.forEach((wordItem) => {
      matchItem[wordItem] =
        this.horizontalSearch(this.grid, wordItem) ??
        this.verticalSearch(wordItem) ??
        this.diagonalSearch(wordItem);
    });
    return matchItem;
  }

  // A utility function to find min
  // of two integers
  min(a, b) {
    return a < b ? a : b;
  }

  // A utility function to find min
  // of three integer
  _min(a, b, c) {
    return this.min(this.min(a, b), c);
  }

  // A utility function to find max
  // of two integers
  max(a, b) {
    return a > b ? a : b;
  }

  prepareDiagonalGrid() {
    console.log('');

    let matrix = this.grid.map((f) => f.split(''));

    let row_count = this.grid.length;
    let col_count = this.grid[0].length;

    for (let line = 1; line <= row_count + col_count - 1; line++) {
      let start_col = this.max(0, line - row_count);

      let count = this._min(line, col_count - start_col, row_count);

      let str: string = '';
      let strOpposite: string = '';

      let gridItem: Grid = new Grid();
      let gridItemOpposite: Grid = new Grid();

      for (let j = 0; j < count; j++) {
        str += matrix[this.min(row_count, line) - j - 1][start_col + j];
        gridItem.locations.push(<Location>{
          x: start_col + j + 1,
          y: this.min(row_count, line) - j,
        });

        if (matrix.length > this.min(col_count, line) - j - 1) {
          strOpposite +=
            matrix[this.min(col_count, line) - j - 1][
              col_count - ((start_col + j) % col_count) - 1
            ];
          gridItemOpposite.locations.push(<Location>{
            x: col_count - ((start_col + j) % col_count),
            y: this.min(col_count, line) - j,
          });
        }
      }

      gridItem.word = str;
      gridItemOpposite.word = strOpposite;
      this.diagonalGrid.push(gridItem);
      this.diagonalGrid.push(gridItemOpposite);
    }
  }

  prepareVerticalGrid() {
    for (let i = 0; i < this.grid[0].length; i++) {
      let str: string = this.grid.map((e, index) => e[i]).join('');
      this.verticalGrid.push(str);
    }
  }

  horizontalSearch(grid: string[], word: string) {
    let locationInfo: any = undefined;
    let wordItemReverse = word.split('').reverse().join('');
    let gridLineIndex = grid.findIndex(
      (f) => f.includes(word) || f.includes(wordItemReverse)
    );
    if (gridLineIndex > -1) {
      if (grid[gridLineIndex].includes(word)) {
        let lineStartPoint = grid[gridLineIndex].indexOf(word);
        locationInfo = {
          start: [gridLineIndex + 1, lineStartPoint + 1],
          end: [gridLineIndex + 1, lineStartPoint + word.length],
        };
      } else {
        let lineStartPoint = grid[gridLineIndex].indexOf(wordItemReverse);
        locationInfo = {
          start: [gridLineIndex + 1, lineStartPoint + word.length],
          end: [gridLineIndex + 1, lineStartPoint + 1],
        };
      }

      return locationInfo;
    }
  }

  verticalSearch(word: string) {
    let locationInfo = this.horizontalSearch(this.verticalGrid, word);
    if (locationInfo) {
      locationInfo.start = locationInfo.start.reverse();
      locationInfo.end = locationInfo.end.reverse();
    }
    return locationInfo ?? undefined;
  }

  diagonalSearch(word: string) {
    let locationInfo: any = undefined;
    let wordReverse = word.split('').reverse().join('');
    let gridLineIndex = this.diagonalGrid.findIndex(
      (f) => f.word.includes(word) || f.word.includes(wordReverse)
    );

    if (gridLineIndex > -1) {
      let diagonalGridItem = this.diagonalGrid[gridLineIndex];

      if (diagonalGridItem.word.includes(word)) {
        let lineStartPoint = diagonalGridItem.word.indexOf(word);
        let lineStartLocation = diagonalGridItem.locations[lineStartPoint];
        let lineEndLocation =
          diagonalGridItem.locations[lineStartPoint + word.length - 1];

        locationInfo = {
          start: [lineStartLocation.y, lineStartLocation.x],
          end: [lineEndLocation.y, lineEndLocation.x],
        };
      } else {
        let lineStartPoint = diagonalGridItem.word.indexOf(wordReverse);
        let lineStartLocation =
          diagonalGridItem.locations[lineStartPoint + word.length - 1];
        let lineEndLocation = diagonalGridItem.locations[lineStartPoint];

        locationInfo = {
          start: [lineStartLocation.y, lineStartLocation.x],
          end: [lineEndLocation.y, lineEndLocation.x],
        };
      }
    }

    return locationInfo ?? undefined;
  }
}

const grid = ['jefblpepre'];

const wordSearch = new WordSearch(grid);
console.log(wordSearch.find(['glasnost']));
