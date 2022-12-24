import { readFileSync } from 'fs';
import * as _ from 'lodash';
import Vector from '../../../lib/Vector';
const START = 'S';
const END = 'E';

type Node = {
  elevation: string,
  edges: string[],
  cost: number,
}

type Graph = { [key: string]: Node };

const directions = [
  new Vector(1, 0),
  new Vector(-1, 0),
  new Vector(0, 1),
  new Vector(0, -1),
];

const input: string = readFileSync(`${__dirname}/input.txt`, 'utf-8').trim();

const findStartAndEnd = (input: string): { start: string, end: string } => {
  const grid = input.split('\n');
  const width = grid[0].length;
  const height = grid.length;

  let start: string | null = null;
  let end: string | null = null;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x] === START) {
        start = new Vector(x, y).toString();
      }
      if (grid[y][x] === END) {
        end = new Vector(x, y).toString();
      }
    }
  }

  if (start !== null && end !== null) {
    return { start, end }
  }

  throw new Error('Could not find start/end position');
}

const parseGraph = (input: string): Graph => {
  const grid = input
    .replace(START, 'a')
    .replace(END, 'z')
    .split('\n')
    .map(line => line.split(''));

  const width = grid[0].length;
  const height = grid.length;
  const graph: { [key: string]: Node } = {};

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const position = new Vector(x, y);

      const elevation = grid[y][x];

      const edges = directions.reduce<string[]>((nextEdges, dir) => {
        const nextPos = position.add(dir);

        if (nextPos.x < 0 || nextPos.y < 0 || nextPos.x >= width || nextPos.y >= height) {
          return nextEdges;
        }

        const nextAlt = grid[nextPos.y][nextPos.x];

        if (canMove(elevation, nextAlt)) {
          nextEdges.push(nextPos.toString())
        }

        return nextEdges;
      }, []);

      graph[position.toString()] = {
        elevation,
        edges,
        cost: Infinity,
      }
    }
  }

  return graph;
}

const canMove = (start: string, dest: string): boolean => dest.charCodeAt(0) - start.charCodeAt(0) <= 1;

const { start, end } = findStartAndEnd(input);

const findShortestPath = (inputGraph: Graph, start: string, finish: string): number => {
  const graph = _.cloneDeep(inputGraph);
  const toSearch = Object.keys(graph);

  const current = graph[start];
  current.cost = 0;

  while (toSearch.length) {
    toSearch.sort((a, b) => graph[b].cost - graph[a].cost);
    const current = toSearch.pop();

    if (!current) {
      throw new Error(`Path could not be found.`);
    }

    const nextCost = graph[current].cost + 1

    for (const edge of graph[current].edges) {
      graph[edge].cost = Math.min(graph[edge].cost, nextCost);
    }
  }


  return graph[finish].cost;
}
const graph = parseGraph(input);

const part1 = () => {
  console.time('Part 1')
  const result = findShortestPath(graph, start, end);
  console.timeEnd('Part 1');
  return result;
}

// TODO: The performance of this brute force implementation is unacceptable. Revisit with some memoisation
const part2 = () => {
  console.time('Part 2')
  const startPoints = Object.keys(graph).filter(point => graph[point].elevation === 'a');

  const getMinPath = (current: number, start: string): number => Math.min(current, findShortestPath(graph, start, end));
  const result = startPoints.reduce(getMinPath, Infinity);
  console.timeEnd('Part 2')
  return result;
}

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);