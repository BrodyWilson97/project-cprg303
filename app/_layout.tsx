import React from "react";
import { Stack } from "expo-router";
import { AudioPlayerProvider } from "../context/audio-player-context";

const Layout: React.FC = () => {
  return (
      <AudioPlayerProvider>
        <Stack />
      </AudioPlayerProvider>
  );
};

export default Layout;