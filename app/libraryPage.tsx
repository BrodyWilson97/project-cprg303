import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function LibraryPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'songs' | 'playlists'>('songs'); // State to toggle tabs
  const [playlists, setPlaylists] = useState([
    { name: 'Playlist 1' },
    { name: 'Playlist 2' },
    { name: 'Playlist 3' },
  ]); // Sample playlists

  const songs = [
    { title: 'Song 1', artist: 'Artist 1' },
    { title: 'Song 2', artist: 'Artist 2' },
    { title: 'Song 3', artist: 'Artist 3' },
  ]; // Sample songs array

  return (
    <View style={styles.container}>
      {/* Header with Home Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/homePage')}>
          <AntDesign name="home" size={24} color="black" />
        </TouchableOpacity>
      </View>

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

      {/* Conditional Rendering of Songs or Playlists */}
      {activeTab === 'songs' ? (
        <ScrollView style={styles.songList}>
          {songs.map((song, index) => (
            <TouchableOpacity key={index} style={styles.songItem}>
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.songArtist}>{song.artist}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.playlistList}>
          {playlists.map((playlist, index) => (
            <View key={index} style={styles.playlistItem}>
              <Text style={styles.playlistName}>{playlist.name}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Manage Playlists Button */}
      {activeTab === 'playlists' && (
        <TouchableOpacity
          style={styles.manageButton}
          onPress={() => router.push('/playlistPage')}
        >
          <Text style={styles.buttonText}>Manage Playlists</Text>
        </TouchableOpacity>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push('/homePage')}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/playlistCreationPage')}>
          <Text style={styles.navIcon}>📂</Text>
          <Text style={styles.navLabel}>Playlists</Text>
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
  header: {
    width: '100%',
    padding: 16,
    alignItems: 'flex-start',
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
  activeTab: {
    backgroundColor: '#9F7AEA',
    borderRadius: 8,
  },
  songList: {
    width: '100%',
    maxWidth: 400,
  },
  songItem: {
    backgroundColor: '#D6BCFA',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  songArtist: {
    fontSize: 14,
    color: '#4A5568',
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
