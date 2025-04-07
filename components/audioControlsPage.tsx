import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAudioPlayerContext } from '../context/audio-player-context';
import { NextTrack } from './controlComponents/nextTrack';
import { PrevTrack } from './controlComponents/prevTrack';
import { TogglePlayPause } from './controlComponents/togglePlayPause';
import { testTracks } from '../lib/testTracks';
import { Shuffle } from './controlComponents/shuffle';
import { Repeat } from './controlComponents/repeat';
import { ProgressBar } from './controlComponents/progressBar';


 export const AudioPlayerControlsPage = () => {
  const {
      currentTrack,
      playTrack,
  } = useAudioPlayerContext();

  // Hard coded Testing code
  const handleOnPlay = async () => {
      playTrack(testTracks[0]);
  };
  // End testing code

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>        
          <View style={styles.controls}>
            <Shuffle/>
            <PrevTrack/>
            <TogglePlayPause/>
            <NextTrack/>           
            <Repeat/>
        </View>
      </View>       
      <ProgressBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#B794F4',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15, // React Native 0.71+ — otherwise use marginRight
  },
});