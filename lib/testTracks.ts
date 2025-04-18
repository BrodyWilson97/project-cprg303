import { Track } from '../context/audio-player-context';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';

// const loadAudioFiles = async () => {
//     const files = [
//         require('../assets/sample-3s.mp3'),
//         require('../assets/testFiles/a_beautiful_day.mp3'),
//         require('../assets/testFiles/We_Are_The_World.mp3'),
//     ];

//     const assets = await Asset.loadAsync(files);
//     return assets.map(asset => asset.uri);
// };

// Hard coded for testing
export const testTracks: Track[] = [
    {
        id: 1,
        title: 'We Are the World',
        uri: Asset.fromModule(require('../assets/testFiles/We_Are_The_World.mp3')).uri,
        artist: 'Michael Jackson',
        thumbnail: 'https://via.placeholder.com/150',
    },
    {
        id: 2,
        title: 'Its a Beautiful Day',
        uri: Asset.fromModule(require('../assets/testFiles/a_beautiful_day.mp3')).uri,
        artist: 'Trinix ft Rushawn',
        thumbnail: 'https://via.placeholder.com/150',
    },
    {
        id: 3,
        title: 'Test Track',
        uri: Asset.fromModule(require('../assets/testFiles/sample-3s.mp3')).uri,
        artist: 'Test Author',
        thumbnail: 'https://via.placeholder.com/150',
    },
];

// export const tracksPromise = () => loadAudioFiles().then(uris => [
//     {
//         title: 'Test Track',
//         src: uris[0],
//         author: 'Test Author',
//         thumbnail: 'https://via.placeholder.com/150',
//     },
//     {
//         title: 'It’s a Beautiful Day',
//         src: uris[1],
//         author: 'Trinix ft Rushawn',
//         thumbnail: 'https://via.placeholder.com/150',
//     },
//     {
//         title: 'We Are the World',
//         src: uris[2],
//         author: 'Michael Jackson',
//         thumbnail: 'https://via.placeholder.com/150',
//     },
// ]);

// export const tracks = [
//     {
//         id: 1,
//         title: 'Test Track',
//         src: '../assets/sample-3s.mp3',
//         author: 'Test Author',
//         thumbnail: 'https://via.placeholder.com/150',
//     },
//     {
//         id: 2,
//         title: 'Its a Beautiful Day',
//         src: '../assets/testFiles/a_beautiful_day.mp3',
//         author: 'Trinix ft Rushawn',
//         thumbnail: 'https://via.placeholder.com/150',
//     },
//     {
//         id: 3,
//         title: 'We Are the World',
//         src: '../assets/testFiles/We_Are_The_World.mp3',
//         author: 'Michael Jackson',
//         thumbnail: 'https://via.placeholder.com/150',
//     },
// ];