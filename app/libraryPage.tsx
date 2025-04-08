import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { listFiles, listPlaylists } from "../lib/supabase_crud";
import { playlist } from "../constants/types";
import { useAudioPlayerContext } from '../context/audio-player-context';
import { Playlist } from '../components/playList';
import { AudioPlayerControlsFooter } from '../components/audioControlsFooter';
import { SearchBar } from '../components/searchBar';
import FooterBar from '../components/footerBar';
import { Track } from '../context/audio-player-context';

export default function LibraryPage() {
  const { 
    playlist,
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

  // =========================== Search Functionality ==============================
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState<Track[]>([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState<playlist[]>([]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = playlist.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.artist && item.artist.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs([]); // Reset when search is empty
    }
  }, [searchQuery, playlist]);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar placeholder='Search Music...' value={searchQuery} onChangeText={setSearchQuery}/>
      {/* <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={30} color="#000" style={styles.icon}/>
        <TextInput placeholder="Search music..." style={styles.searchInput} />
      </View> */}

      {/* Tabs for Songs and Playlists */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'songs' && styles.activeTab]}
          onPress={() => setActiveTab('songs')}
        >
          <Ionicons name="musical-notes-outline" size={30} color="#000" style={styles.icon}/>
          <Text style={styles.tabLabel}>Songs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'playlists' && styles.activeTab]}
          onPress={() => setActiveTab('playlists')}
        >
          <Ionicons name="folder-outline" size={30} color="#000" style={styles.icon}/>
          <Text style={styles.tabLabel}>Playlists</Text>
        </TouchableOpacity>
      </View>

      {/* Manage Playlists Button */}
      {activeTab === 'playlists' && (
        <TouchableOpacity
          style={styles.manageButton}
          onPress={() => router.push(`/playlistPage/?userID=${userID}`)}
        >
          <Text style={styles.buttonText}>Manage Playlists</Text>
        </TouchableOpacity>
      )}

      {/* Conditional Rendering of Songs or Playlists */}
      {activeTab === 'songs' ? 
        (loading ? <Text>Loading...</Text> : 
          <Playlist 
            songs={searchQuery ? filteredSongs : playlist} 
            userId={userID}
          />
        ) :
        (loading ? <Text>Loading...</Text> :
          
          <ScrollView style={styles.playlistList} contentContainerStyle={{ paddingBottom: 50}}>
            {(searchQuery ? filteredPlaylists : playlists).map((playlist) => (
              <TouchableOpacity 
                key={playlist.id} 
                style={styles.playlistItem} 
                onPress={() => router.push(`/viewPlaylistPage/?userID=${userID}&playlistID=${playlist.id}&playlistName=${playlist.playlistName}`)}
              >
                <Text style={styles.playlistName}>{playlist.playlistName}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )
    }
        
        {/* Now Playing Section */}
      <AudioPlayerControlsFooter/>
      {/* Bottom Navigation */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9D8FD',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // padding: 16,
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
    flex: 1,
    maxWidth: 400,
    marginTop: 20,
    paddingBottom: 100,
    marginBottom: 24,
  },
  playlistItem: {
    backgroundColor: '#D6BCFA',
    padding: 12,
    height: 45,
    marginBottom: 8,
    borderRadius: 8,
  },
  playlistName: {
    fontSize: 16,
    color: '#000',
  },
  manageButton: {
    backgroundColor: '#9F7AEA',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
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
