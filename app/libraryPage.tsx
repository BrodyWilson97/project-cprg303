import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function LibraryPage() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Header with Home Icon */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("/homePage")}>
                    <AntDesign name="home" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Text style={styles.icon}>🔍</Text>
                <TextInput
                    placeholder="Search music..."
                    style={styles.searchInput}
                />
            </View>
            
            {/* Library Title */}
            <Text style={styles.title}>My Library</Text>
            
            {/* Scrollable List of Songs */}
            <ScrollView style={styles.songList}>
                {Array.from({ length: 10 }).map((_, index) => (
                    <TouchableOpacity key={index} style={styles.songItem}>
                        <Text style={styles.songTitle}>Song {index + 1}</Text>
                        <Text style={styles.songArtist}>Artist {index + 1}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            
            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity onPress={() => router.push("/homePage")}>
                    <Text style={styles.navIcon}>🏠</Text>
                    <Text style={styles.navLabel}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/playlistPage")}>
                    <Text style={styles.navIcon}>📂</Text>
                    <Text style={styles.navLabel}>Playlists</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/settingsPage")}>
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
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#4A5568',
        marginBottom: 16,
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
    }
});
