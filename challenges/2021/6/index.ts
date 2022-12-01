import { deflateSync } from 'zlib';
import { sumEl } from '../../../lib';
import { getFileLines } from '../../../lib/io/readFile';
import getInput from '../../../utils/getInput';

const initTimers = getFileLines(`${__dirname}/input.txt`)[0]
  .split(',')
  .map(Number)
  .reduce((bins, value) => {
    bins[value] += 1;

    return bins;
  }, new Array(9).fill(0));

const runTimers = (counters: number[], days: number, cycleLength = 7): number[] => {
  const updated = Array.from(counters);

  // The fish in spot 0 will reproduce. 
  // Add that many to the end of the array as new fish (cycleLength + 1)
  // and insert old fish second from last (allow for 0-index)
  for (let i = 0; i < days; i++) {
    const reproducing = updated.shift();

    if (typeof reproducing !== 'number') {
      throw new Error(`Unknown timer value ${reproducing}`);
    }
    updated[cycleLength - 1] += reproducing;
    updated.push(reproducing);
  }

  return updated;
}

const part1 = () => runTimers(initTimers, 80).reduce(sumEl);

const part2 = () => runTimers(initTimers, 256).reduce(sumEl);

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);