import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import Checkbox from 'expo-checkbox';
import { song } from '../constants/types'; // Adjust the import based on your file structure
import { listFiles } from '../lib/supabase_crud';

interface AddSongsPopUpProps {
  userID: string;
  onClose: () => void;
  onAddSongs: (selectedSongs: song[]) => void;
}

const AddSongsPopUp: React.FC<AddSongsPopUpProps> = ({ userID, onClose, onAddSongs }) => {
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [songsList, setSongsList] = useState<song[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch user's library songs
  const fetchsongs = async () => {
    setLoading(true);

    if (!userID) return;

    const data = await listFiles(userID);

    if (!data) return;

    setSongsList([...data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchsongs();
  }, []);

  const toggleSongSelection = (id: string) => {
    setSelectedSongs((prev) =>
      prev.includes(id) ? prev.filter((songId) => songId !== id) : [...prev, id]
    );
  };

  // Pass selected songs to the parent component to get added to the playlist in Supabase
  const handleAddSongs = () => {
    const selected = songsList.filter((song) => selectedSongs.includes(song.id));
    onAddSongs(selected);
    onClose();
  };

  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose} // Handles the back button on Android
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Select Songs</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#6B46C1" />
          ) : (
            <FlatList
              data={songsList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.songItem}>
                  <Checkbox
                    value={selectedSongs.includes(item.id)}
                    onValueChange={() => toggleSongSelection(item.id)}
                  />
                  <Text style={styles.songText}>
                    {item.songName} - {item.artistName}
                  </Text>
                </View>
              )}
            />
          )}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.button} onPress={handleAddSongs}>
              <Text style={styles.buttonText}>Add Selected Songs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddSongsPopUp;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  songText: {
    marginLeft: 8,
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#6B46C1',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});