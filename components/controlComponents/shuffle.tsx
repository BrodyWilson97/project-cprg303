import React from 'react';
import { useAudioPlayerContext } from "../../context/audio-player-context";
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons



export const Shuffle = () => {
    const {
        isShuffle,
        shuffle,
    } = useAudioPlayerContext();
    
        const handleOnClick = () => {
            shuffle();
        };
    
    return (
        <TouchableOpacity 
            style={{ 
                borderWidth: isShuffle ? 1 : 0,
                borderRadius: 5, 
            }}
            onPress={handleOnClick}
        >
            <Ionicons name="shuffle-outline" 
                color="#000"  
                size={26} 
                padding={2}
            /> {/* Shuffle Icon */}
        </TouchableOpacity>
    );
};