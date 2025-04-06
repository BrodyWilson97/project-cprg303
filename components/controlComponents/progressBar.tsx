import React from 'react';
import {  Text, StyleSheet, View } from 'react-native';
import { useAudioPlayerContext } from '../../context/audio-player-context';
import Slider from '@react-native-community/slider';

export const ProgressBar = () => {
    const {
        position, 
        duration,
        handleSlidingComplete,
        handleSliderValueChange,
    } = useAudioPlayerContext();

    // Format time (mm:ss)
    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Slider 
                style={styles.progressBar} 
                minimumValue={0} 
                maximumValue={duration} 
                value={position}
                onValueChange={handleSliderValueChange}
                onSlidingComplete={handleSlidingComplete}
                minimumTrackTintColor="#6B46C1" 
                maximumTrackTintColor="#A3A3A3" 
                thumbTintColor="#000"
            />
            <View style={styles.timeContainer}>
                <Text>{formatTime(position)} / </Text>
                <Text>{formatTime(duration)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    progressBar: {
        width: '100%',
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});