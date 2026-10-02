// https://adventofcode.com/2025/day/6
import { readFileSync } from "node:fs";
import { join } from "node:path";

type Operator = "*" | "+";

type Problem = {
  operator: Operator;
  values: Array<number>;
};

const solveProblem = (problem: Problem) => {
  const isMult = problem.operator === "*";
  const init = isMult ? 1 : 0;

  return problem.values.reduce((result, val) => {
    if (isMult) {
      return result * val;
    }

    return result + val;
  }, init);
};

const transpose = <T>(input: T[][]): T[][] => {
  if (!input.length || !input[0]?.length) {
    throw new Error("Cannot transpose empty array");
  }

  return input[0].map((_, colIdx) => input.map((row) => row[colIdx] as T));
};

export const buildProblemMeta = (operatorInput: string) =>
  operatorInput
    .matchAll(/[*+]/g)
    .toArray()
    .map((match, problemIdx, matches) => {
      const operator = match[0] as Operator;
      const startIndex = match.index;

      const next = matches[problemIdx + 1];
      let length;

      if (next) {
        length = next.index - startIndex - 1;
      } else {
        length = operatorInput.length - startIndex;
      }

      return {
        operator,
        startIndex,
        length,
      };
    });

export function part1(input: string): number {
  const rawProblems = transpose(
    input
      .split("\n")
      .filter(Boolean)
      .map((row) => row.trim().split(/\s+/)),
  );

  const problems = rawProblems.map<Problem>((problem) => ({
    operator: problem.slice(-1)[0] as Operator,
    values: problem.slice(0, -1).map(Number),
  }));

  return problems.reduce((sum, problem) => sum + solveProblem(problem), 0);
}

export function part2(input: string): number {
  const rawRows = input.split("\n").filter(Boolean);
  const problemMeta = buildProblemMeta(rawRows.slice(-1)[0]!);
  const rawInputRows = rawRows.slice(0, -1).map((row) => row.split(""));

  const problems = problemMeta.map<Problem>((meta) => {
    const values = rawInputRows.map((row) =>
      row.slice(meta.startIndex, meta.startIndex + meta.length),
    );

    return {
      operator: meta.operator,
      values: transpose(values).reduce<number[]>((lookup, row) => {
        //Filter out any completely empty values (i.e. whitespace padded columns)
        if (row.some((val) => val !== " ")) {
          lookup.push(Number(row.join("")));
        }
        return lookup;
      }, []),
    };
  });

  return problems.reduce((sum, problem) => sum + solveProblem(problem), 0);
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
