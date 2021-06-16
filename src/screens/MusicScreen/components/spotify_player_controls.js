/* eslint-disable prettier/prettier */
import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
  ApiScope,
} from 'react-native-spotify-remote';

import SingleTrackGetter from '../../../api/spotify/spotify_single_track_getter';

const spotifyConfig = {
  clientID: '715a7736d82c4216be65be4772890fa4',
  redirectURL: 'http://localhost:8888/callback',
  tokenRefreshURL: 'http://192.168.1.9:3000/refresh',
  tokenSwapURL: 'http://192.168.1.9:3000/swap',
  scopes: [
    ApiScope.AppRemoteControlScope,
    ApiScope.UserFollowReadScope,
    ApiScope.PlaylistReadPrivateScope,
  ],
};

export async function play(defaultUri) {
  try {
    const isConnected = await SpotifyRemote.isConnectedAsync(); //returns a boolean, true/false
    if (!isConnected) {
      const session = await SpotifyAuth.authorize(spotifyConfig);
      await SpotifyRemote.connect(session.accessToken);
      await SpotifyRemote.playUri(defaultUri);
    } else {
      const state = await SpotifyRemote.getPlayerState();
      if (state.isPaused) {
        console.log('Resuming...');
        await SpotifyRemote.resume();
      }
    }
  } catch (e) {
    console.log("Problem with Playing: ...", e);
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
    const isConnected = await SpotifyRemote.isConnectedAsync(); //returns a boolean, true/false
    if (!isConnected) { //connect first then next
      const session = await SpotifyAuth.authorize(spotifyConfig);
      await SpotifyRemote.connect(session.accessToken);
    }
    await SpotifyRemote.pause();
  } catch (e) {
    console.error('Error with pausing: ', e);
  }
}

export async function next() {
  try {
    const isConnected = await SpotifyRemote.isConnectedAsync();
    if (!isConnected) {
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
    const isConnected = await SpotifyRemote.isConnectedAsync();
    if (!isConnected) {
      const session = await SpotifyAuth.authorize(spotifyConfig);
      await SpotifyRemote.connect(session.accessToken);
    }
    await SpotifyRemote.skipToPrevious();
  } catch (e) {
    console.error('Error with going previous: ', e);
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

/*
playSong(index) {

  playDirect(track[index])
  setTimeout(() => nextSong, track[index].duration)


}

nextSong() {
  clearTimeout();
  playSong(index + 1)
}

prevSong() {
  clearTimeout();
  playSong(index - 1);
}

*/