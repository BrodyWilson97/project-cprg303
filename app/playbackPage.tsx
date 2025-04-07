import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import  Slider  from '@react-native-community/slider';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Track, useAudioPlayerContext } from '../context/audio-player-context';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AudioPlayerControlsPage } from '../components/audioControlsPage';
import FooterBar from '../components/footerBar';


export default function NowPlayingScreen() {
  //get current playing track data for display
    const { 
        currentTrack,
        playTrack,
    } = useAudioPlayerContext();

  const [isPlaying, setIsPlaying] = useState(false);
  const [albumArt, setAlbumArt] = useState<string>('https://via.placeholder.com/300'); // Placeholder image URL
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getAlbumArt = async (item: Track) => {
    setLoading(true);
    // Fetch the album art from the track object or a default URL
    const url = currentTrack?.thumbnail;
    if (!url) return;
    setAlbumArt(url);
    setLoading(false);
  }

  useEffect(() => {
    getAlbumArt(currentTrack!);
  }
  , [currentTrack]);

  return (
 
    <View style={styles.container}>
      {/* Header */}
      {!loading && (
      <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => router.push('/playlist')}>
          <AntDesign name="heart" size={30} color="#000" />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => router.push('/homePage')}>
          <Ionicons name="home-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      {/* Album Art Placeholder */}
      <Image
        source={{uri: albumArt}}
        style={styles.albumArt}/>
      
      {/* Song Info */}
      <View style={styles.songInfoContainer}>
        <Text style={styles.songTitle}>{currentTrack?.title}</Text>
        <Text style={styles.artistName}>{currentTrack?.artist}</Text>
      </View>

      {/* Music Controls */}
      <AudioPlayerControlsPage/>
   
      {/* Volume Control */}
      {/*doesnt work yet*/}
      {/* <View style={styles.volumeControl}>
        <Text style={styles.controlIcon}>🔊</Text>
        <Slider style={styles.volumeSlider} minimumValue={0} maximumValue={1} minimumTrackTintColor="#6B46C1" maximumTrackTintColor="#D1D5DB" thumbTintColor="#000"/>
      </View> */}
      <View style={styles.jankyFooter}>
        <FooterBar/>
      </View>
      </>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    top: 60,
    paddingHorizontal: 15,
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
  jankyFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#F3E8FF',
  },
});