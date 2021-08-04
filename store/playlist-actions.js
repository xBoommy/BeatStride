export const SET_TRACKSFORRUN = 'SET_TRACKSFORRUN';

/**
 * This is a redux action method.
 * 
 * @author NUS Orbital 2021 Team Maple
 */
export const setTracksForRun = tracks => {
  return async dispatch => {
    dispatch({type: SET_TRACKSFORRUN, tracks: tracks});
  };
};
