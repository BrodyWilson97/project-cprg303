import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useAudioPlayerContext } from '../../context/audio-player-context';

export const PrevTrack = () => {
    const {
        playPreviousTrack,
    } = useAudioPlayerContext();

    const handleOnClick = async () => {
        playPreviousTrack();
    };

    return (
        <TouchableOpacity onPress={handleOnClick}>
            <Text>⏮</Text>
        </TouchableOpacity>
    );
};
