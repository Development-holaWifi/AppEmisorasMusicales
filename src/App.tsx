import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './presentation/navigation/Navigation';
import {BottomMenu} from './presentation/components/bottom-menu/BottomMenu';
import {useEffect} from 'react';
import TrackPlayer from 'react-native-track-player';

export const App = () => {
  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
    };
    setupPlayer();
  }, []);
  return (
    <NavigationContainer>
      <Navigation />
      <BottomMenu />
    </NavigationContainer>
  );
};
