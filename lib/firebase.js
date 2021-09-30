import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// import { getAnalytics } from "firebase/analytics";
// Storage exports
// export const storage = firebase.storage();


const firebaseConfig = {
  apiKey: "AIzaSyCU8QhZotrpM53DDxRBhakPTCwsZZLUTtQ",
  authDomain: "nextfire-korn.firebaseapp.com",
  projectId: "nextfire-korn",
  storageBucket: "nextfire-korn.appspot.com",
  messagingSenderId: "450707839345",
  appId: "1:450707839345:web:c9517800ac452aa0abfed0",
  measurementId: "G-638Q8XF8J3"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const increment = firebase.firestore.FieldValue.increment;

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}