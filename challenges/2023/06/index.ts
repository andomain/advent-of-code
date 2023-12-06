import { readFileSync } from 'fs';

const inputData = readFileSync(`${__dirname}/input.txt`).toString();

type Race = { time: number, record: number };

type Parser = (input: string) => Race[];

const getRacesPart1: Parser = (input) => {
  const [time, record] = input.split('\n').map((line) => {
    const [, ...parts] = line.split(/\s+/);
    return parts.map(Number);
  });

  return Array.from({ length: time.length }, (_, idx) => ({ time: time[idx], record: record[idx] }));
};

const getRacesPart2: Parser = (input) => {
  const [time, record] = input.split('\n').map((line) => {
    const [, ...parts] = line.split(/\s+/);
    return +parts.join('');
  });

  return [{ time, record }];
};

/**
 * Alternative solution suggested by Mark Goy
 * The first winning time will be the same "distance" from the start as the last one is from the end
 * So theoretically for a duration of n seconds were the first winning time is p ms
 * the number of winning times is n - 2p
 */
const getWaysToWin = (race: Race) => {
  let holdTime = 0;

  while (holdTime * (race.time - holdTime) <= race.record) {
    holdTime += 1;
  }

  return race.time - 2 * holdTime + 1;
};

const multiplyReducer = (product: number, val: number) => product * val;

const solve = (fn: Parser) => (input: string) => fn(input).map(getWaysToWin).reduce(multiplyReducer, 1);

export const solution1 = solve(getRacesPart1);
export const solution2 = solve(getRacesPart2);

console.time('Part 1');
console.log(`Part 1: ${solution1(inputData)}`);
console.timeEnd('Part 1');
console.time('Part 2');
console.log(`Part 2: ${solution2(inputData)}`);
console.timeEnd('Part 2');
