import supabase from "./db";
import { song } from "../constants/types";
import {listBucket, uploadBucket, deleteBucket, getFilePath} from "./supabase_bucket_crud";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

//list all files in the music bucket for the users folder and the corresponding image and artist name
//based on the song id
//we only need to call the file in the music bucket when we want to stream it
export async function listFiles(userId: string){
    const filePath = `${userId}`;

    //table data
    const { data, error } = await supabase
    .from('songData')
    .select('*')
    .eq('userId', userId);

    if (error) {
        console.error('Error fetching song data:', error);
        return null;
    }

    // Combine the data into one array based on the `id`
    const combinedData: song[] = await Promise.all(
        data.map(async (songItem) => {
            let imgUrl = await getFileURL("imagefiles", userId, songItem.id, 100000, "image");

            if (!imgUrl) {
                imgUrl = 'https://community.magicmusic.net/media/unknown-album.294/full?d=1443476842';
            }

            return {
                ...songItem,
                imageURL: imgUrl,
            };
        })
    );

    return combinedData ? combinedData : [];
}

//get temporary signed url for the file to be streamed when user clicks on it from listed file names
//or to get the image url for the song
export async function getFileURL(bucketName: string, userId: string, fileId: string, timeout: number, fileType: string){

    let filePath = getFilePath(userId, fileId, fileType);

    const { data, error } = await supabase
    .storage
    .from(bucketName)
    .createSignedUrl(filePath, timeout)

    if (!data) {
        return null;
    }

    if (error) {
        console.error('fetch file url failed:', error);
        } 
    return data.signedUrl;
}

//upload song to music bucket, image to image bucket and artist name/song name to table and song id to all
export async function uploadFile(userId: string, songName: string, encodedMusicFile: string, encodedImgFile: string | null, artistName: string){

    //file path for each bucket (each folder is the user id) and each file is given a unique id 
    //as the file "name" attribute so we can reference it in the image bucket and song data table

    if(encodedMusicFile === null || encodedMusicFile  === undefined || encodedMusicFile .length === 0){
        console.error('Encoded music file is empty or null');
        return;
    }

    //insert artist name and song name to table
    const { data } = await supabase
    .from('songData')
    .insert([
        { artistName: artistName, songName: songName, userId: userId} 
    ])
    .select("id")

    console.log("song data: " + data + "\n");
    if(data){

    //upload to buckets
    //music bucket
    const response = await uploadBucket("musicfiles", userId, data[0].id, encodedMusicFile, "audio");

    //image bucket
    if(encodedImgFile !== null){
    const uploadResponseImage = await uploadBucket("imagefiles", userId, data[0].id, encodedImgFile, "image");
    }

    //return data upload id
    return data[0].id;
    }

}

export async function deleteFile(userId: string, fileId: string){

    //music bucket
    const musicError = await deleteBucket("musicfiles", userId, fileId, "audio");

    //image bucket
    const imageError = await deleteBucket("imagefiles", userId, fileId, "image");

    //table
    const { error } = await supabase
    .from('songData')
    .delete()
    .eq('id', fileId);

    if (error || musicError || imageError) {
        console.error('Error deleting file:', error || musicError || imageError);
    }
}

//add playlist name to table then use the id to add id to the corresponding songs in songData table
export async function uploadPlaylist(userId: string, playlistName: string, songs: song[]){

    const { data, error } = await supabase
    .from('playlists')
    .insert([
        { playlistName: playlistName, userId: userId} 
    ])
    .select("id")

    if (error) {
        console.error('Error creating playlist:', error);
        return null;
    }

    //array of song ids to be added to the playlist
    const songIds = songs.map((song) => song.id);

    //add to songdata
    const { error: songError } = await supabase
    .from('songData')
    .update({ playlistId: data[0].id })
    .eq('userId', userId) 
    .in('id', songIds); //where each song id = the song id column and user id = user id in the RLS policy

    if (songError) {
        console.error('Error adding songs to playlist:', songError);
        return null;
    }
    console.log("playlist songs added");
    return data[0].id;
}

export async function listPlaylists(userId: string) {
    const { data, error } = await supabase
        .from('playlists')
        .select('*')
        .eq('userId', userId);

    if (error) {
        console.error('Error fetching playlists:', error);
        return null;
    }

    return data;
}

export async function deletePlaylist(playlistId: string) {
    // Delete the playlist from the database
    const { error } = await supabase
        .from('playlists')
        .delete()
        .eq('id', playlistId);

    if (error) {
        console.error('Error deleting playlist:', error);
        return null;
    }

    console.log('Playlist deleted successfully:', playlistId);
    return true;
}

export async function editPlaylist(playlistId: string, newPlaylistName: string) {
    // Update the playlist name in the database
    const { error } = await supabase
        .from('playlists')
        .update({ playlistName: newPlaylistName })
        .eq('id', playlistId);

    if (error) {
        console.error('Error updating playlist:', error);
        return null;
    }

    return true;
}
