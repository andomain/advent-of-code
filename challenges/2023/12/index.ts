import { readFileSync } from 'fs';

type Record = {
  springs: Spring[],
  counts: number[],
};

enum Spring {
  UNKNOWN = '?',
  FUNCTIONAL = '.',
  DAMAGED = '#',
}

const cloneRecord = (src: Record, idx: number, replacement: Spring) => {
  const cloned: Record = { springs: [...src.springs], counts: [...src.counts] };

  cloned.springs[idx] = replacement;
  return cloned;
};

const inputData = readFileSync(`${__dirname}/input.txt`).toString();

const springMap = (c: string) => {
  switch (c) {
    case '.': return Spring.FUNCTIONAL;
    case '#': return Spring.DAMAGED;
    case '?': return Spring.UNKNOWN;
    default: throw new Error(`Unknown spring type ${c}`);
  }
};

export const expandInput = (input: string, expansionFactor: number) => input.split('\n').map((line) => {
  const [springsRaw, countsRaw] = line.split(' ');
  const springs = new Array(expansionFactor)
    .fill(springsRaw)
    .join(Spring.UNKNOWN)
    .split('')
    .map(springMap);

  const counts = new Array(expansionFactor)
    .fill(countsRaw)
    .join(',')
    .split(',')
    .map(Number);

  return { springs, counts } as Record;
});

export const getPossibleCombos = (record: Record): number => {
  if (record.springs.length === 0) {
    return record.counts.length === 0 ? 1 : 0;
  }

  if (record.counts.length === 0) {
    return record.springs.includes(Spring.DAMAGED) ? 0 : 1;
  }

  if (record.springs[0] === Spring.FUNCTIONAL) {
    return getPossibleCombos({ springs: record.springs.slice(1), counts: [...record.counts] });
  }

  if (record.springs[0] === Spring.UNKNOWN) {
    const damagedResult = getPossibleCombos(cloneRecord(record, 0, Spring.DAMAGED));
    const functionalResult = getPossibleCombos(cloneRecord(record, 0, Spring.FUNCTIONAL));
    return damagedResult + functionalResult;
  }

  // Case where springs start with #
  if (record.springs.length < record.counts[0]) {
    return 0;
  }
  const group = record.springs.slice(0, record.counts[0]);
  if (group.every((s) => s !== Spring.FUNCTIONAL) && record.springs[record.counts[0]] !== Spring.DAMAGED) {
    const updatedSprings = record.springs.slice(record.counts[0]);
    if (updatedSprings.length > 0) {
      updatedSprings[0] = Spring.FUNCTIONAL;
    }
    return getPossibleCombos({ springs: updatedSprings, counts: record.counts.slice(1) });
  }

  return 0;
};

export const solution1 = (input: string) => expandInput(input, 1)
  .reduce((sum, record) => sum + getPossibleCombos(record), 0);

export const solution2 = (input: string) => expandInput(input, 5)
  .reduce((sum, record) => sum + getPossibleCombos(record), 0);

console.time('Part 1');
console.log(`Part 1: ${solution1(inputData)}`);
console.timeEnd('Part 1');
console.time('Part 2');
console.log(`Part 2: ${solution2(inputData)}`);
console.timeEnd('Part 2');
