import { readFileSync } from 'fs';

const inputData = readFileSync(`${__dirname}/input.txt`).toString();

/* eslint-disable-next-line */
export const solution1 = (input: string) => {};
/* eslint-disable-next-line */
export const solution2 = (input: string) => {};

console.time('Part 1');
/* eslint-disable-next-line */
console.log(`Part 1: ${solution1(inputData)}`);
console.timeEnd('Part 1');
console.time('Part 2');
/* eslint-disable-next-line */
console.log(`Part 2: ${solution2(inputData)}`);
console.timeEnd('Part 2');
