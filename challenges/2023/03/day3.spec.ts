import { solution1, solution2 } from '.';

type Test = [string, number];

// 467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..

const part1Tests: Test[] = [
  [
    '467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..',
    4361,
  ],
];
const part2Tests: Test[] = [
  [
    '467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..',
    467835,
  ],
];

describe('2023 Day 3', () => {
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
