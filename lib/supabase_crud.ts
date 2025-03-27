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


// TODO   //move to filespage??
//   const handleSelectFile = async () => {
//     const result = await DocumentPicker.getDocumentAsync({ type: "audio/*" }).then((file) => {
//       uploadFile("musicfiles", file as any);
//       console.log(file);
//     });
    
//   }

// export async function uploadFile(bucketName: string, file: File){
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
// }