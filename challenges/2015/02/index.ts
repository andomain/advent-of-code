import { readFileSync } from 'fs';

const inputData = readFileSync(`${__dirname}/input.txt`).toString();

type Dimensions = [number, number, number];

const getWrappingPaper = (dimensions: Dimensions) => {
  const [l, w, h] = dimensions;
  const a = l * w;
  const b = w * h;
  const c = h * l;

  return 2 * (a + b + c) + Math.min(a, b, c);
};

const getRibbon = (dimensions: Dimensions) => {
  const [l, w, h] = dimensions;
  const shortest = 2 * Math.min(l + w, w + h, h + l);
  const bow = l * w * h;

  return shortest + bow;
};

const inputToDimensions = (input: string) => input.split('\n').map((line) => line.split('x').map(Number) as Dimensions);

const processPackages = (input: string, fn: (ip: Dimensions) => number) => inputToDimensions(input)
  .reduce((sum, pkg) => sum + fn(pkg), 0);

export const solution1 = (input: string) => processPackages(input, getWrappingPaper);
export const solution2 = (input: string) => processPackages(input, getRibbon);

console.log(`Part 1: ${solution1(inputData)}`);
console.log(`Part 2: ${solution2(inputData)}`);
