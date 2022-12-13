import { getFileLines } from '../../../lib/io';

type Monkey = {
  id: number,
  items: number[],
  divider: number,
  operation: (old: number) => number,
  target: (level: number) => number,
  inspectedCount: number,
}

type MonkeyLookup = { [key: string]: Monkey }

const parseInput = (): MonkeyLookup => getFileLines(`${__dirname}/input.txt`, { separator: '\n\n' })
  .reduce<{ [key: string]: Monkey }>((lookup, text) => {
    const [monkeyString, startingItems, operationString, testString, trueCase, falseCase] = text.split('\n');

    const id = /Monkey (\d+)/.exec(monkeyString)![1];
    const items = startingItems.match(/\d+/g)!.map(Number);

    const operationFunc = operationString.split(' = ')[1];
    const operation = (old: number) => eval(operationFunc);

    const divider = Number(/divisible by (\d+)/.exec(testString)![1]);
    const trueTarget = Number(/(\d+)/.exec(trueCase)![1]);
    const falseTarget = Number(/(\d+)/.exec(falseCase)![1]);

    const target = (level: number) => level % divider === 0 ? trueTarget : falseTarget;

    lookup[id] = {
      id: Number(id),
      items,
      divider,
      operation,
      target,
      inspectedCount: 0,
    }
    return lookup;
  }, {});

const run = (input: MonkeyLookup, rounds: number, scaleWorryFn: Function): number => {
  for (let round = 0; round < rounds; round++) {
    for (let monkeyId = 0; monkeyId < Object.keys(input).length; monkeyId++) {
      const monkey = input[monkeyId];

      while (monkey.items.length > 0) {
        const item = monkey.items.shift()!;
        monkey.inspectedCount++;

        const newLevel = scaleWorryFn(monkey.operation(item));
        const next = monkey.target(newLevel)

        input[next].items.push(newLevel);
      }
    }
  }

  const [a, b] = Array.from(Object.values(input))
    .sort((a, b) => b.inspectedCount - a.inspectedCount)
    .slice(0, 2)

  return a.inspectedCount * b.inspectedCount;
}


const part1 = () => {
  const divByThree = (input: number) => Math.floor(input / 3);
  return run(parseInput(), 20, divByThree);
}

// Theory for this solution is derived from https://github.com/jake-gordon/aoc/blob/main/2022/D11/Explanation.md
const part2 = () => {
  const monkies = parseInput();
  const divisor = Object.values(monkies).reduce((product, monkey) => product *= monkey.divider, 1);
  const scale = (input: number) => input % divisor;

  return run(monkies, 10000, scale);
}


console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
