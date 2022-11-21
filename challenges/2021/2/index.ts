import { getFileLines } from "../../../lib/io/readFile";
import Vector from "../../../lib/Vector";
import { ApplyFn, COMMAND, Instruction, Status } from "./types";

export const lineToInstr = (line: string): Instruction => {
  const [command, value] = line.split(' ');

  return {
    command: command as COMMAND,
    value: Number(value),
  };
}

export const applyInstructionV1: ApplyFn = (status, instruction) => {
  let applied: Vector;

  switch (instruction.command) {
    case COMMAND.FORWARD: applied = new Vector(instruction.value, 0);
      break;
    case COMMAND.UP: applied = new Vector(0, -instruction.value);
      break;
    case COMMAND.DOWN: applied = new Vector(0, instruction.value);
      break;
    default: throw new Error(`Unknown instruction ${instruction.command}`);
  }

  return {
    ...status,
    position: status.position.add(applied),
  };
}

export const applyInstructionV2: ApplyFn = (status, instruction) => {
  let applied: Vector = new Vector(0, 0);
  let nextAim = status.aim;

  switch (instruction.command) {
    case COMMAND.FORWARD: applied = new Vector(instruction.value, instruction.value * status.aim);
      break;
    case COMMAND.UP: nextAim -= instruction.value;
      break;
    case COMMAND.DOWN: nextAim += instruction.value;
      break;
    default: throw new Error(`Unknown instruction ${instruction.command}`);
  }

  return {
    position: status.position.add(applied),
    aim: nextAim,
  };
}

const solve = (instructionFn: ApplyFn, initStatus: Status = { position: new Vector(0, 0), aim: 0 }): number => {
  const { position } = getFileLines(`${__dirname}/input.txt`)
    .filter(Boolean) // Remove empty lines
    .map(lineToInstr) // Convert to instructions
    .reduce(instructionFn, initStatus); // Apply instructions

  return position.x * position.y;
}

console.log(`Solution 1: ${solve(applyInstructionV1)}`);
console.log(`Solution 2: ${solve(applyInstructionV2)}`);