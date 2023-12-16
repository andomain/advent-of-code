/* eslint-disable max-classes-per-file */
import { readFileSync } from 'fs';
import Vector from '../../../lib/Vector';

const inputData = readFileSync(`${__dirname}/input.txt`).toString();

type Pipe = '|' | '-' | 'F' | '7' | 'J' | 'L' | 'S';

enum Directions {
  North = 'North',
  South = 'South',
  East = 'East',
  West = 'West',
}

const DirectionVector: { [dir in Directions]: Vector } = {
  [Directions.North]: new Vector(0, -1),
  [Directions.South]: new Vector(0, 1),
  [Directions.East]: new Vector(1, 0),
  [Directions.West]: new Vector(-1, 0),
};

const Connectors: { [dir in Directions]: Pipe[] } = {
  North: ['|', 'F', '7'],
  South: ['|', 'J', 'L'],
  East: ['-', '7', 'J'],
  West: ['-', 'L', 'F'],
};

const ValidDirections: { [key in Pipe]: Directions[] } = {
  '|': [Directions.North, Directions.South],
  '-': [Directions.East, Directions.West],
  F: [Directions.East, Directions.South],
  7: [Directions.West, Directions.South],
  L: [Directions.North, Directions.East],
  J: [Directions.North, Directions.West],
  S: [Directions.North, Directions.East, Directions.West, Directions.South],
};

const parseInput = (input: string): { start: Vector, grid: Pipe[][] } => {
  let startPos = { x: -1, y: -1 };

  const grid = input.split('\n').map<Pipe[]>((row, y) => {
    const x = row.indexOf('S');
    if (x > -1) {
      startPos = new Vector(x, y);
    }
    return row.split('') as Pipe[];
  });

  return { start: new Vector(startPos.x, startPos.y), grid };
};

const getVal = (grid: Pipe[][], pos: Vector): Pipe => grid[pos.y][pos.x];

const getNetwork = (input: string) => {
  const { start, grid } = parseInput(input);

  let completed = false;
  let currentPos = start;
  const visited: Set<string> = new Set();

  while (!completed) {
    const current = getVal(grid, currentPos);
    const nextDirections = ValidDirections[current];

    // This is messy but gets the job done
    let nextGridCell: Vector;
    let nextPipe: Pipe;

    // eslint-disable-next-line @typescript-eslint/no-loop-func
    nextDirections.find((dir) => {
      nextGridCell = currentPos.add(DirectionVector[dir]);
      nextPipe = getVal(grid, nextGridCell);
      if (nextPipe === 'S') {
        completed = true;
      }
      return nextPipe === 'S' || (Connectors[dir].includes(nextPipe) && !visited.has(nextGridCell.toString()));
    })!;

    visited.add(currentPos.toString());
    currentPos = nextGridCell!;
  }

  return visited;
};

export const solution1 = (input: string) => getNetwork(input).size / 2;

/**
 * The Shoelace formula determines the area of a polygon with vertices described
 * by Cartesian coordinates
 * https://en.wikipedia.org/wiki/Shoelace_formula
 */
const getShoestringArea = (points: Vector[]) => {
  let sum = 0;
  for (let i = 0; i < points.length; i += 1) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    sum += (a.x * b.y) - (a.y * b.x);
  }
  return Math.abs(sum) / 2;
};

export const solution2 = (input: string) => {
  const networkPoints = getNetwork(input);

  // Convert set of Vector string representations back to Vectors
  const loopVectors = Array.from(networkPoints).map((point) => Vector.from(point));

  // Get area of enclosed polygon
  const loopArea = getShoestringArea(loopVectors);

  // Rearrange Picks theorem
  // https://en.wikipedia.org/wiki/Pick%27s_theorem
  // A = i + b /2 -1

  return loopArea - networkPoints.size / 2 + 1;
};

console.time('Part 1');
console.log(`Part 1: ${solution1(inputData)}`);
console.timeEnd('Part 1');
console.time('Part 2');
console.log(`Part 2: ${solution2(inputData)}`);
console.timeEnd('Part 2');
