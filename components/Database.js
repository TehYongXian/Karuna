import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('users.db');

export const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, username TEXT, password TEXT);',
      [],
      () => console.log('Database and table created successfully'),
      (_, error) => console.error('Error creating database', error)
    );
  });
};

export const signUp = (username, password, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO users (username, password) VALUES (?, ?);',
      [username, password],
      () => callback(),
      (_, error) => console.error('Error signing up', error)
    );
  });
};

export const signIn = (username, password, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM users WHERE username = ? AND password = ?;',
      [username, password],
      (_, { rows }) => {
        if (rows.length === 1) {
          callback(true);
        } else {
          callback(false);
        }
      },
      (_, error) => console.error('Error signing in', error)
    );
  });
};
