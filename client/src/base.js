import firebase from "firebase";

const apiKey = `${process.env.REACT_APP_FIREBASE_KEY}`;
const authDomain = `${process.env.REACT_APP_FIREBASE_DOMAIN}`;
const databaseURL = `${process.env.REACT_APP_FIREBASE_DATABASE}`;
const projectId = `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`;
const storageBucket = `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`;
const messagingSenderId = `${process.env.REACT_APP_FIREBASE_SENDER_ID}`;

const config = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId
};
firebase.initializeApp(config);

export default firebase;
