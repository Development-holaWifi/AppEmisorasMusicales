import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {EmisoraPortada} from './EmisoraPortada';
import {emisorasData} from '../../../api/EmisorasData';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/Navigation';

export const EmisorasCarousel = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>NUESTRAS EMISORAS</Text>
      <FlatList
        data={emisorasData}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              if (item.id === 1) {
                navigation.navigate('Home');
              } else {
                navigation.navigate('Details', {id: item.id});
              }
            }}>
            <EmisoraPortada image={item.image} id={item.id} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginBottom: height * 0.07,
    paddingHorizontal: 8,
  },
  text: {
    color: '#c4bdbd',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 15,
    marginLeft: 7,
  },
});
