// I may try to split up the context into multiple contexts in the future
// for better performance, maybe by doing a playlist context and a player/playback context

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
import { getFileURL } from '../lib/supabase_crud';
import { getUser } from "../lib/supabase_auth";

// ======================== Type Definitions ========================
export interface Track {
    id: number | string;           // Required for track comparison
    title: string;
    uri: string | null;          // Audio URI (local/remote)
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
    isSeeking: boolean;
    sliderValue: number;
    
    // Controls
    playTrack: (track: Track) => Promise<void>;
    togglePlayPause: () => Promise<void>;
    playNextTrack: () => Promise<void>;
    playPreviousTrack: () => Promise<void>;
    seekToPosition: (position: number) => Promise<void>;
    repeat: () => void,
    shuffle: () => void,
    handleSlidingComplete: (value: number) => Promise<void>;
    handleSliderValueChange: (value: number) => Promise<void>;
    
    // Playlist management
    setPlaylist: Dispatch<SetStateAction<Track[]>>;
    setCurrentTrack: Dispatch<SetStateAction<Track | null>>;

    setUserAudioPlayerContext: Dispatch<SetStateAction<string>>; //userID from supabase auth, set on home page
}

// ======================== Context Setup ========================
const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

// ======================== Provider Implementation ========================
export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    // hardcoded for testing
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    // testTracks hard coded for testing
    const [playlist, setPlaylist] = useState<Track[]>([]);
    const [userId, setUserAudioPlayerContext] = useState<string>(""); //userID from supabase auth, set on home page

    // Load and play a track
    const playTrack = async (track: Track) => {
        try {
            // Unload previous sound (if any)
            if (sound) {
                await sound.unloadAsync();
            }

            //get file URL from supabase
            const url = await getFileURL("musicfiles", userId, track.id.toString(), 10000, "audio"); //fetch the file URL from supabase
            track.uri = url; //set the uri of the track to the file URL

            // Load new sound
            if (track.uri === null) {
                (console.log("Track URI is null, unable to play."));
                return;
            }
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
        if (status.isLoaded && !isSeeking) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis || 0);
            setSliderValue(status.positionMillis);
    
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
            // Make sure the next track is different from the current one
            if (playlist[randomIndex].id === currentTrack.id) {
                const nextIndex = (randomIndex + 1) % playlist.length;
                await playTrack(playlist[nextIndex]);
                return;
            }
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

    const handleSliderValueChange = async (value: number) => {
        if (!sound) { return };
        setSliderValue(value);
        setIsSeeking(true);
    };
    
    const handleSlidingComplete = async (value: number) => {
        if (!sound) return;
        await sound.setPositionAsync(value);
        setPosition(value);
        setIsSeeking(false);
    };

    
    const repeat = () => {
        setIsRepeat(!isRepeat);
        console.log(isRepeat);
        setIsShuffle(false);
    };

    const shuffle = () => {
        setIsShuffle(!isShuffle);
        console.log(isShuffle);
        setIsRepeat(false);
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
        isSeeking,
        sliderValue,
        playTrack,
        togglePlayPause,
        playNextTrack,
        playPreviousTrack,
        seekToPosition,
        setPlaylist,
        setCurrentTrack,
        repeat,
        shuffle,
        handleSlidingComplete,
        handleSliderValueChange, 
        setUserAudioPlayerContext,   
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