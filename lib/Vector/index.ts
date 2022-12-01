export default class Vector {
  constructor (public x = 0, public y = 0) { }

  add(vec: Vector): Vector {
    return new Vector(this.x + vec.x, this.y + vec.y);
  }

  subtract(vec: Vector): Vector {
    return new Vector(this.x - vec.x, this.y - vec.y);
  }

  abs(): Vector {
    return new Vector(Math.abs(this.x), Math.abs(this.y));
  }

  unit(): Vector {
    return new Vector(Math.sign(this.x), Math.sign(this.y));
  }
}