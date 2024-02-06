import { colors, useAppContext } from "core";
import { BoardPosition } from "core/types";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { BigCircle, BigX } from "ui";

export type CellProps = {
  style?: ViewStyle;
  position: BoardPosition;
};

export const Cell = ({ style: customStyle, position: [x, y] }: CellProps) => {
  const { turn, move, board } = useAppContext();

  const value = board[x][y];

  return (
    <Pressable
      onPress={() => move([x, y], turn)}
      style={[styles.cell, customStyle]}
    >
      {value === "X" ? (
        <BigX style={styles.iconX} width={14} />
      ) : value === "E" ? null : (
        <BigCircle style={styles.iconO} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: "25%",
    height: 100,
    backgroundColor: colors.darkBlue2,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  iconX: {
    width: 80,
    height: 80,
  },
  iconO: {
    width: 60,
    height: 60,
  },
});
