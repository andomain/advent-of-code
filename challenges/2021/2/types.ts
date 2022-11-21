import Vector from "../../../lib/Vector";

export enum COMMAND {
  FORWARD = 'forward',
  DOWN = 'down',
  UP = 'up',
}

export type Instruction = {
  command: COMMAND,
  value: number,
}

export type Status = {
  position: Vector,
  aim: number,
}
export type ApplyFn = (status: Status, instr: Instruction) => Status;
