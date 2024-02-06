import { TicTacToeBoard, BoardPosition, TicTacToeCell } from 'core/types';

export const findDumbMove = function (board: TicTacToeBoard): BoardPosition {
  const emptyCells = <BoardPosition[]>[];

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      if (board[row][col] === 'E') emptyCells.push([row, col]);
    }
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
};

export const findSmartMove = function (board: TicTacToeBoard): BoardPosition {
  const player = 'O';
  const opponent = 'X';

  function evaluate(board: TicTacToeBoard): number {
    if (isWinner(board, player)) {
      return 10;
    }
    if (isWinner(board, opponent)) {
      return -10;
    }
    if (isBoardFull(board)) {
      return 0;
    }
    return 1;
  }

  function isWinner(board: TicTacToeBoard, player: Exclude<TicTacToeCell, 'E'>) {
    for (let i = 0; i < 3; i++) {
      if (
        (board[i][0] === player && board[i][1] === player && board[i][2] === player) ||
        (board[0][i] === player && board[1][i] === player && board[2][i] === player) ||
        (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
        (board[0][2] === player && board[1][1] === player && board[2][0] === player)
      ) {
        return true;
      }
    }
    return false;
  }

  function isBoardFull(board: TicTacToeBoard): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === 'E') {
          return false;
        }
      }
    }
    return true;
  }

  function minimax(board: TicTacToeBoard, depth: number, isMax: boolean) {
    const score: number = evaluate(board);

    if (score !== 1) {
      return score;
    }

    if (isMax) {
      let best = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === 'E') {
            board[i][j] = player;
            best = Math.max(best, minimax(board, depth + 1, !isMax));
            board[i][j] = 'E';
          }
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === 'E') {
            board[i][j] = opponent;
            best = Math.min(best, minimax(board, depth + 1, !isMax));
            board[i][j] = 'E';
          }
        }
      }
      return best;
    }
  }

  let bestVal = -Infinity;
  let bestMove = [-1, -1] as BoardPosition;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === 'E') {
        board[i][j] = player;
        const moveVal = minimax(board, 0, false);
        board[i][j] = 'E';

        if (moveVal > bestVal) {
          bestMove = [i, j];
          bestVal = moveVal;
        }
      }
    }
  }

  return bestMove;
};
