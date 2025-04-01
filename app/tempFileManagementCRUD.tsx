import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system';
import { FileObject } from '@supabase/storage-js';
import { streamFile, listFiles, uploadFile, deleteFile } from "../lib/supabase_crud";
import {getUser} from "../lib/supabase_auth";

type file = {
  name: string;
  id: string;
};

export default function FileManagementPage() {
  const [files, setFiles] = useState<file[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileObject | null>(null);
  const [newFileName, setNewFileName] = useState<string>("");

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

  const fetchFiles = async () => {
    await fetchUser();

    // fetch file in users folder by their id
    if (!userID) return;
    const data : file[] = await listFiles("musicfiles", userID);

    if(!data) {
      return;
    }
    setFiles([...data, ...files]);
  };

  useEffect(() => {
    fetchUser();
  }, []);

    useEffect(() => {
      fetchFiles();
    }, [userID]);


  //get the file from the devices native file system and encode it from ascii binary?? to base64 then base64 to supabase upload
  const handleSelectFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "audio/*" });
      console.log(result);
      if (result.canceled === true) {
        Alert.alert("File selection cancelled.");
        return;
      }
      if (!result){
        Alert.alert("No file selected.");
        return;
      }


    if(result){
    const base64File = await FileSystem.readAsStringAsync(result.assets[0].uri, {
     encoding: 'base64'});
      
    uploadFile("musicfiles", userID, result.assets[0].name, base64File);
    }

    fetchFiles();
  };

  const handleDelete = async (fileName: string) => {
    const error = await deleteFile("musicfiles", userID, fileName);
    if (!error) {
      Alert.alert("Success", "File deleted successfully!");
      setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    } else {
      Alert.alert("Error", "Failed to delete file.");
    }
  };

//   const handleEdit = async () => {
//     if (!selectedFile || !newFileName) {
//       Alert.alert("Error", "Please select a file and enter a new name.");
//       return;
//     }

//     // Rename logic (if supported by your backend)
//     Alert.alert("Info", "Renaming files is not supported in this example.");
//   };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.uploadButton} onPress={handleSelectFile}>
        <Text style={styles.uploadButtonText}>Upload File</Text>
      </TouchableOpacity>


      
      <FlatList
        data={files}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.fileItem}>
            <Text style={styles.fileName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.name)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              //onPress={() => setSelectedFile(item)}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {selectedFile && (
        <View style={styles.editSection}>
          <Text style={styles.editLabel}>Rename File:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new file name"
            value={newFileName}
            onChangeText={setNewFileName}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleEdit}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
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
  fileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E0",
  },
  fileName: {
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