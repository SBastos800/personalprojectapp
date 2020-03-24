import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAe-HV6wO3GgidUjU9X8nDWzHzqQMjSW0w",
    authDomain: "personalprojectapp.firebaseapp.com",
    databaseURL: "https://personalprojectapp.firebaseio.com",
    projectId: "personalprojectapp",
    storageBucket: "personalprojectapp.appspot.com",
    messagingSenderId: "615045895735",
    appId: "1:615045895735:web:413be65d39152b40e211b2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const providers = {
    google: new firebase.auth.GoogleAuthProvider()
}

  export const firestore = firebase.firestore();

  export default firebase;