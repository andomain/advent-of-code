export class Board {
  public rows: (number | null)[][];
  public score: number;
  private numbers: Set<number>;

  constructor (input: string[]) {
    const numbers = input.map(s => s.trim()).join(' ').split(/\s+/).map(Number);
    
    this.score = numbers.reduce((sum, num) => sum += num, 0);
    this.numbers = new Set(numbers);
    this.rows = new Array();

    for (let i = 0; i < numbers.length; i += 5) {
      this.rows.push(numbers.slice(i, i + 5));
    }
  };

  tick(num: number): void {
    if (this.numbers.has(num)) {
      this.rows = this.rows.map(row => row.map(col => col === num ? null : col));
      this.score -= num;
      this.numbers.delete(num);
    }
  }

  get won(): boolean {
    if (this.rows.some(row => row.filter(num => num !== null).length === 0)) {
      return true;
    }

    for (let i = 0; i < this.rows[0].length; i++) {
      if (this.rows.every(row => row[i] === null)) {
        return true;
      }
    }

    return false
  }

  // get score(): number {
  //   return 325;
  // }
}