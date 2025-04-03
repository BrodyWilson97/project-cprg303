import { signUp } from "../lib/supabase_auth";
import { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function NewUser() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    
    const handleSignUp = async () => {
      setLoading(true);
      const error = await signUp(email, password);
  
      if (error) {
        console.error("Error signing up:", error.message);
      }
      else{
        setLoading(false);
        router.push("/homePage");
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create New Account</Text>
  
        <TextInput
          placeholder="Username"
          style={styles.input}
        />
  
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
  
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
  
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry
        />
  
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
  
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.link} onPress={() => router.push("/login")}>Log In</Text>
        </Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9D8FD',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 24,
  },
  input: {
    width: '80%',
    padding: 12,
    borderRadius: 8,
    borderColor: '#CBD5E0',
    borderWidth: 1,
    marginBottom: 16,
    backgroundColor: '#FFF',
  },
  button: {
    width: '80%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#6B46C1',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#718096',
  },
  link: {
    color: '#6B46C1',
    textDecorationLine: 'underline',
  },
});