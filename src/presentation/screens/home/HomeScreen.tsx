import {ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native';
import {EmisorasCarousel} from '../../components/emisoras/EmisorasCarousel';
import {useRadioNowPlaying} from '../../hooks/useRadioNowPlaying';
import {useEffect, useState} from 'react';
import {getImg} from '../../components/song/UrlExists';
import Gradient from '../../components/gradient/Gradient';
import {TopMenu} from '../../components/top-menu/TopMenu';
import {BottomMenu} from '../../components/bottom-menu/BottomMenu';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/Navigation';

interface Props extends StackScreenProps<RootStackParams, 'Home'> {}

export const HomeScreen = ({navigation, route}: Props) => {
  const {songData, station} = useRadioNowPlaying(1);

  const [stream, setStream] = useState<string>('');
  const [poster, setPoster] = useState<string | null>(null);
  const [song, setSong] = useState<{artist: string; song: string} | null>(null);

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
  }, [station?.listen_url]);

  const {height: screenHeight} = useWindowDimensions();

  return (
    <>
      <TopMenu />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{height: screenHeight * 0.68}}>
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
      <BottomMenu navigation={navigation} route={route} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});
