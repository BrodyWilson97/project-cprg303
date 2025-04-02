type uploadProps = {
    userID: string; // Explicitly typed as string
    addSong: (song: song) => void; // call parent function to update state
  };
  
  type song = {
    name: string;
    id: string;
    artistName: string;
  };

  export {uploadProps, song};