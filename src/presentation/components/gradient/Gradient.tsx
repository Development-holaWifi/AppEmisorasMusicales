import LinearGradient from 'react-native-linear-gradient';
import {PosterSong} from '../song/PosterSong';
import {Text, View, StyleSheet} from 'react-native';
import PruebaPlayer from '../setup-player/PruebaPlayer';

interface SongData {
  artist: string;
  song: string;
}

interface Props {
  poster: string | null;
  songData: SongData | null;
  stream?: string;
  name?: string;
  color?: string;
}

const Gradient = ({poster, songData, stream, name, color}: Props) => {
  return (
    <LinearGradient
      colors={[`${color}`, '#202020']}
      style={styles.gradient}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <Text style={{color: 'white'}}>Estas escuchando {name}</Text>
      <PosterSong poster={poster} />
      <View style={styles.songTitles}>
        <View>
          <Text style={{color: 'white'}}>{songData?.artist}</Text>
          <Text style={{color: 'white', fontSize: 15}}>{songData?.song}</Text>
        </View>
      </View>
      {stream ? <PruebaPlayer url={stream} /> : null}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-around',
  },
  songImg: {
    height: 220,
    resizeMode: 'contain',
    width: 220,
  },

  songTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
  },
});

export default Gradient;
