import { getFileLines } from '../../../lib/io';

type DescLookup = { result: number, prev: number | null };

export const countDescending = (arr: number[]) => arr.reduce<DescLookup>((lookup, measurement) => {
  if (lookup.prev !== null && lookup.prev < measurement) {
    lookup.result += 1;
  }
  lookup.prev = measurement;
  return lookup;
}, { result: 0, prev: null }).result;

export const slidingWindow = (input: number[], windowSize: number): number[] => {
  const result = [];

  for (let i = 0; i < input.length; i += 1) {
    result.push(input.slice(i, i + windowSize).reduce((sum, current) => sum += current, 0));
  }

  return result;
}

const input = getFileLines(`${__dirname}/input.txt`).map(Number);

const solution = (input: number[], windowSize: number): number => countDescending(slidingWindow(input, windowSize));

const part1 = () => {
  return solution(input, 1);
}

const part2 = () => {
  return solution(input, 3);

}

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);