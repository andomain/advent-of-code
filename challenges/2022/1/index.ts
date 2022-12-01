import { readFileSync } from 'fs';
import { getFileLines } from '../../../lib/io/readFile';
import { sortDesc } from '../../../lib/sort';

const sumEl = (sum: number, el: number) => sum += el

const calories = getFileLines(`${__dirname}/input.txt`, '/\n\s*\n/')
  .map(lines => lines.split('\n').map(Number));

const calorieCounts = calories.reduce((lookup, calorieList) => {
  lookup.push(calorieList.reduce(sumEl));
  return lookup;
}, []).sort(sortDesc);

const part1 = () => calorieCounts[0];

const part2 = () => calorieCounts.slice(0, 3).reduce(sumEl);

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);