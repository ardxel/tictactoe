import { BoardPosition, TicTacToeBoard, TicTacToeCell, TicTacToeResult } from './types';

export const createBoard = function (): TicTacToeBoard {
  return [
    ['E', 'E', 'E'],
    ['E', 'E', 'E'],
    ['E', 'E', 'E'],
  ];
};

export const cellEmpty = function (board: TicTacToeBoard, position: BoardPosition): boolean {
  return board[position[0]][position[1]] === 'E';
};

export const insertMove = function (board: TicTacToeBoard, position: BoardPosition, player: TicTacToeCell): boolean {
  const [x, y] = position;

  if (!cellEmpty(board, position)) return false;

  board[x][y] = player;

  return true;
};

export const gameState = function (board: TicTacToeBoard, moveCount: number): TicTacToeResult {
  if (moveCount < 4) return 'Pending';

  const same = (values: TicTacToeCell[]) => values.every((v) => v === values[0]);
  const winnerByCell = (cell: TicTacToeCell): Exclude<TicTacToeResult, 'Draw'> =>
    cell === 'X' ? 'A' : cell === 'O' ? 'B' : 'Pending';

  // check every row
  for (let row1 = 0; row1 < board.length; row1++) {
    if (same(board[row1])) {
      return winnerByCell(board[row1][0]);
    }
  }

  // check every col
  for (let col1 = 0; col1 < board.length; col1++) {
    const col = [board[0][col1], board[1][col1], board[2][col1]];
    if (same(col)) return winnerByCell(col[0]);
  }

  // check 2 diagonals
  if (same([board[0][0], board[1][1], board[2][2]])) return winnerByCell(board[0][0]);
  if (same([board[0][2], board[1][1], board[2][0]])) return winnerByCell(board[0][2]);

  if (moveCount < 9) return 'Pending';

  return 'Draw';
};
