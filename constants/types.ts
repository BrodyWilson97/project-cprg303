type uploadProps = {
    data: string; // base64 encoded data
    uri: string;// file name
    type: string; // file type (e.g., "audio/mpeg")
  };
  
  type song = {
    id: string;
    artistName: string;
    songName: string;
    //musicURL: string;
    imageURL: string; // imageURL can be null
  };

  type playlist = {
    id: string;
    playlistName: string;
  };
  

  export {uploadProps, song, playlist};