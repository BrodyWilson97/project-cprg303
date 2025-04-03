type uploadProps = {
    userID: string; // Explicitly typed as string
    addSong: (song: song) => void; // call parent function to update state
  };
  
  type song = {
    name: string;
    id: string;
    artistName: string;
    songName: string;
    //musicURL: string;
    imageURL: string; // imageURL can be null
  };
  

  export {uploadProps, song};