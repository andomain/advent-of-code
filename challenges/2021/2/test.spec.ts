import { applyInstructionV1, applyInstructionV2, lineToInstr } from ".";
import Vector from "../../../lib/Vector";
import { COMMAND } from "./types";

describe('lineToInstr', () => {
  it('creates valid instructions', () => {
    expect(lineToInstr('up 5')).toEqual({ command: 'up', value: 5 });
  });
});

describe('Instruction execution', () => {
  it('applies instructions for part 1', () => {
    const initStatus = { position: new Vector(2, 1), aim: 0 };
    expect(applyInstructionV1(initStatus, { command: COMMAND.DOWN, value: 5 })).toEqual({
      position: new Vector(2, 6),
      aim: 0,
    });

    expect(applyInstructionV1(initStatus, { command: COMMAND.UP, value: 1 })).toEqual({
      position: new Vector(2, 0),
      aim: 0,
    });

    expect(applyInstructionV1(initStatus, { command: COMMAND.FORWARD, value: 4 })).toEqual({
      position: new Vector(6, 6),
      aim: 0,
    });
  });

  it('applies instructions for part 2', () => {
    const initStatus = { position: new Vector(2, 1), aim: 0 };
    const aimedStatus = { position: new Vector(2, 1), aim: 5 };

    expect(applyInstructionV2(initStatus, { command: COMMAND.DOWN, value: 5 })).toEqual({
      position: new Vector(2, 1),
      aim: 5,
    });

    expect(applyInstructionV2(initStatus, { command: COMMAND.UP, value: 1 })).toEqual({
      position: new Vector(2, 1),
      aim: -1,
    });

    expect(applyInstructionV2(aimedStatus, { command: COMMAND.FORWARD, value: 2 })).toEqual({
      position: new Vector(4, 11),
      aim: 5,
    });
  });
});