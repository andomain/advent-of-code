// https://adventofcode.com/2025/day/2
import { readFileSync } from "node:fs";
import { join } from "node:path";

const parseInput = (input: string) =>
  input.split(",").map((c) => c.split("-").map(Number) as [number, number]);

const chunkArray = <T>(input: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < input.length; i += size) {
    const chunk = input.slice(i, i + size);
    result.push(chunk);
  }

  return result;
};

const areAllChunksMatching = (val: number, chunkCount: number) => {
  const stringVal = val.toString();
  if (stringVal.length % chunkCount) {
    return false;
  }

  const chunks = chunkArray(
    stringVal.split(""),
    stringVal.length / chunkCount,
  ).map((chunk) => chunk.join(""));

  return chunks.slice(1).every((chunk) => chunk === chunks[0]);
};

export const isInvalidPart1 = (val: number) => {
  return areAllChunksMatching(val, 2);
};

export const isInvalidPart2 = (val: number) => {
  const maxChunkCount = val.toString().length;

  for (let chunkCount = 2; chunkCount <= maxChunkCount; chunkCount++) {
    if (areAllChunksMatching(val, chunkCount)) {
      return true;
    }
  }
  return false;
};

const solve = (fn: (val: number) => boolean) => (input: string) => {
  const parsed = parseInput(input);

  return parsed.reduce((sum, range) => {
    for (let i = range[0]; i <= range[1]; i++) {
      if (fn(i)) {
        sum += i;
      }
    }

    return sum;
  }, 0);
};

export function part1(input: string): number {
  return solve(isInvalidPart1)(input);
}

export function part2(input: string): number {
  return solve(isInvalidPart2)(input);
}

if (import.meta.main) {
  const input = readFileSync(join(import.meta.dir, "input.txt"), "utf-8");
  console.time("Part 1");
  console.log("Part 1:", part1(input));
  console.timeEnd("Part 1");
  console.time("Part 2");
  console.log("Part 2:", part2(input));
  console.timeEnd("Part 2");
}
