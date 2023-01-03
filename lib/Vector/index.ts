export default class Vector {
  constructor(public x = 0, public y = 0) { }

  add(vec: Vector): Vector {
    return new Vector(this.x + vec.x, this.y + vec.y);
  }

  subtract(vec: Vector): Vector {
    return new Vector(this.x - vec.x, this.y - vec.y);
  }

  abs(): Vector {
    return new Vector(Math.abs(this.x), Math.abs(this.y));
  }

  mag(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  eq(vec: Vector): boolean {
    return this.x === vec.x && this.y === vec.y;
  }

  unit(): Vector {
    return new Vector(Math.sign(this.x), Math.sign(this.y));
  }

  toString(): string {
    return `(${this.x},${this.y})`;
  }
}
