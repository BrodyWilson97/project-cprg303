import React from 'react';
import { FlatList, TouchableOpacity, Text, View, Alert, Image, ScrollView, StyleSheet } from 'react-native';
import { Track, useAudioPlayerContext } from '../context/audio-player-context';
import { getFileURL, deleteFile, } from "../lib/supabase_crud";
import { useRouter, useLocalSearchParams } from 'expo-router';

interface PlaylistProps {
    fetchSongs?: (userId: string) => void; // Function parameter as a prop
    userId: string; 
  }
  
  export const Playlist: React.FC<PlaylistProps> = ({ fetchSongs, userId }) => {
    const { 
        playlist,
        playTrack, 
        setCurrentTrack, //sets current track state in audioplayer context 
    } = useAudioPlayerContext();
    
    const router = useRouter();

    const clickSong = async (item: Track) => {
        const url = await getFileURL("musicfiles", userId, item.id.toString(), 10000, "audio"); //fetch the file URL from supabase
        item.uri = url; //set the uri of the track to the file URL
        setCurrentTrack(item); //set current track state in audioplayer context

        playTrack(item); //play the track
        //go to playback page
        router.push({ pathname: '/playbackPage' });
    }

    const deleteSong = async (userId: string, songId: string)=> {
        await deleteFile(userId, songId);
        if (!fetchSongs) return;

        fetchSongs(userId); // Refresh the song list after deletion
    }
    
    const handleDelete = async (userId: string, songId: string) => {

        Alert.alert("Delete song", "Are you sure you want to delete this song?", [
            {
            text: "Cancel",
            style: "cancel",
            },
            {
            text: "OK",
            onPress: () => deleteSong(userId, songId),
            },
        ]);

        await deleteFile(userId, songId);
        if (!fetchSongs) return;

        fetchSongs(userId); // Refresh the song list after deletion
    };

  return (
      <ScrollView style={styles.songList}>
            {playlist.map((song, index) => (
              <TouchableOpacity key={index} style={styles.songItem} onPress={() => clickSong(song)}>
              <Image
                source={{
                  uri: song.thumbnail,}}
                style={{ width: 50, height: 50 }}
              />
                <View style={{ width: "65%" }}>
                  <Text style={styles.songTitle}>{song.title}</Text>
                  <Text style={styles.songArtist}>{song.artist}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDelete(userId, song.id.toString())}>
                  <Text style={{ fontSize: 20 }}>...</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
        </ScrollView>

    //   <FlatList
    //     style={styles.songList}
    //       data={playlist}
    //       keyExtractor={(item) => item.id.toString()}
    //       renderItem={({ item }) => (
    //           <TouchableOpacity 
    //               onPress={() => clickSong(item)}
    //               style={{ 
    //                   backgroundColor: item.id === currentTrack?.id ? '#B794F4' : 'transparent' 
    //               }}
    //           >
    //               <Text>{item.title}</Text>
    //               <Text>{item.artist}</Text>
    //           </TouchableOpacity>
    //       )}        
          //ListEmptyComponent={<Text>No songs in playlist</Text>}
                // ** Optional extra FlatList features **
          // ItemSeparatorComponent={() => <View style={styles.separator} />} // Divider between items
          // onEndReached={loadMoreSongs} // Infinite loading
          // refreshControl={/* Pull-to-refresh */}
  );
};

const styles = StyleSheet.create({
    songList: {
        width: '100%',
        //maxWidth: 400,
      },
      songItem: {
        backgroundColor: '#D6BCFA',
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        flexDirection: "row",
        flex: 1,
        columnGap: 20,
      },
      songTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        paddingBottom: 4,
      },
      songArtist: {
        fontSize: 14,
        color: '#4A5568',
      },
    }
);