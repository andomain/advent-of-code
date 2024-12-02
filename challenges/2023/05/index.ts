import { readFileSync } from 'fs';

const inputData = readFileSync(`${__dirname}/input.txt`).toString();

type Mapper = {
  source: number;
  destination: number;
  length: number;
};
type SeedMap = Array<Mapper>;

const parseInput = (input: string) => {
  const [seedsInput, ...mapInput] = input.split('\n\n');
  const [, ...seeds] = seedsInput.split(' ').map(Number);
  const maps: SeedMap[] = mapInput.map((map) => {
    const [, ...mapRows] = map.split('\n');
    return mapRows.map<Mapper>((row) => {
      const [destination, source, length] = row.split(' ').map(Number);
      return {
        source,
        destination,
        length,
      };
    });
  });

  return { seeds, maps };
};

const inRange = (val: number, map: Mapper) => val >= map.source && val < map.source + map.length;

const applyMapping = (val: number, map: Mapper) => {
  const offset = val - map.source;
  return map.destination + offset;
};

const mapSeed = (input: number, maps: SeedMap[]) => {
  let current = input;

  for (const map of maps) {
    const currentMapping = map.find((m) => inRange(current, m))!;
    current = currentMapping ? applyMapping(current, currentMapping) : current;
  }

  return current;
};

export const solution1 = (input: string) => {
  const { seeds, maps } = parseInput(input);
  const destinations = seeds.map((seed) => mapSeed(seed, maps));

  return Math.min(...destinations);
};

// TODO: There must be a moer efficient solution
export const solution2 = (input: string) => {
  const { seeds, maps } = parseInput(input);

  let min = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < seeds.length; i += 2) {
    const start = seeds[i];
    const length = seeds[i + 1];

    for (let j = 0; j < length; j += 1) {
      const destination = mapSeed(start + j, maps);
      if (destination < min) {
        min = destination;
      }
    }
  }

  return min;
};

console.log(`Part 1: ${solution1(inputData)}`);
console.log(`Part 2: ${solution2(inputData)}`);
