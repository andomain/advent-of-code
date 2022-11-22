import { filterBitStrings, getLCBAt, getMCBAt, mostCommonBit } from ".";

const testInput = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010'];

describe('Common bits', () => {
  it('reduces array to most common bits', () => {
    const result = mostCommonBit(testInput);
    expect(result).toBe('10110');
  });

  it('selects most common bit', () => {
    expect(getMCBAt(testInput, 0)).toBe(1);
    expect(getMCBAt(testInput, 1)).toBe(0);
  });

  it('selects least common bit', () => {
    expect(getLCBAt(testInput, 0)).toBe(0);
    expect(getLCBAt(testInput, 1)).toBe(1);
  });
});

describe('Filtering', () => {
  it('by common bits', () => {
    expect(filterBitStrings(testInput, getMCBAt)).toBe('10111');
  });
});

