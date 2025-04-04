import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function PlaylistPage() {
  const router = useRouter();

  const [playlists, setPlaylists] = useState([
    { name: 'Playlist 1' },
    { name: 'Playlist 2' },
    { name: 'Playlist 3' },
  ]); // Sample playlists
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [editingPlaylist, setEditingPlaylist] = useState<number | null>(null);

  const createPlaylist = () => {
    if (!newPlaylistName.trim()) {
      Alert.alert('Error', "Playlist name can't be empty!");
      return;
    }

    setPlaylists([...playlists, { name: newPlaylistName.trim() }]);
    setNewPlaylistName('');
    Alert.alert('Success', 'Playlist created!');
  };

  const deletePlaylist = (index: number) => {
    const updatedPlaylists = playlists.filter((_, i) => i !== index);
    setPlaylists(updatedPlaylists);
    Alert.alert('Success', 'Playlist deleted!');
  };

  const startEditingPlaylist = (index: number) => {
    setEditingPlaylist(index);
    setNewPlaylistName(playlists[index].name);
  };

  const savePlaylistChanges = () => {
    if (!newPlaylistName.trim()) {
      Alert.alert('Error', "Playlist name can't be empty!");
      return;
    }

    const updatedPlaylists = playlists.map((playlist, index) =>
      index === editingPlaylist ? { name: newPlaylistName.trim() } : playlist
    );
    setPlaylists(updatedPlaylists);
    setEditingPlaylist(null);
    setNewPlaylistName('');
    Alert.alert('Success', 'Playlist updated!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Playlists</Text>

      {/* Playlist List */}
      <ScrollView style={styles.playlistList}>
        {playlists.map((playlist, index) => (
          <View key={index} style={styles.playlistItem}>
            <Text style={styles.playlistName}>{playlist.name}</Text>
            <View style={styles.playlistActions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => startEditingPlaylist(index)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deletePlaylist(index)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* New Playlist Form */}
      <TextInput
        style={styles.input}
        placeholder="Enter playlist name"
        value={newPlaylistName}
        onChangeText={setNewPlaylistName}
      />
      {editingPlaylist !== null ? (
        <TouchableOpacity style={styles.button} onPress={savePlaylistChanges}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={createPlaylist}>
          <Text style={styles.buttonText}>Create Playlist</Text>
        </TouchableOpacity>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push('/homePage')}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/libraryPage')}>
          <Text style={styles.navIcon}>🎵</Text>
          <Text style={styles.navLabel}>Songs</Text>
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 16,
  },
  playlistList: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 16,
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
  playlistActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  editButton: {
    backgroundColor: '#F6AD55',
    padding: 8,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#E53E3E',
    padding: 8,
    borderRadius: 8,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#4A5568',
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 16,
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
