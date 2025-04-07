import React from 'react';
import { TouchableOpacity, Text, View, Alert, Image, ScrollView, StyleSheet } from 'react-native';
import { Track, useAudioPlayerContext } from '../context/audio-player-context';
import { useRouter } from 'expo-router';
import { deleteFile, getFileURL } from '../lib/supabase_crud';

interface PlaylistProps {
    songs?: Track[];          // Optional prop for songs (uses context if not provided)
    userId: string;           // Required user ID
    onPlay?: (song: Track) => void;  // Optional play handler
    onDelete?: (songId: string) => void; // Optional delete handler
    fetchSongs?: (userId: string) => void; // Optional refresh function
}

export const Playlist: React.FC<PlaylistProps> = ({ 
    songs, 
    userId, 
    onPlay, 
    onDelete,
    fetchSongs 
}) => {
    const router = useRouter();
    const { playTrack, setCurrentTrack, playlist: contextPlaylist } = useAudioPlayerContext();

    // Use props.songs if provided, otherwise use context playlist
    const displaySongs = songs || contextPlaylist;

    const handlePlay = async (item: Track) => {
        if (onPlay) {
            onPlay(item); // Use prop callback if provided
        } else {
            // Default implementation if no onPlay provided
            const url = await getFileURL("musicfiles", userId, item.id.toString(), 10000, "audio");
            item.uri = url;
            setCurrentTrack(item);
            playTrack(item);
            router.push({ pathname: '/playbackPage' });
        }
    };

    const handleDelete = (songId: string) => {
        Alert.alert("Delete song", "Are you sure you want to delete this song?", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "OK",
                onPress: () => {
                    if (onDelete) {
                        onDelete(songId); // Use prop callback if provided
                    } else if (fetchSongs) {
                        // Default implementation
                        deleteFile(userId, songId).then(() => fetchSongs(userId));
                    }
                },
            },
        ]);
    };

    return (
        <ScrollView 
            style={styles.songList}
            contentContainerStyle={{ paddingBottom: 20 }}
        >
            {displaySongs.map((song) => (
                <TouchableOpacity 
                    key={song.id} 
                    style={styles.songItem} 
                    onPress={() => handlePlay(song)}
                >
                    <Image
                        source={{ uri: song.thumbnail }}
                        style={styles.songImage}
                    />
                    <View style={styles.songInfo}>
                        <Text 
                            style={styles.songTitle} 
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {song.title}
                        </Text>
                        <Text 
                            style={styles.songArtist}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {song.artist}
                        </Text>
                    </View>
                    <TouchableOpacity 
                        onPress={() => handleDelete(song.id.toString())}
                        style={styles.deleteButton}
                    >
                        <Text style={styles.deleteIcon}>⋯</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    songList: {
        width: '100%',
        flex: 1,
    },
    songItem: {
        backgroundColor: '#D6BCFA',
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: 'center',
    },
    songImage: {
        width: 50, 
        height: 50,
        borderRadius: 4,
    },
    songInfo: {
        flex: 1,
        marginHorizontal: 12,
        overflow: 'hidden',
    },
    songTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    songArtist: {
        fontSize: 14,
        color: '#4A5568',
        marginTop: 4,
    },
    deleteButton: {
        padding: 8,
    },
    deleteIcon: {
        fontSize: 20,
        color: '#4A5568',
    },
});