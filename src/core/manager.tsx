import { useCallback, useEffect, useState } from 'react';
import { Alert, AlertButton } from 'react-native';
import { AppContext } from './context';
import { cellEmpty, createBoard, gameState, insertMove } from './logic/functions';
import { findDumbMove, findSmartMove } from './logic/ai';
import { BoardPosition, TicTacToeBoard, TicTacToeCell } from './types';

export const useGameManager = () => {
  const [board, setBoard] = useState<TicTacToeBoard>(createBoard());
  const [turn, setTurn] = useState<AppContext['turn']>('X');
  const [turnCount, setTurnCount] = useState<number>(0);
  const [players, setPlayers] = useState<1 | 2>(1);
  const [boardDisabled, setBoardDisabled] = useState<boolean>(false);
  const [hardMode, setHardMode] = useState(false);

  const reset = useCallback(() => {
    Alert.alert('Select players', '', [
      { text: '1 player', onPress: () => setPlayers(1) },
      { text: '2 players', onPress: () => setPlayers(2) },
    ]);

    setBoard(createBoard());
    setTurnCount(0);
    setTurn('X');
    setBoardDisabled(false);
  }, []);

  const showResult = useCallback((board: TicTacToeBoard, moveCount: number) => {
    const result = gameState(board, moveCount);

    if (result === 'Pending') return false;

    const isDraw = result === 'Draw';
    const title = 'Game over';
    const text = isDraw ? 'Draw' : `Winner is ${turn === 'X' ? 'A' : 'B'}`;
    const btns: AlertButton[] = [
      { text: 'start new', onPress: reset, style: 'default' },
      { text: 'cancel', style: 'cancel' },
    ];

    Alert.alert(title, text, btns);
    return true;
  }, []);

  const move = useCallback(
    (position: BoardPosition, player: Exclude<TicTacToeCell, 'E'>) => {
      if (!cellEmpty(board, position)) return;

      const nextTurn = turn === 'X' ? 'O' : 'X';
      const newBoard = board.map((row) => row.slice());
      const moveCount = turnCount + 1;

      insertMove(newBoard, position, player);
      setTurnCount(moveCount);
      setTurn(nextTurn);
      setBoard(newBoard);
    },
    [board, turn],
  );

  useEffect(() => {
    if (showResult(board, turnCount)) return;

    let timeout: NodeJS.Timeout;

    if (players === 2 && turn === 'O') {
      setBoardDisabled(true);
      timeout = setTimeout(() => {
        const nextMove = hardMode ? findSmartMove(board) : findDumbMove(board);
        move(nextMove, 'O');
        setBoardDisabled(false);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [turn, board]);

  const handlers = {
    showResult,
    move,
    reset,
    setHardMode,
  };

  const data = {
    turn,
    board,
    boardDisabled,
    hardMode,
    players,
  };

  return { handlers, data };
};
