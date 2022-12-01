import { getFileLines } from "../../../lib/io/readFile";
import Vector from "../../../lib/Vector";


type Line = { start: Vector, end: Vector };
type Grid = number[][];

const lineToXY = (line: string) => line.split(' -> ')
const xyToVectors = ([start, end]: string[]) => {
  const [startX, startY] = start.split(',');
  const [endX, endY] = end.split(',');

  return {
    start: new Vector(+startX, +startY),
    end: new Vector(+endX, +endY),
  }
}

const buildGrid = (x: number, y: number, init = 0) => new Array(y + 1).fill(0).map((_) => new Array(x + 1).fill(init));

const isStraight = ({ start, end }: Line): boolean => start.x === end.x || start.y === end.y;

const drawLinesOnGrid = (lines: Line[]): Grid => {
  const { maxX, maxY } = lines.reduce((max, line) => ({
    maxX: Math.max(max.maxX, line.start.x, line.end.x),
    maxY: Math.max(max.maxY, line.start.y, line.end.y),
  }), { maxX: 0, maxY: 0 });

  const grid = buildGrid(maxX, maxY);

  for (const { start, end } of lines) {
    const dir = end.subtract(start);
    let step = dir.unit();

    const mag = Math.max(...Object.values(dir.abs()));

    for (let i = 0; i <= mag; i++) {
      grid[start.y + step.y * i][start.x + step.x * i] += 1;
    }

  }
  return grid;
}

const countOverlaps = (lines: Line[]) => drawLinesOnGrid(lines)
  .reduce((rowSum, row) => (
    rowSum += row.reduce((overlapCount: number, col: number) => overlapCount += col > 1 ? 1 : 0, 0)
  ), 0);


const inputLines = getFileLines(`${__dirname}/input.txt`)
  .map(lineToXY)
  .map(xyToVectors);

const part1 = () => {
  const straightLines = inputLines.filter(isStraight)
  return countOverlaps(straightLines);
}

const part2 = () => {
  return countOverlaps(inputLines);
}

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);