import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert 
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadFile } from "../lib/supabase_crud";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system';
import { uploadProps, song } from "../constants/types";
import { useRouter } from "expo-router";

export default function FilesPage() {
  const [selectedFile, setSelectedFile] = useState<uploadProps | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const router = useRouter();

  // Function to pick an image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedFile({
        name: result.assets[0].fileName || "image.jpg",
        type: result.assets[0].mimeType || "image/jpeg",
        uri: result.assets[0].uri,
      });
      setFilePreview(result.assets[0].uri);
    }
  };

  // Function to pick a document
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
    });

    if (result.canceled) return;

    setSelectedFile({
      name: result.assets[0].name,
      type: result.assets[0].mimeType || "application/octet-stream",
      uri: result.assets[0].uri,
    });

    setFilePreview(null); // Reset preview if it's not an image
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      Alert.alert("Error", "No file selected!");
      return;
    }

    try {
      const fileInfo = await FileSystem.getInfoAsync(selectedFile.uri);
      if (!fileInfo.exists) {
        Alert.alert("Error", "File not found!");
        return;
      }

      const response = await fetch(selectedFile.uri);
      const blob = await response.blob();
      await uploadFile(selectedFile.name, blob);

      Alert.alert("Success", "File uploaded successfully!");
      setSelectedFile(null);
      setFilePreview(null);
    } catch (error) {
      Alert.alert("Upload Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Files Page</Text>
      <Text style={styles.description}>Select and upload your files</Text>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={pickDocument}>
        <Text style={styles.buttonText}>Pick a Document</Text>
      </TouchableOpacity>

      {filePreview && <Image source={{ uri: filePreview }} style={styles.imagePreview} />}

      {selectedFile && (
        <Text style={styles.fileName}>Selected File: {selectedFile.name}</Text>
      )}

      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.buttonText}>Upload File</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9D8FD",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  description: {
    fontSize: 16,
    color: "#4A5568",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#B794F4",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  uploadButton: {
    backgroundColor: "#9F7AEA",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  fileName: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
});

