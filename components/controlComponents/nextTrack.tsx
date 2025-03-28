import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useAudioPlayerContext } from '../../context/audio-player-context';

export const NextTrack = () => {
    const {
        playNextTrack,
    } = useAudioPlayerContext();

    const handleOnClick = async () => {
        playNextTrack();
    };

    return (
        <TouchableOpacity onPress={handleOnClick}>
            <Text>⏭</Text>
        </TouchableOpacity>
    );
};