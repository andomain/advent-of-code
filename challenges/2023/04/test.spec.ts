import { solution1, solution2 } from '.';

type Test = [string, number];

const part1Tests: Test[] = [
  ['Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53', 8],
  ['Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19', 2],
  ['Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1', 2],
  ['Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83', 1],
  ['Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36', 0],
  ['Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11', 0],
];

const part2Tests: Test[] = [
  // eslint-disable-next-line max-len
  ['Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11', 30],
];

describe('2023 Day 4', () => {
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
