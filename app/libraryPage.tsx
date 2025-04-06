import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { listFiles, listPlaylists } from "../lib/supabase_crud";
import { playlist } from "../constants/types";
import { useAudioPlayerContext } from '../context/audio-player-context';
import { Playlist } from '../components/playList';
import { AudioPlayerControlsFooter } from '../components/audioControlsFooter';

export default function LibraryPage() {
  const { 
    setPlaylist,   
    setCurrentTrack 
  } = useAudioPlayerContext();

  const [activeTab, setActiveTab] = useState<'songs' | 'playlists'>('songs');
  const [playlists, setPlaylists] = useState<playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const userID = useLocalSearchParams().userID as string;

  const fetchPlaylists = async () => {
    setLoading(true);
    const data = await listPlaylists(userID);
    if (!data) return;
    setPlaylists([...data]);
    setLoading(false);
  };

  const fetchSongs = async () => {
    setLoading(true);
    if (!userID) return;

    const data = await listFiles(userID);
    if (!data) return;

    setPlaylist(data.map((song) => ({
      id: song.id,
      title: song.songName,
      artist: song.artistName,
      thumbnail: song.imageURL,
      uri: null,
    })));
    setLoading(false);
  };

  useEffect(() => {
    fetchSongs();
    fetchPlaylists();
  }, []);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Text style={styles.icon}>🔍</Text>
        <TextInput placeholder="Search music..." style={styles.searchInput} />
      </View>

      {/* Tabs for Songs and Playlists */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'songs' && styles.activeTab]}
          onPress={() => setActiveTab('songs')}
        >
          <Text style={styles.tabIcon}>🎵</Text>
          <Text style={styles.tabLabel}>Songs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'playlists' && styles.activeTab]}
          onPress={() => setActiveTab('playlists')}
        >
          <Text style={styles.tabIcon}>📂</Text>
          <Text style={styles.tabLabel}>Playlists</Text>
        </TouchableOpacity>
      </View>

      {/* Conditional Rendering */}
      {activeTab === 'songs' ? 
        (loading ? <Text>Loading...</Text> : <Playlist fetchSongs={fetchSongs} userId={userID} />) :
        (loading ? <Text>Loading...</Text> :
          <ScrollView style={styles.playlistList}>
            {playlists.map((playlist, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.playlistItem} 
                onPress={() => router.push(`/viewPlaylistPage/?userID=${userID}&playlistID=${playlist.id}&playlistName=${playlist.playlistName}`)}
              >
                <Text style={styles.playlistName}>{playlist.playlistName}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )
      }

      {/* Manage Playlists Button */}
      {activeTab === 'playlists' && (
        <TouchableOpacity
          style={styles.manageButton}
          onPress={() => router.push(`/playlistPage/?userID=${userID}`)}
        >
          <Text style={styles.buttonText}>Manage Playlists</Text>
        </TouchableOpacity>
      )}
        
        {/* Now Playing Section */}
      <AudioPlayerControlsFooter/>
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/filesPage/?userID=${userID}`)}>
          <Text style={styles.navIcon}>📂</Text>
          <Text style={styles.navLabel}>Upload Files</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/settingsPage')}>
          <Text style={styles.navIcon}>⚙️</Text>
          <Text style={styles.navLabel}>Settings</Text>
        </TouchableOpacity>
        
        
      </View>
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
    marginTop: 16,
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
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 16,
  },
  tabItem: {
    alignItems: 'center',
    padding: 8,
  },
  tabIcon: {
    color: '#000',
    fontSize: 24,
  },
  tabLabel: {
    fontSize: 14,
    color: '#000',
  },
  activeTab: {
    backgroundColor: '#9F7AEA',
    borderRadius: 8,
    padding: 8,
  },
  playlistList: {
    width: '100%',
    maxWidth: 400,
    marginTop: 20,
  },
  playlistItem: {
    backgroundColor: '#D6BCFA',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  playlistName: {
    fontSize: 16,
    color: '#000',
  },
  manageButton: {
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
  navIcon: {
    color: '#000',
    fontSize: 24,
    textAlign: 'center',
  },
  navLabel: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
});
