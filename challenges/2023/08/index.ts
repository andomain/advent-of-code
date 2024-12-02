import { readFileSync } from 'fs';

const inputData = readFileSync(`${__dirname}/input.txt`).toString();

type Node = {
  id: string;
  left: string;
  right: string;
};
type NodeMap = { [key: string]: Node };

const gcd = (a: number, b: number): number => {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
};

const findlcm = (arr: number[]) => {
  // Initialize result
  let ans = arr[0];

  // ans contains LCM of arr[0], ..arr[i]
  // after i'th iteration,
  for (let i = 1; i < arr.length; i += 1) {
    ans = (arr[i] * ans) / gcd(arr[i], ans);
  }

  return ans;
};

const followPaths = (startNodes: Node[], nodes: NodeMap, directions: string[], endTest: (node: Node) => boolean) =>
  startNodes.map((node) => {
    let current = { ...node };
    let steps = 0;

    while (!endTest(current)) {
      current = directions[steps % directions.length] === 'R' ? nodes[current.right] : nodes[current.left];
      steps += 1;
    }
    return steps;
  });

const parseInput = (input: string) => {
  const [directionsInput, labels] = input.split('\n\n');
  const directions = directionsInput.split('');
  const nodes = labels.split('\n').reduce<NodeMap>((lookup, label) => {
    const [, id, left, right] = /(\w+) = \((\w+), (\w+)\)/.exec(label)!;
    lookup[id] = { id, left, right };
    return lookup;
  }, {});

  return { nodes, directions };
};

export const solution1 = (input: string) => {
  const { nodes, directions } = parseInput(input);

  return followPaths([nodes.AAA], nodes, directions, (node: Node) => node.id === 'ZZZ')[0];
};

export const solution2 = (input: string) => {
  const { nodes, directions } = parseInput(input);
  const startNodes = Object.values(nodes).filter((node) => /A$/.test(node.id));

  const journeys = followPaths(startNodes, nodes, directions, (node) => /Z$/.test(node.id));

  return findlcm(journeys);
};

// Could extend to generic solver with start/endpoint test functions

console.time('Part 1');
console.log(`Part 1: ${solution1(inputData)}`);
console.timeEnd('Part 1');
console.time('Part 2');
console.log(`Part 2: ${solution2(inputData)}`);
console.timeEnd('Part 2');
