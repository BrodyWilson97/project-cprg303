import React from 'react';
import { useAudioPlayerContext } from "../../context/audio-player-context";
import { TouchableOpacity, View, Text } from 'react-native';


export const Repeat = () => {
    const {
        isRepeat,
        repeat,
    } = useAudioPlayerContext();
    
        const handleOnClick = () => {
            repeat;
        };
    
    return (
        <TouchableOpacity 
            style={{ 
                backgroundColor: isRepeat ? '#B794F4' : 'transparent' 
            }}
            onPress={handleOnClick}>
            <Text>REPEAT</Text>
        </TouchableOpacity>
    );
}; 
