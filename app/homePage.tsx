import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { listFiles } from "../lib/supabase_crud";
import { useRouter } from "expo-router";
import { getUser } from "../lib/supabase_auth";
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons

import { NextTrack } from '../components/controlComponents/nextTrack';
import { PrevTrack } from '../components/controlComponents/prevTrack';
import { TogglePlayPause } from '../components/controlComponents/togglePlayPause';
import { testTracks } from '../lib/testTracks';
import { Shuffle } from '../components/controlComponents/shuffle';
import { Repeat } from '../components/controlComponents/repeat';
import { ProgressBar } from '../components/controlComponents/progressBar';
import { AudioPlayerControlsFooter } from '../components/audioControlsFooter';


export default function HomeScreen() {
  const [user, setUser] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const router = useRouter();

  const fetchUser = async () => {
    const { user } = await getUser();
    if (user) {
      setUser(user.id);
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
        <Text style={styles.icon}>☰</Text>
        <TextInput placeholder="Search" style={styles.searchInput} />
        <Text style={styles.icon}>🔍</Text>
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

      <AudioPlayerControlsFooter/>
      {/* Tab Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push(`/libraryPage/?userID=${user}`)}>
          <Text style={styles.tabIcon}>🎵</Text>
          <Text style={styles.tabLabel}>Library</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push(`/filesPage/?userID=${user}`)}>
          <Text style={styles.tabIcon}>📂</Text>
          <Text style={styles.tabLabel}>Upload Files</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push("/settingsPage")}>
          <Text style={styles.tabIcon}>⚙️</Text>
          <Text style={styles.tabLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
      

      {/* <TouchableOpacity style={styles.nowPlaying} onPress={openPlaybackPage}>
        <Text style={styles.nowPlayingText}>Now Playing</Text>
        <View style={styles.controls}>
          <TouchableOpacity>
            <Ionicons name="play-back" size={36} color="#000" /> 
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause}>
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={48} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="play-forward" size={36} color="#000" /> 
          </TouchableOpacity>
        </View>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9D8FD',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  searchBar: {
    backgroundColor: '#D6BCFA',
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 50,
    marginTop: 24, // lowered slightly
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
