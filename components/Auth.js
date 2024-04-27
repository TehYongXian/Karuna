import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function Auth({ setIsAuthenticated, handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (username === '' && password === '') {
      const token = 'random-auth-token';
      handleLogin(token);
      setIsAuthenticated(true);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
