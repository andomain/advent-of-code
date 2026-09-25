import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { buildMaxVal, part1, part2 } from "./index";

const sample = readFileSync(join(import.meta.dir, "sample.txt"), "utf-8");

// Paste the sample input into sample.txt, then fill these in from the
// worked example on https://adventofcode.com/2025/day/3
const SAMPLE_PART_1: number | undefined = 357;
const SAMPLE_PART_2: number | undefined = 3121910778619;

describe("2025 day 03", () => {
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

  describe("buildMaxVal", () => {
    test("finds single highest value", () => {
      expect(buildMaxVal([1, 2, 3], 1)).toBe(3);
      expect(buildMaxVal([1, 3, 2], 1)).toBe(3);
      expect(buildMaxVal([3, 2, 3], 1)).toBe(3);
    });

    test("finds largest value of lenth n", () => {
      expect(
        buildMaxVal([9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1], 3),
      ).toBe(987);
    });

    test("finds non sequential combinations", () => {
      expect(buildMaxVal([9, 8, 1, 7, 2], 3)).toBe(987);
    });

    test("largest number is not the first", () => {
      expect(
        buildMaxVal([2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 7, 8], 5),
      ).toBe(44478);
    });

    test("ensures enough digits left to fulfil length", () => {
      expect(
        buildMaxVal([2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 7, 8], 12),
      ).toBe(434234234278);
    });
  });
});
