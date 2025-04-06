import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadFile } from "../lib/supabase_crud";
import * as DocumentPicker from "expo-document-picker";
import AntDesign from '@expo/vector-icons/AntDesign';
import * as FileSystem from 'expo-file-system';
import { uploadProps, song } from "../constants/types";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function FilesPage(){
  const [image, setImage] = useState<uploadProps | null>(null);
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [loadMessage, setLoadMessage] = useState<string>("");
  
  const router = useRouter();
  const userID = useLocalSearchParams().userID as string;

    //get the file from the devices native file system and encode it from ascii binary?? to base64 then base64 to supabase upload
    const handleAudioPick = async () => {
      const result = await DocumentPicker.getDocumentAsync({ type: "audio/*" });

  
      if(result && result.canceled === false) {
      const base64File = await FileSystem.readAsStringAsync(result.assets[0].uri, {
       encoding: 'base64'});
        
      setAudioFile(base64File);
      setSelectedFile(result.assets[0].name);
      }
    };


  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if(result  && !result.canceled) {
      const base64File = await FileSystem.readAsStringAsync(result.assets[0].uri, {
       encoding: 'base64'});
        
      setImage({
        data: base64File, 
        uri: result.assets[0].uri, 
        type: result.assets[0].type || "image/jpeg"
      });

      setFilePreview(result.assets[0].uri);
      }

  };


  const handleSubmit = async () => {
    if (!audioFile || !name || !artistName) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    setLoadMessage("Uploading file... Please wait!");
    const id = await uploadFile(userID, name, audioFile, image?.data || "", artistName);
    if(!id) {
      Alert.alert("Error", "File upload failed. Please try again.");
      return;
    }
    setLoadMessage("File uploaded successfully!");

    // Add the file to the parent component's state
    const song: song = {
      id: id,
      artistName: artistName,
      songName: name,
      imageURL: "",
    };

    // Reset the form
    setImage(null);
    setFilePreview(null);
    setAudioFile(null);
    setSelectedFile(null);
    setName("");
    setArtistName("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Files Page</Text>
      <Text style={styles.description}>Select and upload your files</Text>

      {/* Image Upload */}
      <TouchableOpacity style={styles.uploadBox} onPress={handleImagePick}>
        {filePreview ? (
          <Image
            source={{ uri: filePreview }}
            style={styles.imagePreview}/>
        ) : (
          <View style={{ alignItems: "center" }}>
            <AntDesign style={{ padding: 12, color: "#4A5568",}} name="picture" size={28} color="black" />
            <Text style={styles.description}>Upload Image</Text> 
          </View>
      )}
      </TouchableOpacity>

      {/* Audio Upload */}
      <TouchableOpacity style={styles.uploadBox} onPress={handleAudioPick}>
        {selectedFile ? (
          <Text style={styles.description}>{selectedFile}</Text>
        ) : (
          <View style={{ alignItems: "center" }}>
            <AntDesign style={{ padding: 12, color: "#4A5568"}} name="upload" size={28} color="black" />
            <Text style={styles.description}>Upload mp3 file</Text> 
          </View>
      )}
      </TouchableOpacity>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Track Name"
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
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>
  
        <Text style={styles.description}>{loadMessage}</Text>

      {/* Back Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Back to Home</Text>
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
    color: "#000",
  },
  description: {
    fontSize: 16,
    color: "#4A5568",
    textAlign: "center",
    marginBottom: 5,
    height: 20,
  },
  button: {
    backgroundColor: "#B794F4",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
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
uploadBox: {
  width: '80%',
  height: 100,
  borderWidth: 2,
  borderColor: '#CBD5E0',
  borderStyle: 'dashed',
  borderRadius: 12,
  margin: 10,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f3e8ff',
},
  imagePreview: {
    width: '30%',
    height: '80%',
    borderRadius: 8,
  },

  fileName: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
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
    backgroundColor: "#9F7AEA",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    width: "80%",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});