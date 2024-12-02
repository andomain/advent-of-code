import { readFileSync } from 'fs';
import { rotateClockWise } from '../../../utils/matrix';
import { reduceSumFn } from '../../../reducers';

const inputData = readFileSync(`${__dirname}/input.txt`).toString();

type Grid = string[];
type GridPoint = { row: number; col: number };
type ScoreGridFn = (grid: Grid) => number;

const getHorizontalReflectionRow = (grid: Grid, includeRow?: number) => {
  for (let i = 0; i < grid.length - 1; i += 1) {
    const upper = grid
      .slice(0, i + 1)
      .reverse()
      .join('');
    const lower = grid.slice(i + 1).join('');

    const shortest = Math.min(upper.length, lower.length);
    const shortestRows = shortest / grid[0].length;

    // If an includeRow is specified, this must be included in the reflection
    if (includeRow !== undefined) {
      if (includeRow <= i - shortestRows || includeRow >= i + shortestRows) {
        continue;
      }
    }

    if (upper.slice(0, shortest) === lower.slice(0, shortest)) {
      return i + 1;
    }
  }
  return 0;
};

const scoreGrid = (grid: Grid, smudged?: GridPoint) => {
  const horizontalScore = getHorizontalReflectionRow(grid, smudged?.row);

  if (horizontalScore) {
    return 100 * horizontalScore;
  }

  const rotated = rotateClockWise(grid.map((r) => r.split(''))).map((r) => r.join(''));
  return getHorizontalReflectionRow(rotated, smudged?.col);
};

const smudgeGrid = (grid: Grid, smudgePoint: GridPoint): Grid =>
  grid.map((row, rowIdx) => {
    if (rowIdx !== smudgePoint.row) {
      return row.slice();
    }

    const parts = row.split('');
    parts[smudgePoint.col] = parts[smudgePoint.col] === '#' ? '.' : '#';

    return parts.join('');
  });

const scoreSmudgedGrid = (grid: Grid) => {
  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[0].length; col += 1) {
      const score = scoreGrid(smudgeGrid(grid, { row, col }), { row, col });

      if (score) {
        return score;
      }
    }
  }
  return 0;
};

const parseInput = (input: string): Grid[] => input.split('\n\n').map((gridString) => gridString.split('\n'));

const solve = (scoreFn: ScoreGridFn) => (input: string) => parseInput(input).reduce(reduceSumFn(scoreFn), 0);

export const solution1 = solve(scoreGrid);
export const solution2 = solve(scoreSmudgedGrid);

console.time('Part 1');
console.log(`Part 1: ${solution1(inputData)}`);
console.timeEnd('Part 1');
console.time('Part 2');
console.log(`Part 2: ${solution2(inputData)}`);
console.timeEnd('Part 2');
