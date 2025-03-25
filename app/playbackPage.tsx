import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import  Slider  from '@react-native-community/slider';

export default function NowPlayingScreen() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      {/* Album Art Placeholder */}
      <View style={styles.albumArt} />
      
      {/* Song Info */}
      <View style={styles.songInfoContainer}>
        <Text style={styles.songTitle}>Song Name</Text>
        <Text style={styles.artistName}>Artist Name</Text>
      </View>
      
      {/* Progress Bar */}
      <Slider style={styles.progressBar} minimumValue={0} maximumValue={1} minimumTrackTintColor="#6B46C1" maximumTrackTintColor="#A3A3A3" thumbTintColor="#000"/>
      
      {/* Music Controls */}
      <View style={styles.controls}>
        <TouchableOpacity>
          <Text style={styles.controlIcon}>❤️</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.controlIcon}>⏮️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          <Text style={styles.controlIcon}>{isPlaying ? '⏸️' : '▶️'}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.controlIcon}>⏭️</Text>
        </TouchableOpacity>
      </View>
      
      {/* Volume Control */}
      <View style={styles.volumeControl}>
        <Text style={styles.controlIcon}>🔊</Text>
        <Slider style={styles.volumeSlider} minimumValue={0} maximumValue={1} minimumTrackTintColor="#6B46C1" maximumTrackTintColor="#D1D5DB" thumbTintColor="#000"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  albumArt: {
    width: 300,
    height: 300,
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    marginBottom: 20,
  },
  songInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  songTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  artistName: {
    fontSize: 16,
    color: '#4B5563',
  },
  progressBar: {
    width: '80%',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  controlIcon: {
    fontSize: 32,
    color: '#000',
  },
  volumeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  volumeSlider: {
    flex: 1,
    marginLeft: 10,
  },
});