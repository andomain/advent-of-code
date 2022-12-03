import { sumEl } from '../../../lib';
import { getFileLines } from '../../../lib/io';

type Round = [Opponent, Player];
type ExpectedResult = [Opponent, Result];
type Rule = {
  score: number,
  [Result.WIN]: Opponent,
  [Result.DRAW]: Opponent,
  [Result.LOSE]: Opponent,
}
type RuleBook = { [key in Player]: Rule };

enum Player {
  ROCK = 'X',
  PAPER = 'Y',
  SCISSORS = 'Z',
}

enum Opponent {
  ROCK = 'A',
  PAPER = 'B',
  SCISSORS = 'C',
}

enum Result {
  LOSE = 'X',
  DRAW = 'Y',
  WIN = 'Z',
}

const rockPaperScissors: RuleBook = {
  [Player.ROCK]: {
    score: 1,
    [Result.WIN]: Opponent.SCISSORS,
    [Result.DRAW]: Opponent.ROCK,
    [Result.LOSE]: Opponent.PAPER,
  },
  [Player.PAPER]: {
    score: 2,
    [Result.WIN]: Opponent.ROCK,
    [Result.DRAW]: Opponent.PAPER,
    [Result.LOSE]: Opponent.SCISSORS,
  },
  [Player.SCISSORS]: {
    score: 3,
    [Result.WIN]: Opponent.PAPER,
    [Result.DRAW]: Opponent.SCISSORS,
    [Result.LOSE]: Opponent.ROCK,
  },
}

// Type conversion methods 
const toRound = (line: string) => line.split(' ') as Round;
const toExpectedResult = (line: string) => line.split(' ') as ExpectedResult;

// Build functoins based off a rulebook
const resultToRound = (rules: RuleBook) => ([opponent, result]: ExpectedResult): Round => {
  const [player] = Object.entries(rules).find((entry) => {
    const [, rule] = entry;

    return rule[result] === opponent;
  }) as [Player, Rule];


  return [opponent, player];
}

const scoreRound = (rules: RuleBook) => ([opponent, player]: Round): number => {
  const rule = rules[player];

  let result = 3;

  if (rule[Result.LOSE] === opponent) {
    result = 0;
  } else if (rule[Result.WIN] === opponent) {
    result = 6;
  }

  return rule.score + result;
}

const input = getFileLines(`${__dirname}/input.txt`);

const scoreWithRules = scoreRound(rockPaperScissors);
const expectedResultToRound = resultToRound(rockPaperScissors);

const part1 = () => input
  .map(toRound)
  .map(scoreWithRules)
  .reduce(sumEl);

const part2 = () => input
  .map(toExpectedResult)
  .map(expectedResultToRound)
  .map(scoreWithRules)
  .reduce(sumEl);

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);