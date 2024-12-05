import { readFileSync } from 'fs';

type Input = { rules: Array<Array<number>>; pages: Array<Array<number>> };

const readInput = (filePath: string) => {
  const [ruleLines, pageLines] = readFileSync(filePath)
    .toString()
    .split('\n\n')
    .map((group) => group.split('\n'));

  const rules = ruleLines.map((line) => line.split('|').map(Number));
  const pages = pageLines.map((line) => line.split(',').map(Number));

  return { rules, pages };
};

const slicePages = (pages: Array<number>, sliceIdx: number) => [pages.slice(0, sliceIdx), pages.slice(sliceIdx + 1)];

const testPage = (rules: Array<Array<number>>) => (page: number, idx: number, pages: Array<number>) => {
  const [pre, post] = slicePages(pages, idx);

  return rules.every((rule) => {
    if (rule.indexOf(page) === -1) {
      return true;
    }

    const [first, last] = rule;
    return (first === page && pre.indexOf(last) === -1) || (last === page && post.indexOf(first) === -1);
  });
};

const validatePages = (pages: Array<number>, rules: Array<Array<number>>) => {
  const validator = testPage(rules);

  return pages.every(validator);
};

const fixInvalidPages = (pages: Array<number>, rules: Array<Array<number>>) => {
  let processed = [...pages];
  let isCorrect = false;

  while (!isCorrect) {
    isCorrect = true;

    rules.forEach(([first, last]) => {
      const firstIdx = processed.indexOf(first);
      const lastIdx = processed.indexOf(last);

      if (firstIdx > -1 && lastIdx > -1) {
        if (firstIdx > lastIdx) {
          isCorrect = false;

          const removed = processed.splice(lastIdx, 1);
          processed.splice(firstIdx, 0, removed[0]);
        }
      }
    });
  }

  return processed;
};

const sumMiddleElements = (sum: number, pages: Array<number>) => sum + pages[(pages.length - 1) / 2];

const inputData: Input = readInput(`${__dirname}/input.txt`);

const solution1 = (input: Input) =>
  input.pages.filter((row) => validatePages(row, input.rules)).reduce(sumMiddleElements, 0);

const solution2 = (input: Input) =>
  input.pages
    .filter((row) => !validatePages(row, input.rules))
    .map((row) => fixInvalidPages(row, input.rules))
    .reduce(sumMiddleElements, 0);

console.time('Part 1');
console.log(`Part 1: ${solution1(inputData)}`);
console.timeEnd('Part 1');
console.time('Part 2');
console.log(`Part 2: ${solution2(inputData)}`);
console.timeEnd('Part 2');
