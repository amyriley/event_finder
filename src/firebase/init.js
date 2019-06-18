import firebase from 'firebase'
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAZqUktne7I_iOP3gniTFur6Jz6aBVhqBI",
    authDomain: "event-finder-243510.firebaseapp.com",
    databaseURL: "https://event-finder-243510.firebaseio.com",
    projectId: "event-finder-243510",
    storageBucket: "event-finder-243510.appspot.com",
    messagingSenderId: "134600485730",
    appId: "1:134600485730:web:2a8b40ed8088a6b1"
  };
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore()