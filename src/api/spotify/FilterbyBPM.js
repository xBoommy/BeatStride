import BPMGetter from './spotify_bpm';
import Tracks_Getter from './spotify_tracks_getter';

export default async (playlists, bpm, allowance) => {
    const UPPERLIMIT = (bpm + allowance);
    const LOWERLIMIT = (bpm - allowance) > 0 ? (bpm - allowance) : 0;
    let arr = [];
    for (let i = 0; i < playlists.length; i++) {
        const tracksFromThisPlaylist = await Tracks_Getter(playlists[i].playlistUri);
        arr = arr.concat(tracksFromThisPlaylist);
    }
    
    //remove duplicates
    const uniqueArr = new Set(arr);
    arr = [...uniqueArr];

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