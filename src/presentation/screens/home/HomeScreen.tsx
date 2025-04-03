import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import {EmisorasCarousel} from '../../components/emisoras/EmisorasCarousel';
import {useRadioNowPlaying} from '../../hooks/useRadioNowPlaying';
import {useEffect, useState} from 'react';
import Gradient from '../../components/gradient/Gradient';
import {TopMenu} from '../../components/top-menu/TopMenu';
import {BottomMenu} from '../../components/bottom-menu/BottomMenu';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/Navigation';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

interface Props extends StackScreenProps<RootStackParams, 'Home'> {}

export const HomeScreen = ({navigation, route}: Props) => {
  const {station, loading: stationLoading} = useRadioNowPlaying(1);
  const [stream, setStream] = useState<string>('');

  useEffect(() => {
    if (station && station.listen_url !== stream) {
      setStream(station.listen_url);
    }
  }, [station?.listen_url]);

  const {height: screenHeight} = useWindowDimensions();
  const backgroundImage = require('../../../assets/backgrounds/back-activa.jpeg');

  return (
    <>
      <TopMenu />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{height: screenHeight * 0.68}}>
          {stationLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#ff0066" />
              <Text style={styles.loaderText}>Cargando...</Text>
            </View>
          ) : (
            <Gradient
              stream={stream}
              name={station?.name}
              back={backgroundImage}
            />
          )}
        </View>
        <EmisorasCarousel />
      </ScrollView>
      <BottomMenu navigation={navigation} route={route} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  loaderText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
});
