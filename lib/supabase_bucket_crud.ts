import supabase from "./db";
import {decode} from 'base64-arraybuffer';

//functions to retrieve/upload/delete to bucket for images and audio files
export async function listBucket(bucketName: string, filePath: string) {

    const { data, error } = await supabase
    .storage
    .from(bucketName)
    .list(filePath, )
        
    if (error) {
        console.error('Error listing files:', error);
        return [];
    }
    return data;
}

export async function uploadBucket(bucketName: string, filePath: string, encodedFile: string, fileType: string) {
    let contentType = "";

    if(fileType === 'audio') {
        contentType = 'audio/mpeg';
        filePath = filePath + ".mp3"; // Add .mp3 extension for audio files
    }
    else if(fileType === 'image') {
        contentType = 'image/png';
        filePath = filePath + ".png"; // Add .png extension for image files
    }
    else{
        console.error('Invalid file type');
    }

    const { data, error } = await supabase  
    .storage  
    .from(bucketName)  
    .upload(filePath, decode(encodedFile), {  
        contentType: contentType
    })

    if (error) {
    console.error('Upload failed:', error);
    } else {
    console.log('File uploaded successfully:', data);
    }

    return data;
}

export async function deleteBucket(bucketName: string, filePath: string) {

    const { error } = await supabase
        .storage
        .from(bucketName)
        .remove([filePath]);
        
    if (error) {
        console.error('Error deleting file:', error);
        return true;
    }
    console.log('File deleted successfully');
    return false;
}