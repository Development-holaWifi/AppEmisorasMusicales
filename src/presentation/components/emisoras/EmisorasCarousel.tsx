import {FlatList, StyleSheet, Text, View} from 'react-native';
import {EmisoraPortada} from './EmisoraPortada';
import {emisorasData} from '../../../api/EmisorasData';

export const EmisorasCarousel = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>NUESTRAS EMISORAS</Text>
      <FlatList
        data={emisorasData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <EmisoraPortada image={item.image} id={item.id} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 90,
    paddingVertical: 10,
  },
  text: {
    color: 'white',
  },
});
