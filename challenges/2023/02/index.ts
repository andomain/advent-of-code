import { readFileSync } from 'fs';
import { reduceSumFn } from '../../../reducers';

const inputData = readFileSync(`${__dirname}/input.txt`).toString();

type Game = {
  id: number;
  rounds: Round[];
};

type Round = {
  red: number;
  green: number;
  blue: number;
};

const toRound = (round: string): Round => {
  // This will always match due to the defined input structure
  const red = /red/.test(round) ? +round.match(/(\d+) red/)![1] : 0;
  const green = /green/.test(round) ? +round.match(/(\d+) green/)![1] : 0;
  const blue = /blue/.test(round) ? +round.match(/(\d+) blue/)![1] : 0;

  return { red, green, blue };
};

const toGame = (game: string): Game => {
  // This will always match due to the defined input structure
  const [, id, roundsRaw] = game.match(/Game (\d+): (.*)/)!;

  const rounds = roundsRaw.split('; ').map(toRound);

  return { id: +id, rounds };
};

const roundValid = (round: Round, max: Round) => (
  round.red <= max.red
  && round.green <= max.green
  && round.blue <= max.blue
);

const getValidId = (game: Game) => {
  const valid = !game.rounds.some((round) => !roundValid(round, { red: 12, green: 13, blue: 14 }));
  return valid ? game.id : 0;
};

const getMinBalls = (game: Game) => {
  const minBalls = game.rounds.reduce((max, round) => ({
    red: Math.max(max.red, round.red),
    green: Math.max(max.green, round.green),
    blue: Math.max(max.blue, round.blue),
  }), { red: 0, green: 0, blue: 0 });

  return minBalls.red * minBalls.green * minBalls.blue;
};

export const solution1 = (input: string) => input.split('\n')
  .map(toGame)
  .reduce(reduceSumFn(getValidId), 0);

export const solution2 = (input: string) => input.split('\n')
  .map(toGame)
  .reduce(reduceSumFn(getMinBalls), 0);

console.log(`Part 1: ${solution1(inputData)}`);
console.log(`Part 2: ${solution2(inputData)}`);
