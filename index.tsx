import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { auth, database } from './firebase'; // Firebase configuration file
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

export default function LoginScreen() {
  const [email, setEmail] = useState<string>(''); // Email state
  const [password, setPassword] = useState<string>(''); // Password state
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  // Handle user login
  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Email and password are required.');
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login Successful', 'Welcome back!');
    } catch (error) {
      console.error('Login Error:', error); // Log full error for debugging
      Alert.alert('Login Failed', (error as Error).message || 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Write user data to Firebase Realtime Database
  const writeUserData = async (userId: string, name: string, email: string): Promise<void> => {
    try {
      await set(ref(database, `users/${userId}`), {
        username: name,
        email: email,
      });
      console.log('Data written successfully');
    } catch (error) {
      console.error('Error writing data:', (error as Error).message || 'Unknown error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title={isLoading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={isLoading} />
    </View>
  );
}

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
  },
});
