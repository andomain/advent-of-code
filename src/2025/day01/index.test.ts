import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { part1, part2, parseInput, applyTurn } from "./index";

const sample = readFileSync(join(import.meta.dir, "sample.txt"), "utf-8");

// Paste the sample input into sample.txt, then fill these in from the
// worked example on https://adventofcode.com/2025/day/1
const SAMPLE_PART_1: number | undefined = 3;
const SAMPLE_PART_2: number | undefined = 6;

describe("2025 day 01", () => {
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

  test("parses the input correctly", () => {
    const input = "L12\nR34\nR56\nL2\n";
    expect(parseInput(input)).toEqual([-12, 34, 56, -2]);
  });

  describe("applyTurn", () => {
    describe("turns right", () => {
      test("a small amount", () => {
        expect(applyTurn(1, 3)).toBe(4);
      });

      test("up to the max", () => {
        expect(applyTurn(5, 95)).toBe(0);
      });

      test("past the max", () => {
        expect(applyTurn(5, 100)).toBe(5);
      });

      test("multiple times", () => {
        expect(applyTurn(5, 505)).toBe(10);
      });
    });

    describe("turns left", () => {
      test("a small amount", () => {
        expect(applyTurn(10, -3)).toBe(7);
      });

      test("down to 0", () => {
        expect(applyTurn(5, -5)).toBe(0);
      });

      test("beyond zero", () => {
        expect(applyTurn(50, -68)).toBe(82);
      });

      test("multiple times", () => {
        expect(applyTurn(5, -505)).toBe(0);
      });
    });
  });
});
