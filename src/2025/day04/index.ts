// https://adventofcode.com/2025/day/4
import { readFileSync } from "node:fs";
import { join } from "node:path";

const parseInput = (input: string) =>
  input
    .split("\n")
    .filter(Boolean)
    .map((row) => row.split(""));

const canRemove = (grid: string[][], row: number, col: number) =>
  [
    grid[row]?.[col - 1],
    grid[row]?.[col + 1],
    grid[row - 1]?.[col - 1],
    grid[row - 1]?.[col],
    grid[row - 1]?.[col + 1],
    grid[row + 1]?.[col - 1],
    grid[row + 1]?.[col],
    grid[row + 1]?.[col + 1],
  ].filter((cell) => cell === "@").length < 4;

export function part1(input: string): number {
  const grid = parseInput(input);
  let result = 0;

  if (!grid[0]) {
    throw new Error("No grid detected");
  }
  const size = grid[0].length;

  for (let rowIdx = 0; rowIdx < size; rowIdx++) {
    for (let colIdx = 0; colIdx < size; colIdx++) {
      if (grid[rowIdx]?.[colIdx] === "@" && canRemove(grid, rowIdx, colIdx)) {
        result++;
      }
    }
  }

  return result;
}

export function part2(input: string): number {
  const grid = parseInput(input);
  let result = 0;
  let changed: boolean = true;

  if (!grid[0]) {
    throw new Error("No grid detected");
  }

  const size = grid[0].length;

  while (changed !== false) {
    changed = false;
    for (let rowIdx = 0; rowIdx < size; rowIdx++) {
      for (let colIdx = 0; colIdx < size; colIdx++) {
        const cell = grid[rowIdx]?.[colIdx];
        if (cell === ".") {
          grid[rowIdx]![colIdx] = ".";
        } else if (canRemove(grid, rowIdx, colIdx)) {
          grid[rowIdx]![colIdx] = ".";
          changed = true;
          result++;
        } else {
          grid[rowIdx]![colIdx] = "@";
        }
      }
    }
  }

  return result;
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
