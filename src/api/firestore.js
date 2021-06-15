import firebase from "./firebase";
import * as Authentication from "../../api/auth";

const user_id = Authentication.getCurrentUserId();
const db = firebase.firestore();



// addPlaylist = (object, onSuccess, onError) =>{

//     db.collections("Users/").push({object})
// }

// subscribePlaylist

// Users/$user_id/Playlist/

