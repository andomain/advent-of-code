export default class Vector {
  constructor(public x: number, public y: number) { }

  public add(a: Vector) {
    return new Vector(this.x + a.x, this.y + a.y);
  }

  public static from(input: string, seperator = ',') {
    const matchReg = new RegExp(`([0-9]+)${seperator}([0-9]+)`);
    const match = matchReg.exec(input);

    if (match === null) {
      throw new Error(`Could not convert ${input} to vector`);
    }
    return new Vector(+match[1], +match[2]);
  }

  public toString() {
    return `(${this.x},${this.y})`;
  }

  public eq(other: Vector) {
    return this.x === other.x && this.y === other.y;
  }
}
