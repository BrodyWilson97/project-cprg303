import {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
    useEffect,
  } from 'react';
import { tracks } from '../lib/testTracks';

export interface Track {
    title: string;
    src: string;
    author: string;
    thumbnail?: string;
};

interface AudioPlayerContextType {
    currentTrack: Track;
    setCurrentTrack: Dispatch<SetStateAction<Track>>;
};

const AudioPlayerContext = createContext<
    AudioPlayerContextType | undefined
>(undefined);

export const AudioPlayerProvider = ({
    children,
    }: {
    children: ReactNode;
    }) =>{
    const [currentTrack,setCurrentTrack] = useState<Track>(tracks[0]);
    // audioRef is used with HTML's <audio> tag to expose it's Play() and Pause() methods... won't work in expo
    // const audioRef = useRef<HTMLAudioElement>(null);
    const contextValue= {
        currentTrack,
        setCurrentTrack,
        // audioRef,
    };

    return (
        <AudioPlayerContext.Provider value={contextValue}>
            {children}
        </AudioPlayerContext.Provider>
    );
};

export const useAudioPlayerContext = (): AudioPlayerContextType => {

    const context = useContext(AudioPlayerContext);

    if (context === undefined) {
        throw new Error(
        'useAudioPlayerContext must be used within an AudioPlayerProvider'
        );
    }

    return context;
};