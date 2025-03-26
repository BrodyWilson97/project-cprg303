import React, { useState } from "react";
// filler icons
import {
    BsFillFastForwardFill,
    BsFillPauseFill,
    BsFillPlayFill,
    BsFillRewindFill,
    BsSkipEndFill,
    BsSkipStartFill,
    BsShuffle,
    BsRepeat,
  } from 'react-icons/bs';
import { Audio } from 'expo-av';
import { useAudioPlayerContext } from "../context/audio-player-context";



export const AudioControls = () => {

    // We should avoid placing all state data in a global context because every component that consumes the context data will update and re-render unnecessarily.
    // const { currentTrack, setCurrentTrack} = useAudioPlayerContext();
    const { currentTrack } = useAudioPlayerContext(); // currentTrack is Track Object
    const [isShuffle, setIsShuffle] = useState<boolean>(false);
    const [isRepeat, setIsRepeat] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);


    //cannot use <audio> tag in expo, needs changing
    return (






















        
        <div className="flex gap-4 items-center">
            <audio src={currentTrack.src} />
            <button onClick={() => {}}>
                <BsSkipStartFill size={20} />
            </button>
            <button onClick={() => {}}>
                <BsFillRewindFill size={20} />
            </button>
            <button onClick={() => setIsPlaying((prev) => !prev)}>
                {isPlaying ? (
                <BsFillPauseFill size={30} />
                ) : (
                <BsFillPlayFill size={30} />
                )}
            </button>
            <button onClick={() => {}}>
                <BsFillFastForwardFill size={20} />
            </button>
            <button onClick={() => {}}>
                <BsSkipEndFill size={20} />
            </button>
            <button onClick={() => setIsShuffle((prev) => !prev)}>
                <BsShuffle
                size={20}
                className={isShuffle ?'text-[#f50]' : ''}
                />
            </button>
            <button onClick={() => setIsRepeat((prev) => !prev)}>
                <BsRepeat
                size={20}
                className={isRepeat ? 'text-[#f50]' : ''}
                />
            </button>
        </div>
    );
};