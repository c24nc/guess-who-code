import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCPRRUHR4-3_-mAMwQm9Yd-Bvq09SXylWs",
    authDomain: "hs-project-1fb88.firebaseapp.com",
    projectId: "hs-project-1fb88",
    storageBucket: "hs-project-1fb88.appspot.com",
    messagingSenderId: "389974884637",
    appId: "1:389974884637:web:bdb866251ef2e0c1c6e1f4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithRedirect(auth, provider);

export default app;