import { readFileSync } from 'fs';

type Equation = [number, Array<number>];
type ValidatorFn = (operand: number) => (val: number) => Array<number>;

const readInput = (filePath: string): Array<Equation> =>
  readFileSync(filePath)
    .toString()
    .split('\n')
    .map((line) => line.split(': '))
    .map(([sum, values]) => [Number(sum), values.split(' ').map(Number)]);

const isValid = ([result, operands]: Equation, applyOperandFn: ValidatorFn) =>
  operands
    .slice(1)
    .reduce((intermediateResults, operand) => intermediateResults.flatMap(applyOperandFn(operand)), [operands[0]])
    .indexOf(result) > -1;

/**
 * Solver functions
 */
const solveAddMult = (operand: number) => (value: number) => [value + operand, value * operand];

const solveAddMultJoin = (operand: number) => (value: number) => [
  value + operand,
  value * operand,
  Number(`${value}${operand}`),
];

const solve = (equations: Array<Equation>, validatorFn: ValidatorFn) =>
  equations.reduce((sum, eq) => {
    if (isValid(eq, validatorFn)) {
      sum += eq[0];
    }

    return sum;
  }, 0);

const input = readInput(`${__dirname}/input.txt`);

console.time('Part 1');
console.log(`Part 1: ${solve(input, solveAddMult)}`);
console.timeEnd('Part 1');

console.time('Part 2');
console.log(`Part 2: ${solve(input, solveAddMultJoin)}`);
console.timeEnd('Part 2');
