import { readFileSync } from 'fs';

import { reduceSum } from '../../../reducers';

// Convert input to a dictionary of values and counts
const readInput = (filePath: string) =>
  readFileSync(filePath)
    .toString()
    .split(/\s+/)
    .reduce<Record<string, number>>((lookup, stone) => {
      const current = lookup[stone] || 0;

      lookup[stone] = current + 1;

      return lookup;
    }, {});

// Implement mapping of stones
const processStone = (stone: string) => {
  if (stone === '0') {
    return ['1'];
  }

  if (stone.length % 2 === 0) {
    return [Number(stone.slice(0, stone.length / 2)), Number(stone.slice(stone.length / 2))].map((el) => el.toString());
  }

  return [(+stone * 2024).toString()];
};

// Build a function to blink n time and generate a dictionary of how often each stone appears
const blink = (stones: Record<string, number>) => (count: number) => {
  let result = { ...stones };

  for (let i = 0; i < count; i++) {
    result = Object.entries(result).reduce<Record<string, number>>((lookup, [stone, count]) => {
      processStone(stone).forEach((next) => {
        const current = lookup[next] || 0;
        lookup[next] = current + count;
      });
      return lookup;
    }, {});
  }
  return result;
};

// Calculate how many stones are present
const countStones = (lookup: Record<string, number>) => Object.values(lookup).reduce(reduceSum);

/**
 * SOLUTION
 */

// Count initial stones
console.time('Parse input');
const startCount = readInput(`${__dirname}/input.txt`);
console.timeEnd('Parse input');

// Build blinking function
const blinkTimes = blink(startCount);

console.time('Part 1');
console.log(countStones(blinkTimes(25)));
console.timeEnd('Part 1');

console.time('Part 2');
console.log(countStones(blinkTimes(75)));
console.timeEnd('Part 2');
