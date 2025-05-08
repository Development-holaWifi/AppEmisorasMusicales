import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoriteState {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id: number) => {
        const isFav = get().favorites.includes(id);
        const updated = isFav
          ? get().favorites.filter(favId => favId !== id)
          : [...get().favorites, id];
        set({favorites: updated});
      },
      isFavorite: (id: number) => get().favorites.includes(id),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
