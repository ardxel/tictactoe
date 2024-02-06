import { useFonts } from "expo-font";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { BoardPosition, TicTacToeBoard, TicTacToeCell } from "./types";
import { createBoard, insertMove, cellEmpty, gameState } from "./functions";
import { Alert } from "react-native";

export type AppContext = {
  turn: "X" | "O";
  board: TicTacToeBoard;
  move: (position: BoardPosition, player: TicTacToeCell) => void;
  reset: () => void;
};

const AppContext = createContext<AppContext>({} as AppContext);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [turn, setTurn] = useState<AppContext["turn"]>("X");
  const [turnCount, setTurnCount] = useState<number>(0);
  const [board, setBoard] = useState<TicTacToeBoard>(createBoard());

  const [fontsLoaded, fontError] = useFonts({
    "Fredoka-SemiBold": require("../../assets/fonts/Fredoka-SemiBold.ttf"),
  });

  const reset = useCallback(() => {
    setBoard(createBoard());
    setTurnCount(0);
    setTurn("X");
  }, []);

  const showResult = useCallback((board: TicTacToeBoard, moveCount: number) => {
    const result = gameState(board, moveCount);

    switch (result) {
      case "Pending":
        return;
      case "Draw":
        Alert.alert("Game over", "Draw");
        break;
      case "A":
      case "B":
        Alert.alert("Game over", `Winner is: ${turn === "X" ? "A" : "B"}`, [
          { text: "start new", onPress: reset, style: "default" },
          { text: "cancel", style: "cancel" },
        ]);
        return;
    }
  }, []);

  const move = useCallback(
    (position: BoardPosition, player: TicTacToeCell) => {
      if (!cellEmpty(board, position)) return;

      setTurn((prev) => (prev === "X" ? "O" : "X"));

      const newBoard = board.map((row) => row.slice());
      const moveCount = turnCount + 1;

      setTurnCount(moveCount);
      insertMove(newBoard, position, player);
      setBoard(newBoard);
      showResult(newBoard, moveCount);
    },
    [board]
  );

  const fontsLoadComplete = fontsLoaded && !fontError;

  if (!fontsLoadComplete) return null;

  return (
    <AppContext.Provider value={{ turn, board, move, reset }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
