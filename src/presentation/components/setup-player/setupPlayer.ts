import TrackPlayer from 'react-native-track-player';

export async function setupPlayer() {
  try {
    await TrackPlayer.setupPlayer();
  } catch (error) {
    console.log('Error en track player', error);
  }
}
