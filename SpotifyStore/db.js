/* eslint-disable prettier/prettier */
import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('playlists.db');

//Used on App opening
export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS playlists (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, artist TEXT NOT NULL, imageUri TEXT NOT NULL, playlistUri TEXT NOT NULL, totalSongs INTEGER NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const insertPlaylist = (id, title, artist, imageUri, playlistUri, totalSongs) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO playlists (id, title, artist, imageUri, playlistUri, totalSongs)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [id, title, artist, imageUri, playlistUri, totalSongs],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                },
            );
        });
    });
    return promise;
};

export const fetchPlaylists = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM playlists',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                },
            );
        });
    });
    return promise;
};

//Deletes whole playlist, not tracks from playlist
export const deletePlaylist = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM playlists WHERE id=${id}`,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                },
            );
        });
    });
    return promise;
};
