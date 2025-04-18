import React from 'react';
import { signOut } from "../lib/supabase_auth";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';

export default function SettingsPage() {
  const menuItems = ["Account", "Content and Display", "Privacy", "Storage", "Notifications", "About"];

  function handleLogOut(): void {
    signOut();
    router.push("/");
  }

  return (
    <View style={styles.container}>
      {/* Home Icon in Top Right */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push("/homePage")}>
          <AntDesign name="home" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Settings Options */}
      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <View key={index} style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemText}>{item}</Text>
              <Text style={styles.menuItemArrow}>&#9654;</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9D8FD',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  topBar: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  menu: {
    flex: 1,
    marginBottom: 24,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E0',
    paddingBottom: 16,
    marginBottom: 16,
  },
  menuItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 18,
  },
  menuItemArrow: {
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: '#6B46C1',
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 8,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
