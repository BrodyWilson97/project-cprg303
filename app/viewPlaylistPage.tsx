import React from 'react';
import { FlatList, TouchableOpacity, Text, View } from 'react-native';
import { useAudioPlayerContext } from '../context/audio-player-context';

export const ViewPlaylist = () => {
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
                      backgroundColor: item.id === currentTrack?.id ? '#B794F4' : 'transparent' 
                  }}
              >
                  <Text>{item.title}</Text>
                  <Text>{item.artist}</Text>
              </TouchableOpacity>
          )}        
          ListEmptyComponent={<Text>No songs in playlist</Text>}
                // ** Optional extra FlatList features **
          // ItemSeparatorComponent={() => <View style={styles.separator} />} // Divider between items
          // onEndReached={loadMoreSongs} // Infinite loading
          // refreshControl={/* Pull-to-refresh */}
      />
  );
};