import {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
    useEffect,
  } from 'react';
import { tracksPromise } from '../lib/testTracks';



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

// export const AudioPlayerProvider = ({
//     children,
//     }: {
//     children: ReactNode;
//     }) =>{
//     const [currentTrack,setCurrentTrack] = useState<Track>(tracks[0]);
//     const contextValue= {
//         currentTrack,
//         setCurrentTrack,
//     };

//     return (
//         <AudioPlayerContext.Provider value={contextValue}>
//         {children}
//         </AudioPlayerContext.Provider>
//     );
// };

export const useAudioPlayerContext = (): AudioPlayerContextType => {

    const context = useContext(AudioPlayerContext);

    if (context === undefined) {
        throw new Error(
        'useAudioPlayerContext must be used within an AudioPlayerProvider'
        );
    }

    return context;
};