import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Track, usePlayerContext } from '../context/audio-player-context';
import { Asset } from 'expo-asset';

 export const AudioPlayerControls = () => {
  const {
    isPlaying,
    currentTrack,
    togglePlayPause,
    playNextTrack,
    playPreviousTrack,
    playTrack,
  } = usePlayerContext();

  const testTrack: Track = {
    id: 1,
    title: 'We Are the World',
    uri: Asset.fromModule(require('../assets/testFiles/We_Are_The_World.mp3')).uri,
    artist: 'Michael Jackson',
    thumbnail: 'https://via.placeholder.com/150',
  };

  const handleOnPlay = async () => {
    playTrack(testTrack);
  };
  

  return (
    <View>
      <Text>{currentTrack?.title || 'No track selected'}</Text>
      <View style={{ flexDirection: 'row' }}>

        <TouchableOpacity onPress={handleOnPlay}>
          <Text>TEST AUDIO</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={playPreviousTrack}>
          <Text>⏮</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={togglePlayPause}>
          <Text>{isPlaying ? '⏸' : '▶️'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={playNextTrack}>
          <Text>⏭</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};