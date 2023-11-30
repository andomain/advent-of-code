import { solution1, solution2 } from '.';

type Test = [string, number];

const part1Tests: Test[] = [
  ['(())', 0],
  ['()()', 0],
  ['(((', 3],
  ['(()(()(', 3],
  ['))(((((', 3],
  ['())', -1],
  ['))(', -1],
  [')))', -3],
  [')())())', -3],
];

const part2Tests: Test[] = [
  [')', 1],
  ['()())', 5],
];

describe('2015 Day 1', () => {
  describe('Part 1', () => {
    test.each(part1Tests)('%s => %d', (ip, expected) => {
      expect(solution1(ip)).toEqual(expected);
    });
  });

  describe('Part 2', () => {
    test.each(part2Tests)('%s => %d', (ip, expected) => {
      expect(solution2(ip)).toEqual(expected);
    });
  });
});
