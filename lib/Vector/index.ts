export default class Vector {
  constructor (public x = 0, public y = 0) { }

  add(vec: Vector): Vector {
    return new Vector(this.x + vec.x, this.y + vec.y);
  }
}