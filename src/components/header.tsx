import { colors, useAppContext } from "core";
import { View, Text, StyleSheet } from "react-native";
import { BigX, BigCircle } from "ui";

import Icon from "react-native-vector-icons/FontAwesome";
import { Pressable } from "react-native";

export const Header = () => {
  const { turn, reset } = useAppContext();

  return (
    <View style={styles.header}>
      <View style={styles.players}>
        <BigX style={styles.playerX} width={14} />
        <BigCircle style={styles.playerO} />
      </View>
      <View style={[styles.turnTitle, styles.shadowBlue]}>
        {turn === "X" ? (
          <BigX color={colors.lightGray} />
        ) : (
          <BigCircle style={{ width: 25 }} />
        )}
        <Text style={styles.turnTitleText}>Turn</Text>
      </View>
      <Pressable onPress={reset} style={[styles.againBtn, styles.shadowGray]}>
        <Icon name="repeat" size={30} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  players: {
    flexDirection: "row",
    alignItems: "center",
  },
  playerX: {
    width: 60,
    height: 60,
  },
  playerO: {
    width: 50,
    height: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 10,
  },
  turnTitle: {
    width: 120,
    backgroundColor: colors.darkBlue2,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  turnTitleText: {
    color: colors.lightGray,
    fontSize: 30,
    fontFamily: "Fredoka-SemiBold",
  },
  shadowBlue: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  againBtn: {
    backgroundColor: colors.lightGray,
    padding: 6,
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  shadowGray: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
