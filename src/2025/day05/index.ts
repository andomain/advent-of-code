// https://adventofcode.com/2025/day/5
import { readFileSync } from "node:fs";
import { join } from "node:path";

type Range = { start: number; end: number };

const rangeContains = (range: Range, val: number) => {
  return val >= range.start && val <= range.end;
};

export const condenseRanges = (inputRanges: Range[]): Range[] => {
  const sorted = inputRanges.sort((a, b) => a.start - b.start);

  return sorted.reduce<Range[]>((lookup, range) => {
    const overlappedRange = lookup.find((existing) => overlap(existing, range));

    if (overlappedRange) {
      overlappedRange.start = Math.min(overlappedRange.start, range.start);
      overlappedRange.end = Math.max(overlappedRange.end, range.end);
    } else {
      lookup.push(range);
    }

    return lookup;
  }, []);
};

const overlap = (a: Range, b: Range) =>
  (a.start <= b.start && a.end >= b.start) ||
  (b.start <= a.start && b.end >= a.start);

const parseInput = (input: string) => {
  const [rawRanges, rawIds] = input
    .split("\n\n")
    .map((sections) => sections.split("\n"));

  // TODO: Rather than creating discrete ranges, for each one see if it overlaps with an existing one and fold into that
  const discreteRanges: Range[] =
    rawRanges?.map((range) => {
      const [start, end] = range.split("-").map(Number) as [number, number];
      return { start, end };
    }) || [];

  const ranges = condenseRanges(discreteRanges);

  const ids = rawIds?.map(Number) || [];

  return {
    ranges,
    ids,
  };
};

export function part1(input: string): number {
  const { ids, ranges } = parseInput(input);

  return ids.reduce((result, id) => {
    if (ranges.some((range) => rangeContains(range, id))) {
      result++;
    }

    return result;
  }, 0);
}

export function part2(input: string): number {
  const { ranges } = parseInput(input);

  return ranges.reduce(
    (lookup, range) => lookup + range.end - range.start + 1,
    0,
  );
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
