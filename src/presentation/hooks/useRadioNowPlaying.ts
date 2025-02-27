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
    const controller = new AbortController();
    let isFetching = false;

    const getRadioStation = async () => {
      if (isFetching) return;
      isFetching = true;
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get<RadioMetaData>(
          `https://stream.emisorasmusicales.net/api/nowplaying/${id}`,
          {signal: controller.signal},
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
        if (
          !station ||
          curreStation.listen_url !== station.listen_url ||
          curreStation.name !== station.name
        ) {
          setStation(curreStation);
        }
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError('Error al obtener la señal de Radio');
        console.log(err);
      } finally {
        setLoading(false);
        isFetching = false;
      }
    };

    getRadioStation();

    const intervalId = setInterval(() => {
      getRadioStation();
    }, 30000);

    return () => {
      clearInterval(intervalId);
      controller.abort();
    };
  }, [id]);

  return {station, songData, loading, error};
};
