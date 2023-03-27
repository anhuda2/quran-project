import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAMDw503gwKj5Tjux8JBSw57VsDhQnMOc",
  authDomain: "qur-anproject.firebaseapp.com",
  databaseURL: "https://qur-anproject-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "qur-anproject",
  storageBucket: "qur-anproject.appspot.com",
  messagingSenderId: "75762615208",
  appId: "1:75762615208:web:3e8ebd2b378edeabd9939d",
  measurementId: "G-DZ5WRXV16T"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
