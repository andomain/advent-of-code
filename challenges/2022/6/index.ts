import { getFileLines } from '../../../lib/io';

const input = getFileLines(`${__dirname}/input.txt`)[0];

const findPacket = (input: string, size: number): number => {
  for (let i = size; i < input.length - size; i++) {
    const chars = new Set(input.slice(i - size, i));

    if (chars.size === size) {
      return i;
    }
  }
  throw new Error('No sequence found')
}

const part1 = () => findPacket(input, 4)

const part2 = () => findPacket(input, 14)

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);