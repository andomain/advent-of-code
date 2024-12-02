import { readFileSync } from 'fs';

const inputData = readFileSync(`${__dirname}/input.txt`).toString();

type Game = {
  id: number;
  winningNumbers: number[];
  score: number;
  quantity: number;
};

const gameReg = /Card\s+(\d+): ([\d\s]+)\s+\|\s+([\d\s]+)/;

const parseGame = (game: string): Game => {
  // Guaranteed match due to defined input structure
  const [, id, winningNumbersStr, gameNumbersStr] = game.match(gameReg)!;

  const targetNumbers = new Set(winningNumbersStr.split(/\s+/).map(Number));
  const gameNumbers = new Set(gameNumbersStr.split(/\s+/).map(Number));
  const winningNumbers = Array.from(gameNumbers).filter((num) => targetNumbers.has(num));
  const score = winningNumbers.length > 0 ? 2 ** (winningNumbers.length - 1) : 0;
  return {
    id: +id,
    winningNumbers,
    score,
    quantity: 1,
  };
};

export const solution1 = (input: string) =>
  input.split('\n').reduce((sum, game) => {
    const { score } = parseGame(game);

    return sum + score;
  }, 0);

export const solution2 = (input: string) => {
  const cardLookup = input.split('\n').map(parseGame);

  for (let i = 0; i < cardLookup.length; i += 1) {
    const { winningNumbers } = cardLookup[i];

    for (let j = 1; j <= winningNumbers.length; j += 1) {
      cardLookup[i + j].quantity += cardLookup[i].quantity;
    }
  }

  return cardLookup.reduce((sum, card) => sum + card.quantity, 0);
};

console.log(`Part 1: ${solution1(inputData)}`);
console.log(`Part 2: ${solution2(inputData)}`);
