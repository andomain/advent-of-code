// https://adventofcode.com/2025/day/3
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const buildMaxVal = (input: number[], size = 2) => {
  const digits: number[] = new Array(size);
  let pointer = 0;

  for (let i = 0; i < size; i++) {
    const candidates = input.slice(pointer, input.length - size + i + 1);
    const max = Math.max(...candidates);
    const maxIndex = candidates.indexOf(max);

    digits[i] = max;
    pointer = pointer + maxIndex + 1;
  }

  return parseInt(digits.join(""), 10);
};

// Simple wrapper around core solving process
const solve = (input: number[][], maxValSize = 2) =>
  input.reduce((result, bank) => {
    return result + buildMaxVal(bank, maxValSize);
  }, 0);

export function part1(input: string): number {
  const parsed = input
    .split("\n")
    .filter(Boolean)
    .map((row) => row.split("").map(Number));

  return solve(parsed);
}

export function part2(input: string): number {
  const parsed = input
    .split("\n")
    .filter(Boolean)
    .map((row) => row.split("").map(Number));

  return solve(parsed, 12);
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
