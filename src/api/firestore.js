import firebase from "./firebase";
import * as Authentication from "./auth";

// const auth = firebase.auth();
const db = firebase.firestore();

/**
 * This method creates the account and stores the information in Firestore.
 * 
 * @param {Object} credentials   An object containing crucial information to be stored.
 * @param {Function} onSuccess   A function triggered upon success.
 * @param {Function} onError     A function triggered upon error.
 * @returns 
 */
export const db_createAccount = (credentials, onSuccess, onError) => {
    try {
        db.collection("users").doc(credentials.uid).set(credentials);
        return onSuccess();
    } catch (error) {
        return onError(error);
    }
}

//Upload profile picture: ***** This uses Firebase.storage, not firestore *****

/**
 * This method uploads or replaces a user's profile picture on Firebase storage.
 * 
 * @param {String} uri   A string identifying the image to be stored and used as the user's 
 *                       profile picture.
 */
export const storage_uploadProfilePic = async (uri) => {
    const user_id = Authentication.getCurrentUserId();
    const path = `profilephotos/${user_id}/${user_id}.jpg`;
    try {
        const response = await fetch(uri);
        const file = await response.blob();
        firebase.storage().ref(path).put(file);
    } catch (e) {
        console.error('Upload profile picture failed: ', e);
    }
}


/**
 * This method removes the profile picture stored on Firebase storage.
 */
export const storage_removeProfilePic = async () => {
    const user_id = Authentication.getCurrentUserId();
    const path = `profilephotos/${user_id}/${user_id}.jpg`;
    try {
        firebase.storage().ref(path).delete();
    } catch (e) {
        console.error('Upload profile picture failed: ', e);
    }
}


/**
 * This is a method for new users to upload a profile picture when registering.
 * 
 * @param {String} uid   A String representing the user id of a newly created account.
 * @param {String} uri   A string identifying the image to be stored and used as the user's 
 *                       profile picture.
 */
export const storage_newUserUploadProfilePic = async (uid, uri) => {

    const path = `profilephotos/${uid}/${uid}.jpg`;
    try {
        const response = await fetch(uri);
        const file = await response.blob();
        firebase.storage().ref(path).put(file);
    } catch (e) {
        console.error('Upload profile picture failed: ', e);
    }
}


/**
 * This is a method to retrieve a user's personal profile picture.
 * 
 * @param {Function} onSuccess  A function to be triggered upon success.
 * @param {Function} onError    A function to be triggered on error.
 */
export const storage_retrieveProfilePic = async (onSuccess, onError) => {
    const user_id = Authentication.getCurrentUserId();
    const path = `profilephotos/${user_id}/${user_id}.jpg`;
    try {
        const file = await firebase.storage().ref(path).getDownloadURL();
        const profilePicture = {uri: file};
        onSuccess(profilePicture);
    } catch (e) {
        onError(e);
    }
}


/**
 * This is a method to retrieve a user's profile picture using their user id.
 * 
 * @param {String} uid          A String representing user id of the user.
 * @param {Function} onSuccess  A function to be triggered upon success.
 * @param {Function} onError    A function to be triggered on error.
 */
export const storage_retrieveOtherProfilePic = async (uid, onSuccess, onError) => {
    const path = `profilephotos/${uid}/${uid}.jpg`;
    try {
        const file = await firebase.storage().ref(path).getDownloadURL();
        const profilePicture = {uri: file};
        onSuccess(profilePicture);
    } catch (e) {
        onError(e);
    }
}


/**
 * This is a helper method to add run record to the history collection on firestore.
 * 
 * @param {Object} record   An object that contains information about a run.
 */
const db_updateUserHistory = ( record ) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).collection("history").doc(record.id).set(record);
    } catch (error) {
        console.log("Fail history record")
    }
}


/**
 * This is a helper method to update cummulative distance ran by the user.
 * 
 * @param {Object} record   An object that contains information about a run.
 */
const db_updateUserTotalDistance = ( record ) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).update({totalDistance: firebase.firestore.FieldValue.increment(record.distance)})
    } catch (error) {
        console.log("fail user update distance record")
    }
}


/**
 * This is a helper method to increment the run count after each run.
 */
