import { sumEl } from '../../../lib';
import { getFileLines, groupLines } from '../../../lib/io';

const input = getFileLines(`${__dirname}/input.txt`);

const splitInHalf = (line: string): string[] => [line.slice(0, line.length / 2), line.slice(line.length / 2)]

const getDuplicate = ([a, b]: string[]) => {
  const contentA = new Set(a.split(''));
  return b.split('').find(item => contentA.has(item))!;
}

const getCommon = ([a, ...rest]: string[]): string => {
  const others = rest.map(str => new Set(str.split('')));

  return a.split('').find(item => others.every(other => other.has(item)))!;
}


const priority = (item: string): number => {
  if (item.toLowerCase() === item) {
    return item.charCodeAt(0) - 96;
  }

  return item.charCodeAt(0) - 38;
}

const part1 = () => input
  .map(splitInHalf)
  .map(getDuplicate)
  .map(priority)
  .reduce(sumEl);

const part2 = () => groupLines(input, 3)
  .map(getCommon)
  .map(priority)
  .reduce(sumEl);

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);