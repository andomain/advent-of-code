import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { condenseRanges, part1, part2 } from "./index";

const sample = readFileSync(join(import.meta.dir, "sample.txt"), "utf-8");

// Paste the sample input into sample.txt, then fill these in from the
// worked example on https://adventofcode.com/2025/day/5
const SAMPLE_PART_1: number | undefined = 3;
const SAMPLE_PART_2: number | undefined = 14;

describe("2025 day 05", () => {
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

  describe("condenseRanges", () => {
    test("ignores discrete ranges", () => {
      expect(
        condenseRanges([
          { start: 1, end: 3 },
          { start: 5, end: 7 },
        ]),
      ).toEqual([
        { start: 1, end: 3 },
        { start: 5, end: 7 },
      ]);
    });

    test("combines two overlapping ranges", () => {
      expect(
        condenseRanges([
          { start: 1, end: 3 },
          { start: 2, end: 4 },
        ]),
      ).toEqual([{ start: 1, end: 4 }]);
    });

    test("combines multiple ranges", () => {
      expect(
        condenseRanges([
          { start: 10, end: 14 },
          { start: 16, end: 20 },
          { start: 12, end: 18 },
        ]),
      ).toEqual([{ start: 10, end: 20 }]);
    });
  });
});