const db_updateUserRunCount = () => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).update({runCount: firebase.firestore.FieldValue.increment(1)})   
    } catch (error) {
        console.log("fail user run count record")
    }
}


/**
 * This is a helper method that checks and updates the longest distance ran by a user.
 * 
 * @param {Object} record   An object that contains information about a run.
 */
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


/**
 * This is a helper method that checks and updates the fastest pace of a user.
 * 
 * @param {Object} record   An object that contains information about a run.
 */
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


/**
 * This is the main method that updates a user's statistics after a run.
 * 
 * @param {Object} record       An object that contains information about a run.
 * @param {Function} onSuccess  A function to be triggered upon success.
 * @param {Function} onError    A function to be triggered on error.
 * @returns 
 */
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


/**
 * This is a helper method that decreases user's total distance when they delete a record in
 * their run history.
 * 
 * @param {Number} distance  A number representing the distance to decrement.
 */
const db_decreaseUserTotalDistance = ( distance ) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).update({totalDistance: firebase.firestore.FieldValue.increment(-distance)})
    } catch (error) {
        console.log("fail user update distance record")
    }
}


/**
 * This is a helper method to decrement the run count when the user deletes a record in 
 * their run history.
 */
const db_decreaseUserRunCount = () => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).update({runCount: firebase.firestore.FieldValue.increment(-1)})   
    } catch (error) {
        console.log("fail user run count record")
    }
}


/**
 * This is a helper method to delete the run record document in Firestore.
 * 
 * @param {String} recordID   A String representing the id of the record id stored in Firestore.
 */
const db_removeRunHistory = ( recordID ) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        // console.log(recordID);
        db.collection("users").doc(user_id).collection("history").doc(recordID).delete();
    } catch (error) {
        console.log("Fail to delete Run History record");
    }
}


/**
 * This is the main method that updates the user's statistics when the user deletes a run record.
 * 
 * @param {String} recordID   A String representing the id of the record id stored in Firestore.
 * @param {Number} distance   A number representing the distance to decrement.
 */
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


/**
 * Obtain user's run history from docs in 'history' collection under user doc.
 * 
 * @param {Function} onSuccess  A function to be triggered upon success.
 * @param {Function} onError    A function to be triggered on error.
 * @returns
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


/**
 * This method adds a playlist as a document in the user's playlists collection in Firestore.
 * 
 * @param {Object} playlist   A playlist object that contains information of a Spotify playlist.
 */
export const db_addUserPlaylists = ( playlist ) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).collection("playlists").doc(playlist.id).set(playlist);
    } catch (error) {
        console.log("Fail playlist record")
    }
}


/**
 * This method removes a playlist from the user's playlists collection in Firestore.
 * 
 * @param {Object} playlist   A playlist object that contains information of a Spotify playlist.
 */
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
 * @param {Function} onSuccess  A function to be triggered upon success.
 * @param {Function} onError    A function to be triggered on error.
 * @returns
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


/**
 * This method updates the stride distance field in the user's information in Firestore.
 * 
 * @param {Number} strideDistance 
 */
export const db_calibrateStride = async( strideDistance) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).update({strideDistance: strideDistance})
        console.log("Stride Distance Updated")
    } catch (error) {
        console.log(error)
    }
}


/**
 * This method retrieves a user's data from Firestore.
 * 
 * @param {Function} onSuccess  A function to be triggered upon success.
 * @param {Function} onError    A function to be triggered on error.
 * @returns 
 */
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


/**
 * This is a method to update Firestore of the goal set by the user.
 * 
 * @param {Number} distance       A number representing the distance goal of the user.
 * @param {Number} time           A number representing the duration in milliseconds the user
 *                                aims to clock.
 * @param {Function} onSuccess    A function to be triggered upon success.
 * @returns 
 */
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


/**
 * This is a method to obtain a list of users in system.
 * 
 * @param {Function} onSuccess  A function to be triggered upon success.
 * @param {Function} onError    A function to be triggered on error.
 * @returns
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


/**
 * This is a method to obtain the list of friends of the user.
 * 
 * @param {Function} onSuccess  A function to be triggered upon success.
 * @param {Function} onError    A function to be triggered on error.
 * @returns 
 */
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


