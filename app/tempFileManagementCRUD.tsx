import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { FileObject } from '@supabase/storage-js';
import { streamFile, listFiles, uploadFile, deleteFile } from "../lib/supabase_crud";
import {getUser} from "../lib/supabase_auth";
import { useRouter } from "expo-router";
import {FileUploadScreen} from "./fileUploadScreen";
import { song } from "../constants/types";

export default function songManagementPage() {
  const [songs, setSongs] = useState<song[]>([]);
  const [selectedsong, setSelectedsong] = useState<FileObject | null>(null);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

  const router = useRouter();
  // testing to access current user
  const [userID, setUserID] = useState<string>("");
    
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const fetchUser = async () => {
    const { user } = await getUser();
    if (user) {
      setUserID(user.id);
    }
    else if (!user) return;
  };

  const fetchsongs = async () => {
    await fetchUser();

    // fetch song in users folder by their id
    if (!userID) return;
    const data : song[] = await listFiles("musicfiles", userID);

    if(!data) {
      return;
    }
    setSongs([...data, ...songs]);
  };

  useEffect(() => {
    fetchUser();
  }, []);

    useEffect(() => {
      fetchsongs();
    }, [userID]);


  const addSong = (song: song) => {
    setSongs([...songs, song]);
  }


  const handleDelete = async (songName: string) => {
    const error = await deleteFile("musicfiles", userID, songName);
    if (!error) {
      Alert.alert("Success", "song deleted successfully!");
      setSongs((prevsongs) => prevsongs.filter((song) => song.name !== songName));
    } else {
      Alert.alert("Error", "Failed to delete song.");
    }
  };





  return (
    <View style={styles.container}>
      {showUploadModal ? (
        // Show the upload screen
        <View style={styles.container}>
          <Text style={styles.title}>Upload song</Text>
          <FileUploadScreen 
            userID={userID}
            addSong= {addSong} />
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => setShowUploadModal(false)}
          >
            <Text style={styles.uploadButtonText}>Back to song List</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Show the song management screen
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => setShowUploadModal(true)}
          >
            <Text style={styles.uploadButtonText}>Upload song</Text>
          </TouchableOpacity>

          <FlatList
            data={songs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.songItem}
                onPress={async () => {
                  const url = await streamFile("musicfiles", userID, item.name);
                  console.log("Streaming URL:", url);
                }}
              >
                <Text style={styles.songName}>{item.name}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.name)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9D8FD",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  uploadButton: {
    backgroundColor: "#6B46C1",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  uploadButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  songItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E0",
  },
  songName: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#E53E3E",
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "#FFF",
    fontSize: 14,
  },
  editButton: {
    backgroundColor: "#3182CE",
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButtonText: {
    color: "#FFF",
    fontSize: 14,
  },
  editSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
  editLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E0",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: "#6B46C1",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});