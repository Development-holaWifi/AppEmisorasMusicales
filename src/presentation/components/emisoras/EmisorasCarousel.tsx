import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
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
            onPress={() => navigation.navigate('Details', {id: item.id})}>
            <EmisoraPortada image={item.image} id={item.id} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 60,
    paddingVertical: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
