import supabase from "./db";
import { decode, encode } from 'base64-arraybuffer';

type file = {
    name: string;
    id: string;
};
//list all files in users folder based on their id
export async function listFiles(bucketName: string, userId: string){
    const filePath = `${userId}`;

    const { data, error } = await supabase
        .storage
        .from(bucketName)
        .list(filePath, )
        
    if (error) {
        console.error('Error listing files:', error);
        return [];
    }
    
    // Map the data to an array of file objects
    const files: file[] = data.map((item) => ({
        name: item.name || 'Unknown',
        id: item.id,
    }));
    
    return files;
};

//get temporary signed url for the file to be streamed when user clicks on it from listed file names
export async function streamFile(bucketName: string, userId: string, fileName: string){
    const filePath = `${userId}/${fileName}`;
    const { data, error } = await supabase
    .storage
    .from(bucketName)
    .createSignedUrl(filePath, 10000)

    if (!data) {
        console.error('Error streaming file:', data);
        return null;
    }

    if (error) {
        console.error('Stream failed:', error);
        } 

        console.log(data);

    return data.signedUrl;
}



 export async function uploadFile(bucketName: string, userId: string, fileName: string, encodedFile: string) {

    const filePath = `${userId}/${fileName}`;

    if(encodedFile === null || encodedFile === undefined || encodedFile.length === 0){
        console.error('Encoded file is empty or null');
        return;
    }

    const { data, error } = await supabase  
    .storage  
    .from(bucketName)  
    .upload(filePath, decode(encodedFile), {  
        contentType: 'audio/mpeg'  
    })

    if (error) {
    console.error('Upload failed:', error);
    } else {
    console.log('File uploaded successfully:', data);
    }

 }

export async function deleteFile(bucketName: string, userId: string, fileName: string){
    const filePath = `${userId}/${fileName}`;

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