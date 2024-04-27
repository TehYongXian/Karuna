import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Auth from './components/Auth';
import TodoList from './components/TodoList';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState('');

  const handleLogin = (token) => {
    setAuthToken(token);
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <TodoList authToken={authToken} />
      ) : (
        <Auth setIsAuthenticated={setIsAuthenticated} handleLogin={handleLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
