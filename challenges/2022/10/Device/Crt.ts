export default class Crt {
  public rows: string[] = new Array(6 * 40).fill(' ');

  constructor (public position = 1) { }

  update(cycle: number, position: number) {
    this.position = position;
    this.rows[cycle - 1] = this.drawPixel(cycle - 1);
  }

  private drawPixel(pixel: number): string {
    const rowPixel = pixel % 40;

    if (this.position >= rowPixel - 1 && this.position <= rowPixel + 1) {
      return '#';
    }

    return ' ';
  }

  public draw() {
    let result = '';
    for (let i = 1; i <= this.rows.length; i++) {
      result = result.concat(this.rows[i - 1]);

      if (i % 40 === 0) {
        result = result.concat('\n');
      }
    }

    console.log(result);
  }
}