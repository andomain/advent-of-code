export function solutionTemplate(year: number, day: number): string {
  return `// https://adventofcode.com/${year}/day/${day}
import { readFileSync } from "node:fs";
import { join } from "node:path";

export function part1(_input: string): number {
  throw new Error("part1 not implemented");
}

export function part2(_input: string): number {
  throw new Error("part2 not implemented");
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
`;
}

export function testTemplate(year: number, day: number): string {
  const padded = String(day).padStart(2, "0");
  return `import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { part1, part2 } from "./index";

const sample = readFileSync(join(import.meta.dir, "sample.txt"), "utf-8");

// Paste the sample input into sample.txt, then fill these in from the
// worked example on https://adventofcode.com/${year}/day/${day}
const SAMPLE_PART_1: number | undefined = undefined;
const SAMPLE_PART_2: number | undefined = undefined;

describe("${year} day ${padded}", () => {
  test.skipIf(sample.trim() === "" || SAMPLE_PART_1 === undefined)(
    "part1 matches the sample answer",
    () => {
      expect(part1(sample)).toBe(SAMPLE_PART_1!);
    },
  );

  test.skipIf(sample.trim() === "" || SAMPLE_PART_2 === undefined)(
    "part2 matches the sample answer",
    () => {
      expect(part2(sample)).toBe(SAMPLE_PART_2!);
    },
  );

  // Add small, focused unit tests here for any helper logic you pull out
  // of part1/part2 as the solution grows.
});
`;
}
