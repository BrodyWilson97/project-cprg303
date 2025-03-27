import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { Audio, AVPlaybackStatusError, AVPlaybackStatusSuccess } from 'expo-av';
// import { tracks } from '../lib/testTracks';

// TEST TRACKS
const testTrack = {
    id: 1,
    title: 'We Are the World',
    uri: require('../assets/testFiles/We_Are_The_World.mp3'),
    author: 'Michael Jackson',
    thumbnail: 'https://via.placeholder.com/150',
  };

// ======================== Type Definitions ========================
export interface Track {
    id: number;           // Required for track comparison
    title: string;
    uri: string;          // Audio URI (local/remote)
    artist?: string;
    thumbnail?: string;   // Optional cover art
}

interface PlayerContextType {
    // State
    currentTrack: Track | null;
    isPlaying: boolean;
    duration: number;     // in milliseconds
    position: number;     // in milliseconds
    playlist: Track[];
    
    // Controls
    playTrack: (track: Track) => Promise<void>;
    togglePlayPause: () => Promise<void>;
    playNextTrack: () => Promise<void>;
    playPreviousTrack: () => Promise<void>;
    seekToPosition: (position: number) => Promise<void>;
    
    // Playlist management
    setPlaylist: Dispatch<SetStateAction<Track[]>>;
}

// ======================== Context Setup ========================
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// ======================== Provider Implementation ========================
export const PlayerProvider = ({ children }: { children: ReactNode }) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [playlist, setPlaylist] = useState<Track[]>([]);

    // Load and play a track
    const playTrack = async (track: Track) => {
        try {
            // Unload previous sound (if any)
            if (sound) {
                await sound.unloadAsync();
            }

            // Load new sound
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: track.uri },
                { shouldPlay: true },
                onPlaybackStatusUpdate
            );

            // Update state
            setSound(newSound);
            setCurrentTrack(track);
            setIsPlaying(true);
            } catch (error) {
            console.error('Error playing track:', error);
        }
    };

  // Toggle play/pause
    const togglePlayPause = async () => {
        if (!sound) return;
        
        if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
        } else {
        await sound.playAsync();
        setIsPlaying(true);
        }
    };

    // Handle playback updates (progress, completion)
    const onPlaybackStatusUpdate = (status:  AVPlaybackStatusSuccess | AVPlaybackStatusError) => {
        if (status.isLoaded) {
        setPosition(status.positionMillis);
        setDuration(status.durationMillis || 0);
        
        // Auto-play next track when current finishes
        if (status.didJustFinish && playlist.length > 0) {
            playNextTrack();
        }
        }
    };

    // Skip to next track
    const playNextTrack = async () => {
        if (!currentTrack || !playlist.length) return;
        
        const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
        const nextIndex = (currentIndex + 1) % playlist.length;
        await playTrack(playlist[nextIndex]);
    };

    // Go back to previous track
    const playPreviousTrack = async () => {
        if (!currentTrack || !playlist.length) return;
        
        const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        await playTrack(playlist[prevIndex]);
    };

    // Seek to a specific position
    const seekToPosition = async (position: number) => {
        if (!sound) return;
        await sound.setPositionAsync(position);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    // Context value
    const contextValue: PlayerContextType = {
        currentTrack,
        isPlaying,
        duration,
        position,
        playlist,
        playTrack,
        togglePlayPause,
        playNextTrack,
        playPreviousTrack,
        seekToPosition,
        setPlaylist,
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    );
};

// ======================== Custom Hook ========================
export const usePlayerContext = (): PlayerContextType => {
    const context = useContext(PlayerContext);
    if (context === undefined) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
};