/**
 * This is a method to obtain a list of friend requests.
 * 
 * @param {Function} onSuccess  A function to be triggered upon success.
 * @param {Function} onError    A function to be triggered on error.
 * @returns 
 */
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


/**
 * This is a method to obtain a list of pending friend requests of the user.
 * 
 * @param {Function} onSuccess  A function to be triggered upon success.
 * @param {Function} onError    A function to be triggered on error.
 * @returns 
 */
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


/**
 * This is a method to obtain data of other users.
 * 
 * @param {String} uid          A string representing the user id of other users.
 * @param {Function} onSuccess  A function to be triggered upon success.
 * @param {Function} onError    A function to be triggered on error.
 * @returns 
 */
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


/**
 * This is a helper method that initiates a friendship status between 2 users in a system.
 * 
 * @param {String} uid1     A string representing user id of the first user.
 * @param {String} uid2     A string representing user id of the other user.
 * @param {String} status   A string representing the new status/relationship between the 2 users.
 */
const db_setFriendStatus = ( uid1, uid2, status ) => {
    try {
        db.collection("users").doc(uid1).collection("friends").doc(uid2).set({uid: uid2, status: status});
        // console.log("success")
    } catch (error) {
        console.log("Fail to set friend status")
    }
}


/**
 * This is a helper method that updates a friendship status between 2 users in a system.
 * 
 * @param {String} uid1     A string representing user id of the first user.
 * @param {String} uid2     A string representing user id of the other user.
 * @param {String} status   A string representing the new status/relationship between the 2 users.
 */
const db_updateFriendStatus = ( uid1, uid2, status ) => {
    try {
        db.collection("users").doc(uid1).collection("friends").doc(uid2).update({status: status});
        // console.log("success")
    } catch (error) {
        console.log("Fail to update friend status")
    }
}


/**
 * This is the main method for a user to send a friend request to another user.
 * 
 * @param {String} friend_id   A string representing the user id of the other user.
 */
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


/**
 * This is the main method when a user rejects a friend request or
 * withdraws a friend request from other users.
 * 
 * @param {String} friend_id   A string representing the user id of the other user.
 */
export const db_withdrawRejectRequest = async( friend_id ) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        //update user
        db_setFriendStatus(user_id, friend_id, "none");
        //update friend
        db_setFriendStatus(friend_id, user_id, "none");
    } catch (error) {
        console.log("Fail to withdraw friend request")
    }
}


/**
 * This is the main method when a user accepts a friend request.
 * 
 * @param {String} friend_id   A string representing the user id of the other user.
 */
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


/**
 * This is the main method to determine the relation between 2 users.
 * 
 * @param {String} friend_id     A string representing the user id of the other user.
 * @param {Function} onExist     A function that triggers when the user with specified id exists.
 * @param {Function} onNotExist  A function that triggers when the user with specified id do not 
 *                               exist.
 */
export const db_getFriendStatus = async(friend_id, onExist, onNotExist) => {
    const user_id = Authentication.getCurrentUserId()

    let unsub
    try {
        const docRef = db.collection("users").doc(user_id).collection("friends").doc(friend_id)
        // console.log("here")

        docRef.get().then((docSnapshot) => {
            // console.log("doc exists?", docSnapshot.exists)
            if (docSnapshot.exists) {
                unsub = docRef.onSnapshot((documentSnapshot) => {
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


/**
 * This is a helper method that updates the display name of a user.
 * 
 * @param {Object} data   An object containing the new information of the user's account.
 */
const db_updateDisplayName = (data) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).update({displayName: data.displayName});
    } catch (error) {
        console.log(error)
    }
}


/**
 * This is a helper method that updates the user's profile description.
 * 
 * @param {Object} data   An object containing the new information of the user's account.
 */
const db_updateDescription = (data) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).update({description: data.description});
    } catch (error) {
        console.log(error)
    }
}


/**
 * This is the main method that updates the user's profile.
 * 
 * @param {Object} data   An object containing the new information of the user's account.
 * @param {Function} onSuccess  A function to be triggered upon success.
 * @param {Function} onError    A function to be triggered on error.
 * @returns 
 */
export const db_updateProfile = async(data, onSuccess, onError) => {
    try {
        db_updateDisplayName(data);
        db_updateDescription(data);
        return onSuccess()
    } catch (error) {
        return onError(error)
    }
}
