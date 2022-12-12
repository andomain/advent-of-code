import { getFileLines } from '../../../lib/io';
import Vector from '../../../lib/Vector';

const input: [string, number][] = getFileLines(`${__dirname}/input.txt`)
  .map((line) => {
    const [dir, amount] = line.split(' ');

    return [dir, Number(amount)];
  });

const vecToString = (vec: Vector): string => `${vec.x}/${vec.y}`;
const dirToVec = (dir: string): Vector => {
  switch (dir) {
    case 'U': return new Vector(0, 1);
    case 'D': return new Vector(0, -1);
    case 'R': return new Vector(1, 0);
    case 'L': return new Vector(-1, 0);
    default: throw new Error(`Unknown direction: ${dir}`);
  }
}

const follow = (source: Vector, destination: Vector): Vector => {
  const diff = destination.subtract(source);

  if (Math.abs(diff.x) <= 1 && Math.abs(diff.y) <= 1) {
    return source;
  }

  return source.add(diff.unit());
}

const simulate = (inputs: [string, number][], length = 2): number => {
  const knots: Vector[] = new Array(length).fill(new Vector(0, 0));
  const visited = new Set<string>();

  visited.add(vecToString(knots[length - 1]));

  inputs.forEach(([dir, amount]) => {
    const headVec = dirToVec(dir);

    for (let i = 0; i < amount; i++) {
      knots[0] = knots[0].add(headVec);

      for (let j = 1; j < length; j++) {
        knots[j] = follow(knots[j], knots[j - 1]);
      }

      visited.add(vecToString(knots[length - 1]));
    }
  });

  return visited.size;
}

const part1 = () => simulate(input);

const part2 = () => simulate(input, 10);

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);