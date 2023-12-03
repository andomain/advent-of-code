import crypto from 'crypto';

const inputData = 'bgvyzdsv';

const solve = (targetLength: number) => (input: string) => {
  let result = '';
  let test = 0;
  const reg = new RegExp(`^0{${targetLength},}`);

  while (!reg.test(result)) {
    test += 1;
    result = crypto.createHash('md5').update(`${input}${test}`).digest('hex');
  }

  return test;
};

console.log(`Part 1: ${solve(5)(inputData)}`);
console.log(`Part 2: ${solve(6)(inputData)}`);
