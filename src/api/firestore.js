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





//Works
const db_updateUserHistory = ( record ) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).collection("history").add(record);
    } catch (error) {
        console.log("Fail history record")
    }
}
//Works
const db_updateUserTotalDistance = ( record ) => {
    const user_id = Authentication.getCurrentUserId()
    try {
        db.collection("users").doc(user_id).update({totalDistance: firebase.firestore.FieldValue.increment(record.distance)})
    } catch (error) {
        console.log("fail user update distance record")
    }
}
//Works
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
        const user = await user_snapshot.data();
        return user
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
        const user = await db_getUserData();
        
        const events = user.events;
        db_updateAllUserEvents(eventsList, distance);

        //update region info
        const region = user.region;
        db_updateAllUserRegionTotalDistance(region, distance);
        db_updateAllUserRegionUserDistance(region, distance);

        return onSuccess();
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

/**Increase event participant count & add event_id to user field
 * 
 * @param {string} event_id 
 * @param {function} onSuccess 
 * @param {function} onError 
 * @returns 
 */
export const db_joinEvent = (event_id, onSuccess, onError) => {
    try {
        db.collection('events').doc(event_id).update('participants', FieldValue.increment(1));
        db.collection('users').doc(user_id).update('events', FieldValue.arrayUnion(event_id))

        return onSuccess();
    } catch (error) {
        return onError(error);
    }
}


/**Decrease event participant count & remove event_id fom user field
 * 
 * @param {string} event_id 
 * @param {function} onSuccess 
 * @param {function} onError 
 * @returns 
 */
export const db_leaveEvent = async(event_id, onSuccess, onError) => {
    try {
        //Decrease participant count
        db.collection('events').doc(event_id).update('participants', FieldValue.increment(-1));
        
        //extract and filter events array
        const user = db.collection('users').doc(user_id).get();
        let events = user.events;
        events = events.filter(item => (item == event_id) )
        //update events array
        db.collection('users').doc(user_id).update('events', events);

        return onSuccess();
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