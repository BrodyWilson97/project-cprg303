import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import { signIn, signOut } from "../lib/supabase_auth";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { AudioPlayerProvider } from "../context/audio-player-context";
import { AudioPlayerControlsFooter } from "../components/audioControlsFooter";
import { Playlist } from "../components/playList";

export default function App() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    const error = await signIn(email, password);

    if (!error) {
      setLoading(false);
      router.push("/homePage");
    }
  };

  return (
      <View style={styles.container}>

      <Text style={styles.title}>Harmoniq</Text>

      <View style={styles.form}>
        <View style={styles.inputEmail}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            id="email"
            placeholder="Enter your email"
            style={styles.input}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputPassword}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            id="password"
            placeholder="Enter your password"
            secureTextEntry
            style={styles.input}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.checkboxGroup}>
          <View style={styles.checkboxContainer}>
            <Checkbox />
            <Text style={styles.checkboxLabel}>Remember Username?</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox />
            <Text style={styles.checkboxLabel}>Remember Password?</Text>
          </View>
        </View>
        <View style={styles.links}>
          <Text style={styles.link}>Forgot Username?</Text>
          <Pressable onPress={() => router.push("/newUserScreen")}>
            <Text style={styles.link}>New User?</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9D8FD",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    color: "#4A5568",
    fontSize: 24, // smaller logo text
    marginBottom: 60, // reduced spacing below logo
  },
  form: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 100,
  },
  inputEmail: {
    marginBottom: 25,
  },

  inputPassword: {
    marginBottom: 85,
  },
  label: {
    fontSize: 18,
    color: "#718096",
  },
  input: {
    width: "100%",
    padding: 20,
    borderColor: "#CBD5E0",
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    width: "100%",
    backgroundColor: "#6B46C1",
    padding: 12,
    borderRadius: 2,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
  },
  checkboxGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#4A5568",
    marginLeft: 4,
  },
  links: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18
  },
  link: {
    fontSize: 14,
    color: "#718096",
    textDecorationLine: "underline",
  },
});
