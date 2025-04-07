import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useAudioPlayerContext } from '../context/audio-player-context';
import { NextTrack } from './controlComponents/nextTrack';
import { PrevTrack } from './controlComponents/prevTrack';
import { TogglePlayPause } from './controlComponents/togglePlayPause';
import { ProgressBar } from './controlComponents/progressBar';
import { useRouter } from "expo-router";
import FooterBar from './footerBar';


 export const AudioPlayerControlsFooter = () => {
  const {
      currentTrack,
      playTrack,
  } = useAudioPlayerContext();
    const router = useRouter();

  const onPressFooterBar = async () => {
    router.push("/playbackPage");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.audioBarContainer}
        onPress={onPressFooterBar}
        activeOpacity={0.9}
      >
        <View style={styles.topRow}> 
          <Image
                  source={{ uri: currentTrack?.thumbnail || 'https://via.placeholder.com/300' }}
                  style={styles.albumArt}/>

          <View style={styles.nowPlayingText}>       
            <Text style={styles.songTitle}>{currentTrack?.title || 'No track selected'}</Text>
            <Text style={styles.artist}>{currentTrack?.artist || 'No artist selected'}</Text>
          </View>
            <View style={styles.controls}>
              <PrevTrack/>
              <TogglePlayPause/>
              <NextTrack/>
              {/* <Shuffle/>
              <Repeat/> */}
          </View>
        </View>
        
        <ProgressBar/>
      </TouchableOpacity>
      <FooterBar/>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    backgroundColor: 'transparent',
    // flex: 1,
    // flexDirection: 'column',
    justifyContent: 'center',
  },
  audioBarContainer: {
    backgroundColor: '#B794F4',
    borderRadius: 12,
    width: '95%',
    padding: 12,
    margin: 10,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  nowPlayingText: {
    flex: 1,
    color: '#1A202C',
    fontSize: 14,
    fontWeight: '500',
  },

  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // React Native 0.71+ — otherwise use marginRight
    marginRight: 12,
  },

  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  artist: {
    fontSize: 14,
    color: '#4B5563',
  },

  albumArt: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
});
