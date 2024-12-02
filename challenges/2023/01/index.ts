import { readFileSync } from 'fs';
import { reduceSum } from '../../../reducers';

const inputData = readFileSync(`${__dirname}/input.txt`).toString();

// Utils

const mapToDigit = (input: string) => {
  switch (input) {
    case 'one':
    case 'eno':
      return 1;
    case 'two':
    case 'owt':
      return 2;
    case 'three':
    case 'eerht':
      return 3;
    case 'four':
    case 'ruof':
      return 4;
    case 'five':
    case 'evif':
      return 5;
    case 'six':
    case 'xis':
      return 6;
    case 'seven':
    case 'neves':
      return 7;
    case 'eight':
    case 'thgie':
      return 8;
    case 'nine':
    case 'enin':
      return 9;
    default:
      return +input;
  }
};

const reverseString = (input: string) => input.split('').reverse().join('');
const filterDigits = (c: string) => /\d/.test(c);
const convertToNumber = (...inputStrs: (string | number)[]) => Number(inputStrs.join(''));

const processLines = (lines: string, fn: (line: string) => number) => lines.split('\n').map(fn).reduce(reduceSum, 0);

// Processers

export const processPart1 = (line: string) => {
  const digits = line.split('').filter(filterDigits);
  return convertToNumber(digits[0], digits[digits.length - 1]);
};

export const processPart2 = (line: string) => {
  const first = line.match(/\d|(?:one|two|three|four|five|six|seven|eight|nine)/)?.[0];
  const last = reverseString(line).match(/\d|(?:enin|thgie|neves|xis|evif|ruof|eerht|owt|eno)/)?.[0];

  if (first && last) {
    return convertToNumber(mapToDigit(first), mapToDigit(last));
  }
};

// Solve
export const solution1 = (input: string) => processLines(input, processPart1);
export const solution2 = (input: string) => processLines(input, processPart2);

console.log(`Part 1: ${solution1(inputData)}`);
console.log(`Part 2: ${solution2(inputData)}`);
