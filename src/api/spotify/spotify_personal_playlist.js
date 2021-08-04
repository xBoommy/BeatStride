import {authorize} from 'react-native-app-auth';

/**
 * This is a method that gets all the personal playlists of a spotify account.
 * 
 * @return   An array of playlists objects.
 */
export default async () => {

  const config = {
    clientId: '715a7736d82c4216be65be4772890fa4',
    clientSecret: '8ef4b2ac68334d7ea6f65e1b56cdf40f',
    redirectUrl: 'com.okta.dev-05488202:/callback',
    scopes: ['playlist-read-private', 'playlist-read-collaborative', 'user-read-private', 'user-read-email'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
    },
  };

  const apiPrefix = 'https://api.spotify.com/v1/me/playlists';

  try {
    const authState = await authorize(config);
    const {accessToken} = authState;

    const res = await fetch(apiPrefix, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });


    const json = await res.json(); //theres a limit of 20 results shown per call
    const items = json.items;

    //First 20
    let result = items.map(item => ({
      id: item.id,
      title: item.name,
      artist: item.artists ? item.artists[0].name : 'undefined',
      imageUri: item.images ? item.images[0].url : 'undefined',
      playlistUri: item.uri,
      totalSongs: item.tracks.total,
    }));

    //If there is more
    if (json.total > 20) {
        const iterations = Math.ceil(json.total / 20);
        for (let i = 1; i < iterations; i++) {
            const nextBatch = await getPersonalPlaylist(i * 20, accessToken);
            result = result.concat(nextBatch);
        }
    }

    return result;
  } catch (e) {
    console.log('Access denied');
    return [];
  }
};

/**
 * This is a helper method that returns an array of 20 or less playlists objects.
 * 
 * @param {Number} offset      The number of playlists to ignore before taking.
 * @param {String} accessToken The access token to be able to call the web api method and get the playlists.
 * @return                     An array of 20 or less playlists objects.
 */
const getPersonalPlaylist = async (offset, accessToken) => {

    const apiPrefix = 'https://api.spotify.com/v1/me/playlists';
    const uri = apiPrefix + `?offset=${offset}&limit=20`;
    const res = await fetch(uri, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await res.json();
    const items = json.items;

    let result = items.map(item => ({
      id: item.id,
      title: item.name,
      artist: item.artists ? item.artists[0].name : 'undefined',
      imageUri: item.images ? item.images[0].url : 'undefined',
      playlistUri: item.uri,
      totalSongs: item.tracks.total,
    }));

    return result;
};
