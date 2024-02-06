import { colors } from 'core';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type BigXProps = {
  style?: StyleProp<ViewStyle>;
  width?: ViewStyle['width'];
  color?: string;
};

export const BigX = ({ style: customStyle, width, color }: BigXProps) => {
  return (
    <View style={[styles.container, customStyle]}>
      <View
        style={[
          { width: width || 8 },
          styles.line,
          styles.topLine,
          {
            backgroundColor: color || styles.line.backgroundColor,
          },
        ]}
      />
      <View
        style={[
          { width: width || 8 },
          styles.line,
          styles.bottomLine,
          {
            backgroundColor: color || styles.line.backgroundColor,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    position: 'relative',
  },
  line: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: colors.lightBlue,
    position: 'absolute',
    alignSelf: 'center',
  },
  topLine: {
    transform: [{ rotate: '45deg' }],
  },
  bottomLine: {
    transform: [{ rotate: '135deg' }],
  },
});
