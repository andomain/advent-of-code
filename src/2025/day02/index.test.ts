import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { part1, part2 } from "./index";

const sample = readFileSync(join(import.meta.dir, "sample.txt"), "utf-8");

// Paste the sample input into sample.txt, then fill these in from the
// worked example on https://adventofcode.com/2025/day/2
const SAMPLE_PART_1: number | undefined = 1227775554;
const SAMPLE_PART_2: number | undefined = 4174379265;

describe("2025 day 02", () => {
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
