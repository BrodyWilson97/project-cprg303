import React from 'react';
import { useAudioPlayerContext } from "../../context/audio-player-context";
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons



export const Repeat = () => {
    const {
        isRepeat,
        repeat,
    } = useAudioPlayerContext();
    
        const handleOnClick = () => {
            repeat();
        };
    
    return (
        <TouchableOpacity 
            style={{ 
                borderWidth: isRepeat ? 1 : 0,
                borderRadius: 5, 
                }}
            onPress={handleOnClick}
        >
            <Ionicons name="repeat-outline" 
                color="#000" 
                size={20} 
                padding={2}
            />
        </TouchableOpacity>
    );
}; 
