import { colors } from 'core';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

export type BigCircleProps = {
  style?: ViewStyle;
};

export const BigCircle = ({ style: customStyle }: BigCircleProps) => {
  const parentSize = (customStyle?.width as number) || 50;
  const innerSize = parentSize / 2 - 1;

  return (
    <View style={[styles.container, customStyle]}>
      <View style={[styles.innerCircle, { width: innerSize, height: innerSize }]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 40,
    backgroundColor: colors.darkBlue1,
  },
});
