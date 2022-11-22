const validBinary = (binString: string): boolean => /^[0-1]+$/.test(binString);

export const bitFlip = (input: string): string => {
  if (!validBinary(input)) {
    throw new Error(`Invalid binary string ${input}`);
  }

  return input.split('').map((c) => c === '1' ? '0' : '1').join('');
}

export const binaryToDecimal = (input: string): number => {
  if (!validBinary(input)) {
    throw new Error(`Invalid binary string ${input}`);
  }

  return parseInt(input, 2);
};
