import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {PosterSong} from '../../components/song/PosterSong';
import {EmisorasCarousel} from '../../components/emisoras/EmisorasCarousel';
import {useRadioNowPlaying} from '../../hooks/useRadioNowPlaying';
import {useEffect, useState} from 'react';
import {getImg} from '../../components/song/UrlExists';
import PruebaPlayer from '../../components/setup-player/PruebaPlayer';
import TrackPlayer from 'react-native-track-player';
import {TopMenu} from '../../components/top-menu/TopMenu';
import {BottomMenu} from '../../components/bottom-menu/BottomMenu';
import Icon from '@react-native-vector-icons/ionicons';
import Gradient from '../../components/gradient/Gradient';
// import {MusicPlayer} from '../../components/setup-player/MusicPlayer';

export const HomeScreen = () => {
  const {songData, station} = useRadioNowPlaying(1);

  const [stream, setStream] = useState<string>('');
  const [poster, setPoster] = useState<string | null>(null);
  const [song, setSong] = useState<{artist: string; song: string} | null>(null);

  const getPoster = async (artist: string | undefined) => {
    if (!artist) return;
    try {
      const posterUrl = await getImg(artist); // Obtener la imagen del artista
      setPoster(posterUrl); // Establecer la portada
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
      setPoster(null); // En caso de error, establecer como null
    }
  };

  useEffect(() => {
    if (songData?.artist) {
      getPoster(songData?.artist);
      setSong({artist: songData.artist, song: songData.title});
    }
  }, [songData]);

  useEffect(() => {
    if (station) {
      setStream(station.listen_url);
    }
    console.log(stream);
  }, [station?.listen_url]);

  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
    };
    setupPlayer();
  }, []);
  const {height: screenHeight} = useWindowDimensions();

  return (
    <ScrollView style={styles.container}>
      <TopMenu />
      <View style={{height: screenHeight * 0.6}}>
        <Gradient
          poster={poster}
          stream={stream}
          songData={song}
          name={station?.name}
          color="#ff0066"
        />
      </View>
      <EmisorasCarousel />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});
