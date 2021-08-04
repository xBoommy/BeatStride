import Spotify_token from './spotify_token';

/**
 * This is a method that returns the bpm value of a specific track based on its track id.
 * 
 * @param {String} trackId  The track id of a specific track on Spotify.
 * @return                  The bpm value as per recorded on Spotify's database.
 */
export default async (trackId) => {

  const apiPrefix = 'https://api.spotify.com/v1/audio-features/';
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
