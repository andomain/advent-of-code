import { readFileSync } from 'fs';

const inputData = readFileSync(`${__dirname}/input.txt`).toString();

type GridItem = {
  value: string;
  row: number;
  col: number;
  length: number;
  touches: GridItem[];
};

type GridLookup = { numbers: GridItem[]; symbols: GridItem[] };

const touches = (source: GridItem, dest: GridItem) =>
  dest.row >= source.row - 1 &&
  dest.row <= source.row + 1 &&
  dest.col >= source.col - 1 &&
  dest.col <= source.col + source.length;

const testNumber = /\d+/g;
const testSymbol = /[^\w.]/g;

const toGridItems = (input: string, test: RegExp, row: number) =>
  [...input.matchAll(test)].map<GridItem>((match) => ({
    value: match[0],
    row,
    col: match.index,
    length: match[0].length,
    touches: [],
  }));

const parseInput = (input: string) =>
  input.split('\n').reduce<GridLookup>(
    (lookup, row, rowIdx) => ({
      numbers: [...lookup.numbers, ...toGridItems(row, testNumber, rowIdx)],
      symbols: [...lookup.symbols, ...toGridItems(row, testSymbol, rowIdx)],
    }),
    { numbers: [], symbols: [] },
  );

export const solution1 = (input: string) => {
  const { numbers, symbols } = parseInput(input);

  return numbers.reduce((sum, part) => {
    if (symbols.some((symbol) => touches(part, symbol))) {
      return sum + Number(part.value);
    }

    return sum;
  }, 0);
};

export const solution2 = (input: string) => {
  const { numbers, symbols } = parseInput(input);

  const potentialGears = symbols.filter((symbol) => symbol.value === '*');

  // Loop through each number and update any touching symbols
  numbers.forEach((num) => {
    potentialGears.forEach((candidate) => {
      if (touches(num, candidate)) {
        candidate.touches.push(num);
      }
    });
  });

  return potentialGears.reduce((ratioSum, gear) => {
    if (gear.touches.length === 2) {
      return ratioSum + Number(gear.touches[0].value) * Number(gear.touches[1].value);
    }

    return ratioSum;
  }, 0);
};

console.log(`Part 1: ${solution1(inputData)}`);
console.log(`Part 2: ${solution2(inputData)}`);
