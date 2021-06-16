
export const SET_TRACKSFORRUN = 'SET_TRACKSFORRUN';

export const setTracksForRun = tracks => {
  return async dispatch => {
    dispatch({type: SET_TRACKSFORRUN, tracks: tracks});
  };
};
