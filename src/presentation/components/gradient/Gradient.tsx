import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ImageSourcePropType,
  Animated,
} from 'react-native';
import PruebaPlayer from '../setup-player/PruebaPlayer'; // Ajusta la ruta
import Icon from '@react-native-vector-icons/ionicons';

interface Props {
  stream?: string;
  name?: string;
  radioPortada?: ImageSourcePropType;
  back: ImageSourcePropType;
}

const Gradient = ({stream, name, radioPortada, back}: Props) => {
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

  return (
    <ImageBackground source={back} style={styles.background} resizeMode="cover">
      <View></View>

      {stream && (
        <View style={styles.player}>
          <Animated.View style={[styles.iconContainer, {opacity: fadeAnim}]}>
            <Icon name={'radio-outline'} size={30} color="white" />
          </Animated.View>

          <View style={styles.playerContainer}>
            <PruebaPlayer url={stream} name={name} />
          </View>

          <View style={styles.iconContainer}>
            <Icon name="heart-outline" size={30} color="white" />
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

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
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 200,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  playerContainer: {
    flex: 2,
    alignItems: 'center',
  },
  radioPortada: {
    width: 60,
    height: 60,
    marginTop: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});

export default Gradient;
