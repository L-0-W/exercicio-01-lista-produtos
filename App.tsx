import { StyleSheet, Text, View } from 'react-native';
import Jogos from './src/view/Jogos'
import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Provider } from 'react-native-paper';

export default function App() {
  return (
    <Provider>
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={styles.container}>
            <Jogos />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  }
})