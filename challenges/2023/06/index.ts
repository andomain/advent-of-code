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

const getWaysToWin = (race: Race) => {
  let winningCount = 0;
  for (let speed = 1; speed < race.time; speed += 1) {
    if (speed * (race.time - speed) > race.record) {
      winningCount += 1;
    }
  }

  return winningCount;
};

const multiplyReducer = (product: number, val: number) => product * val;

const solve = (fn: Parser) => (input: string) => fn(input).map(getWaysToWin).reduce(multiplyReducer, 1);

export const solution1 = solve(getRacesPart1);
export const solution2 = solve(getRacesPart2);

console.log(`Part 1: ${solution1(inputData)}`);
console.log(`Part 2: ${solution2(inputData)}`);
