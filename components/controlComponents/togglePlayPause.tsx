import React from 'react';
import { useAudioPlayerContext } from "../../context/audio-player-context";
import { TouchableOpacity, View, Text } from 'react-native';


export const TogglePlayPause = () => {
    const {
        isPlaying,
        togglePlayPause,
    } = useAudioPlayerContext();

    const handleOnClick = async () => {
        togglePlayPause();
    };

    return (
        <View>
            <TouchableOpacity onPress={handleOnClick}>
                <Text>{isPlaying ? '⏸' : '▶️'}</Text>
            </TouchableOpacity>
        </View>
    )
};