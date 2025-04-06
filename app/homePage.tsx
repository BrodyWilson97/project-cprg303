import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { listFiles } from "../lib/supabase_crud";
import { useRouter } from "expo-router";
import { getUser } from "../lib/supabase_auth";
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons
import { useAudioPlayerContext } from '../context/audio-player-context';

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
        <Text style={styles.icon}>☰</Text>
        <TextInput placeholder="Search" style={styles.searchInput} />
        <Text style={styles.icon}>🔍</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
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
      <TouchableOpacity style={styles.nowPlaying} onPress={openPlaybackPage}>
        <Text style={styles.nowPlayingText}>Now Playing</Text>
        <View style={styles.controls}>
          <TouchableOpacity>
            <Ionicons name="play-back" size={36} color="#000" /> {/* Previous Icon */}
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause}>
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={48} color="#000" /> {/* Play/Pause Icon */}
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="play-forward" size={36} color="#000" /> {/* Next Icon */}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
});
