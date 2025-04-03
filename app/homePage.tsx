import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { listFiles, getFileURL} from "../lib/supabase_crud";
import { useRouter } from "expo-router";
import { getUser } from "../lib/supabase_auth";

export default function HomeScreen() {
  // testing to access current user
  const [user, setUser] = useState<string>("");

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const router = useRouter();

  const fetchUser = async () => {
    const { user } = await getUser();
    if (user) {
      setUser(user.id);
    }
    else if (!user) return;
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
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
        />
        <Text style={styles.icon}>🔍</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        <View style={styles.tabItem}>
          <Text style={styles.tabIcon}>🎵</Text>
          <Text style={styles.tabLabel}>Library</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabIcon}>📂</Text>
          <Text style={styles.tabLabel}>Playlist</Text>
        </View>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push("/settingsPage")}>
            <Text style={styles.tabIcon}>⚙️</Text>
            <Text style={styles.tabLabel}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Recently Played Section */}

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
              <Text style={styles.controlIcon}>⏪</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePlayPause}>
              <Text style={styles.controlIcon}>{isPlaying ? '⏸️' : '▶️'}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.controlIcon}>⏩</Text>
            </TouchableOpacity>
          </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/tempFileManagementCRUD")}>
        <Text >File Management</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9D8FD',
    alignItems: 'center',
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
  recentlyPlayed: {
    width: '100%',
    maxWidth: 400,
    textAlign: 'center',
    marginBottom: 24,
  },
  recentlyPlayedTitle: {
    fontSize: 24,
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

