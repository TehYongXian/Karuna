import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    width: '80%',
    margin: 50,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  todoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 20,
  },
  todoItemText: {
    flex: 1,
    fontSize: 18,
  },
  editInput: {
    borderBottomWidth: 1,
    flex: 1,
    marginRight: 10,
  },
  noTasksText: {
    fontSize: 18,
    textAlign: 'center',
  },
});