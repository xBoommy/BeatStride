import Spotify_token from './spotify_token';

/**
 * This is the method to obtain all the track objects from a playlist.
 * 
 * @param {String} playlistUri  The link to the playlist that contains the playlist id.
 * @param {Number} totalSongs   The number of songs the playlist contains.
 * @return                      An array containing all track objects in the playlist.
 */
export default async (playlistUri, totalSongs) => {

    const numberOfIterations = Math.ceil(totalSongs / 100);
    //console.log('total Songs is: ', totalSongs);

    let resultantPlaylist = [];

    for(let i = 0; i < numberOfIterations; i++) {
        const results = await tracks_getter_helper(playlistUri, i * 100); //offset = 0, 100, 200 ...
        resultantPlaylist = resultantPlaylist.concat(results);
    }

    //console.log(resultantPlaylist.length);

    return resultantPlaylist;
};

/**
 * This is a helper method that obtains 100 or less track objects from a playlist.
 * 
 * @param {String} playlistUri  The link to the playlist that contains the playlist id.
 * @param {Number} offset       The number of songs to ignore before taking.
 * @returns                     An array of 100 or less track objects.
 */
async function tracks_getter_helper(playlistUri, offset) {

    const apiPrefix = 'https://api.spotify.com/v1/playlists';
    const playlistID = playlistUri.split(':').pop();
    const uri = `${apiPrefix}/${playlistID}/tracks?offset=${offset}`;
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
  
    const goodData = items.filter(x => x.track.id !== null);
  
    //console.log(goodData);
    //console.log(items[0].track.duration_ms);
  
    return goodData.map(item => ({
      id: item.track.id,
      title: item.track.name,
      artist: item.track.album.artists.length >= 1 ? item.track.album.artists[0].name : 'undefined',
      imageUri: item.track.album.images.length >= 1 ? item.track.album.images[0].url : 'undefined',
      trackUri: item.track.uri,
      duration: item.track.duration_ms,
    }));
};
