import { useAudioPlayerContext } from "../context/audio-player-context";

// Code for the playList component
export function PlayList() {

    // We should avoid placing all state data in a global context because every component that consumes the context data will update and re-render unnecessarily.
    // const { currentTrack, setCurrentTrack} = useAudioPlayerContext();
    const { currentTrack} = useAudioPlayerContext();

    return (
        null
    );
};