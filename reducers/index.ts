type InterFn<T, S = number> = (val: T) => S;

export const reduceSum = (sum: number, val: number) => sum + val;

// Apply a function to each value before summing
//  Equivalent of .map(processFn).reduce(reduceSum)
export const reduceSumFn =
  <T>(processFn: InterFn<T>) =>
  (sum: number, val: T) =>
    sum + processFn(val);
