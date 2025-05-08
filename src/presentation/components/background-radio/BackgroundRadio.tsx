import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  useWindowDimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import {useFavoritesStore} from '../../store/useFavoriteStore';
import PruebaPlayer from '../setup-player/PruebaPlayer';

interface Props {
  stream?: string;
  name?: string;
  radioPortada?: any;
  back: any;
  id: number;
}

const BackgroundRadioComponent = ({stream, name, id, back}: Props) => {
  const {width} = useWindowDimensions();
  const favorites = useFavoritesStore(state => state.favorites);
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);
  const isFavorite = favorites.includes(id);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (stream) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.2, // Opacidad mínima
            duration: 500, // Medio segundo
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1, // Opacidad máxima
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [stream]);

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '100%',
    },
    player: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: width * 0.7,
    },
    iconContainer: {
      alignItems: 'center',
    },
    playerContainer: {
      flex: 0.6,
      alignItems: 'center',
    },
  });

  return (
    <ImageBackground source={back} style={styles.background} resizeMode="cover">
      <View style={styles.player}>
        <Animated.View style={[styles.iconContainer, {opacity: fadeAnim}]}>
          <Icon name={'radio-outline'} size={30} color="white" />
        </Animated.View>

        <View style={styles.playerContainer}>
          <PruebaPlayer url={stream || ''} name={name} />
        </View>

        <TouchableOpacity
          onPress={() => {
            toggleFavorite(id);
          }}
          style={styles.iconContainer}>
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export const BackgroundRadio = React.memo(BackgroundRadioComponent);
