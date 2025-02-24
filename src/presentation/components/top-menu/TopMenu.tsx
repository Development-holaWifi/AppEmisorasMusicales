import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

export const TopMenu = () => {
  return (
    <View style={styles.container}>
      <Text>TopMenu</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#FF0066',
  },
});
