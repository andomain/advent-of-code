// https://adventofcode.com/2025/day/1
import { readFileSync } from "node:fs";
import { join } from "node:path";

const INIT_POS = 50;
const TURN_COUNT = 100;

export const parseInput = (input: string): Array<number> => {
  return input
    .split("\n")
    .filter(Boolean)
    .map((row) => {
      const dir = row[0];
      const amount = parseInt(row.slice(1), 10);

      return dir === "R" ? amount : -amount;
    });
};

export const applyTurn = (position: number, turn: number): number => {
  return (TURN_COUNT + position + (turn % TURN_COUNT)) % TURN_COUNT;
};

export function part1(input: string): number {
  let position = INIT_POS;
  let result = 0;
  const turns = parseInput(input);

  for (const turn of turns) {
    position = applyTurn(position, turn);

    if (position === 0) {
      result++;
    }
  }

  return result;
}

export function part2(input: string): number {
  let position = INIT_POS;
  let result = 0;
  const turns = parseInput(input);

  for (const turn of turns) {
    const pre = position;
    const post = applyTurn(position, turn);
    const wholeTurns = Math.floor(Math.abs(turn) / TURN_COUNT);

    if (post === 0) {
      result++;
    } else if (pre !== 0 && turn > 0 && post < pre) {
      result += 1;
    } else if (pre !== 0 && turn < 0 && post > pre) {
      result += 1;
    }

    result += wholeTurns;
    position = post;
  }

  return result;
}

if (import.meta.main) {
  const input = readFileSync(join(import.meta.dir, "input.txt"), "utf-8");
  console.log("Part 1:", part1(input));
  console.log("Part 2:", part2(input));
}
