import {ActivityIndicator} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import {RootStackParams} from '../../navigation/Navigation';
import {useEffect, useState} from 'react';
import {useRadioNowPlaying} from '../../hooks/useRadioNowPlaying';
import {getImg} from '../../components/song/UrlExists';
import {EmisorasCarousel} from '../../components/emisoras/EmisorasCarousel';
import {emisorasData} from '../../../api/EmisorasData';
import PruebaPlayer from '../../components/setup-player/PruebaPlayer';
import {TopMenu} from '../../components/top-menu/TopMenu';
import Gradient from '../../components/gradient/Gradient';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const DetailsScreen = ({route, navigation}: Props) => {
  const {id} = route.params;
  console.log('Emisora actual:', id); // 🔍 Debugging para ver si el ID cambia

  const {songData, station} = useRadioNowPlaying(id);
  const [stream, setStream] = useState<string>('');
  const [poster, setPoster] = useState<string | null>(null);
  const [song, setSong] = useState<{artist: string; song: string} | null>(null);
  const [loading, setLoading] = useState(true);

  const getPoster = async (artist: string | undefined) => {
    if (!artist) return;
    try {
      const posterUrl = await getImg(artist);
      setPoster(posterUrl);
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
      setPoster(null);
    }
  };

  const emisora = emisorasData.find(e => e.id === id);
  const mainColor = emisora?.color || '#CF70B1';

  // 🔥 Se reinicia todo cada vez que cambia el ID
  useEffect(() => {
    setLoading(true);
    setStream('');
    setPoster(null);
    setSong(null);

    if (station) {
      setStream(station.listen_url);
    }

    if (songData?.artist) {
      setSong({artist: songData.artist, song: songData.title});
      getImg(songData.artist)
        .then(setPoster)
        .catch(() => setPoster(null));
    }

    setLoading(false);
  }, [id, songData, station]);

  const {height: screenHeight} = useWindowDimensions();

  return (
    <ScrollView style={styles.container}>
      <TopMenu />
      <View style={{height: screenHeight * 0.6}}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#CF70B1" />
            <Text style={styles.loaderText}>Cargando...</Text>
          </View>
        ) : (
          <Gradient
            poster={poster}
            stream={stream}
            songData={song}
            name={station?.name}
            color={mainColor}
          />
        )}
      </View>
      <EmisorasCarousel />
      {stream ? <PruebaPlayer url={stream} /> : null}
    </ScrollView>
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
