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


 export const AudioPlayerControls = () => {
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
      <TouchableOpacity style={styles.nowPlaying}>
        <Text style={styles.nowPlayingText}>{currentTrack?.title || 'No track selected'}</Text>
          <View style={styles.controls}>

            <PrevTrack style={styles.controlIcon}/>

            <TogglePlayPause style={styles.controlIcon}/>

            <NextTrack style={styles.controlIcon}/>

            <Shuffle/>

            <Repeat/>

        </View>
        
        <ProgressBar/>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9D8FD',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },  
  searchBar: {
    backgroundColor: '#D6BCFA',
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 50,
    marginBottom: 24,
  },
  icon: {
    color: '#000',
    fontSize: 24,
    marginHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 8,
  },
  tabNavigation: {
    backgroundColor: '#B794F4',
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabIcon: {
    color: '#000',
    fontSize: 24,
  },
  tabLabel: {
    fontSize: 14,
    color: '#000',
  },
  thumbnails: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  thumbnail: {
    width: 100,
    height: 130,
    backgroundColor: '#CBD5E0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nowPlaying: {
    backgroundColor: '#B794F4',
    width: '100%',
    maxWidth: 400,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nowPlayingText: {
    color: '#000',
  },
  controls: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  controlIcon: {
    color: '#000',
    fontSize: 24,
  },
  button: {
    backgroundColor: '#B794F4',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  }
});