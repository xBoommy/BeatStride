import firebase from "./firebase";
import * as Authentication from "./auth";

// const auth = firebase.auth();
const db = firebase.firestore();

const db_createAccount1 = (credentials, onSuccess, onError) => {
    try {
        db.collection("users").doc(credentials.uid).set(credentials);
        return onSuccess();
    } catch (error) {
        return onError(error);
    }
}

const db_createAccount2 = (region) => {
    try {
        db.collection("region").doc(region).update({participants:firebase.firestore.FieldValue.increment(1)})
    } catch (error) {

    }
}

const db_createAccount3 = (uid, region) => {
    try {
        db.collection("region").doc(region).collection("users").doc(uid).set({distance: 0})
    } catch (error) {
        
    }
}

/**Store user information & update region fields upon account creation
 * 
 * @param {object} credentials 
 * @param {function} onSuccess 
 * @param {function} onError 
 */
export const db_createAccount = (credentials, onSuccess, onError) => {
    db_createAccount1(credentials, onSuccess, onError);
    // db_createAccount2(credentials.region);
    // db_createAccount3(credentials.uid, credentials.region);
}

//Upload profile picture: ***** This uses Firebase.storage, not firestore *****
export const storage_uploadProfilePic = async (uri) => {
    const user_id = Authentication.getCurrentUserId();
    //name can be user_id too, to avoid storing too many pictures
    const path = `profilephotos/${user_id}/${user_id}.jpg`;
    try {
        const response = await fetch(uri);
        const file = await response.blob();
        console.log(file);
        firebase.storage().ref(path).put(file);
    } catch (e) {
        console.error('Upload profile picture failed: ', e);
    }
}

export const storage_retrieveProfilePic = async (onSuccess, onError) => {
    const user_id = Authentication.getCurrentUserId();
    const path = `profilephotos/${user_id}/${user_id}.jpg`;
    try {
        //console.log('trying to get file....');
        const file = await firebase.storage().ref(path).getDownloadURL();
        //console.log('reached here, file is:');
        const profilePicture = {uri: file};
        onSuccess(profilePicture);
    } catch (e) {
        onError(e);
    }
}

//Add run record to history
const db_updateUserHistory = ( record ) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).collection("history").doc(record.id).set(record);
    } catch (error) {
        console.log("Fail history record")
    }
}
//Update cummulative distance
const db_updateUserTotalDistance = ( record ) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).update({totalDistance: firebase.firestore.FieldValue.increment(record.distance)})
    } catch (error) {
        console.log("fail user update distance record")
    }
}
//Update run count
const db_updateUserRunCount = () => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).update({runCount: firebase.firestore.FieldValue.increment(1)})   
    } catch (error) {
        console.log("fail user run count record")
    }
}

//Update longest Distance
const db_updateLongestDistance = async(record) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        const currLongest = await db.collection("users").doc(user_id).get().then(
            (snapshot) => {
                const userData = snapshot.data();
                return userData.longestDistance;
            }
        );
        console.log("checking distance")
        console.log(currLongest)
        console.log(record.distance)
        if (record.distance > currLongest) {
            try {
                db.collection("users").doc(user_id).update({longestDistance: record.distance})   
            } catch (error) {
                console.log("fail to update longest distance")
            }
        }
    } catch (error) {
        console.log(error)
    }
}

//Update fastest pace
const db_updateFastestPace = async(record) => {
    const user_id = Authentication.getCurrentUserId()
    const pace = record.duration / (record.distance/1000) 
    try {
        const currFastest = await db.collection("users").doc(user_id).get().then(
            (snapshot) => {
                const userData = snapshot.data();
                return userData.fastestPace; 
            }
        );
        // console.log("checking pace")
        // console.log(currFastest)
        // console.log(pace)
        if (pace < currFastest || currFastest == 0) {
            try {
                db.collection("users").doc(user_id).update({fastestPace: pace})   
            } catch (error) {
                console.log("fail to update fastest pace")
            }
        }
    } catch (error) {
        console.log(error)
    }
}

