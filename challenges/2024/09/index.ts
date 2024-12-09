import { readFileSync } from 'fs';

const readInput = (filename: string) => readFileSync(filename).toString().trim().split('');

const defrag = (diskMap: Array<string>) => {
  const blocks = diskMap.map(Number).reduce<Array<string>>((rawMap, block, blockIdx) => {
    rawMap.push(...Array(block).fill(blockIdx % 2 ? '.' : Math.floor(blockIdx / 2).toString()));
    return rawMap;
  }, []);

  let startPointer = blocks.indexOf('.');
  let endPointer =
    blocks.length -
    1 -
    blocks
      .slice()
      .reverse()
      .findIndex((el) => el !== '.');

  while (startPointer < endPointer) {
    const value = blocks.splice(endPointer, 1, '.');
    blocks.splice(startPointer, 1, value[0]);
    startPointer++;
    endPointer--;

    while (blocks[startPointer] !== '.') {
      startPointer++;
    }

    while (blocks[endPointer] === '.') {
      endPointer--;
    }
  }

  return blocks;
};

const checkSum = (diskMap: Array<string>) =>
  diskMap.reduce((sum, val, idx) => {
    if (val !== '.') {
      sum += idx * Number(val);
    }

    return sum;
  }, 0);

console.time('Parse input');
const input = readInput(`${__dirname}/input.txt`);
console.timeEnd('Parse input');

console.time('Part 1');
console.log(`Part 1: ${checkSum(defrag(input))}`);
console.timeEnd('Part 1');
