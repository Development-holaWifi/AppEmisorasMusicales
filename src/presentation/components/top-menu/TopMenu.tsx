import React, {useEffect, useRef} from 'react';
import {Image, StyleSheet, View, Animated} from 'react-native';

export const TopMenu = () => {
  const borderWidthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseBorder = () => {
      const toValue = Math.random() * 8; // ancho de borde entre 0 y 4
      const duration = 200 + Math.random() * 600; // duración entre 200ms y 800ms
      const delay = Math.random() * 1000; // pausa entre pulsos hasta 1s

      Animated.sequence([
        Animated.timing(borderWidthAnim, {
          toValue,
          duration,
          useNativeDriver: false,
        }),
        Animated.timing(borderWidthAnim, {
          toValue: 1,
          duration: duration * 0.8,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setTimeout(pulseBorder, delay); // espera antes de volver a animar
      });
    };

    pulseBorder();
  }, [borderWidthAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, {borderWidth: borderWidthAnim}]}>
        <Image
          source={require('../../../assets/em-poster.png')}
          style={styles.imageStyle}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 30,
    backgroundColor: '#FF0066',
  },
  circle: {
    position: 'absolute',
    zIndex: 10,
    top: 5,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#cc0052',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
