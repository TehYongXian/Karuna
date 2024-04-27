import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoItem from './TodoItem';
import Auth from './Auth';
import { styles } from './styles';

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    loadTasks();
  }, []);
  
  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const handleLogin = (token) => {
    console.log('Login successful, token:', token);
  };

  const addTask = () => {
    if (text.trim() === '') {
      return;
    }
    const newTask = { id: Date.now(), text, completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setText('');
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const toggleCompleted = (id) => {
    const updatedTasks = tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task));
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const editTask = (id, newText) => {
    const updatedTasks = tasks.map(task => (task.id === id ? { ...task, text: newText } : task));
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      {!isAuthenticated ? (
        <Auth setIsAuthenticated={setIsAuthenticated} handleLogin={handleLogin} />
      ) : (
        <>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="New Task"
          />
          <Button title="Add Task" onPress={addTask} />
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : tasks.length === 0 ? (
            <Text style={styles.noTasksText}>No tasks yet</Text>
          ) : (
            <FlatList
              data={tasks}
              renderItem={({ item }) => (
                <TodoItem
                  task={item}
                  deleteTask={deleteTask}
                  toggleCompleted={toggleCompleted}
                  editTask={editTask}
                />
              )}
              keyExtractor={item => item.id.toString()}
            />
          )}
        </>
      )}
    </View>
  );
}