// Used after run complete to record.
export const db_recordRun = async(record, onSuccess, onError) => {
    try {
        //Update personal info
        db_updateUserHistory(record);
        db_updateUserTotalDistance(record);
        db_updateUserRunCount();
        db_updateLongestDistance(record);
        db_updateFastestPace(record);
        
        return onSuccess();
    } catch (error) {
        return onError(error)
    }
}

//Update cummulative distance
const db_decreaseUserTotalDistance = ( distance ) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).update({totalDistance: firebase.firestore.FieldValue.increment(-distance)})
    } catch (error) {
        console.log("fail user update distance record")
    }
}
//Update run count
const db_decreaseUserRunCount = () => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).update({runCount: firebase.firestore.FieldValue.increment(-1)})   
    } catch (error) {
        console.log("fail user run count record")
    }
}

/**Remove Run History */
const db_removeRunHistory = ( recordID ) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        // console.log(recordID);
        db.collection("users").doc(user_id).collection("history").doc(recordID).delete();
    } catch (error) {
        console.log("Fail to delete Run History record");
    }
}

// Used remove run record.
export const db_removeRun = async(recordID , distance) => {
    try {
        //Update personal info
        db_removeRunHistory(recordID);
        db_decreaseUserRunCount();
        db_decreaseUserTotalDistance(distance);

    } catch (error) {
        console.log(error)
    }
}

/**get all the events that user is participating in, as an array - NOT WORKING */ 
export const db_getUserData = async() => {
    const user_id = Authentication.getCurrentUserId()
    try {
        const user_snapshot = await db.collection('users').doc(user_id).get();
        try{
            const user = await user_snapshot.data();
            return user
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }
}


/**Obtain user's run history from docs in 'history' collection under user doc - WORKS
 * 
 * @param {function} onSuccess 
 * @param {function} onError 
 * @returns {array} historyList => list of run records in history
 */
export const db_historyView = (onSuccess, onError) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id)
        .collection("history")
        .onSnapshot((collection) => {
            const historyList = collection.docs.map((doc) => doc.data());
            return onSuccess(historyList);
        })
    } catch (error) {
        return onError(error);
    }
}

/**Add playlist */
export const db_addUserPlaylists = ( playlist ) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).collection("playlists").doc(playlist.id).set(playlist);
    } catch (error) {
        console.log("Fail playlist record")
    }
}

/**Remove playlist */
export const db_removeUserPlaylists = ( playlist ) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        // console.log(playlist.id);
        db.collection("users").doc(user_id).collection("playlists").doc(playlist.id).delete();
    } catch (error) {
        console.log("Fail to delete playlist record");
    }
}

/**Obtain user's playlists from docs in 'playlists' collection under user doc - WORKS
 * 
 * @param {function} onSuccess 
 * @param {function} onError 
 * @returns {array} playlists => list of playlists
 */
 export const db_playlists = (onSuccess, onError) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id)
        .collection("playlists")
        .onSnapshot((collection) => {
            const playlists = collection.docs.map((doc) => doc.data());
            return onSuccess(playlists);
        })
    } catch (error) {
        return onError(error);
    }
}

export const db_calibrateStride = async( strideDistance) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).update({strideDistance: strideDistance})
        console.log("Stride Distance Updated")
    } catch (error) {
        console.log(error)
    }
}

export const db_getUserDataSnapshot = async( onSuccess, onError) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id)
        .onSnapshot((documentSnapshot) => {
            const userData = documentSnapshot.data()
            return onSuccess(userData);
        })
    } catch (error) {
        return onError(error);
    }
}

export const db_editGoals = async( distance, time, onSuccess) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).update({goalDistance: distance, goalTime: time})
        console.log("Goals Updated")
        return onSuccess();
    } catch (error) {
        console.log(error)
    }
}

/**Obtain users in system - WORKS
 * 
 * @param {function} onSuccess 
 * @param {function} onError 
 * @returns {array} historyList => list of run records in history
 */
 export const db_userList = (onSuccess, onError) => {
    try {
        db.collection("users")
        .onSnapshot((collection) => {
            const userList = collection.docs.map((doc) => doc.data());
            return onSuccess(userList);
        })
    } catch (error) {
        return onError(error);
    }
}

