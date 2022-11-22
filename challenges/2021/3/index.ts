import { binaryToDecimal, bitFlip } from "../../../lib/binary";
import { getFileLines } from "../../../lib/io/readFile";

type BitSelectFn = (inputs: string[], i: number) => number;

const sumBitsAt = (i: number) => (sum: number, bits: string) => sum += Number(bits.charAt(i));

export const getMCBAt: BitSelectFn = (inputs, i) => {
  const numLines = inputs.length;
  const bitSum = inputs.reduce(sumBitsAt(i), 0);

  return bitSum >= (numLines / 2) ? 1 : 0;
}

export const getLCBAt:BitSelectFn = (inputs, i) => Math.abs(getMCBAt(inputs, i) - 1);

export const mostCommonBit = (input: string[]) => {
  const resultLength = input[0].length;

  let mcb = new Array(resultLength);
  for (let i = 0; i < resultLength; i++) {
    mcb[i] = getMCBAt(input, i);
  }

  return mcb.join('');
}

export const filterBitStrings = (inputs: string[], filterFn: BitSelectFn): string => {
  let results = Array.from(inputs);
  const bitsLength = results[0].length;

  for (let i = 0; i < bitsLength; i++) {
    const mcb = filterFn(results, i);

    results = results.filter(bits => {
      return Number(bits.charAt(i)) === mcb
    })

    if (results.length === 1) {
      return results[0];
    }
  }

  throw new Error('No filtered result found');
}

const input = getFileLines(`${__dirname}/input.txt`);

const mostCommon = mostCommonBit(input);
const leastCommon = bitFlip(mostCommon);

const part1 = () => {
  const gamma = binaryToDecimal(mostCommon);
  const epsilon = binaryToDecimal(leastCommon);

  return gamma * epsilon;
}

const part2 = () => {
  const o2 = binaryToDecimal(filterBitStrings(input, getMCBAt));
  const cO2 = binaryToDecimal(filterBitStrings(input, getLCBAt));

  return o2 * cO2;
}

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);