import {StackScreenProps} from '@react-navigation/stack';
import {
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {RootStackParams} from '../../navigation/Navigation';
import {useEffect, useState} from 'react';
import {useRadioNowPlaying} from '../../hooks/useRadioNowPlaying';
import {EmisorasCarousel} from '../../components/emisoras/EmisorasCarousel';
import {emisorasData} from '../../../api/EmisorasData';
import {TopMenu} from '../../components/top-menu/TopMenu';
import Gradient from '../../components/gradient/Gradient';
import {BottomMenu} from '../../components/bottom-menu/BottomMenu';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const DetailsScreen = ({route, navigation}: Props) => {
  const {id} = route.params;
  const {station, loading: stationLoading} = useRadioNowPlaying(id); // Usamos el loading del hook
  const [stream, setStream] = useState<string>('');

  const emisora = emisorasData.find(e => e.id === id);
  const mainColor = emisora?.color || '#CF70B1';
  const radioPortada = emisora?.image;
  const radioBack = emisora?.background;

  useEffect(() => {
    if (station && station.listen_url !== stream) {
      setStream(station.listen_url);
    }
  }, [station?.listen_url]);

  const {height: screenHeight} = useWindowDimensions();

  return (
    <>
      <TopMenu />
      <ScrollView style={styles.container}>
        <View style={{height: screenHeight * 0.68}}>
          {stationLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={mainColor} />
              <Text style={styles.loaderText}>Cargando...</Text>
            </View>
          ) : (
            <Gradient
              stream={stream}
              name={station?.name}
              radioPortada={radioPortada}
              back={radioBack}
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
    flex: 1,
    backgroundColor: 'black',
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
