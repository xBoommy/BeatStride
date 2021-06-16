import Spotify_token from './spotify_token';
const apiPrefix = 'https://api.spotify.com/v1/audio-features/';

export default async (trackId) => {

  const uri = apiPrefix + trackId;
  const spotify_token = await Spotify_token();

  const res = await fetch(uri, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${spotify_token}`,
    },
  });

  const json = await res.json();
  //console.log('BPM is: ');
  //console.log(json.tempo);
  return json.tempo;
};
