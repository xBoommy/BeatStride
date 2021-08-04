import Spotify_token from './spotify_token';

/**
 * This is a method that obtains a track object based on its track id.
 * 
 * @param {String} trackId   A string that represents the id of a track in Spotify's database.
 * @return                   A track object with its important details.
 */
export default async (trackId) => {

  const apiPrefix = 'https://api.spotify.com/v1/tracks';
  const uri = `${apiPrefix}/${trackId}`;
  const spotify_token = await Spotify_token();
  const res = await fetch(uri, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${spotify_token}`,
    },
  });

  const trackObj = await res.json();
  //console.log('trackObj:');
  //console.log(trackObj);

  if (!res.ok) {
    return undefined;
  }

//   console.log(trackObj.id);
//   console.log(trackObj.name);
//   console.log(trackObj.album.artists[0].name);
//   console.log(trackObj.album.images[0].url);
//   console.log(trackObj.uri);

  return {
      id: trackObj.id,
      title: trackObj.name,
      artist: trackObj.album.artists.length >= 1 ? trackObj.album.artists[0].name : 'undefined',
      imageUri: trackObj.album.images.length >= 1 ? trackObj.album.images[0].url : 'undefined',
      trackUri: trackObj.uri,
  };

};
