import {useEffect, useState} from 'react';
import TrackPlayer from 'react-native-track-player';
import {Button, View, Alert} from 'react-native';

interface Props {
  url: string | null;
}

export const MusicPlayer: React.FC<Props> = ({url}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const setupPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer();
        console.log('Reproductor configurado correctamente');
      } catch (error) {
        console.error('Error al configurar TrackPlayer:', error);
      }
    };

    setupPlayer();
  }, []);

  const playStream = async () => {
    if (!url) {
      Alert.alert('Error', 'No hay una URL de radio disponible');
      return;
    }

    try {
      await TrackPlayer.reset(); // Reiniciar la cola
      await TrackPlayer.add({
        id: 'radio-stream',
        url, // URL de la radio en vivo
        title: 'Radio en Vivo',
        artist: 'Emisora',
        artwork: 'https://your-image-url.com/logo.png', // Opcional
      });

      await TrackPlayer.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error al reproducir el stream:', error);
    }
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View>
      <Button title="Reproducir Radio" onPress={playStream} />
      <Button
        title={isPlaying ? 'Pausar' : 'Reanudar'}
        onPress={togglePlayback}
      />
      <Button title="Detener" onPress={async () => await TrackPlayer.stop()} />
    </View>
  );
};
