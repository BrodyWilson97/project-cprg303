import React from 'react';
import { TouchableOpacity, Text, View, StyleProp} from 'react-native';
import { useAudioPlayerContext } from '../../context/audio-player-context';
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons


// StyleProp<any> is a generic type of StyleProp... as opposed to StyleProp<ViewStyle> or StyleProp<TextStyle>, 
// which are for styling <View> and <Text> respectively
// can change later if needed
export const NextTrack = ({ style }: { style?: StyleProp<any> }) => {
    const {
        playNextTrack,
    } = useAudioPlayerContext();

    const handleOnClick = async () => {
        try {
            await playNextTrack();
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
                <Ionicons name="play-forward" size={30} color="#000" />
            </TouchableOpacity>
    );
};

// const style = StyleSheet.create({
//     controlIcon: {
//         fontSize: 24,
//         marginHorizontal: 10,
//     },
// });
