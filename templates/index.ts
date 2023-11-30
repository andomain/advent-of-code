import { readFileSync } from 'fs';

const inputData = readFileSync(`${__dirname}/input.txt`).toString();

export const solution1 = (input: string) => {};

export const solution2 = (input: string) => {};

console.log(`Part 1: ${solution1(inputData)}`);
console.log(`Part 2: ${solution2(inputData)}`);
