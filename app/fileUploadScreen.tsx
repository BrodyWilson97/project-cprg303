import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadFile } from "../lib/supabase_crud";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system';
import { uploadProps, song } from "../constants/types";

export const FileUploadScreen: React.FC<uploadProps> = ({ userID, addSong }) => {
  const [image, setImage] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");

    //get the file from the devices native file system and encode it from ascii binary?? to base64 then base64 to supabase upload
    const handleAudioPick = async () => {
      const result = await DocumentPicker.getDocumentAsync({ type: "audio/*" });

  
      if(result && result.canceled === false) {
      const base64File = await FileSystem.readAsStringAsync(result.assets[0].uri, {
       encoding: 'base64'});
        
      setAudioFile(base64File);

      }
    };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });


    if(result && result.canceled === false) {
      const base64File = await FileSystem.readAsStringAsync(result.assets[0].uri, {
       encoding: 'base64'});
        
      setImage(base64File);

      }

  };


  const handleSubmit = async () => {
    if (!audioFile || !name || !artistName) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    const id = await uploadFile(userID, name, audioFile, image, artistName);
    if (!id) {
      return;
    }

    // Add the file to the parent component's state
    const song: song = {
      name: name,
      id: id,
      artistName: artistName,
      songName: name,
      imageURL: "",
    };
    addSong(song);

    // Reset the form
    setImage(null);
    setAudioFile(null);
    setName("");
    setArtistName("");
  };

  return (
    <View style={styles.container}>

      {/* Image Upload */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
        <Text style={styles.uploadButtonText}>Select Image</Text>
      </TouchableOpacity>

      {/* Audio Upload */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleAudioPick}>
        <Text style={styles.uploadButtonText}>Select Audio File</Text>
      </TouchableOpacity>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />

      {/* Artist Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Artist Name"
        value={artistName}
        onChangeText={setArtistName}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9D8FD",
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  uploadButton: {
    backgroundColor: "#6B46C1",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    width: "80%",
  },
  uploadButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  fileName: {
    fontSize: 14,
    color: "#4A5568",
    marginBottom: 16,
  },
  input: {
    width: "80%",
    padding: 12,
    borderRadius: 8,
    borderColor: "#CBD5E0",
    borderWidth: 1,
    marginBottom: 16,
    backgroundColor: "#FFF",
  },
  submitButton: {
    backgroundColor: "#3182CE",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});