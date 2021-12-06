import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/storage';
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // copy the contents of your firebaseConfig here
  // it should be a firebaseConfig of a web app
  // refer to DeveloperGuide.md for more information
};


const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

firebase.firestore().settings({ experimentalForceLongPolling: true });
firebase.storage();

export default firebase;