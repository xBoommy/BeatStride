import {
    auth as SpotifyAuth,
    remote as SpotifyRemote,
    ApiScope,
  } from 'react-native-spotify-remote';
  
import SingleTrackGetter from '../../../api/spotify/spotify_single_track_getter';
  
export const spotifyConfig = {
  clientID: '715a7736d82c4216be65be4772890fa4',
  redirectURL: 'com.okta.dev-05488202:/callback',
  scopes: [
    ApiScope.AppRemoteControlScope,
    ApiScope.UserFollowReadScope,
    ApiScope.PlaylistReadPrivateScope,
  ],
};


/**
 * A method that plays the track from defaultUri or simply resumes playing the previous track.
 * 
 * @param {String} defaultUri  A link to a default track to be played if no track is available.
 */
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
    console.log('Problem with Playing: ...', e);
  }
}


/**
 * This method plays the tracks specified by the uri by overriding the current player.
 * 
 * @param {String} uri  A String representing the song to be played immediately.
 */
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
  

/**
 * This method pauses the Spotify Player.
 */
export async function pause() {
  try {
    const isConnected = await SpotifyRemote.isConnectedAsync(); //returns a boolean, true/false
    if (!isConnected) {
      //connect first then next
      const session = await SpotifyAuth.authorize(spotifyConfig);
      await SpotifyRemote.connect(session.accessToken);
    }
    await SpotifyRemote.pause();
  } catch (e) {
    console.error('Error with pausing: ', e);
  }
}
  

/**
 * This method skips to the next track in queue.
 */
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


/**
 * This method goes back to the previous track.
 */
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


/**
 * This method retrieves the track object of the current playing track on Spotify.
 * 
 * @returns   A track object.
 */
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
  } catch (e) {}
}
