/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Board, HardMode, Header } from 'components';
import { AppContextProvider, colors } from 'core';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View, Text } from 'react-native';

function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Fredoka-SemiBold': require('../assets/fonts/Fredoka-SemiBold.ttf'),
    'Fredoka-Regular': require('../assets/fonts/Fredoka-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded || fontError) return null;

  return (
    <AppContextProvider>
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar backgroundColor={styles.wrapper.backgroundColor} barStyle="dark-content" />
        <View style={styles.wrapper}>
          <Header />
          <Board />
          <HardMode />
        </View>
      </SafeAreaView>
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.select({
      ios: 0,
      android: 0,
    }),
  },
  wrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignContent: 'center',
    backgroundColor: colors.darkBlue1,
  },
});

export default App;
