import TrackPlayer, {
  Event,
  State as TrackPlayerState,
} from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    console.log('RemotePlay disparado');
    await TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemotePause, async () => {
    console.log('RemotePause disparado');
    await TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemoteStop, async () => {
    console.log('RemoteStop disparado');
    await TrackPlayer.stop();
    await TrackPlayer.destroy();
  });

  TrackPlayer.addEventListener(Event.PlaybackError, async error => {
    console.log('Error de reproducción en servicio:', error);
    await TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.PlaybackState, async state => {
    console.log('Estado de reproducción:', state);

    if (state === TrackPlayerState.Buffering) {
      console.log('📡 Conexión inestable, esperando...');
      await TrackPlayer.pause(); // Pausar en caso de micro cortes
    }

    if (state === TrackPlayerState.Playing) {
      console.log('🔄 Reanudando reproducción después de buffering');
    }
  });

  const wasPlayingBeforeDuck = false;

  TrackPlayer.addEventListener(Event.RemoteDuck, async data => {
    console.log('RemoteDuck:', data);

    if (data.paused) {
      // Guardar estado si se estaba reproduciendo antes de la llamada
      const currentState = await TrackPlayer.getState();
      wasPlayingBeforeDuck = currentState === TrackPlayerState.Playing;
      await TrackPlayer.pause();
      console.log('📞 Pausado por llamada');
    } else {
      // Solo reanudar si estaba reproduciendo antes de la llamada
      if (wasPlayingBeforeDuck) {
        await TrackPlayer.play();
        console.log('▶️ Reanudando tras la llamada');
      } else {
        console.log(
          '⏸️ No se reanuda porque estaba pausado antes de la llamada',
        );
      }
    }
  });
};
