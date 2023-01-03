import { getFileLines } from '../../../lib/io';
import Vector from '../../../lib/Vector';

type Data = [Vector, Vector, number];

const input: Data[] = getFileLines(`${__dirname}/input.txt`)
  .map((line) => {
    const [sX, sY, bX, bY] = line.match(/[-\d]+/g)!.map(Number);
    const sensor = new Vector(sX, sY)
    const beacon = new Vector(bX, bY);
    return [sensor, beacon, sensor.manhatten(beacon)]
  });

const getRowCovered = (sensorData: Data[], row: number): number => {
  let result = 0;
  let seenX = new Set<number>();

  for (const [sensor, beacon, distance] of sensorData) {
    if (sensor.y === row) {
      seenX.add(sensor.x);
    }

    if (beacon.y === row) {
      seenX.add(beacon.x);
    }

    for (let x = sensor.x - distance; x <= sensor.x + distance; x++) {
      const thisPos = new Vector(x, row);

      if (!seenX.has(x) && thisPos.manhatten(sensor) <= distance) {
        seenX.add(x);
        result++;
      }
    }
  }

  return result;
}

const isNotCovered = (sensorData: Data[], pos: Vector) => sensorData.every(([sensor, __, distance]) => pos.manhatten(sensor) > distance);

const findDistressBeacon = (sensorData: Data[], max: number): Vector => {
  for (const [sensor, _, distance] of input) {
    for (const xDir of [-1, 1]) {
      for (const yDir of [-1, 1]) {
        for (let dx = 0; dx <= distance + 1; dx++) {
          const dy = distance + 1 - dx;
          const x = sensor.x + dx * xDir;
          const y = sensor.y + dy * yDir;

          const thisPos = new Vector(x, y)
          if (x >= 0 && x <= max && y >= 0 && y <= max && isNotCovered(sensorData, thisPos)) {
            return thisPos;
          }
        }
      }
    }
  }
  throw new Error('No beacon found');
}

const part1 = () => getRowCovered(input, 2000000);

const part2 = () => {
  const position = findDistressBeacon(input, 4000000);
  return position.x * 4000000 + position.y;
}

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
