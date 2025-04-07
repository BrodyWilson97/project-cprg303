import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { listFiles } from "../lib/supabase_crud";
import { useRouter } from "expo-router";
import { getUser } from "../lib/supabase_auth";
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons
import { useAudioPlayerContext } from '../context/audio-player-context';

import { NextTrack } from '../components/controlComponents/nextTrack';
import { PrevTrack } from '../components/controlComponents/prevTrack';
import { TogglePlayPause } from '../components/controlComponents/togglePlayPause';
import { testTracks } from '../lib/testTracks';
import { Shuffle } from '../components/controlComponents/shuffle';
import { Repeat } from '../components/controlComponents/repeat';
import { ProgressBar } from '../components/controlComponents/progressBar';
import { AudioPlayerControlsFooter } from '../components/audioControlsFooter';


export default function HomeScreen() {
      const { 
        setUserAudioPlayerContext, //sets current track state in audioplayer context
      } = useAudioPlayerContext();
  const [user, setUser] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const router = useRouter();

  const fetchUser = async () => {
    const { user } = await getUser();
    if (user) {
      setUser(user.id);
      setUserAudioPlayerContext(user.id); //set userID in audio player context
      await listFiles(user.id);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  function openPlaybackPage(): void {
    router.push("/playbackPage");
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="menu-outline" size={30} color="#000" style={styles.icon}/>
        <TextInput placeholder="Search" style={styles.searchInput} />
        <Ionicons name="search-outline" size={26} color="#000" style={styles.icon}/>
      </View>

      

      {/* Music Thumbnails */}
      <View style={styles.thumbnails}>
        <View style={styles.thumbnail}>
          <Text>🖼️</Text>
        </View>
        <View style={styles.thumbnail}>
          <Text>🖼️</Text>
        </View>
      </View>

      {/* Now Playing Section */}
      {/* Tab Navigation */}
      <AudioPlayerControlsFooter/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9D8FD',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchBar: {
    backgroundColor: '#D6BCFA',
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 50,
    marginTop: 50, // lowered even more
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
    marginTop: 12, // added spacing
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
  bottomNav: {
    backgroundColor: '#B794F4',
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 24,
  },
});