import { readFileSync } from 'fs';

type Stack = string[];

const initStacks = (init: string[]) => {
  const stackCount = Math.ceil(initRows[0].length / 4);
  const emptyStacks = new Array(stackCount).fill(null).map(() => new Array());

  return init
    .map(rowToStackParts)
    .reverse()
    .reduce(partsToStack, emptyStacks);
}

const rowToStackParts = (rowStr: string) => {
  let cols = []

  for (let i = 0; i < rowStr.length; i += 4) {
    cols.push(rowStr.slice(i + 1, i + 2).trim());
  }
  return cols;
}

const partsToStack = (stackBuilder: Stack[], rowParts: string[]) => {
  for (let i = 0; i < rowParts.length; i++) {
    if (rowParts[i]) {
      stackBuilder[i].unshift(rowParts[i]);
    }
  }

  return stackBuilder;
}

const parseInstructions = (instruction: string) => {
  const [, amount, from, to] = /move (\d+) from (\d+) to (\d+)/.exec(instruction)!;
  return [amount, from, to].map(Number);
}

const applyInstructions = (initial: Stack[], is9001 = false) => (instructions: number[][]) => instructions
  .reduce<Stack[]>((stacks, [amount, from, to]) => {
    const moved = stacks[from - 1].splice(0, amount);

    if (!is9001) {
      moved.reverse();
    }

    stacks[to - 1].unshift(...moved);

    return stacks;
  }, initial);

const readStacks = (result: string, stack: string[]) => result.concat(stack[0])

const [initRows, instructionRows] = readFileSync(`${__dirname}/input.txt`, 'utf-8')
  .split(/\s+1\s+[0-9\s]+\n/)
  .map(inputData => inputData.split('\n'));

const instructions = instructionRows.filter(Boolean).map(parseInstructions);

const solve = (is9001: boolean = false) => applyInstructions(initStacks(initRows), is9001)(instructions)
  .reduce(readStacks, '')

const part1 = () => solve();
const part2 = () => solve(true);


console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);