import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAudioPlayerContext } from '../context/audio-player-context';
import { NextTrack } from './controlComponents/nextTrack';
import { PrevTrack } from './controlComponents/prevTrack';
import { TogglePlayPause } from './controlComponents/togglePlayPause';
import { testTracks } from '../lib/testTracks';
import { Shuffle } from './controlComponents/shuffle';
import { Repeat } from './controlComponents/repeat';

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
      <View>
        <Text>{currentTrack?.title || 'No track selected'}</Text>
          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity onPress={handleOnPlay}>
              <Text>TEST AUDIO</Text>
            </TouchableOpacity>

            <PrevTrack/>

            <TogglePlayPause/>

            <NextTrack/>

            <Shuffle/>

            <Repeat/>

        </View>
      </View>
  );
};