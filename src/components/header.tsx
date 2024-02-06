import { colors, useAppContext } from 'core';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BigCircle, BigX } from 'ui';

import FontAwesome from '@expo/vector-icons/FontAwesome';

export const Header = () => {
  const { turn, reset } = useAppContext();

  return (
    <View style={styles.header}>
      <View style={styles.players}>
        <BigX style={styles.playerX} width={10} />
        <BigCircle style={styles.playerO} />
      </View>
      <View style={[styles.turnTitle, styles.shadowBlue]}>
        {turn === 'X' ? <BigX /> : <BigCircle style={{ width: 25 }} />}
        <Text style={styles.turnTitleText}>Turn</Text>
      </View>
      <Pressable onPress={reset} style={[styles.againBtn, styles.shadowGray]}>
        <FontAwesome name="repeat" size={30} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 10,
    position: 'relative',
    width: '100%',
  },
  players: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 10,
    top: 0,
  },
  playerX: {
    width: 40,
    height: 40,
  },
  playerO: {
    width: 30,
    height: 30,
  },

  turnTitle: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -50,
    minWidth: 120,
    width: 130,
    maxWidth: 150,
    backgroundColor: colors.darkBlue2,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  turnTitleText: {
    color: colors.lightGray,
    fontSize: 30,
    fontFamily: 'Fredoka-SemiBold',
  },
  shadowBlue: {
    ...Platform.select({
      ios: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  againBtn: {
    backgroundColor: colors.lightGray,
    padding: 6,
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    marginRight: 10,
  },
  shadowGray: {
    ...Platform.select({
      ios: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
  },
});
