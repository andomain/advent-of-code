import { readFileSync } from 'fs';

const inputData = readFileSync(`${__dirname}/input.txt`).toString();

type CardVals = { [key: string]: number };
type SolveCfg = { wild?: string; scoreOverride?: CardVals };
type Hand = { hand: string; bid: number; internalRank: number };

/**
 * Get the basic score of a card with optional overrides
 */
const scoreCard = (card: string, overrides: CardVals = {}) => {
  if (overrides[card] !== undefined) {
    return overrides[card];
  }

  switch (card) {
    case 'A':
      return 14;
    case 'K':
      return 13;
    case 'Q':
      return 12;
    case 'J':
      return 11;
    case 'T':
      return 10;
    default:
      return Number(card);
  }
};

/**
 * Get the initial rank of a hand
 */
const rankHand = (input: string, wildCard?: string): number => {
  const validCards = input.split('').filter((card) => card !== wildCard);
  const wilds = input.length - validCards.length;

  const counts = validCards.reduce<CardVals>((lookup, card) => {
    if (!lookup[card]) {
      lookup[card] = 0;
    }

    lookup[card] += 1;

    return lookup;
  }, {});

  // Sort standard cards by quantity
  const sortedCards = Object.values(counts).sort((countA, countB) => countB - countA);

  // Increase most common card by number of wildcards to get best possible rank
  switch ((sortedCards[0] || 0) + wilds) {
    case 5:
      return 6;
    case 4:
      return 5;
    // 3/2 is a full house, else 3 of a kind
    case 3:
      return sortedCards[1] === 2 ? 4 : 3;
    // 2/2 is 2 pair, else 1 pair
    case 2:
      return sortedCards[1] === 2 ? 2 : 1;
    default:
      return 0;
  }
};

/**
 * Compare two hands on a card-by-card basis with optional scoring overrides
 */
const compareHands = (handA: Hand, handB: Hand, overrides?: CardVals) => {
  const cardsA = handA.hand.split('');
  const cardsB = handB.hand.split('');
  let result = 0;
  let idx = 0;
  while (result === 0 && idx < cardsA.length) {
    result = Math.sign(scoreCard(cardsA[idx], overrides) - scoreCard(cardsB[idx], overrides));
    idx += 1;
  }

  return result;
};

/**
 * Convert input to Hands array
 */
const getHands = (input: string, wild?: string) =>
  input.split('\n').map<Hand>((line) => {
    const [hand, bid] = line.split(' ');

    return {
      hand,
      bid: +bid,
      internalRank: rankHand(hand, wild),
    };
  });

/**
 * Build a solving function including optional wildcard and scoring overrides
 */
const buildSolution = (cfg?: SolveCfg) => (input: string) =>
  getHands(input, cfg?.wild)
    .sort((a, b) => {
      const rankComparison = a.internalRank - b.internalRank;
      // If hands differ in rank then comparison is easy
      if (rankComparison !== 0) {
        return Math.sign(rankComparison);
      }

      // Else compare on a card by card basis
      return compareHands(a, b, cfg?.scoreOverride);
    })
    .reduce((acc, hand, idx) => acc + (idx + 1) * hand.bid, 0);

console.time('Part 1');
console.log(`Part 1: ${buildSolution()(inputData)}`);
console.timeEnd('Part 1');

console.time('Part 2');
console.log(`Part 2: ${buildSolution({ wild: 'J', scoreOverride: { J: 1 } })(inputData)}`);
console.timeEnd('Part 2');
