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
                borderWidth: 1,
                borderColor: isRepeat ? "#000" : "transparent",
                borderRadius: 5, 
                }}
                onPress={(e) => {
                    e.stopPropagation();
                    handleOnClick()}}
        >
            <Ionicons name="repeat-outline" 
                color="#000" 
                size={20} 
                style={{ padding: 2}}
            />
        </TouchableOpacity>
    );
}; 
