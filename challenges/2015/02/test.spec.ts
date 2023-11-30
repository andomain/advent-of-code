import { solution1, solution2 } from '.';

type Test = [string, number];

const part1Tests: Test[] = [
  ['2x3x4', 58],
  ['1x1x10', 43],
];

const part2Tests: Test[] = [
  ['2x3x4', 34],
  ['1x1x10', 14],
];

describe('2015 Day 2', () => {
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
