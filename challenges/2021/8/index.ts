import { sumEl } from '../../../lib';
import { getFileLines } from '../../../lib/io/readFile';

const input = getFileLines(`${__dirname}/input.txt`)

/**
 * Part 1
 */
const UNIQUE_SEGMENT_LENGTHS = [2, 3, 4, 7];

const getOutputs = (input: string) => input.split(' | ')[1]
const countUniqueOutputs = (outputStr: string): number => outputStr
  .split(' ')
  .map(output => output.length)
  .filter(length => UNIQUE_SEGMENT_LENGTHS.includes(length)).length;

const part1 = () => input
  .map(getOutputs)
  .map(countUniqueOutputs)
  .reduce(sumEl);

/**
 * Part 2
 */
const part2 = () => {

}

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);