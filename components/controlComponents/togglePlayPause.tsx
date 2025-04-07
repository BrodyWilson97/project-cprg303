import React from 'react';
import { useAudioPlayerContext } from "../../context/audio-player-context";
import { TouchableOpacity, View, Text, StyleProp } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons


// StyleProp<any> is a generic type of StyleProp... as opposed to StyleProp<ViewStyle> or StyleProp<TextStyle>, 
// which are for styling <View> and <Text> respectively
// can change later if needed
export const TogglePlayPause = ({ style }: { style?: StyleProp<any> }) => {
    const {
        isPlaying,
        togglePlayPause,
    } = useAudioPlayerContext();

    const handleOnClick = async () => {
        try {
            await togglePlayPause();
        } catch (err) {
            console.error("Failed to play next track:", err);
        }
    };

    return (
        <TouchableOpacity
        onPress={(e) => {
            e.stopPropagation();
            handleOnClick()}}
        >
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={48} color="#000" />
        </TouchableOpacity>
    )
};