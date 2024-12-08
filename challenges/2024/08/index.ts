import { readFileSync } from 'fs';
import Vector from '../../../lib/Vector';

type Satellite = { frequency: string; position: Vector };
type GridInfo = { gridWidth: number; gridHeight: number; satellites: Record<string, Array<Satellite>> };

const readInput = (filePath: string) => {
  const grid = readFileSync(filePath).toString().split('\n');

  const gridHeight = grid.length;
  const gridWidth = grid[0].length;

  return grid.reduce<GridInfo>(
    (lookup, row, rowIdx) => {
      const columns = row.split('');

      columns.forEach((col, colIdx) => {
        if (col !== '.') {
          if (!lookup.satellites[col]) {
            lookup.satellites[col] = [];
          }

          lookup.satellites[col].push({ frequency: col, position: new Vector(colIdx, rowIdx) });
        }
      });

      return lookup;
    },
    { gridHeight, gridWidth, satellites: {} },
  );
};

const inBounds = (position: Vector, maxW: number, maxH: number) =>
  position.x >= 0 && position.y >= 0 && position.x < maxW && position.y < maxH;

const findAntiNodes = (gridInfo: GridInfo) =>
  Object.values(gridInfo.satellites).reduce<Set<string>>((nodes, satellites) => {
    satellites.forEach((thisSatellite, satelliteIdx) => {
      const others = [...satellites];
      others.splice(satelliteIdx, 1);

      others.forEach((otherSatellite) => {
        const diff = otherSatellite.position.sub(thisSatellite.position);
        const nodeLocation = thisSatellite.position.add(diff.scalarMult(-1));

        if (inBounds(nodeLocation, gridInfo.gridWidth, gridInfo.gridHeight)) {
          nodes.add(nodeLocation.toString());
        }
      });
    });

    return nodes;
  }, new Set());

const findHarmonics = (gridInfo: GridInfo) =>
  Object.values(gridInfo.satellites).reduce<Set<string>>((nodes, satellites) => {
    satellites.forEach((thisSatellite, satelliteIdx) => {
      nodes.add(thisSatellite.position.toString());

      const others = [...satellites];
      others.splice(satelliteIdx, 1);

      others.forEach((otherSatellite) => {
        let step = otherSatellite.position.sub(thisSatellite.position).scalarMult(-1);
        let nodeLocation = thisSatellite.position.add(step);

        while (inBounds(nodeLocation, gridInfo.gridWidth, gridInfo.gridHeight)) {
          nodes.add(nodeLocation.toString());
          nodeLocation = nodeLocation.add(step);
        }
      });
    });

    return nodes;
  }, new Set());

console.time('Parse input');
const input = readInput(`${__dirname}/input.txt`);
console.timeEnd('Parse input');

console.time('Part 1');
console.log(`Part 1: ${findAntiNodes(input).size}`);
console.timeEnd('Part 1');

console.time('Part 2');
console.log(`Part 2: ${findHarmonics(input).size}`);
console.timeEnd('Part 2');
