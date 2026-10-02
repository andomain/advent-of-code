import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { buildProblemMeta, part1, part2 } from "./index";

const sample = readFileSync(join(import.meta.dir, "sample.txt"), "utf-8");

// Paste the sample input into sample.txt, then fill these in from the
// worked example on https://adventofcode.com/2025/day/6
const SAMPLE_PART_1: number | undefined = 4277556;
const SAMPLE_PART_2: number | undefined = 3263827;

describe("2025 day 06", () => {
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

  describe("buildProblemMeta", () => {
    test("converts the operator row to meaningful meta", () => {
      expect(buildProblemMeta("*   +   *   + ")).toEqual([
        { operator: "*", startIndex: 0, length: 3 },
        { operator: "+", startIndex: 4, length: 3 },
        { operator: "*", startIndex: 8, length: 3 },
        { operator: "+", startIndex: 12, length: 2 },
      ]);
    });
  });
});
