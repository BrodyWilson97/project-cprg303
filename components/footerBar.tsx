import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { getUser } from "../lib/supabase_auth";
import { listFiles } from "../lib/supabase_crud";
import { useAudioPlayerContext } from '../context/audio-player-context';
import { useState } from 'react';

const FooterBar: React.FC = () => {

    const { 
        setUserAudioPlayerContext, //sets current track state in audioplayer context
    } = useAudioPlayerContext();
  const [user, setUser] = useState<string>("");
  const router = useRouter();

  const fetchUser = async () => {
    const { user } = await getUser();
    if (user) {
      setUser(user.id);
      setUserAudioPlayerContext(user.id); //set userID in audio player context
      await listFiles(user.id);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.push(`/homePage/?userID=${user}`)}>
                <Ionicons name="home-outline" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push(`/libraryPage/?userID=${user}`)}>
                <Ionicons name="musical-notes-outline" size={30} color="#000" />
            </TouchableOpacity>   
            <TouchableOpacity onPress={() => router.push(`/filesPage/?userID=${user}`)}>
                <Ionicons name="folder-outline" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/settingsPage')}>
                <Ionicons name="settings-outline" size={30} color="#000" />
            </TouchableOpacity>           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // bottom: 0,
        backgroundColor: '#B794F4',
        width: '100%',
        maxWidth: 400,
        flexDirection: 'row',
        paddingBottom: 30,
        justifyContent: 'space-around',
        paddingVertical: 20,
        // borderRadius: 12,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        zIndex: 10,
    },
    menuItem: {
        alignItems: 'center',
    },
    menuText: {
        fontSize: 16,
        color: '#333',
    },
});

export default FooterBar;