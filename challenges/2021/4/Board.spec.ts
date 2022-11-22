import { Board } from "./Board";

describe('Board', () => {
  let board: Board;

  beforeEach(() => {
    board = new Board([
      ' 0  1  2  3  4',
      ' 5  6  7  8  9',
      '10 11 12 13 14',
      '15 16 17 18 19',
      '20 21 22 23 24',
    ]);
  });

  it('creates', () => {
    expect(board.rows).toEqual([
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
    ]);
  });

  it('ticks off numbers', () => {
    board.tick(2);
    board.tick(7);
    board.tick(13);
    board.tick(99);

    expect(board.rows).toEqual([
      [0, 1, null, 3, 4],
      [5, 6, null, 8, 9],
      [10, 11, 12, null, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
    ]);
  });

  describe('wins', () => {
    it('on a row', () => {
      board.tick(10);
      expect(board.won).toBe(false);
      board.tick(11);
      expect(board.won).toBe(false);
      board.tick(12);
      expect(board.won).toBe(false);
      board.tick(13);
      expect(board.won).toBe(false);
      board.tick(14);
      expect(board.won).toBe(true);
    });

    it('on a column', () => {
      board.tick(1);
      expect(board.won).toBe(false);
      board.tick(6);
      expect(board.won).toBe(false);
      board.tick(11);
      expect(board.won).toBe(false);
      board.tick(16);
      expect(board.won).toBe(false);
      board.tick(21);
      expect(board.won).toBe(true);
    });
  });

  describe('score', () => {
    it('calculates for ticked numbers', () => {
      expect(board.score).toBe(325);
      board.tick(5);
      expect(board.score).toBe(320);
    });

    it('handles duplicate ticks', () => {
      expect(board.score).toBe(325);
      board.tick(5);
      board.tick(5);
      expect(board.score).toBe(320);
    })

    it('handles invalid ticks', () => {
      expect(board.score).toBe(325);
      board.tick(99);
      expect(board.score).toBe(325);
    });

    it('handles complex boards', () => {
      const complexBoard = new Board([
        '22 13 17 11  0',
        '8  2 23  4 24',
        '21  9 14 16  7',
        '6 10  3 18  5',
        '1 12 20 15 19',
      ]);

      expect(complexBoard.score).toBe(300);
    });

  });
});