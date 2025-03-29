import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from 'expo-checkbox';

export default function App() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Harmoniq</Text>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              id="username"
              placeholder="Enter your username"
              style={styles.input}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              id="password"
              placeholder="Enter your password"
              secureTextEntry
              style={styles.input}
            />
          </View>
          <TouchableOpacity style={styles.button}>
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
            <Text style={styles.link}>New User?</Text>
          </View>
        </View>
      </View>  
    );
}

// commented out some styles for now, as they were giving me errors for some reason
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9D8FD',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    color: '#4A5568',
    fontSize: 24,
    marginBottom: 32,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    // spaceY: 24,
  },
  inputGroup: {
    // spaceY: 8,
  },
  label: {
    fontSize: 14,
    color: '#718096',
  },
  input: {
    width: '100%',
    padding: 12,
    borderColor: '#CBD5E0',
    borderWidth: 1,
    borderRadius: 8,
    // outline: 'none',
    // focus: {
    //   borderColor: '#9F7AEA',
    //   borderWidth: 2,
    // },
  },
  button: {
    width: '100%',
    backgroundColor: '#6B46C1',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  checkboxGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#4A5568',
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  link: {
    fontSize: 14,
    color: '#718096',
    textDecorationLine: 'underline',
  },
});
