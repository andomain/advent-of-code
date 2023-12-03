import { solve } from '.';

type Test = [string, number];

const part1Tests: Test[] = [
  ['>', 2],
  ['^>v<', 4],
  ['^v^v^v^v^v', 2],
];

const part2Tests: Test[] = [
  ['^v', 3],
  ['^>v<', 3],
  ['^v^v^v^v^v', 11],
];

describe('2015 Day 3', () => {
  describe('Part 1', () => {
    test.each(part1Tests)('%s => %d', (ip, expected) => {
      expect(solve(ip, 1)).toEqual(expected);
    });
  });

  describe('Part 2', () => {
    test.each(part2Tests)('%s => %d', (ip, expected) => {
      expect(solve(ip, 2)).toEqual(expected);
    });
  });
});
