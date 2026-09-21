// https://adventofcode.com/2015/day/1
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
  console.log("Part 1:", part1(input));
  console.log("Part 2:", part2(input));
}
