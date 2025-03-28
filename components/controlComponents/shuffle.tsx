import React from 'react';
import { useAudioPlayerContext } from "../../context/audio-player-context";
import { TouchableOpacity, View, Text } from 'react-native';


export const Shuffle = () => {
    const {
        isShuffle,
        shuffle,
    } = useAudioPlayerContext();
    
        const handleOnClick = () => {
            shuffle;
        };
    
    return (
        <TouchableOpacity 
            style={{ 
                backgroundColor: isShuffle ? '#B794F4' : 'transparent' 
            }}
        onPress={handleOnClick}>
            <Text>SHUFFLE</Text>
        </TouchableOpacity>
    );
};