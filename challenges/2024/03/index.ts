import { readFileSync } from 'fs';

enum OpCode {
  MULTIPLY = 'mul',
  ENABLE = 'do',
  DISABLE = "don't",
}

type Instruction = {
  type: OpCode;
  args: Array<unknown>;
};

const readInput = (filePath: string) => readFileSync(filePath).toString().trim().split('\n').join('');

const solution1 = (input: Array<Instruction>) => {
  let sum = 0;

  for (const instr of input) {
    if (instr.type === OpCode.MULTIPLY) {
      sum += Number(instr.args[0]) * Number(instr.args[1]);
    }
  }

  return sum;
};

const solution2 = (input: Array<Instruction>) => {
  let sum = 0;
  let enabled = true;

  for (const instr of input) {
    if (enabled && instr.type === OpCode.MULTIPLY) {
      sum += Number(instr.args[0]) * Number(instr.args[1]);
      continue;
    }

    if (instr.type === OpCode.ENABLE) {
      enabled = true;
      continue;
    }

    if (instr.type === OpCode.DISABLE) {
      enabled = false;
      continue;
    }
  }

  return sum;
};

const getInstructions = (input: string) =>
  Array.from(input.matchAll(/([\w\']+)\(([0-9,]*?)\)/g)).reduce<Array<Instruction>>((lookup, [_, op, args]) => {
    if (/mul$/.test(op)) {
      lookup.push({ type: OpCode.MULTIPLY, args: args.split(',') });
    }

    if (/do$/.test(op)) {
      lookup.push({ type: OpCode.ENABLE, args: [] });
    }

    if (/don\'t$/.test(op)) {
      lookup.push({ type: OpCode.DISABLE, args: [] });
    }

    return lookup;
  }, []);

const code = readInput(`${__dirname}/input.txt`);

const instructions = getInstructions(code);

console.log(`Solution 1: ${solution1(instructions)}`);
console.log(`Solution 2: ${solution2(instructions)}`);
