// https://adventofcode.com/2025/day/1
import { readFileSync } from "node:fs";
import { join } from "node:path";

const INIT_POS = 50;
const TURN_COUNT = 100

// TODO: Convert to just +/- integers
export type Instruction = {
  dir: 'L' | 'R';
  amount: number;
};

export const parseInput = (input: string): Array<Instruction> => {
  return input.split('\n').filter(Boolean).map(row => ({ dir: row[0] as 'L' | 'R', amount: parseInt(row.slice(1), 10) }))
}

export const applyTurn = (init: number, turn: Instruction): number => {
  const leftRight = turn.dir === 'R' ? 1 : -1;

  return (TURN_COUNT + init + leftRight * turn.amount % TURN_COUNT) % TURN_COUNT;
}

export function part1(input: string): number {
  let position = INIT_POS;
  let result = 0;
  const instructions = parseInput(input);

  for (const instruction of instructions) {
    position = applyTurn(position, instruction);

    if (position === 0) {
      result++
    }
  }

  return result;
}

export function part2(input: string): number {
  let position = INIT_POS;
  let result = 0;
  const instructions = parseInput(input);

  for (const instruction of instructions) {
    const pre = position;
    const post = applyTurn(position, instruction);
    const wholeTurns = Math.floor(instruction.amount / TURN_COUNT);

    if (post === 0) {
      result++;
    } else if (pre !== 0 && instruction.dir === 'R' && post < pre) {
      result += 1;
    } else if (pre !== 0 && instruction.dir === 'L' && post > pre) {
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
