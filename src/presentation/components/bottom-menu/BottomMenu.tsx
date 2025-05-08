import {Dimensions, Pressable, StyleSheet, Animated, View} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/Navigation';
import {useDetailsStore} from '../../store/useDetailsStore';

interface Props {
  navigation: NavigationProp<RootStackParams>;
  route?: any;
}

export const BottomMenu = ({navigation, route}: Props) => {
  const lastId = useDetailsStore(state => state.lastId);

  return (
    <View style={styles.container}>
      {/* <Pressable
        style={styles.pressable}
        onPress={() => {
          if (lastId !== null) {
            navigation.navigate('Details', {id: lastId});
          } else {
            navigation.navigate('Home');
          }
        }}>
        <Icon
          name={
            route.name === 'Home' || route.name === 'Details'
              ? 'home-sharp'
              : 'home-outline'
          }
          size={25}
          color="white"
        />
      </Pressable> */}

      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate('Home')}>
        <Icon
          name={route.name === 'Home' ? 'home-sharp' : 'home-outline'}
          size={25}
          color="white"
        />
      </Pressable>

      {/* <Pressable
        style={[
          styles.pressable,
          lastId === null && {opacity: 0.3}, // desactiva visualmente
        ]}
        disabled={lastId === null}
        onPress={() => {
          if (lastId !== null) {
            navigation.navigate('Details', {id: lastId});
          }
        }}>
        <Icon
          name={route.name === 'Details' ? 'radio-sharp' : 'radio-outline'}
          size={25}
          color="white"
        />
      </Pressable> */}

      {lastId !== null && (
        <Pressable
          style={styles.pressable}
          onPress={() => navigation.navigate('Details', {id: lastId})}>
          <Icon
            name={
              route.name === 'Details' || route.name === 'Details'
                ? 'radio-sharp'
                : 'radio-outline'
            }
            size={25}
            color="white"
          />
        </Pressable>
      )}

      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate('Search')}>
        <Icon
          name={route.name === 'Search' ? 'search-sharp' : 'search-outline'}
          size={25}
          color="white"
        />
      </Pressable>
      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate('Favorites')}>
        <Icon
          name={route.name === 'Favorites' ? 'heart-sharp' : 'heart-outline'}
          size={25}
          color="white"
        />
      </Pressable>
    </View>
  );
};

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: height * 0.05,
    backgroundColor: '#FF0066',
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: '100%',
  },
});
