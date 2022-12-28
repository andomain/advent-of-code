import { chunkArray } from '../../../lib';
import { getFileLines } from '../../../lib/io';

type PacketContents = number | Packet;
type Packet = Array<PacketContents>;

enum SORT_RESULT {
  CORRECT = -1,
  INCORRECT = 1,
  INCONCLUSIVE = 0,
}

const parsePacket = (input: string) => JSON.parse(input) as Packet;

const toList = (val: PacketContents): PacketContents[] => ([val].flat());

const input = getFileLines(`${__dirname}/input.txt`)
  .filter(Boolean)
  .map(parsePacket);

const compare = (left: Packet, right: Packet): SORT_RESULT => {
  const maxLength = Math.max(left.length, right.length);

  for (let i = 0; i < maxLength; i++) {
    let leftVal = left[i];
    let rightVal = right[i];

    if (leftVal === undefined) {
      return SORT_RESULT.CORRECT;
    }
    if (rightVal === undefined) {
      return SORT_RESULT.INCORRECT;
    }

    if (typeof leftVal === 'number' && typeof rightVal === 'number') {
      if (leftVal > rightVal) {
        return SORT_RESULT.INCORRECT;
      }
      if (leftVal < rightVal) {
        return SORT_RESULT.CORRECT;
      }
    } else {
      const subResult = compare(toList(leftVal), toList(rightVal));

      if (subResult !== SORT_RESULT.INCONCLUSIVE) {
        return subResult;
      };
    }
  }

  // Inconclusive result
  return SORT_RESULT.INCONCLUSIVE;
}

const part1 = () => chunkArray(input, 2).reduce((sum, [left, right], idx) => {
  if (compare(left, right) === SORT_RESULT.CORRECT) {
    sum += idx + 1;
  }

  return sum;
}, 0);

const part2 = () => {
  const dividerPackets: Packet[] = [[[2]], [[6]]]

  return [...input, ...dividerPackets]
    .sort(compare)
    .reduce((result, packet, idx) => {
      if (dividerPackets.indexOf(packet) > -1) {
        result *= idx + 1;
      }

      return result;
    }, 1);
}

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
