import { colors, useAppContext } from 'core';
import { StyleSheet, Switch, Text, View } from 'react-native';

export const HardMode = () => {
  const { setHardMode, hardMode, players } = useAppContext();

  if (players === 1) return null;

  return (
    <View style={s.container}>
      <Text style={s.title}>Hard mode</Text>
      <Switch
        trackColor={{ false: colors.lightGray, true: colors.darkBlue2 }}
        thumbColor={hardMode ? 'yellow' : colors.darkBlue2}
        value={hardMode}
        onValueChange={setHardMode}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    width: '40%',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontFamily: 'Fredoka-Regular',
    color: colors.lightGray,
    fontSize: 22,
  },
});
