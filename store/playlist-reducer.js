import {SET_TRACKSFORRUN} from './playlist-actions';

const initialState = {
    tracksForRun: [],
};


/**
 * This is a redux reducer for temporarily storing tracks.
 * 
 * @author NUS Orbital 2021 Team Maple
 */
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
