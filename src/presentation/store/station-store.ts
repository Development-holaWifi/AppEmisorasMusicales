// import axios from 'axios';
// import {create} from 'zustand';
// import {getImg} from '../components/song/UrlExists';

// interface Song {
//   artist: string;
//   title: string;
//   duration?: number; // Duración de la canción (si está disponible)
// }

// interface StationState {
//   station: {
//     listen_url: string;
//     name: string;
//   };
//   now_playing: {
//     song: Song;
//     elapsed?: number; // Tiempo transcurrido (si está disponible)
//   };
// }

// export interface StationStore {
//   station: {listen_url: string; name: string} | null;
//   songData: Song | null;
//   lastSong: string | null;
//   poster: string | null;
//   loading: boolean;
//   error: string | null;
//   fetchStation: (id: number) => Promise<void>;
//   getPoster: (id: string) => Promise<void>;
//   periodUpdate: (id: number) => () => void;
// }

// export const useStationStore = create<StationStore>()((set, get) => ({
//   station: null,
//   songData: null,
//   lastSong: null,
//   poster: null,
//   loading: true,
//   error: null,
//   elapsedTime: null,
//   fetchStation: async id => {
//     set({loading: true, error: null});
//     try {
//       const res = await axios.get<StationState>(
//         `https://stream.emisorasmusicales.net/api/nowplaying/${id}`,
//       );
//       const song = res.data.now_playing.song;
//       const {lastSong} = get();

//       if (song?.artist !== lastSong) {
//         const imgUrl = song?.artist || 'Estas escuchando Emisoras Musicales';
//         const posterUrl = await getImg(imgUrl);

//         set({
//           station: res.data.station,
//           songData: song,
//           poster: posterUrl,
//           loading: false,
//           lastSong: song.artist,
//         });

//         await get().getPoster(song.artist);
//       } else {
//         set({loading: false});
//       }
//     } catch (err) {
//       const error = err instanceof Error ? err.message : 'Error desconocido';
//       set({error: `Error al cargar la Radio: ${error}`, loading: false});
//       console.error('Error en fetchStation:', err);
//     }
//   },

//   getPoster: async artist => {
//     try {
//       const posterUrl = await getImg(artist);
//       set({poster: posterUrl});
//     } catch (error) {
//       console.error('Error en al cargar la imagen:', error);
//     }
//   },

//   periodUpdate: id => {
//     const interval = setInterval(() => {
//       get().fetchStation(id);
//       console.log('este es el interval');
//     }, 10000);
//     return () => clearInterval(interval);
//   },
// }));
