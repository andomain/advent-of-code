import { readFileSync } from 'fs';

const inputData = readFileSync(`${__dirname}/input.txt`).toString();

const processLine = (parts: number[]) => {
  const diffs: number[] = [];
  for (let i = 0; i < parts.length - 1; i += 1) {
    const diff = parts[i + 1] - parts[i];
    diffs.push(diff);
  }

  return diffs;
};

const getHistory = (line: string) => {
  const initParts = line.split(' ').map(Number);
  const diffs: number[][] = [initParts];
  let currentDiffs = processLine(initParts);

  while (currentDiffs.some((el) => el !== 0)) {
    diffs.push(currentDiffs);
    currentDiffs = processLine(currentDiffs);
  }
  diffs.push(currentDiffs);

  return diffs;
};

const getNextValue = (line: string) => {
  const [firstLine, ...processedHistory] = getHistory(line);
  const sumDiffs = processedHistory.reduce((historySum, historyLine) => historySum + historyLine.slice(-1)[0], 0);
  const last = firstLine.slice(-1)[0];
  return last + sumDiffs;
};

// The last value of the history is the sum of all the diffs
export const solution1 = (input: string) => input.split('\n')
  .reduce((sum, line) => sum + getNextValue(line), 0);

// Reverse each line and solution 2 matches solution 1
export const solution2 = (input: string) => input.split('\n').map((a) => a.split(' ').reverse().join(' '))
  .reduce((sum, line) => sum + getNextValue(line), 0);

console.time('Part 1');
console.log(`Part 1: ${solution1(inputData)}`);
console.timeEnd('Part 1');
console.time('Part 2');
console.log(`Part 2: ${solution2(inputData)}`);
console.timeEnd('Part 2');
