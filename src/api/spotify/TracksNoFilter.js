import Tracks_Getter from './spotify_tracks_getter';

export default async (playlists, onSuccess, onError) => {
    try{

        let arr = [];
        for (let i = 0; i < playlists.length; i++) {
            const tracksFromThisPlaylist = await Tracks_Getter(playlists[i].playlistUri, playlists[i].totalSongs);
            arr = arr.concat(tracksFromThisPlaylist);
        }
        
        //remove duplicates
        const uniqueArr = new Set(arr);
        arr = [...uniqueArr];

        return onSuccess(arr);
    } catch (error) {
        return onError(error)
    }
    
};