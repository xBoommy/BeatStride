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
    db_createAccount2(credentials.region);
    db_createAccount3(credentials.uid, credentials.region);
}





//Add run record to history
const db_updateUserHistory = ( record ) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).collection("history").add(record);
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
/**get all the events that user is participating in, as an array - NOT WORKING */ 
const db_getUserData = async() => {
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
/**update all events that user is participating in  REQUIRES: db_contributeEachEvent - NOT WORKING */
const db_updateAllUserEvents = (events, distance) => {
    try {
        for (let i = 0; i < events.length; i++){
            const event_id = events[i]
            db_contributeEachEvent(event_id, distance)
        }
    } catch (error) {
        console.log(error)
    }
}
/**update current event with user contribution - NOT WORKING */
const db_contributeEachEvent = (event_id, distance) =>{
    try {
        db.collection('events').doc(event_id).update({progress: firebase.firestore.FieldValue.increment(distance)});
    } catch (error) {
        console.log(error);
    }
}
/**update region total distance - NOT WORKING*/
const db_updateAllUserRegionTotalDistance = (region, distance) => {
    try {
        db.collection('region').doc(region).update({totalDisprogresstance: firebase.firestore.FieldValue.increment(distance)})
    } catch (error) {
        console.log(error)
    }
}
/**update region user distance - NOT WORKING*/
const db_updateAllUserRegionUserDistance = (region, distance) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection('region').doc(region).collection('users').doc(user_id).update({distance: firebase.firestore.FieldValue.increment(distance)})
    } catch (error) {
        console.log(error)
    }
}

export const db_recordRun = async(record, onSuccess, onError) => {
    try {
        //Update personal info
        db_updateUserHistory(record);
        db_updateUserTotalDistance(record);
        db_updateUserRunCount();

        //update event info
        const distance = record.distance
        try{
            const user = await db_getUserData();
        
        const events = user.events;
        db_updateAllUserEvents(events, distance);

        //update region info
        const region = user.region;
        db_updateAllUserRegionTotalDistance(region, distance);
        db_updateAllUserRegionUserDistance(region, distance);
        return onSuccess();

        } catch (error) {
            console.log(error)
        }
        
    } catch (error) {
        return onError(error)
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
        console.log(playlist.id);
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

/**Obtain events doc from 'events' collection under firestore
 * 
 * @param {function} onSuccess 
 * @param {function} onError 
 * @returns {array} events => list of event in events
 */
export const db_events = (onSuccess, onError) => {
    try {
        db.collection("events")
        .onSnapshot((collection) => {
            const events = collection.docs.map((doc) => doc.data());
            return onSuccess(events);
        })
    } catch (error) {
        return onError(error);
    }
}


/**increase event particpation count */
const db_joinEvent1 = (event_id) => {
    try {
        console.log(event_id)
        db.collection('events').doc(event_id).update({participants: firebase.firestore.FieldValue.increment(1)})
        console.log("increased")
    } catch (error) {
        console.log(error)
    }
}
/**add event id to user info */
const db_joinEvent2 = (event_id) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection('users').doc(user_id).update({events: firebase.firestore.FieldValue.arrayUnion(event_id)})
    } catch (error) {
        console.log(error)
    }
}

/**Increase event participant count & add event_id to user field
 * 
 * @param {string} event_id 
 * @param {function} onSuccess 
 * @param {function} onError 
 * @returns 
 */
export const db_joinEvent = (event_id) => {
    try {
        db_joinEvent1(event_id);
        db_joinEvent2(event_id);
    } catch (error) {
        console.log(error)
    }
}

/**decrease event particpation count */
const db_leaveEvent1 = (event_id) => {
    try {
        db.collection('events').doc(event_id).update({participants: firebase.firestore.FieldValue.increment(-1)});
    } catch (error) {
        console.log(error)
    }
}
/**remove event_id fom user field */
 const db_leaveEvent2 = (event_id) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection('users').doc(user_id).update({events: firebase.firestore.FieldValue.arrayRemove(event_id)})
    } catch (error) {
        console.log(error)
    }
}
/** Decrease event participant count & remove event_id to user field*/
export const db_leaveEvent = (event_id) => {
    try{
        db_leaveEvent1(event_id);
        db_leaveEvent2(event_id);
    } catch (error) {
        console.log(error)
    }
}

export const db_userEventStatus = (onSuccess, onError) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id)
        .onSnapshot((doc) => {
            const user = doc.data();
            const eventList = user.events;
            console.log(eventList)
            return onSuccess(eventList);
        })
    } catch (error) {
        return onError(error);
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


/*After run
- db_recordRun
- db_contributeEvent
- db_contributeRegion
- db_updateUserTotalDistance
- db_updateUserRunCount

*/