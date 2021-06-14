/* eslint-disable prettier/prettier */
import {ADD_PLAYLIST,DELETE_PLAYLIST,SET_PLAYLIST, SET_TRACKSFORRUN} from './playlist-actions';

const initialState = {
    playlists : [],
    tracksForRun: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLAYLIST:
            //action.playlist is an playlist object
            return {
                playlists: [...state.playlists].concat([action.playlist]),
                tracksForRun: state.tracksForRun,
            };

        case SET_PLAYLIST:
            //action.playlists should be an array of playlist objects
            return {
                playlists: action.playlists,
                tracksForRun: state.tracksForRun,
            };

        case DELETE_PLAYLIST:
            //action.id refers to id of deleted playlist
            return {
                playlists: state.playlists.filter(x => x.id !== action.id),
                tracksForRun: state.tracksForRun,
            };

        case SET_TRACKSFORRUN:
            return {
                playlists: state.playlists,
                tracksForRun: action.tracks,
            };

        default:
            return state;
    }
};
