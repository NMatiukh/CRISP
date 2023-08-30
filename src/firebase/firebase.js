import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import 'firebase/compat/auth'
import 'firebase/compat/database'


const firebaseConfig = {
    apiKey: "AIzaSyB3NCJXghEApfWz2_E5LznloTbDOKMGdWo",
    authDomain: "crisp-16c2f.firebaseapp.com",
    projectId: "crisp-16c2f",
    storageBucket: "crisp-16c2f.appspot.com",
    messagingSenderId: "795278146637",
    appId: "1:795278146637:web:ea894f4b4fc401d3b9b004",
    measurementId: "G-YZQBHDX5J4"
};

const app = firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()
const storage = firebase.storage()
const auth = firebase.auth()
const database = firebase.database()

export {app, firestore, storage, auth, database}

