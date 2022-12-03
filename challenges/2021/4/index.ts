import { resourceLimits } from "worker_threads";
import { getFileLines } from "../../../lib/io";
import { Board } from "./Board";

const inputLines = getFileLines(`${__dirname}/input.txt`);

const [drawnInput, ...boardInput] = inputLines;

const drawnNumbers = drawnInput.split(',').map(Number);

const initialiseBoards = (input: string[]) => {
  const boards: Board[] = [];

  for (let i = 1; i < input.length; i += 6) {
    boards.push(new Board(input.slice(i, i + 5)));
  }

  return boards;
}

const part1 = () => {
  const drawList = [...drawnNumbers];
  const boards = initialiseBoards(boardInput);

  while (drawList.length) {
    const drawn = drawList.shift();

    if (drawn === undefined) {
      throw new Error('All numbers drawn');
    }

    for (const board of boards) {
      board.tick(drawn);

      if (board.won) {
        return board.score * drawn;
      }
    }
  }
}

const part2 = () => {
  const drawList = [...drawnNumbers];
  let boards = initialiseBoards(boardInput);

  while (drawList.length) {
    const drawn = drawList.shift();

    if (drawn === undefined) {
      throw new Error('All numbers drawn');
    }

    for (const board of boards) {
      board.tick(drawn);
    }

    if (boards.length === 1 && boards[0].won) {
      return boards[0].score * drawn;
    }

    boards = boards.filter(board => !board.won);
  }
}

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);