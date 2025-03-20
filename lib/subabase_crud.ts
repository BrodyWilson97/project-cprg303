import supabase from "./db";
export async function getPublicFileUrl(bucketName: string, filePath: string){
    return supabase.storage.from(bucketName).getPublicUrl(filePath).data.publicUrl;
};
// // Example usage
// const fileUrl = getPublicFileUrl('your-bucket', 'uploads/user123/profile.png');
// console.log('Public File URL:', fileUrl);
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

export async function streamFile(bucketName: string, folderName: string, fileName: string){
    const { data } = await supabase
  .storage
  .from(bucketName)
  .getPublicUrl('${folderName}/${fileName}')
  return data;
}