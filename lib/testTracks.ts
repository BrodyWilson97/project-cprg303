
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

export const tracks = [
    {
        title: 'Test Track',
        src: '../assets/sample-3s.mp3',
        author: 'Test Author',
        thumbnail: 'https://via.placeholder.com/150',
    },
    {
        title: 'Its a Beautiful Day',
        src: '../assets/testFiles/a_beautiful_day.mp3',
        author: 'Trinix ft Rushawn',
        thumbnail: 'https://via.placeholder.com/150',
    },
    {
        title: 'We Are the World',
        src: '../assets/testFiles/We_Are_The_World.mp3',
        author: 'Michael Jackson',
        thumbnail: 'https://via.placeholder.com/150',
    },
];