import { readFileSync } from 'fs';

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

export const solution1 = (input: string) => input.split('\n')
  .map(toGame)
  .reduce((count, { id, rounds }) => {
    // Use .some() & some negation to fail as soon as an invalid round is detected
    const valid = !rounds.some((round) => !roundValid(round, { red: 12, green: 13, blue: 14 }));
    if (valid) {
      return count + id;
    }

    return count;
  }, 0);

export const solution2 = (input: string) => input.split('\n')
  .map(toGame)
  .reduce((currentPower, { rounds }) => {
    const minBalls = rounds.reduce((max, round) => ({
      red: Math.max(max.red, round.red),
      green: Math.max(max.green, round.green),
      blue: Math.max(max.blue, round.blue),
    }), { red: 0, green: 0, blue: 0 });

    return currentPower + minBalls.red * minBalls.green * minBalls.blue;
  }, 0);

console.log(`Part 1: ${solution1(inputData)}`);
console.log(`Part 2: ${solution2(inputData)}`);
