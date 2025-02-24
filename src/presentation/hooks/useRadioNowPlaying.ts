import axios from 'axios';
import {useEffect, useState} from 'react';

interface Song {
  artist: string;
  title: string;
}

interface RadioMetaData {
  station: {
    listen_url: string;
    name: string;
  };
  now_playing: {
    song: Song;
  };
}

export const useRadioNowPlaying = (id: number) => {
  const [station, setStation] = useState<{
    listen_url: string;
    name: string;
  } | null>(null);
  const [songData, setSongData] = useState<Song | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRadioStation = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get<RadioMetaData>(
          `https://stream.emisorasmusicales.net/api/nowplaying/${id}`,
        );
        const currentSong = res.data.now_playing.song;
        const curreStation = res.data.station;
        if (
          !songData ||
          currentSong.title !== songData.title ||
          currentSong.artist !== songData.artist
        ) {
          setSongData(currentSong);
        }

        setSongData(currentSong);
        setStation(curreStation);
      } catch (err) {
        setError('Error al obtener la señal de Radio');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getRadioStation();

    const intervalId = setInterval(() => {
      getRadioStation();
    }, 15000);

    // Limpiar el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(intervalId);
    };
  }, [id]);

  return {station, songData, loading, error};
};
