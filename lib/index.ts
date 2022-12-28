export const sumEl = (sum: number, el: number) => sum += el

export const chunkArray = <T>(input: T[], chunkSize: number): T[][] => {
  const length = input.length;
  const result: T[][] = [];

  for (let i = 0; i < length; i += chunkSize) {
    result.push(input.slice(i, i + chunkSize));
  }

  return result;
}
