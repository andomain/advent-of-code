import { getFileLines } from '../../../lib/io/readFile';

const input = getFileLines(`${__dirname}/input.txt`)[0].split(',').map(Number);

type FuelLookup = { [key: string]: number };
type FuelConsumptionFn = (i: number) => (sum: number, position: number) => number;

const linearFuel: FuelConsumptionFn = i => (sum, position) => sum += Math.abs(position - i);

const exponentialFuel: FuelConsumptionFn = i => (sum, position) => {
  const distance = Math.abs(position - i);

  return sum += distance * (distance + 1) * 0.5;
};

const calculateFuelRequirements = (initPositions: number[], fuelConsumptionFn: FuelConsumptionFn): FuelLookup => {
  const minPosition = Math.min(...initPositions);
  const maxPosition = Math.max(...initPositions);

  const fuel: FuelLookup = {}

  for (let i = minPosition; i <= maxPosition; i++) {
    fuel[i] = input.reduce(fuelConsumptionFn(i), 0);
  }

  return fuel;
}

const getMinFuelRequirement = (fuelRequirements: FuelLookup) => Object.entries(fuelRequirements)
  .reduce<{ position: null | string, fuel: number }>((lookup, [position, fuel]) => {
    if (fuel < lookup.fuel) {
      lookup = { position, fuel };
    }

    return lookup;
  }, { position: null, fuel: Number.MAX_SAFE_INTEGER }).fuel

const part1 = () => getMinFuelRequirement(calculateFuelRequirements(input, linearFuel));
const part2 = () => getMinFuelRequirement(calculateFuelRequirements(input, exponentialFuel));

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);