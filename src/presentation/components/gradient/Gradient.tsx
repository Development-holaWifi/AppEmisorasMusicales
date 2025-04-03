import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import PruebaPlayer from '../setup-player/PruebaPlayer'; // Ajusta la ruta

interface Props {
  stream?: string;
  name?: string;
  radioPortada?: ImageSourcePropType;
  back: ImageSourcePropType;
}

const Gradient = ({stream, name, radioPortada, back}: Props) => {
  return (
    <ImageBackground source={back} style={styles.background} resizeMode="cover">
      <View>
        <Image
          style={styles.radioPortada}
          source={
            radioPortada
              ? radioPortada
              : require('../../../assets/emisorasPortadas/activaFm.webp')
          }
        />
      </View>
      {/* <Text style={styles.text}>Estás escuchando {name || 'una emisora'}</Text> */}

      {stream && (
        <View style={styles.player}>
          <Image
            style={styles.radioImg}
            source={
              radioPortada
                ? radioPortada
                : require('../../../assets/emisorasPortadas/activaFm.webp')
            }
          />
          <PruebaPlayer url={stream} name={name} />
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Asegura que la imagen de fondo cubra toda la pantalla
    justifyContent: 'space-around', // Centra los elementos dentro del fondo
    alignItems: 'center',
    height: '100%',
  },
  text: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20, // Ajusta el margen según sea necesario
  },
  songTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
  },
  player: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioPortada: {
    width: 60,
    height: 60,
    marginTop: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  radioImg: {
    position: 'absolute',
    left: 50,
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 25,
  },
});

export default Gradient;
