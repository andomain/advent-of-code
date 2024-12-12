import { readFileSync } from 'fs';

const readInput = (filename: string) => readFileSync(filename).toString().trim().split('').map(Number);

const defrag = (diskMap: Array<number>) => {
  const blocks = diskMap.reduce<Array<number>>((rawMap, block, blockIdx) => {
    rawMap.push(...Array(block).fill(blockIdx % 2 ? -1 : Math.floor(blockIdx / 2)));
    return rawMap;
  }, []);

  let startPointer = blocks.indexOf(-1);
  let endPointer =
    blocks.length -
    1 -
    blocks
      .slice()
      .reverse()
      .findIndex((el) => el !== -1);

  while (startPointer < endPointer) {
    const value = blocks.splice(endPointer, 1, -1);
    blocks.splice(startPointer, 1, value[0]);
    startPointer++;
    endPointer--;

    while (blocks[startPointer] !== -1) {
      startPointer++;
    }

    while (blocks[endPointer] === -1) {
      endPointer--;
    }
  }

  return blocks;
};

// TODO: This can almost certainly be improved by reworking the map as a single list of blocks
const compact = (diskMap: Array<number>) => {
  let files = diskMap.reduce<Array<Array<number>>>((rawMap, file, blockIdx) => {
    if (file > 0) {
      rawMap.push(Array(file).fill(blockIdx % 2 ? -1 : Math.floor(blockIdx / 2)));
    }
    return rawMap;
  }, []);

  const result = files.map((file) => [...file]);

  for (let idx = files.length - 1; idx > 0; idx--) {
    const file = files[idx];

    if (!file || file[0] === -1) {
      continue;
    }

    const currentIndex = result.findIndex((c) => c[0] === file[0]);

    const insertIdx = result.findIndex(
      (position, checkIdx) => checkIdx <= currentIndex && position[0] === -1 && position.length >= file.length,
    );

    if (insertIdx > -1) {
      const removeIdx = result.findIndex((f) => f[0] == file[0])!;

      const [removed] = result.splice(removeIdx, 1, new Array(file.length).fill(-1));

      const remainder = new Array(result[insertIdx].length - removed.length).fill(-1);

      result.splice(insertIdx, 1, removed);

      if (remainder.length > 0) {
        result.splice(insertIdx + 1, 0, remainder);
      }
    }
  }

  return result.flatMap((f) => f);
};

const checkSum = (diskMap: Array<number>) =>
  diskMap.reduce<number>((sum, val, idx) => {
    if (val !== -1) {
      sum += idx * val;
    }

    return sum;
  }, 0);

console.time('Parse input');
const input = readInput(`${__dirname}/input.txt`);
console.timeEnd('Parse input');

console.time('Part 1');
console.log(`Part 1: ${checkSum(defrag(input))}`);
console.timeEnd('Part 1');

console.time('Part 2');
console.log(`Part 2: ${checkSum(compact(input))}`);
console.timeEnd('Part 2');
