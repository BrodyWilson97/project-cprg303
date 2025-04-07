import React from "react";
import { Stack } from "expo-router";
import { AudioPlayerProvider } from "../context/audio-player-context";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Layout: React.FC = () => {
  return (
    <SafeAreaProvider>
      <AudioPlayerProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#fff" },
          }}>
        </Stack>
      </AudioPlayerProvider>
    </SafeAreaProvider>
  );
};

export default Layout;