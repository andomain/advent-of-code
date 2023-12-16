import { readFileSync } from 'fs';

const inputData = readFileSync(`${__dirname}/input.txt`).toString();

export const solution1 = (input: string) => {};

export const solution2 = (input: string) => {};

console.time('Part 1');
console.log(`Part 1: ${solution1(inputData)}`);
console.timeEnd('Part 1');
console.time('Part 2');
console.log(`Part 2: ${solution2(inputData)}`);
console.timeEnd('Part 2');
