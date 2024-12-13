import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { auth } from '../firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { database } from '../firebaseConfig';
import { ref, set } from 'firebase/database';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login Successful', 'Welcome back!');
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  const writeUserData = async (userId, name, email) => {
    try {
      await set(ref(database, 'users/' + userId), {
        username: name,
        email: email,
      });
      console.log('Data written successfully');
    } catch (error) {
      console.error('Error writing data:', error.message);
    }
  };


  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ marginBottom: 15, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 15, borderBottomWidth: 1 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
