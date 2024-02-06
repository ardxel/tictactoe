/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Board, Header } from "components";
import { AppContextProvider, colors } from "core";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

function App(): React.JSX.Element {
  return (
    <AppContextProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={styles.wrapper.backgroundColor}
          barStyle="dark-content"
        />
        <View style={styles.wrapper}>
          <Header />
          <Board />
        </View>
      </SafeAreaView>
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.select({
      android: StatusBar.currentHeight,
      ios: 0,
    }),
  },
  wrapper: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignContent: "center",
    backgroundColor: colors.darkBlue1,
  },
});

export default App;
