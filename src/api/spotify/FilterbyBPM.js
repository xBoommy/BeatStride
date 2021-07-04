import BPMGetter from './spotify_bpm';
import Tracks_Getter from './spotify_tracks_getter';

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