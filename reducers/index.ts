export const reduceSum = (sum: number, val: number) => sum + val;

export const reduceSumFn = <T>(fn: (val: T) => number) => (sum: number, val: T) => sum + fn(val);
