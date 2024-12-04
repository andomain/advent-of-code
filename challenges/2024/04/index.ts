import { readFileSync } from 'fs';
import Vector from '../../../lib/Vector';

type Grid = Array<Array<string>>;

const readGrid = (filepath: string): Grid =>
  readFileSync(filepath)
    .toString()
    .split('\n')
    .map((row) => row.split(''));

const inputData = readGrid(`${__dirname}/input.txt`);

export const solution1 = (grid: Grid) => {
  const targetWord = 'XMAS';
  const targetWordLength = targetWord.length;
  let result = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] !== targetWord[0]) {
        continue;
      }

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const direction = new Vector(x, y);

          let read = '';

          for (let char = 0; char < targetWordLength; char++) {
            const step = direction.scalarMult(char);
            read += grid[row + step.y]?.[col + step.x] || '';
          }

          if (read === targetWord) {
            result++;
          }
        }
      }
    }
  }

  return result;
};

const isValidX = (grid: Grid, x: number, y: number) => {
  const start = grid[y][x];
  const rowAbove = grid[y - 1];
  const rowBelow = grid[y + 1];

  if (start !== 'A' || !rowAbove || !rowBelow) {
    return false;
  }

  return [
    new Set([rowAbove[x - 1] || '', rowBelow[x + 1] || '']),
    new Set([rowAbove[x + 1] || '', rowBelow[x - 1] || '']),
  ].every((pair) => pair.has('S') && pair.has('M'));
};

export const solution2 = (grid: Grid) => {
  let result = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (isValidX(grid, col, row)) {
        result++;
      }
    }
  }
  return result;
};

console.time('Part 1');
console.log(`Part 1: ${solution1(inputData)}`);
console.timeEnd('Part 1');
console.time('Part 2');
console.log(`Part 2: ${solution2(inputData)}`);
console.timeEnd('Part 2');
