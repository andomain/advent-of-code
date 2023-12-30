import { Matrix2D } from '../types/matrix';

export const transpose = <T>(matrix: Matrix2D<T>) => {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Transpose the matrix
  const transposedMatrix = [];
  for (let j = 0; j < cols; j += 1) {
    const row = [];
    for (let i = 0; i < rows; i += 1) {
      row.push(matrix[i][j]);
    }
    transposedMatrix.push(row);
  }

  // Reverse the rows
  for (let i = 0; i < cols; i += 1) {
    transposedMatrix[i].reverse();
  }

  return transposedMatrix;
};

export const rotateClockWise = <T>(grid: Matrix2D<T>) => transpose(grid);
export const rotateAntiClockwise = <T>(grid: Matrix2D<T>) => transpose(grid.reverse()).reverse();
