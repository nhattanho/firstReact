import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    /* Using your firebase infor */
    apiKey: "AIzaSyBOF_IxGosaGO_LjOQsgzmmWn1Vt9vvx6Y",
    authDomain: "ecommer-bb4a2.firebaseapp.com",
    databaseURL: "https://ecommer-bb4a2.firebaseio.com",
    projectId: "ecommer-bb4a2",
    storageBucket: "ecommer-bb4a2.appspot.com",
    messagingSenderId: "82358193481",
    appId: "1:82358193481:web:c9c997deedbf65d0ec1e98",
    measurementId: "G-KH7ZMWEP7F"
};

/* save the users'infor and update for database from auth library*/
export const createUserProfileDocument = async (userAuth, additionalData) => {
    console.log(`We are in firebase ${userAuth}`);
    if (!userAuth) return; // if the userAuth = null <=> sign out happens ==> we don't need to update database

    //const userRef = firestore.doc(`users/${userAuth.uid}`); //queryReference is an object that represents
    // // the current place in the database we are querying and anything details of the data ==> does not have
    // actual data of the collection or document
    // //==> we need to use the Snapshot object that gives us the true data what we are wanting.
    // //In QueryReference, we can get the documentReference and collectionReference. And we use
    // documentRef objects to perform CRUD methods(.set, .get, .update, .delete), while using the 
    // collectionRef with add() method to update the data.
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    console.log('testing for userRef in firebase');
    console.log(userRef);

    const snapShot = await userRef.get();
    console.log('testing for snapShot in firebase');
    console.log(snapShot.exists);
    console.log(snapShot);

    if(!snapShot.exists) { // exists is in the prototype of snapshot object, and this use for checking whether the user's info are in the database
        const {displayName, email} = userAuth;
        const createAt = new Date();
        try {
            await userRef.set({ //set data to make a document snapShot object and save it into database
                displayName,
                email,
                createAt,
                ...additionalData
            });
        } catch(err) {
            console.log('error creating user', err.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider(); // allow to access to Google
provider.setCustomParameters({prompt: 'select_account'});// always trigger google pop-up whenever we use singin and authentication
export const signInWithGoogle = () => auth.signInWithPopup(provider); // pop-up with signIn

export default firebase;