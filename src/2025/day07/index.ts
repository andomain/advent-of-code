// https://adventofcode.com/2025/day/7
import { readFileSync } from "node:fs";
import { join } from "node:path";

// TODO Extract to lib
class Vector {
  public x: number;
  public y: number;

  constructor({ x, y }: { x: number; y: number }) {
    this.x = x;
    this.y = y;
  }

  public toString() {
    return `(${this.x},${this.y})`;
  }

  static from(other: Vector) {
    return new Vector({ x: other.x, y: other.y });
  }
}

// TODO Extract to lib
class Grid<T> {
  public width: number;
  public height: number;

  constructor(public readonly data: T[][]) {
    this.width = data[0]?.length || 0;
    this.height = data.length;
  }

  public get(x: number, y: number) {
    return this.data[y]?.[x];
  }

  public row(rowIdx: number) {
    return this.data[rowIdx];
  }

  public find(val: T): Vector | undefined {
    for (let rowIdx = 0; rowIdx < this.height; rowIdx++) {
      const colIdx = this.row(rowIdx)!.findIndex((v) => v === val);

      if (colIdx > -1) {
        return new Vector({
          x: colIdx,
          y: rowIdx,
        });
      }
    }
  }
}

const getStart = (grid: Grid<string>): Vector => {
  const start = grid.find("S");

  if (!start) {
    throw new Error("Cannot find start point");
  }

  return start;
};

const parseInput = (input: string): Grid<string> =>
  new Grid(
    input
      .split("\n")
      .filter(Boolean)
      .map((row) => row.split("")),
  );

type State = {
  splits: number;
  beams: Map<number, number>;
};

// TODO: Write unit tests
const step = (grid: Grid<string>, row: number, currentState: State): State =>
  currentState.beams.entries().reduce<State>(
    (nextState, [beamXStr, pathCount]) => {
      const beamX = Number(beamXStr);
      const nextPaths = [];
      if (grid.get(beamX, row) === "^") {
        nextState.splits++;
        nextPaths.push(beamX - 1, beamX + 1);
      } else {
        nextPaths.push(beamX);
      }

      for (const nextX of nextPaths) {
        // Check if another path has reached this point and get its count
        const current = nextState.beams.get(nextX) ?? 0;

        nextState.beams.set(nextX, current + pathCount);
      }

      return nextState;
    },
    { splits: currentState.splits, beams: new Map() },
  );

const solve = (input: string): State => {
  const grid = parseInput(input);
  const start = getStart(grid);

  let state: State = { splits: 0, beams: new Map([[start.x, 1]]) };

  for (let currentRow = start.y; currentRow < grid.height; currentRow++) {
    state = step(grid, currentRow, state);
  }

  return state;
};

export function part1(input: string): number {
  const state = solve(input);

  return state.splits;
}

export function part2(input: string): number {
  const state = solve(input);

  return state.beams.values().reduce((sum, pathCount) => sum + pathCount, 0);
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
