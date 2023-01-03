import { getFileLines } from '../../../lib/io';
import Vector from '../../../lib/Vector';

type Wall = Vector[];
type Grid = Array<typeof AIR | typeof WALL | typeof SAND>[];

const AIR = '.';
const WALL = '#'
const SAND = 'o';
const BLOCKERS = [WALL, SAND]
const DROP_POINT = new Vector(500, 0);

const coordsToVector = (coords: string): Vector => {
  const [x, y] = coords.split(',');
  return new Vector(+x, +y);
};

const getMaxDimensions = (walls: Wall[]) => walls.reduce((lookup, wallSet) => ({
  maxWidth: Math.max(lookup.maxWidth, ...wallSet.map(vec => vec.x + 1)),
  maxHeight: Math.max(lookup.maxHeight, ...wallSet.map(vec => vec.y + 1)),
}), { maxWidth: 0, maxHeight: 0 });

const input = getFileLines(`${__dirname}/input.txt`)
  .map(row => row.split(' -> ').map(coordsToVector));

const { maxWidth, maxHeight } = getMaxDimensions(input);

const addWalls = (grid: Grid, walls: Wall): Grid => {
  for (let i = 0; i < walls.length - 1; i++) {
    const start = walls[i];
    const length = walls[i + 1].subtract(start);

    const unitDir = length.unit();
    const mag = length.mag();

    for (let j = 0; j <= mag; j++) {
      grid[start.y + j * unitDir.y][start.x + j * unitDir.x] = WALL;
    }
  }

  return grid;
}

const initGrid = (walls: Wall[], width: number, height: number): Grid => walls.reduce(addWalls, new Array(height).fill(null).map(_ => new Array(width).fill(AIR)));

const canFall = (grid: Grid, pos: Vector): boolean => pos.y < maxHeight && !BLOCKERS.includes(grid[pos.y + 1]?.[pos.x]) || !BLOCKERS.includes(grid[pos.y + 1]?.[pos.x - 1]) || !BLOCKERS.includes(grid[pos.y + 1]?.[pos.x + 1])

const dropSand = (grid: Grid, dropPoint: Vector): Vector | null => {
  const initialDropRow = grid.findIndex(row => BLOCKERS.includes(row[dropPoint.x])) - 1;
  let sand = new Vector(dropPoint.x, initialDropRow);

  // Drop vertically until initial obstacle detected
  while (grid[sand.y + 1][sand.x] && grid[sand.y + 1][sand.x] === AIR) {
    sand.add(new Vector(0, 1));
  }

  while (canFall(grid, sand)) {
    if (grid[sand.y + 1]?.[sand.x] === AIR) {
      sand.y += 1;
    } else if (grid[sand.y + 1]?.[sand.x - 1] === AIR) {
      sand = sand.add(new Vector(-1, 1));
    } else if (grid[sand.y + 1]?.[sand.x + 1] === AIR) {
      sand = sand.add(new Vector(1, 1));
    } else {
      return null;
    }
  }

  grid[sand.y][sand.x] = SAND;

  return sand;
}

const fill = (grid: Grid, testCond: Function) => {
  let sandCount = 0;

  while (testCond(dropSand(grid, DROP_POINT))) {
    sandCount++;
  }

  return sandCount;
}

const part1 = () => {
  const grid = initGrid(input, maxWidth, maxHeight);
  return fill(grid, (res: Vector | null) => res !== null)
}

const part2 = () => {
  const grid = initGrid(input, maxWidth * 2, maxHeight);

  grid.push(new Array(grid[0].length).fill(AIR));
  grid.push(new Array(grid[0].length).fill(WALL));

  return fill(grid, (res: Vector | null) => !res?.eq(DROP_POINT)) + 1;
}

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
