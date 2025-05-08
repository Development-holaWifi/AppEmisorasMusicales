import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import {EmisoraPortada} from '../emisoras/EmisoraPortada';
import {emisorasData} from '../../../api/EmisorasData';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/Navigation';
import {HomePortadas} from '../home-portadas/HomePortadas';

export const Carousel = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const {width} = Dimensions.get('window');
  const NUM_COLUMNS = 3;
  const CARD_MARGIN = 10;
  const cardWidth = (width - CARD_MARGIN * 2 * NUM_COLUMNS) / NUM_COLUMNS;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>¿QUE EMISORA TE APETECE ESCUCHAR?</Text>
      <FlatList
        data={emisorasData}
        keyExtractor={item => item.id.toString()}
        numColumns={NUM_COLUMNS}
        columnWrapperStyle={styles.row}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              if (item.id === 1) {
                navigation.navigate('Home');
              } else {
                navigation.navigate('Details', {id: item.id});
              }
            }}
            style={styles.card}>
            <HomePortadas image={item.image} id={item.id} width={cardWidth} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    width: '100%',
  },

  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 40,
    textAlign: 'center',
  },
  row: {
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'black',
    padding: 7,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
