import { readFileSync } from 'fs';

const floorStep = (instruction: string) => (instruction === '(' ? 1 : -1);

const inputData = readFileSync(`${__dirname}/input.txt`).toString();

export const solution1 = (input: string) => input.split('').reduce((floor, current) => floor + floorStep(current), 0);

export const solution2 = (input: string) => {
  let floor = 0;
  let idx = 0;

  while (floor >= 0) {
    floor += floorStep(input[idx]);
    idx += 1;
  }

  return idx;
};

console.log(`Part 1: ${solution1(inputData)}`);
console.log(`Part 2: ${solution2(inputData)}`);
