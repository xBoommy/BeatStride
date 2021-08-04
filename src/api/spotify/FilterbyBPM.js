import BPMGetter from './spotify_bpm';
import Tracks_Getter from './spotify_tracks_getter';

/**
 * This is a method that returns a filtered array of tracks on success or null on error.
 * 
 * @param {Array} playlists     An array of playlist objects.
 * @param {Number} bpm          The recommended bpm as calculated by the goals set by user.
 * @param {Number} allowance    A value that determines the range +/- from bpm, music can be from.
 * @param {Function} onSuccess  A function that will be triggered if filter is successful.
 * @param {Function} onError    A function that will be triggered if filter is unsuccessful.
 * @return                      Either an Array of track(s), empty array or null if error occurs.
 */
export default async (playlists, bpm, allowance, onSuccess, onError) => {
    try{
        const UPPERLIMIT = (bpm + allowance);
        const LOWERLIMIT = (bpm - allowance) > 0 ? (bpm - allowance) : 0;

        const halfBPM = bpm/2;
        const halfLOWER = halfBPM - allowance;
        const halfUPPER = halfBPM + allowance;
        

        const doubleBPM = bpm*2;
        const doubleLOWER = doubleBPM - allowance;
        const doubleUPPER = doubleBPM + allowance;

        let arr = [];
        for (let i = 0; i < playlists.length; i++) {
            const tracksFromThisPlaylist = await Tracks_Getter(playlists[i].playlistUri, playlists[i].totalSongs);
            arr = arr.concat(tracksFromThisPlaylist);
        }
        
        //remove duplicates
        const uniqueArr = new Set(arr);
        arr = [...uniqueArr];

        const finalArr = [];
        for (let i = 0; i < arr.length; i++) {
            const thisBPM = await BPMGetter(arr[i].id);
            if ( (thisBPM >= LOWERLIMIT && thisBPM <= UPPERLIMIT) || 
                (thisBPM >= halfLOWER && thisBPM <= halfUPPER) || 
                (thisBPM >= doubleLOWER && thisBPM <= doubleUPPER) ) {

                finalArr.push(arr[i]);
            }
        }


        onSuccess(finalArr);
        return finalArr;
    } catch (error) {
        onError(error);
        return null;
    }
    
};
