import { readFileSync } from 'fs';

type Row = Array<number>;

const MAX_DIFF = 3;
const MIN_DIFF = 1;

const readInput = (filePath: string) =>
  readFileSync(filePath)
    .toString()
    .trim()
    .split('\n')
    .map((row) => row.split(/\s+/g).map(Number));

const isValidDiff = (diff: number, ascending: boolean) => {
  if (ascending) {
    return diff <= MAX_DIFF && diff >= MIN_DIFF;
  }

  return diff >= -MAX_DIFF && diff <= -MIN_DIFF;
};

const solution1 = (row: Row) => {
  const ascending = row[1] - row[0] > 0;

  return row.every((el, idx) => {
    const next = row[idx + 1];
    return next === undefined || isValidDiff(next - el, ascending);
  });
};

const solution2 = (row: Row) =>
  new Array(row.length)
    .fill(null)
    .some((_, removeIdx) => solution1([...row.slice(0, removeIdx), ...row.slice(removeIdx + 1)]));

const rows = readInput(`${__dirname}/input.txt`);

const answer1 = rows.filter(solution1).length;
const answer2 = rows.filter(solution2).length;

console.log('Answer 1', answer1);
console.log('Answer 2', answer2);
