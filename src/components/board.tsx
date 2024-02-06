import { useAppContext } from 'core';
import { StyleSheet, View } from 'react-native';
import { Cell } from './cell';

export const Board = () => {
  const { board } = useAppContext();

  return (
    <View style={styles.grid}>
      {board.map((row, i) => {
        return (
          <View style={styles.row} key={i}>
            {row.map((_, j) => {
              return <Cell position={[i, j]} key={j} />;
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    width: '100%',
    marginTop: 35,
  },
  row: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