// List of Friends
export const db_friendsList = (onSuccess, onError) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users")
        .doc(user_id).collection("friends")
        .where('status', '==', 'friend')
        .onSnapshot((collection) => {
            const userList = collection.docs.map((doc) => doc.data());
            return onSuccess(userList);
        })
    } catch (error) {
        return onError(error);
    }
}

// List of users requesting friend
export const db_requestList = (onSuccess, onError) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users")
        .doc(user_id).collection("friends")
        .where('status', '==', 'request')
        .onSnapshot((collection) => {
            const userList = collection.docs.map((doc) => doc.data());
            return onSuccess(userList);
        })
    } catch (error) {
        return onError(error);
    }
}

// List of pending friend users
export const db_pendingList = (onSuccess, onError) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users")
        .doc(user_id).collection("friends")
        .where('status', '==', 'pending')
        .onSnapshot((collection) => {
            const userList = collection.docs.map((doc) => doc.data());
            return onSuccess(userList);
        })
    } catch (error) {
        return onError(error);
    }
}

//Get other user's data
export const db_getOtherDataSnapshot = async( uid, onSuccess, onError) => {
    const user_id = uid
    try {
        db.collection("users").doc(user_id)
        .onSnapshot((documentSnapshot) => {
            const userData = documentSnapshot.data()
            return onSuccess(userData);
        })
    } catch (error) {
        return onError(error);
    }
}


//Add friend status
const db_setFriendStatus = ( uid1, uid2, status ) => {
    try {
        db.collection("users").doc(uid1).collection("friends").doc(uid2).set({uid: uid2, status: status});
        // console.log("success")
    } catch (error) {
        console.log("Fail to set friend status")
    }
}

//Update friend status
const db_updateFriendStatus = ( uid1, uid2, status ) => {
    try {
        db.collection("users").doc(uid1).collection("friends").doc(uid2).update({status: status});
        // console.log("success")
    } catch (error) {
        console.log("Fail to update friend status")
    }
}

//delete friend status
const db_deleteFriendDoc = ( uid1, uid2 ) => {
    try {
        db.collection("users").doc(uid1).collection("friends").doc(uid2).delete();
    } catch (error) {
        console.log("Fail to remove friend doc")
    }
}

//Request Friend
export const db_requestFriend = async( friend_id ) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        //update user
        db_setFriendStatus(user_id, friend_id, "pending");
        //update friend
        db_setFriendStatus(friend_id, user_id, "request");
    } catch (error) {
        console.log("Fail to send friend request")
    }
}

//Withdraw Friend Request
//Reject Friend
export const db_withdrawRejectRequest = async( friend_id ) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        //update user
        db_deleteFriendDoc(user_id, friend_id);
        //update friend
        db_deleteFriendDoc(friend_id, user_id);
    } catch (error) {
        console.log("Fail to withdraw friend request")
    }
}

//Accept Friend
export const db_acceptFriend = async( friend_id ) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        //update user
        db_updateFriendStatus(user_id, friend_id, "friend");
        //update friend
        db_updateFriendStatus(friend_id, user_id, "friend");
    } catch (error) {
        console.log("Fail to accept  friend request")
    }
}

export const db_friendStatus = async(friend_id, onExist, onNotExist) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        const docRef = db.collection("users").doc(user_id).collection("friends").doc(friend_id)
        // console.log("here")

        docRef.get().then((docSnapshot) => {
            // console.log("doc exists?", docSnapshot.exists)
            if (docSnapshot.exists) {
                docRef.onSnapshot((documentSnapshot) => {
                    const userData = documentSnapshot.data()
                    // console.log("userData", userData)
                    return onExist(userData);
                })     
            } else {
                return onNotExist();
            }
        })
    } catch (error) {
        console.log("fail to check status", error)
    }
}





//SAMPLE DB FUNCTION
export const functionName = async( params, onSuccess, onError) => {
    try {

        return onSuccess();
    } catch (error) {
        return onError(error);
    }
}