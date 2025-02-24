import {Image, StyleSheet, View} from 'react-native';
import {useRadioNowPlaying} from '../../hooks/useRadioNowPlaying';
import {getImg} from './UrlExists';
import {useEffect, useState} from 'react';

interface Props {
  poster: string | null;
}

export const PosterSong = ({poster}: Props) => {
  return (
    <View>
      <Image
        style={styles.songImg}
        source={
          poster ? {uri: poster} : require('../../../assets/em-poster.png')
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  songImg: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    borderRadius: 25,
  },
});
