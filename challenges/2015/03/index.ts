import { readFileSync } from 'fs';

type Position = { x: number; y: number };

const inputData = readFileSync(`${__dirname}/input.txt`).toString();

class Movable {
  private _logged: Set<string>;

  constructor(public position: Position = { x: 0, y: 0 }) {
    this._logged = new Set<string>();
    this._logged.add(`(${this.position.x},${this.position.y})`);
  }

  get visited(): string[] {
    return [...this._logged];
  }

  step(direction: string) {
    switch (direction) {
      case '^':
        this.position = { ...this.position, y: this.position.y + 1 };
        break;
      case 'v':
        this.position = { ...this.position, y: this.position.y - 1 };
        break;
      case '>':
        this.position = { ...this.position, x: this.position.x + 1 };
        break;
      case '<':
        this.position = { ...this.position, x: this.position.x - 1 };
        break;
      default:
        throw new Error(`Unknown step direction ${direction}`);
    }

    this._logged.add(`(${this.position.x},${this.position.y})`);
  }
}

export const solve = (input: string, numActors: number) => {
  const steps = input.split('');
  const actors = Array.from({ length: numActors }, () => new Movable());

  for (let i = 0; i < steps.length; i += 1) {
    const actor = actors[i % numActors];
    actor.step(steps[i]);
  }

  return actors.reduce((all, actor) => new Set([...all, ...actor.visited]), new Set<string>()).size;
};

console.log(`Part 1: ${solve(inputData, 1)}`);
console.log(`Part 2: ${solve(inputData, 2)} `);
