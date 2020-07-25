import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    /* Using your firebase infor */

};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider(); // allow to access to Google
provider.setCustomParameters({prompt: 'select_account'});// always trigger google pop-up whenever we use singin and authentication
export const signInWithGoogle = () => auth.signInWithPopup(provider); // pop-up with signIn

export default firebase;