import Crt from "./Crt";

export enum INSTR {
  ADDX = 'addx',
  NOOP = 'noop',
}

export type Instruction = {
  opcode: INSTR,
  cycles: number,
  arg?: number,
}

const NOOP = (): Instruction => ({
  opcode: INSTR.NOOP,
  cycles: 1,
})

const ADDX = (arg?: number): Instruction => {
  if (arg === undefined) {
    throw new Error('ADDX requires an argument');
  }

  return ({
    opcode: INSTR.ADDX,
    cycles: 2,
    arg,
  });

}

export const InstructionFactory = (opcode: INSTR, arg?: number): Instruction => {
  switch (opcode) {
    case INSTR.NOOP: return NOOP();
    case INSTR.ADDX: return ADDX(arg);
  }
}

export default class Device {
  public x: number = 1;
  public signalStrengh: number[] = [];
  private _cycles: number = 0;
  private crt: Crt = new Crt();


  run(instruction: Instruction) {
    for (let i = 1; i <= instruction.cycles; i++) {
      this.cycles += 1;
    }
    switch (instruction.opcode) {
      case INSTR.NOOP: break;
      case INSTR.ADDX: this.addX(instruction.arg!);
        break;
      default: throw new Error(`Device: Unknown opcode ${instruction.opcode}`);
    }
  }

  public display() {
    this.crt.draw();
  }


  private addX(val: number) {
    this.x += val;
  }

  get cycles() {
    return this._cycles
  }

  set cycles(value: number) {
    this._cycles = value;
    this.crt.update(this.cycles, this.x);

    if ((this.cycles + 20) % 40 === 0) {
      this.signalStrengh.push(this.cycles * this.x);
    }
  }
}