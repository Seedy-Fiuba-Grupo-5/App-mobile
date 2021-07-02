import * as firebase from 'firebase';
import {FIREBASE_API_KEY} from '@env'
class Firebase {

    static firebaseInit = () => {
        if(!firebase.apps.length) {firebase.initializeApp({
            databaseURL: "gs://seedyfiuba-a983e.appspot.com",
            apiKey: FIREBASE_API_KEY,
            authDomain: "seedyfiuba-a983e.firebaseapp.com",
            projectId: "seedyfiuba-a983e",
            storageBucket: "seedyfiuba-a983e.appspot.com",
            messagingSenderId: "216714142602",
            appId: "1:216714142602:web:30ba91766b853f42bdde73",
            measurementId: "G-T2ZL07QH49"
        });}
    }

}

module.exports = Firebase