/* eslint-disable prettier/prettier */
import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
  ApiScope,
} from 'react-native-spotify-remote';

import SingleTrackGetter from './api/spotify_single_track_getter';

const spotifyConfig = {
  clientID: '715a7736d82c4216be65be4772890fa4',
  redirectURL: 'http://localhost:8888/callback',
  //tokenRefreshURL: 'http://192.168.1.9:3000/refresh',
  //tokenSwapURL: 'http://192.168.1.9:3000/swap',
  scopes: [
    ApiScope.AppRemoteControlScope,
    ApiScope.UserFollowReadScope,
    //ApiScope.PlaylistReadPrivateScope,
  ],
};

export async function play(defaultUri) { //To modify and take in playlist uri... or track Uri...,
//in late stages: Extract tracks using tracks getter, using the id, check bpm, then play..., alot of filtering on the spot to do
  try {
    const isConnected = await SpotifyRemote.isConnectedAsync(); //returns a boolean, true/false
    if (!isConnected) {
      const session = await SpotifyAuth.authorize(spotifyConfig);
      await SpotifyRemote.connect(session.accessToken);
      await SpotifyRemote.playUri(defaultUri);
    } else {
      //Alr connected block, mainly resuming...
      const state = await SpotifyRemote.getPlayerState();
      if (state.isPaused) {
        console.log('Resuming...');
        await SpotifyRemote.resume();
      }
      //If alr playing, then nothing
    }
  } catch (e) {
    console.error("Couldn't authorize with or connect to Spotify", e);
  }
}

export async function playDirect(uri) {
  try {
    const isConnected = await SpotifyRemote.isConnectedAsync(); //returns a boolean, true/false
    if (!isConnected) {
      const session = await SpotifyAuth.authorize(spotifyConfig);
      await SpotifyRemote.connect(session.accessToken);
    }
    await SpotifyRemote.playUri(uri);
  } catch (e) {
    console.error('Error with playDirect: ', e);
  }
}

export async function pause() {
  try {
    //const state = await SpotifyRemote.getPlayerState();
    //console.log('State before pausing:');
    //console.log(state);
    const isConnected = await SpotifyRemote.isConnectedAsync(); //returns a boolean, true/false
    if (!isConnected) { //connect first then next
      const session = await SpotifyAuth.authorize(spotifyConfig);
      await SpotifyRemote.connect(session.accessToken);
    }
    await SpotifyRemote.pause();
    //const stateAfter = await SpotifyRemote.getPlayerState();
    //console.log('State after pausing:');
    //console.log(stateAfter);
  } catch (e) {
    console.error('Error with pausing: ', e);
  }
}

export async function next() { //For normal playlist functions... for running... need another kind..
  try {
    const isConnected = await SpotifyRemote.isConnectedAsync(); //returns a boolean, true/false
    if (!isConnected) { //connect first then next
      const session = await SpotifyAuth.authorize(spotifyConfig);
      await SpotifyRemote.connect(session.accessToken);
    }
    await SpotifyRemote.skipToNext();

  } catch (e) {
    console.error('Error with skipping: ', e);
  }
}

export async function previous() {
  try {
    const isConnected = await SpotifyRemote.isConnectedAsync(); //returns a boolean, true/false
    if (!isConnected) {
      const session = await SpotifyAuth.authorize(spotifyConfig);
      await SpotifyRemote.connect(session.accessToken);
    }
    await SpotifyRemote.skipToPrevious();
  } catch (e) {
    console.error('Error with going previous: ', e);
  }
}

export async function getState() {
  try {
    const state = await SpotifyRemote.getPlayerState();
    return state.isPaused;
  } catch (e) {
    console.error('Error with getting state: ', e);
  }
}

export async function currentPlayingTrack() {
  try {
    const isConnected = await SpotifyRemote.isConnectedAsync();
    if (!isConnected) {
      const session = await SpotifyAuth.authorize(spotifyConfig);
      await SpotifyRemote.connect(session.accessToken);
    }
    const track = await SpotifyRemote.getPlayerState();
    // while (track === undefined) {
    //   track = await SpotifyRemote.getPlayerState();
    // }
    if (track) {
      const trackUri = track.track.uri;
      const trackID = trackUri.split(':').pop();
      const trackObj = await SingleTrackGetter(trackID);
      return trackObj;
    }
  } catch (e) {
    //Hide error message
    console.log('Error with currentPlayingTrack: ', e);
  }
}

//For RunningPlayer

export async function queueTracks(arrOfTracks) {
  try {
    const isConnected = await SpotifyRemote.isConnectedAsync();
    if (!isConnected) {
      const session = await SpotifyAuth.authorize(spotifyConfig);
      await SpotifyRemote.connect(session.accessToken);
    }
    for (let i = 0; i < arrOfTracks.length; i++) {
      await SpotifyRemote.queueUri(arrOfTracks[i].trackUri);
    }
  } catch (e) {
    console.error('Error with queueTracks: ', e);
  }
}
