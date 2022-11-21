import { countDescending, slidingWindow } from ".";

const testInput = [
  199,
  200,
  208,
  210,
  200,
  207,
  240,
  269,
  260,
  263,
];

describe('countDescending', () => {
  it('does not consider the first measurement', () => {
    expect(countDescending([199])).toBe(0);
  });

  it('counts descending lines', () => {
    const result = countDescending(testInput);

    expect(result).toBe(7);
  });
});

describe('slidingWindow', () => {
  it('creates a sliding window average', () => {
    expect(slidingWindow([1, 2, 3], 3)).toEqual([6]);
    expect(slidingWindow([1, 2, 3, 4, 5, 6], 3)).toEqual([6, 15]);
  });

  it('operates on odd length arrays', () => {
    expect(slidingWindow([1, 2, 5], 2)).toEqual([3, 5]);
  });
});

describe('solution', () => {
  it('compares windows', () => {
    expect(countDescending(slidingWindow(testInput, 3))).toBe(5);
  })
})