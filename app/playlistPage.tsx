import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AddSongsPopUp from './addSongsPopUp'; 
import { song } from '../constants/types'; 
import { uploadPlaylist, listPlaylists, deletePlaylist, editPlaylist } from '../lib/supabase_crud';
import { playlist } from '../constants/types'; 

export default function PlaylistPage() {
  const router = useRouter();
  const userID = useLocalSearchParams().userID as string;

  const [playlists, setPlaylists] = useState<playlist[]>([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [editingPlaylist, setEditingPlaylist] = useState<number | null>(null);
  const [showAddSongsPopup, setShowAddSongsPopup] = useState(false); // State for popup visibility

  const fetchPlaylists = async () => {
    // Fetch playlists from Supabase and set the state
    const data = await listPlaylists(userID);

    if (!data) return; //leave page blank
    setPlaylists([...data]);
  }

  useEffect(() => {
    fetchPlaylists();
  }, []);


  //get playlist name then show a list of library songs to select and add in a pop up
  //the create playlist button first shows the popup and when the popup is submitted, create playlist is called
  //to submit the selected songs and playlist name to supabase
  const createPlaylist = async (selectedSongs : song[]) => {
    if (!newPlaylistName.trim()) {
      Alert.alert('Error', "Playlist name can't be empty!");
      return;
    }

    //add playlist to supabase
    const playlistId = await uploadPlaylist(userID, newPlaylistName.trim(), selectedSongs);

    //add playlist name to state and reset the input field
    setPlaylists([...playlists, {id: playlistId,  playlistName: newPlaylistName.trim() }]);
    setNewPlaylistName('');
  };

  const removePlaylist = async (id: string) => {
    await deletePlaylist(id); 
    fetchPlaylists(); // Refresh the playlist list after deletion
  };

  const startEditingPlaylist = (index: number) => {
    setEditingPlaylist(index);
    setNewPlaylistName(playlists[index].playlistName);
  };

  //update the playlist name in supabase and state
  const savePlaylistChanges = async () => {
    if (!newPlaylistName.trim()) {
      Alert.alert('Error', "Playlist name can't be empty!");
      return;
    }

    await editPlaylist(playlists[editingPlaylist!].id, newPlaylistName.trim());
    fetchPlaylists(); // Refresh the playlist list after editing
    setEditingPlaylist(null);
    setNewPlaylistName('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Playlists</Text>
      {/* Add Songs Popup */}
      {showAddSongsPopup && (
        <AddSongsPopUp
          userID={userID} // Replace with actual userID
          onClose={() => setShowAddSongsPopup(false)}
          onAddSongs={createPlaylist}
        />)}
      
      {/* Playlist List */}
      <ScrollView style={styles.playlistList}>
        {playlists.map((playlist, index) => (
          <View key={index} style={styles.playlistItem}>
            <Text style={styles.playlistName}>{playlist.playlistName}</Text>
            <View style={styles.playlistActions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => startEditingPlaylist(index)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removePlaylist(playlist.id)}
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
        <TouchableOpacity style={styles.button} onPress={()=>setShowAddSongsPopup(true)}>
          <Text style={styles.buttonText}>Create Playlist</Text>
        </TouchableOpacity>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push('/homePage')}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
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
