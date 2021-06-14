/* eslint-disable prettier/prettier */
/* eslint-disable no-bitwise */
import {insertPlaylist,deletePlaylist,fetchPlaylists} from './db';

export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const SET_PLAYLIST = 'SET_PLAYLIST';
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST';
export const SET_TRACKSFORRUN = 'SET_TRACKSFORRUN';

function stringHash(string) { //for playlist id
  let hash = 0;
  if (string.length === 0) {
      return hash;
  } else {
      let val;
      for (let i = 0; i < string.length; i++) {
          val = string.charCodeAt(i);
          hash = ((hash << 5) - hash) + val;
          hash = hash & hash;
      }
      return hash;
  }
}


export const addPlaylist = (playlist) => {
    const hashID = stringHash(playlist.id);
    return async dispatch => {
        try {
            await insertPlaylist(hashID, playlist.title, playlist.artist, playlist.imageUri, playlist.playlistUri);

            console.log('Playlist added');
            dispatch({
                type: ADD_PLAYLIST,
                playlist: playlist,
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    };
};

export const loadPlaylists = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaylists();
      // console.log('playlist loaded');
      // console.log('playlist dbResult: ');
      // console.log(dbResult.rows._array);
      dispatch({type: SET_PLAYLIST, playlists: dbResult.rows._array});
    } catch (e) {
      throw e;
    }
  };
};

export const removePlaylist = id => {
  return async dispatch => {
    try {
      await deletePlaylist(id);
      console.log('playlist removed');
      dispatch({type: DELETE_PLAYLIST, id: id});
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};

export const setTracksForRun = tracks => {
  return async dispatch => {
    dispatch({type: SET_TRACKSFORRUN, tracks: tracks});
  };
};
