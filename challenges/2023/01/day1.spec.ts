import {
  processPart1,
  processPart2,
  solution1,
  solution2,
} from '.';

const testInput1 = '1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet';
const testInput2 = 'two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen';

describe('2023 Day 1', () => {
  describe('Part 1', () => {
    describe('processor', () => {
      it('combines the first and last digit', () => {
        expect(processPart1('1abc2')).toBe(12);
        expect(processPart1('pqr3stu8vwx')).toBe(38);
        expect(processPart1('a1b2c3d4e5f')).toBe(15);
        expect(processPart1('treb7uchet')).toBe(77);
      });
    });

    it('sums the processed lines', () => {
      expect(solution1(testInput1)).toBe(142);
    });
  });

  describe('Part 2', () => {
    describe('processor', () => {
      it('combines the first and last digit or word', () => {
        expect(processPart2('two1nine')).toBe(29);
        expect(processPart2('eightwothree')).toBe(83);
        expect(processPart2('abcone2threexyz')).toBe(13);
        expect(processPart2('xtwone3four')).toBe(24);
        expect(processPart2('4nineeightseven2')).toBe(42);
        expect(processPart2('zoneight234')).toBe(14);
        expect(processPart2('7pqrstsixteen')).toBe(76);
      });
    });

    it('sums the processed lines', () => {
      expect(solution2(testInput2)).toBe(281);
    });
  });
});
