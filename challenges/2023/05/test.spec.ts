import { solution1, solution2 } from '.';

type Test = [string, number];

const part1Tests: Test[] = [];

const part2Tests: Test[] = [];

describe('20XX Day X', () => {
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
