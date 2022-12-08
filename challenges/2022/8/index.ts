import { getFileLines } from '../../../lib/io';

type Grid = number[][];

const directions = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
]

const isOutsideGrid = (grid: Grid, x: number, y: number) => (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length)

const input = getFileLines(`${__dirname}/input.txt`)
  .map(row => row.split('').map(Number));

const isVisible = (grid: Grid, x: number, y: number): boolean => {
  const startValue = grid[y][x];

  for (const dir of directions) {
    let [currentX, currentY] = [x, y];
    let isVisible = true;

    while (true) {
      currentX += dir.x;
      currentY += dir.y;

      // If we reach the edge, stop checking
      if (isOutsideGrid(grid, currentX, currentY)) {
        break;
    }

    if (grid[currentY][currentX] >= startValue) {
      isVisible = false;
      break;
    }
  }


  if (isVisible) {
    return true;
  }
}

return false;
}

const countTrees = (grid: Grid, x: number, y: number): number => {
  const counts = new Array();
  const startHeight = grid[y][x];

  for (const dir of directions) {
    let [currentX, currentY] = [x, y];
    let count = 0;

    while (true) {
      currentX += dir.x;
      currentY += dir.y;

      if (isOutsideGrid(grid, currentX, currentY)) {
        break;
      }

      const currentHeight = grid[currentY][currentX];

      count++;
      if (currentHeight >= startHeight) {
        break;
      }

    }
    counts.push(count);
  }

  return counts.reduce((mult, c) => mult *= c, 1);
}

const width = input[0].length;
const height = input.length;

const part1 = () => {
  // Count edges
  let visible = 2 * (width + height - 2);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (isVisible(input, x, y)) {
        visible++;
      }
    }
  }
  return visible
}

const part2 = () => {
  let max = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      max = Math.max(max, countTrees(input, x, y));
    }
  }

  return max;
}

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);