/* eslint-disable prettier/prettier */
import Spotify_token from './spotify_token';
const apiPrefix = 'https://api.spotify.com/v1';

export default async ({offset, limit, q}) => {
  //limit is number of results ==> 1, offset, demo put 0, q is the query eg, title of track,
  const uri = `${apiPrefix}/search?type=playlist&limit=${limit}&offset=${offset}&q=${encodeURIComponent(q)}*`;
  const spotify_token = await Spotify_token();
  //console.log('search beginning, uri =', uri, 'token =', spotify_token);

  const res = await fetch(uri, {
      method: 'GET',
      headers: {
          Authorization: `Bearer ${spotify_token}`,
      },
  });

  const json = await res.json();
  //console.log('json:');
  //console.log(json);

  if (!res.ok) {
      return [];
  }

  const { playlists: { items } } = json;

  //console.log('searching:... One playlist only ...');
  if (items.length === 0) {
      return [];
  }

  //console.log(items);
  //console.log(items[0]);
  // console.log(items[0].id);
  // console.log(items[0].uri);

  //Searches playlists
  return items.map(item => ({
    id: item.id,
    title: item.name,
    artist: item.artists ? item.artists[0].name : 'undefined',
    imageUri: item.images ? item.images[0].url : 'undefined',
    playlistUri: item.uri,
  }));
};
