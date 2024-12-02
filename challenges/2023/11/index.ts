import { readFileSync } from 'fs';

const inputData = readFileSync(`${__dirname}/input.txt`).toString();

const expandGrid = (input: string[][]) => {
  const rows: Set<number> = new Set();
  const cols: Set<number> = new Set();

  for (let row = 0; row < input.length; row += 1) {
    if (new Set(input[row]).size === 1) {
      rows.add(row);
    }
  }

  for (let col = 0; col < input[0].length; col += 1) {
    if (input.every((row) => row[col] === '.')) {
      cols.add(col);
    }
  }

  return { rows, cols };
};

const findGalaxies = (input: string[][]) =>
  input.reduce<{ x: number; y: number }[]>((result, row, rowIdx) => {
    result.push(
      ...row.reduce<{ x: number; y: number }[]>((rowResult, col, colIdx) => {
        if (col === '#') {
          rowResult.push({ x: colIdx, y: rowIdx });
        }
        return rowResult;
      }, []),
    );
    return result;
  }, []);

const sumDistances = (grid: string[][], expansionRate: number) => {
  const { rows, cols } = expandGrid(grid);
  const galaxies = findGalaxies(grid);
  let sum = 0;

  for (let i = 0; i < galaxies.length; i += 1) {
    for (let j = i + 1; j < galaxies.length; j += 1) {
      const a = galaxies[i];
      const b = galaxies[j];

      const minX = Math.min(a.x, b.x);
      const maxX = Math.max(a.x, b.x);
      let horizontalDistance = 0;

      for (let x = minX + 1; x <= maxX; x += 1) {
        if (cols.has(x)) {
          horizontalDistance += expansionRate;
        } else {
          horizontalDistance += 1;
        }
      }

      const minY = Math.min(a.y, b.y);
      const maxY = Math.max(a.y, b.y);
      let verticalDistance = 0;

      for (let y = minY + 1; y <= maxY; y += 1) {
        if (rows.has(y)) {
          verticalDistance += expansionRate;
        } else {
          verticalDistance += 1;
        }
      }
      sum += horizontalDistance + verticalDistance;
    }
  }
  return sum;
};

export const solution1 = (input: string) => {
  const grid = input.split('\n').map((line) => line.split(''));
  return sumDistances(grid, 2);
};

export const solution2 = (input: string) => {
  const grid = input.split('\n').map((line) => line.split(''));
  return sumDistances(grid, 1000000);
};

console.time('Part 1');
console.log(`Part 1: ${solution1(inputData)}`);
console.timeEnd('Part 1');
console.time('Part 2');
console.log(`Part 2: ${solution2(inputData)}`);
console.timeEnd('Part 2');
