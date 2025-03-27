import React from 'react';
import { FlatList, TouchableOpacity, Text } from 'react-native';
import { useAudioPlayerContext } from '../context/audio-player-context';

const Playlist = () => {
  const { 
    playlist,
    playTrack, 
    currentTrack 
  } = useAudioPlayerContext();

  return (
    <FlatList
      data={playlist}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity 
          onPress={() => playTrack(item)}
          style={{ 
            backgroundColor: item.id === currentTrack?.id ? '#ddd' : 'transparent' 
          }}
        >
          <Text>{item.title}</Text>
          <Text>{item.artist}</Text>
        </TouchableOpacity>
      )}
    />
  );
};