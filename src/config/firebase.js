import firebase from "firebase";
  var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "ca7mash.firebaseapp.com",
    databaseURL: "https://ca7mash.firebaseio.com",
    projectId: "ca7mash",
    storageBucket: "ca7mash.appspot.com",
    messagingSenderId: "831923527880",
    appId: process.env.FIREBASE_APP_ID
  };
  firebase.initializeApp(firebaseConfig);

export default firebase
