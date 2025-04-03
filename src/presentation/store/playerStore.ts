// import {create} from 'zustand';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import TrackPlayer, {Track, State} from 'react-native-track-player';

// interface PlayerState {
//   isManualPause: boolean;
//   lastPauseTime: number | null;
//   currentId: string | null;
//   currentUrl: string | null;
//   currentName: string | null;
//   setManualPause: (value: boolean) => Promise<void>;
//   setCurrentTrack: (id: string, url: string, name: string) => void;
//   playTrack: (id: string, url: string, name: string) => Promise<void>;
//   pauseTrack: () => Promise<void>;
//   resumeOrRestart: () => Promise<void>;
// }

// const usePlayerStore = create<PlayerState>((set, get) => ({
//   isManualPause: false,
//   lastPauseTime: null,
//   currentId: null,
//   currentUrl: null,
//   currentName: null,

//   setManualPause: async (value: boolean) => {
//     set({isManualPause: value});
//     if (value) {
//       const pauseTime = Date.now();
//       set({lastPauseTime: pauseTime});
//       await AsyncStorage.setItem('lastPauseTime', pauseTime.toString());
//       await AsyncStorage.setItem('isManualPause', 'true');
//     } else {
//       set({lastPauseTime: null});
//       await AsyncStorage.setItem('lastPauseTime', '0');
//       await AsyncStorage.setItem('isManualPause', 'false');
//     }
//   },

//   setCurrentTrack: (id: string, url: string, name: string) =>
//     set({currentId: id, currentUrl: url, currentName: name}),

//   playTrack: async (id: string, url: string, name: string) => {
//     const {currentId} = get();

//     if (id !== currentId) {
//       // 👈 Solo cambia si el ID es diferente
//       console.log('Cambio de emisora:', id);
//       await TrackPlayer.reset();
//       const track: Track = {
//         id, // 👈 Usamos el ID de la emisora
//         url,
//         title: 'Emisoras Musicales',
//         artist: name,
//       };
//       await TrackPlayer.add([track]); // 👈 En v4.1 `add()` recibe un array
//       set({currentId: id, currentUrl: url, currentName: name});
//     }
//     await TrackPlayer.play();
//     set({isManualPause: false, lastPauseTime: null});
//     await AsyncStorage.setItem('isManualPause', 'false');
//     await AsyncStorage.setItem('lastPauseTime', '0');
//   },

//   pauseTrack: async () => {
//     await TrackPlayer.pause();
//     const pauseTime = Date.now();
//     set({isManualPause: true, lastPauseTime: pauseTime});
//     await AsyncStorage.setItem('isManualPause', 'true');
//     await AsyncStorage.setItem('lastPauseTime', pauseTime.toString());
//   },

//   resumeOrRestart: async () => {
//     const {lastPauseTime, currentId, currentUrl, currentName} = get();
//     const timePaused = lastPauseTime ? Date.now() - lastPauseTime : 0;

//     if (!currentId || !currentUrl || !currentName) {
//       console.log('No hay emisora actual, cargando última emisora guardada...');

//       // Intentar recuperar la última emisora de AsyncStorage
//       const savedId = await AsyncStorage.getItem('lastEmisoraId');
//       const savedUrl = await AsyncStorage.getItem('lastEmisoraUrl');
//       const savedName = await AsyncStorage.getItem('lastEmisoraName');

//       if (savedId && savedUrl && savedName) {
//         console.log(`Cargando última emisora: ${savedName}`);
//         await get().playTrack(savedId, savedUrl, savedName);
//       } else {
//         console.log('No hay datos de la última emisora guardados.');
//         return;
//       }
//     }

//     if (timePaused >= 60000) {
//       console.log('Reinicio: pausado más de 1 minuto');
//       await TrackPlayer.reset();
//       const track: Track = {
//         id: currentId!,
//         url: currentUrl!,
//         title: 'Emisoras Musicales',
//         artist: currentName!,
//       };
//       await TrackPlayer.add([track]);
//     } else {
//       console.log('Reanudando pista existente');
//     }

//     await TrackPlayer.play();
//     set({isManualPause: false, lastPauseTime: null});
//     await AsyncStorage.setItem('isManualPause', 'false');
//     await AsyncStorage.setItem('lastPauseTime', '0');
//   },
// }));

// export default usePlayerStore;
