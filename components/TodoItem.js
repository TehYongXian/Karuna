import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput } from 'react-native';
import { styles } from './styles';

const checkedIcon = '✓';
const uncheckedIcon = '';

export default function TodoItem({ task, deleteTask, toggleCompleted, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTask(task.id, editedText);
    setIsEditing(false);
  };

  return (
    <View style={styles.todoItemContainer}>
      <TouchableOpacity onPress={() => toggleCompleted(task.id)} style={styles.checkbox}>
        <Text style={styles.checkboxText}>{task.completed ? checkedIcon : uncheckedIcon}</Text>
      </TouchableOpacity>
      {isEditing ? (
        <TextInput
          style={[styles.todoItemText, styles.editInput]}
          value={editedText}
          onChangeText={setEditedText}
          autoFocus
          onBlur={handleSave}
        />
      ) : (
        <Text style={[styles.todoItemText, { textDecorationLine: task.completed ? 'line-through' : 'none' }]}>
          {task.text}
        </Text>
      )}
      {!isEditing && (
        <>
          <Button title="Edit" onPress={handleEdit} />
          <Button title="X" onPress={() => deleteTask(task.id)} />
        </>
      )}
    </View>
  );
}
