import { useState } from 'react';

export default function HomeScreen() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-purple-100 min-h-screen flex flex-col items-center p-4">
      {/* Search Bar */}
      <div className="bg-purple-200 w-full max-w-md flex items-center p-3 rounded-full mb-6">
        <span className="text-black text-xl mr-2">☰</span>
        <input
          type="text"
          placeholder="Search"
          className="flex-grow bg-transparent outline-none text-black placeholder-black"
        />
        <span className="text-black text-xl">🔍</span>
      </div>

      {/* Tab Navigation */}
      <div className="bg-purple-300 w-full max-w-md flex justify-around py-3 rounded-lg mb-6">
        <div className="flex flex-col items-center">
          <span className="text-black text-2xl">🎵</span>
          <p className="text-sm">Library</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-black text-2xl">📂</span>
          <p className="text-sm">Playlist</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-black text-2xl">⚙️</span>
          <p className="text-sm">Settings</p>
        </div>
      </div>

      {/* Recently Played Section */}
      <div className="w-full max-w-md text-center mb-6">
        <h2 className="text-2xl text-black">Recently Played</h2>
      </div>

      {/* Music Thumbnails */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="w-40 h-52 bg-gray-300 rounded-lg flex items-center justify-center">
          🖼️
        </div>
        <div className="w-40 h-52 bg-gray-300 rounded-lg flex items-center justify-center">
          🖼️
        </div>
      </div>

      {/* Now Playing Section */}
      <div className="bg-purple-300 w-full max-w-md p-4 rounded-lg flex justify-between items-center">
        <p className="text-black">Now Playing</p>
        <div className="flex gap-4 items-center">
          <button className="text-black text-2xl">⏪</button>

          <button
            className="text-black text-2xl"
            onClick={handlePlayPause}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>

          <button className="text-black text-2xl">⏩</button>
        </div>
      </div>
    </div>
  );
}  