/* eslint-disable prettier/prettier */
import BPMGetter from './api/spotify_bpm_getter';
import Tracks_Getter from './api/spotify_tracks_getter';

export default async (playlists, bpm, allowance) => {
    const UPPERLIMIT = (bpm + allowance);
    const LOWERLIMIT = (bpm - allowance) > 0 ? (bpm - allowance) : 0;
    let arr = [];
    for (let i = 0; i < playlists.length; i++) {
        const tracksFromThisPlaylist = await Tracks_Getter(playlists[i].playlistUri);
        //returns an array of tracks
        arr = arr.concat(tracksFromThisPlaylist);
        //console.log(arr);
    }
    //remove duplicates
    const uniqueArr = new Set(arr);
    arr = [...uniqueArr];

    // console.log('Finish Concating... arr is:');
    // console.log(arr);

    const finalArr = [];
    for (let i = 0; i < arr.length; i++) {
        const thisBPM = await BPMGetter(arr[i].id);
        if (thisBPM >= LOWERLIMIT && thisBPM <= UPPERLIMIT) {
            finalArr.push(arr[i]);
        }
    }
    // console.log('finalArr:');
    // console.log(finalArr);

    return finalArr;
};
