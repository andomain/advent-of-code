import { solution1, solution2 } from '.';

type Test = [string, number];

const part1Tests: Test[] = [['Time:      7  15   30\nDistance:  9  40  200', 288]];

const part2Tests: Test[] = [['Time:      7  15   30\nDistance:  9  40  200', 71503]];

describe('2023 Day 6', () => {
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
