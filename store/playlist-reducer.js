/* eslint-disable prettier/prettier */
import {SET_TRACKSFORRUN} from './playlist-actions';

const initialState = {
    tracksForRun: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TRACKSFORRUN:
            return {
                tracksForRun: action.tracks,
            };

        default:
            return state;
    }
};
