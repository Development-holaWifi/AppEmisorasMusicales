import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import TrackPlayer, {usePlaybackState, State} from 'react-native-track-player';
import Icon from '@react-native-vector-icons/ionicons';

interface PruebaPlayerProps {
  url: string;
}

export const PruebaPlayer: React.FC<PruebaPlayerProps> = ({url}) => {
  const playbackState = usePlaybackState(); // Hook para obtener el estado de reproducción
  const [initialized, setInitialized] = useState(false);

  // Configurar el reproductor solo una vez al montar el componente
  useEffect(() => {
    const setupPlayer = async () => {
      try {
        // Obtener el estado de reproducción
        const playbackState = await TrackPlayer.getPlaybackState();

        // Comparamos playbackState.state con State.None
        if (!playbackState.state) {
          // Si el estado es "None", significa que el reproductor no está inicializado
          await TrackPlayer.setupPlayer(); // Inicializamos el reproductor
          setInitialized(true); // Marcamos como inicializado
        } else {
          setInitialized(true); // Si ya está en estado válido (Playing, Paused), lo marcamos como inicializado
        }
      } catch (error) {
        console.error('Error initializing track player:', error);
      }
    };

    setupPlayer();

    // Limpiar al desmontar el componente
    return () => {
      TrackPlayer.reset(); // Reseteamos el reproductor cuando el componente se desmonte
    };
  }, []); // Esta lógica solo se ejecuta una vez, cuando se monta el componente

  // Manejo del cambio de URL de la estación
  useEffect(() => {
    const handleURLChange = async () => {
      if (!initialized) return; // Si el reproductor no está inicializado, no hacemos nada

      // Resetear reproductor cuando cambie la URL
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: 'radio-stream',
        url: url,
        title: 'Mi Radio',
        artist: 'Live Stream',
        artwork: 'https://example.com/logo.png',
      });

      // Pausar siempre que se cambie la emisora
      await TrackPlayer.pause();
    };

    handleURLChange();
  }, [url, initialized]); // Solo se ejecuta cuando cambia la URL y el reproductor está inicializado

  // Función para reproducir o pausar la radio
  const playPauseRadio = async () => {
    if (!initialized) return; // No hacer nada si el reproductor no está inicializado

    const activeTrack = await TrackPlayer.getActiveTrack();
    if (!activeTrack) {
      // Si no hay track activo, lo agregamos
      await TrackPlayer.add({
        id: 'radio-stream',
        url: url,
        title: 'Mi Radio',
        artist: 'Live Stream',
        artwork: 'https://example.com/logo.png',
      });
    }

    // Verificamos el estado de reproducción y pausamos o reproducimos
    if (playbackState?.state === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={playPauseRadio}>
        <Icon
          name={
            playbackState?.state === State.Playing
              ? 'pause-outline'
              : 'play-outline'
          }
          size={80}
          color="white"
        />
      </TouchableOpacity>
      {/* <Text>
        <Icon name="radio-outline" color="white" size={40} />
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});

export default PruebaPlayer;
