import React from 'react';
import { TouchableOpacity, Text, StyleProp, View } from 'react-native';
import { useAudioPlayerContext } from '../../context/audio-player-context';
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons


// StyleProp<any> is a generic type of StyleProp... as opposed to StyleProp<ViewStyle> or StyleProp<TextStyle>, 
// which are for styling <View> and <Text> respectively
// can change later if needed
export const PrevTrack = ({ style }: { style?: StyleProp<any> }) => {
    const {
        playPreviousTrack,
    } = useAudioPlayerContext();

        const handleOnClick = async () => {
            try {
                await playPreviousTrack();
            } catch (err) {
                console.error("Failed to play next track:", err);
            }
        };

    return (
            <TouchableOpacity 
                
                onPress={handleOnClick}>
                <Ionicons name="play-back" size={30} color="#000" /> {/* Previous Icon */}
            </TouchableOpacity>
    );
};
