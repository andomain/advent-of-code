import { sumEl } from '../../../lib';
import { getFileLines } from '../../../lib/io';
import Device, { INSTR, Instruction, InstructionFactory } from './Device';

const input: Instruction[] = getFileLines(`${__dirname}/input.txt`)
  .map((line) => {
    const [instr, arg] = line.split(' ') as [INSTR, string];

    return InstructionFactory(instr, Number(arg));
  })

const device = new Device();

for (const instruction of input) {
  device.run(instruction);
}

const part1 = () => device.signalStrengh.reduce(sumEl);

const part2 = () => device.display()

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);