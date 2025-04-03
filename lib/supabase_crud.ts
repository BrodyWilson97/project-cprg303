import supabase from "./db";
import { song } from "../constants/types";
import {listBucket, uploadBucket, deleteBucket, getFilePath} from "./supabase_bucket_crud";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

//list all files in the music bucket for the users folder and the corresponding image and artist name
//based on the song id
//we only need to call the file in the music bucket when we want to stream it
export async function listFiles(userId: string){
    const filePath = `${userId}`;

    //image files
    const imgData = await listBucket("imagefiles", filePath);

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
    const combinedData: song[] = data;
    data.map(async (songItem) => {
        //get the image url for the song
        let imgUrl = await getFileURL("imagefiles", userId, songItem.id, 100000, "image");
        if (imgUrl?.length === 0) {
            imgUrl = 'https://community.magicmusic.net/media/unknown-album.294/full?d=1443476842';
        }

        if (imgUrl){
            songItem.imageURL = imgUrl;
        }
        // const imageUrl = await getFileURL("imagefiles", userId, songItem.id, 100000, "image");
        //     songItem.imageURL = imageUrl && imageUrl.length>0  ? imageUrl : 'https://community.magicmusic.net/media/unknown-album.294/full?d=1443476842';
        // })
    })

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

        console.log(data);

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

export async function deleteFile(userId: string, fileId: string){ {


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
}}

