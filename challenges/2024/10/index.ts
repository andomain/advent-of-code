import { readFileSync } from 'fs';
import Vector from '../../../lib/Vector';
import { reduceSumFn } from '../../../reducers';

// type Step = Vector;
type Map = Array<Array<number>>;
type Trail = Array<Vector>;

const getLast = <T>(arr: Array<T>) => arr.slice(-1)[0];

// const takeStep = (map: Map, current: Trail, step: Vector): Trail => [...current, step];

const mapHeight = (map: Map, pos: Vector) => map[pos.y]?.[pos.x];

const Directions = [new Vector(-1, 0), new Vector(0, 1), new Vector(1, 0), new Vector(0, -1)];

const readInput = (filePath: string) =>
  readFileSync(filePath)
    .toString()
    .split('\n')
    .reduce<[Map, Trail]>(
      (lookup, mapRow, rowIdx) => {
        const startPoints = Array.from(mapRow.matchAll(/0/g)).map((match) => new Vector(match.index, rowIdx));

        const row = mapRow.split('').map(Number);

        return [
          [...lookup[0], row],
          [...lookup[1], ...startPoints],
        ];
      },
      [[], []],
    );

const scoreTrailhead = (map: Map, trail: Trail, destinations: Set<string> = new Set(), initScore = 0): number => {
  const currentStep = getLast(trail);
  const currentHeight = mapHeight(map, currentStep);

  if (currentHeight === 9 && !destinations.has(currentStep.toString())) {
    destinations.add(currentStep.toString());
    return 1;
  }

  return Directions.reduce<number>((score, direction) => {
    const nextStep = currentStep.add(direction);
    const nextStepHeight = mapHeight(map, nextStep);

    if (nextStepHeight === currentHeight + 1) {
      return score + scoreTrailhead(map, [...trail, nextStep], destinations, initScore);
    }

    return score;
  }, initScore);
};

const rateTrailHead = (map: Map, trail: Trail, initScore = 0): number => {
  const currentStep = getLast(trail);
  const currentHeight = mapHeight(map, currentStep);

  if (currentHeight === 9) {
    return 1;
  }

  return Directions.reduce<number>((score, direction) => {
    const nextStep = currentStep.add(direction);
    const nextStepHeight = mapHeight(map, nextStep);

    if (nextStepHeight === currentHeight + 1) {
      return score + rateTrailHead(map, [...trail, nextStep], initScore);
    }

    return score;
  }, initScore);
};

console.time('Parse input');
const [map, startPositions] = readInput(`${__dirname}/input.txt`);
console.timeEnd('Parse input');

const solution1 = (startPoint: Vector) => scoreTrailhead(map, [startPoint]);
const solution2 = (startPoint: Vector) => rateTrailHead(map, [startPoint]);

console.time('Part 1');
console.log(`Part 1: ${startPositions.reduce(reduceSumFn(solution1), 0)}`);
console.timeEnd('Part 1');

console.time('Part 2');
console.log(`Part 2: ${startPositions.reduce(reduceSumFn(solution2), 0)}`);
console.timeEnd('Part 2');
