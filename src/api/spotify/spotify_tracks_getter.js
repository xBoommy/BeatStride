/* eslint-disable prettier/prettier */
import Spotify_token from './spotify_token';
const apiPrefix = 'https://api.spotify.com/v1/playlists';

export default async (playlistUri) => {
  //console.log('in tracks getter:' + playlistUri);
  const playlistID = playlistUri.split(':').pop();
  const uri = `${apiPrefix}/${playlistID}/tracks`;
  const spotify_token = await Spotify_token();
  const res = await fetch(uri, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${spotify_token}`,
    },
  });

  const json = await res.json();

  if (!res.ok) {
    return [];
  }
  const { items } = json;

  if (items.length === 0) {
    return [];
  }

  return items.map(item => ({
    id: item.track.id,
    title: item.track.name,
    artist: item.track.album.artists.length >= 1 ? item.track.album.artists[0].name : 'undefined',
    imageUri: item.track.album.images.length >= 1 ? item.track.album.images[0].url : 'undefined',
    trackUri: item.track.uri,
  }));
};
