import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { AudioPlayerProvider } from "../context/audio-player-context";
import { AudioPlayerControls } from "../components/audioControls";
import { Playlist } from "../components/playList";
import { useAudioPlayerContext } from '../context/audio-player-context';
import { song } from '../constants/types';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getPlaylistSongs, getFileURL } from "../lib/supabase_crud";
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function ViewPlaylistPage(){
    const { 
        setPlaylist, //sets playlist state in audioplayer context
        playlist,
        setCurrentTrack //sets current track state in audioplayer context
    } = useAudioPlayerContext();

    //fetch playlist as type songs from supabase then convert to tracks and set to audioplayer playlist state
    const[loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const userID = useLocalSearchParams().userID as string;
    const playlistID = useLocalSearchParams().playlistID as string; 
    const playlistName = useLocalSearchParams().playlistName as string; //get playlist name from params

    const fetchsongs = async () => {
        setLoading(true);

        if (!userID) return;
        const data = await getPlaylistSongs(userID, playlistID); //fetch songs from supabase

        if (!data) return;

        //convert song type to track!!
        setPlaylist(data.map((song) => ({
            id: song.id,
            title: song.songName,
            artist: song.artistName,
            thumbnail: song.imageURL,
            uri: null, //placeholder, will be assigned when item is clicked
        })));
        setLoading(false);
    };

    useEffect(() => {
        fetchsongs();
    }
    , []);

  return (
    <View style={style.container}>
      {/* Controls for testing */}
            <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: 10, alignSelf: "flex-start", padding: 16}}>{playlistName}</Text>
            <Playlist userId={userID} fetchSongs={fetchsongs} />
            <TouchableOpacity style={style.button} onPress={() => router.back()}>
            <Text style={style.buttonText}>Go back to Library</Text>
        </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9D8FD',
        alignItems: 'center',
        padding: 16,
      },
    button: {
        backgroundColor: '#9F7AEA',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10,
      },
      buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
      },
    });