import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import  Slider  from '@react-native-community/slider';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Track, useAudioPlayerContext } from '../context/audio-player-context';
import { NextTrack } from '../components/controlComponents/nextTrack';
import { PrevTrack } from '../components/controlComponents/prevTrack';
import { TogglePlayPause } from '../components/controlComponents/togglePlayPause';
import { Shuffle } from '../components/controlComponents/shuffle';
import { Repeat } from '../components/controlComponents/repeat';
import { ProgressBar } from '../components/controlComponents/progressBar';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function NowPlayingScreen() {
  //get current playing track data for display
    const { 
        currentTrack,
        playTrack,
        togglePlayPause,
        playNextTrack,
        playPreviousTrack,
        seekToPosition,

    } = useAudioPlayerContext();

  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();

  //keep??
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      {/* Album Art Placeholder */}
      <Image
        source={{ uri: currentTrack?.thumbnail || 'https://via.placeholder.com/300' }}
        style={styles.albumArt}/>
      
      {/* Song Info */}
      <View style={styles.songInfoContainer}>
        <Text style={styles.songTitle}>{currentTrack?.title}</Text>
        <Text style={styles.artistName}>{currentTrack?.artist}</Text>
      </View>
      
      {/* Progress Bar */}
      {/* <Slider style={styles.progressBar} minimumValue={0} maximumValue={1} minimumTrackTintColor="#6B46C1" maximumTrackTintColor="#A3A3A3" thumbTintColor="#000"/> */}
      <ProgressBar/>

      {/* Music Controls */}
        <PrevTrack/>

        <TogglePlayPause/>

        <NextTrack/>

        <Shuffle/>

        <Repeat/>

      {/* <View style={styles.controls}>
  <TouchableOpacity>
    <Ionicons name="heart-outline" size={32} color="#000" />
  </TouchableOpacity>
  <TouchableOpacity>
    <Ionicons name="play-back" size={36} color="#000" />
  </TouchableOpacity>
  <TouchableOpacity onPress={handlePlayPause}>
    <Ionicons name={isPlaying ? 'pause' : 'play'} size={48} color="#000" />
  </TouchableOpacity>
  <TouchableOpacity>
    <Ionicons name="play-forward" size={36} color="#000" />
  </TouchableOpacity>
</View> */}

      
      {/* Volume Control */}
      {/*doesnt work yet*/}
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

  header: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
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