/* eslint-disable prettier/prettier */
import Spotify_token from './spotify_token';
const apiPrefix = 'https://api.spotify.com/v1/tracks';

//Used in Spotify player controls, currentPlayingTracks
export default async (trackID) => {
  const uri = `${apiPrefix}/${trackID}`;
  const spotify_token = await Spotify_token();
  //console.log(uri);
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


//   if (items.length === 0) {
//     return [];
//   }
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
