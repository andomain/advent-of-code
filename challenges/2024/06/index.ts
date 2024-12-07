import { readFileSync } from 'fs';
import Vector from '../../../lib/Vector';

type Map = Array<Array<Symbol>>;

enum Symbol {
  Unvisited = '.',
  Obstacle = '#',
  Visited = 'X',
  Guard = '^',
}

type MapStatus = { position: Vector | null; map: Map };

const symbolMapping = new Map([
  ['.', Symbol.Unvisited],
  ['#', Symbol.Obstacle],
  ['X', Symbol.Visited],
  ['^', Symbol.Guard],
]);

// DEBUG METHOD
const printMap = (map: Map, visited: Set<string>) => {
  map.forEach((row, rowIdx) =>
    console.log(
      row
        .map((cell, cellIdx) => {
          if (cell === '#') {
            return cell;
          }

          return visited.has(new Vector(cellIdx, rowIdx).toString()) ? 'X' : '.';
        })
        .join(''),
    ),
  );
};

const toSymbol = (char: string) => {
  if (!symbolMapping.has(char)) {
    throw new Error(`Unknown symbol: ${char}`);
  }
  return symbolMapping.get(char)!;
};

const readMap = (filePath: string) =>
  readFileSync(filePath)
    .toString()
    .split('\n')
    .reduce<MapStatus>(
      (info, row, rowIdx) => {
        const cells = row.split('');

        const colIdx = row.indexOf(Symbol.Guard);

        if (colIdx > -1) {
          cells[colIdx] = Symbol.Visited;
          info.position = new Vector(colIdx, rowIdx);
        }

        info.map.push(cells.map(toSymbol));
        return info;
      },
      { position: null, map: [] },
    );

const directions = [new Vector(0, -1), new Vector(1, 0), new Vector(0, 1), new Vector(-1, 0)];

const inBounds = (pos: Vector, map: Map) => {
  const gridWidth = map[0].length;
  const gridHeight = map.length;

  return pos.x >= 0 && pos.y >= 0 && pos.x < gridWidth && pos.y < gridHeight;
};

const takeNextStep = (pos: Vector, map: Map, startDir: number) => {
  let dirIdx = startDir;
  let nextStep = pos.add(directions[dirIdx]);

  while (map[nextStep.y]?.[nextStep.x] === Symbol.Obstacle) {
    dirIdx = (dirIdx + 1) % 4;
    nextStep = pos.add(directions[dirIdx]);
  }

  return [nextStep, dirIdx] as [Vector, number];
};

const walkMap = (map: Map, startPosition: Vector) => {
  let currentPosition = startPosition.clone();
  let direction = 0;

  const visited = new Set<string>();

  while (inBounds(currentPosition, map)) {
    visited.add(currentPosition.toString());

    [currentPosition, direction] = takeNextStep(currentPosition, map, direction);
  }

  return visited;
};

const isMapLooping = (map: Map, startPosition: Vector) => {
  let currentPosition = startPosition.clone();
  let direction = 0;

  const visited = new Map<string, Array<number>>();

  while (inBounds(currentPosition, map)) {
    const currentPosLabel = currentPosition.toString();

    if (!visited.has(currentPosLabel)) {
      visited.set(currentPosLabel, []);
    }

    const currentDirections = visited.get(currentPosLabel)!;

    if (currentDirections.indexOf(direction) > -1) {
      return true;
    }

    visited.set(currentPosLabel, [...currentDirections, direction]);

    [currentPosition, direction] = takeNextStep(currentPosition, map, direction);
  }

  return false;
};

const solution1 = (data: MapStatus) => {
  if (!data.position) {
    throw new Error('No starting position detected');
  }
  return walkMap(data.map, data.position).size;
};

const solution2 = (data: MapStatus) => {
  if (!data.position) {
    throw new Error('No starting position detected');
  }

  const path = Array.from(walkMap(data.map, data.position))
    .map((posLabel) => Vector.from(posLabel))
    .filter((pos) => !pos.eq(data.position!));

  return path.reduce((result, step) => {
    const updatedMap = data.map.map((row) => [...row]);
    updatedMap[step.y][step.x] = Symbol.Obstacle;

    return result + (isMapLooping(updatedMap, data.position!) ? 1 : 0);
  }, 0);
};

const info = readMap(`${__dirname}/input.txt`);

console.time('Part 1');
console.log(`Part 1: ${solution1(info)}`);
console.timeEnd('Part 1');

console.time('Part 2');
console.log(`Part 2: ${solution2(info)}`);
console.timeEnd('Part 2');
