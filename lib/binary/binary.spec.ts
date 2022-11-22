import { binaryToDecimal, bitFlip } from ".";

describe('bitFlip', () => {
  it('inverts a bitstring', () => {
    expect(bitFlip('1110001010')).toBe('0001110101');
  });

  it('throws if invalid binary string', () => {
    expect(() => bitFlip('1abc0')).toThrow();
  });
});

describe('binaryToDecimal', () => {
  it('converts binary to decimal',()=>{
    expect(binaryToDecimal('1010')).toBe(10);
  });

  it('throws if invalid binary string', () => {
    expect(() => binaryToDecimal('1abc0')).toThrow();
  });
});