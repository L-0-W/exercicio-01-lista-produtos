import { StyleSheet, Text, View } from 'react-native';
import Jogos from './src/view/Jogos'

export default function App() {
  return (
    <View style={styles.container}>
      <Jogos />
    </View>
  );
}

const styles = StyleSheet.create({
});
