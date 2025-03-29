import supabase from "./db";

export async function getPublicFileUrl(bucketName: string, filePath: string){
    return supabase.storage.from(bucketName).getPublicUrl(filePath).data.publicUrl;
};

export async function listFiles(bucketName: string){
    const { data, error } = await supabase
        .storage
        .from(bucketName)
        .list('user',)
        
    if (error) {
        console.error('Error listing files:', error);
        return [];
    }
    console.log('Files:', data);
    return data;
};

//TODO add error, modularity?? user id as foldername
export async function streamFile(bucketName: string, userId: string, fileName: string){
    const filePath = `${userId}/${fileName}`;
    console.log(filePath);
    const { data } = await supabase
  .storage
  .from(bucketName)
  .createSignedUrl(filePath, 10000)
  return data;
}



 export async function uploadFile(bucketName: string, file: File){
//     //const img = file.assets[0];

//     const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });

//     const filePath = `${user!.id}/${new Date().getTime()}.${img.type === 'image' ? 'png' : 'mp4'}`;
//     const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';

//     const {error} = await supabase.storage.from('files').upload(filePath, decode(base64), { contentType });
//     if (error) {
//         console.error('Error uploading file:', error);
//         return;
//     }
//     console.log('File uploaded successfully');
 }

export async function deleteFile(bucketName: string, filePath: string){
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