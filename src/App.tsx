import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './presentation/navigation/Navigation';
import {useEffect} from 'react';
import TrackPlayer from 'react-native-track-player';
import {BottomMenu} from './presentation/components/bottom-menu/BottomMenu';

export const App = () => {
  // useEffect(() => {
  //   const setupPlayer = async () => {
  //     try {
  //       await TrackPlayer.setupPlayer();
  //       console.log('todo fino señores');
  //     } catch (error) {
  //       console.log('no esta fino', error);
  //     }
  //   };
  //   setupPlayer();
  // }, []);

  return (
    <NavigationContainer>
      <Navigation />
      <BottomMenu />
    </NavigationContainer>
  );
};
