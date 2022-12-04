import { getFileLines } from '../../../lib/io';

type Range = [number, number];
type Pair = [Range, Range];

const input = getFileLines(`${__dirname}/input.txt`)
  .map(line => line.split(','))
  .map(([a, b]) => ([a.split('-').map(Number), b.split('-').map(Number)])) as Pair[];

const containers = ([a, b]: Pair) => (
  a[0] >= b[0] && a[1] <= b[1] ||
  b[0] >= a[0] && b[1] <= a[1]
);

const overlaps = ([a, b]: Pair) => a[0] <= b[1] && b[0] <= a[1];

const part1 = () => input.filter(containers).length;
const part2 = () => input.filter(overlaps).length;

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);