import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

var FirebaseService = {
    initialized: false,
    initialize: () => {
        if(!FirebaseService.initialized) {
            const config = {
                apiKey: "AIzaSyCSAjJKGPVlX6zNOHWT2Otg2nXljs5f_lA",
                authDomain: "friwords-a3536.firebaseapp.com",
                databaseURL: "https://friwords-a3536.firebaseio.com",
                projectId: "friwords-a3536",
                storageBucket: "friwords-a3536.appspot.com",
                messagingSenderId: "882500991771",
                appId: "1:882500991771:web:f125ad3a2aa021a0eaf1be",
                measurementId: "G-P8SQZY3BKH"
            };

            firebase.initializeApp(config);

            FirebaseService.initialized = true;
        }
    },
    services: () => {
        return firebase
    }
}

FirebaseService.initialize();

export default FirebaseService;