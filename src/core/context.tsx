import * as SplashScreen from 'expo-splash-screen';
import { PropsWithChildren, createContext, useContext } from 'react';
import { useGameManager } from './manager';
import { BoardPosition, TicTacToeBoard, TicTacToeCell } from './types';

SplashScreen.preventAutoHideAsync();

export type AppContext = {
  turn: 'X' | 'O';
  board: TicTacToeBoard;
  move: (position: BoardPosition, player: Exclude<TicTacToeCell, 'E'>) => void;
  reset: () => void;
  boardDisabled: boolean;
  hardMode: boolean;
  setHardMode: (value: boolean) => void;
  players: 1 | 2;
};

const AppContext = createContext<AppContext>({} as AppContext);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const { handlers, data } = useGameManager();

  return <AppContext.Provider value={{ ...handlers, ...data }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
