import { getFileLines } from '../../../lib/io';

const path: string[] = [];
const sizes: Record<string, number> = {};

const ROOT = '/';
const DISK_SPACE = 70000000;
const UPDATE_SIZE = 30000000;
const TOTAL_SIZE = 100000;

getFileLines(`${__dirname}/input.txt`)
  .map(l => l.replace(/^\$ /, ''))
  .forEach((line) => {
    const parts = line.split(' ');

    if (parts[0] === 'cd') {
      if (parts[1] === '..') {
        path.pop();
      } else {
        path.push(parts[1]);
      }
    }

    if (/^\d+$/.test(parts[0])) {
      for (let i = 0; i < path.length; i++) {
        const p = path.slice(0, i + 1).join('/')

        sizes[p] = (sizes[p] || 0) + Number(parts[0]);
      }
    }
  });

const part1 = () => {
  return Object.values(sizes)
    .filter(size => size <= TOTAL_SIZE)
    .reduce((sum, dir) => sum + dir, 0);
}

const required = UPDATE_SIZE - (DISK_SPACE - sizes[ROOT]);

const part2 = () => Object.values(sizes)
  .filter(size => size >= required)
  .sort()[0]

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);