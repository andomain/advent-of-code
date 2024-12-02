import { readFileSync } from 'fs';

const readInput = (filePath: string) =>
  readFileSync(filePath)
    .toString()
    .trim()
    .split('\n')
    .reduce<[Array<number>, Array<number>]>(
      (pairs, row) => {
        const [l, r] = row.split(/\s+/).map(Number);
        return [
          [...pairs[0], l],
          [...pairs[1], r],
        ];
      },
      [[], []],
    )
    .map((col) => col.sort());

const sumDifferences = (left: Array<number>, right: Array<number>) =>
  left.reduce((sum, input, idx) => (sum += Math.abs(input - right[idx])), 0);

const countOccurences = (arr: Array<number>) =>
  arr.reduce<Map<number, number>>((lookup, input) => {
    const current = lookup.get(input) || 0;
    return lookup.set(input, current + 1);
  }, new Map());

const calculateSimilarityScore = (arr: Array<number>, weights: Map<number, number>) =>
  arr.reduce((score, input) => {
    return (score += input * (weights.get(input) || 0));
  }, 0);

const [leftInputs, rightInputs] = readInput(`${__dirname}/input.txt`);

const occurences = countOccurences(rightInputs);

const answer1 = sumDifferences(leftInputs, rightInputs);
const answer2 = calculateSimilarityScore(leftInputs, occurences);

console.log(answer1);
console.log(answer2);
