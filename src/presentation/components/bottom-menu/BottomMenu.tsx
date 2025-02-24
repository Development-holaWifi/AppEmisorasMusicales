import {Dimensions, StyleSheet, Text, View} from 'react-native';

export const BottomMenu = () => {
  return (
    <View style={styles.container}>
      <Text>bottom menu</Text>
    </View>
  );
};

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.08,
    backgroundColor: '#FF0066',
  },
});
