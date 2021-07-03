import firebase from "firebase";
import {FIREBASE_APIKEY,FIREBASE_AUTHDOMAIN,
    FIREBASE_PROJECTID,FIREBASE_STORAGEBUCKET,
    FIREBASE_MESSAGINGSENDERID,FIREBASE_APPID} from '@env'
class Firebase {

    static init() {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: FIREBASE_APIKEY,
                authDomain: FIREBASE_AUTHDOMAIN,
                projectId: FIREBASE_PROJECTID,
                storageBucket: FIREBASE_STORAGEBUCKET,
                messagingSenderId: FIREBASE_MESSAGINGSENDERID,
                appId: FIREBASE_APPID
            });
            console.log('Firebase connect');
        }
    }

    static async uploadImage(projectId, imageUri){
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const reference = firebase.storage().ref().child('users/' + projectId + '/temp/' + 'coverImage');
        await reference.put(blob);
        const url =  await firebase.storage().ref('users/' + projectId + '/temp/' + 'coverImage').getDownloadURL();
        return url.toString();
    }
}

export default Firebase