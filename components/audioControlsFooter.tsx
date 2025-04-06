import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAudioPlayerContext } from '../context/audio-player-context';
import { NextTrack } from './controlComponents/nextTrack';
import { PrevTrack } from './controlComponents/prevTrack';
import { TogglePlayPause } from './controlComponents/togglePlayPause';
import { testTracks } from '../lib/testTracks';
import { Shuffle } from './controlComponents/shuffle';
import { Repeat } from './controlComponents/repeat';
import { ProgressBar } from './controlComponents/progressBar';
import { useRouter } from "expo-router";


 export const AudioPlayerControlsFooter = () => {
  const {
      currentTrack,
      playTrack,
  } = useAudioPlayerContext();
    const router = useRouter();

  // Hard coded Testing code
  const handleOnPlay = async () => {
      playTrack(testTracks[0]);
  };
  // End testing code

  const onPressFooterBar = async () => {
    router.push("/playbackPage");
  };

  return (
      <TouchableOpacity 
        style={styles.footerContainer}
        onPress={onPressFooterBar}
        activeOpacity={0.9}
      >
        <View style={styles.topRow}>        
          <Text style={styles.nowPlayingText}>{currentTrack?.title || 'No track selected'}</Text>
            <View style={styles.controls}>
              <PrevTrack/>
              <TogglePlayPause/>
              <NextTrack/>
              <Shuffle/>
              <Repeat/>
          </View>
        </View>
        
        <ProgressBar/>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 90,
    left: 16,
    right: 16,
    backgroundColor: '#B794F4',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
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
    marginRight: 12,
  },

  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // React Native 0.71+ — otherwise use marginRight
  },
});


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E9D8FD',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 16,
//   },
//   searchBar: {
//     backgroundColor: '#D6BCFA',
//     width: '100%',
//     maxWidth: 400,
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     borderRadius: 50,
//     marginTop: 24, // lowered slightly
//   },
//   icon: {
//     color: '#000',
//     fontSize: 24,
//     marginHorizontal: 8,
//   },
//   searchInput: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     color: '#000',
//     fontSize: 16,
//     paddingHorizontal: 8,
//   },
//   tabNavigation: {
//     backgroundColor: '#B794F4',
//     width: '100%',
//     maxWidth: 400,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 12,
//     borderRadius: 12,
//     marginBottom: 24,
//     marginTop: 12, // added spacing
//   },
//   tabItem: {
//     alignItems: 'center',
//   },
//   tabIcon: {
//     color: '#000',
//     fontSize: 24,
//   },
//   tabLabel: {
//     fontSize: 14,
//     color: '#000',
//   },
//   thumbnails: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 16,
//     marginBottom: 24,
//   },
//   thumbnail: {
//     width: 100,
//     height: 130,
//     backgroundColor: '#CBD5E0',
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   nowPlaying: {
//     backgroundColor: '#B794F4',
//     width: '100%',
//     maxWidth: 400,
//     padding: 16,
//     borderRadius: 12,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   nowPlayingText: {
//     color: '#000',
//   },
//   controls: {
//     flexDirection: 'row',
//     gap: 16,
//     alignItems: 'center',
//   },
// });
