import React, { 
    createContext, 
    useContext, 
    useState, 
    useEffect, 
    ReactNode, 
    Dispatch, 
    SetStateAction 
} from 'react';
import { Audio, 
    AVPlaybackStatusError, 
    AVPlaybackStatusSuccess 
} from 'expo-av';
import { testTracks } from '../lib/testTracks';

// ======================== Type Definitions ========================
export interface Track {
    id: number;           // Required for track comparison
    title: string;
    uri: string;          // Audio URI (local/remote)
    artist?: string;
    thumbnail?: string;   // Optional cover art
}

interface AudioPlayerContextType {
    // State
    currentTrack: Track | null;
    isPlaying: boolean;
    duration: number;     // in milliseconds
    position: number;     // in milliseconds
    playlist: Track[];
    isRepeat: boolean;
    isShuffle: boolean;
    
    // Controls
    playTrack: (track: Track) => Promise<void>;
    togglePlayPause: () => Promise<void>;
    playNextTrack: () => Promise<void>;
    playPreviousTrack: () => Promise<void>;
    seekToPosition: (position: number) => Promise<void>;
    repeat: () => void,
    shuffle: () => void,
    
    // Playlist management
    setPlaylist: Dispatch<SetStateAction<Track[]>>;
}

// ======================== Context Setup ========================
const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

// ======================== Provider Implementation ========================
export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    // testTracks hard coded for testing
    const [playlist, setPlaylist] = useState<Track[]>(testTracks);

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
        
        if (isShuffle) {
            const randomIndex = Math.floor(Math.random() * playlist.length);
            await playTrack(playlist[randomIndex]);
            return;
        }

        if (isRepeat) {
            await playTrack(currentTrack);
            return;
        }
        const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
        const nextIndex = (currentIndex + 1) % playlist.length;
        await playTrack(playlist[nextIndex]);
    };

    // Go back to previous track
    const playPreviousTrack = async () => {
        if (!currentTrack || !playlist.length) return;
        
        if (isShuffle) {
            const randomIndex = Math.floor(Math.random() * playlist.length);
            await playTrack(playlist[randomIndex]);
            return;
        }

        const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        await playTrack(playlist[prevIndex]);
    };

    // Seek to a specific position
    const seekToPosition = async (position: number) => {
        if (!sound) return;
        await sound.setPositionAsync(position);
    };
    
    const repeat = () => {
        setIsRepeat(!isRepeat);
        console.log(isRepeat);
        if (isRepeat) {
            setIsShuffle(false);
        }
    };

    const shuffle = () => {
        setIsShuffle(!isShuffle);
        console.log(isShuffle);
        if (isShuffle) {
            setIsRepeat(false);
        }
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
    const contextValue: AudioPlayerContextType = {
        currentTrack,
        isPlaying,
        duration,
        position,
        playlist,
        isRepeat,
        isShuffle,
        playTrack,
        togglePlayPause,
        playNextTrack,
        playPreviousTrack,
        seekToPosition,
        setPlaylist,
        repeat,
        shuffle,
    };

    return (
        <AudioPlayerContext.Provider value={contextValue}>
            {children}
        </AudioPlayerContext.Provider>
    );
};

// ======================== Custom Hook ========================
export const useAudioPlayerContext = (): AudioPlayerContextType => {
    const context = useContext(AudioPlayerContext);
    if (context === undefined) {
        throw new Error('usePlayer must be used within an AudioPlayerProvider');
    }
    return context;
};