// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzpQ3hVm-a25lX4tMoF2lvpUZCYEm2uJ4",
    authDomain: "snackky-nerds.firebaseapp.com",
    projectId: "snackky-nerds",
    storageBucket: "snackky-nerds.appspot.com",
    messagingSenderId: "669964567560",
    appId: "1:669964567560:web:6db32e80664dcc4224fdbd",
    measurementId: "G-ZKNJPFF85P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Google Sign-In function
export const googleSignIn = async () => {
    console.log("inside the google login function");
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("searching for user");
        // The signed-in user info.
        const user = result.user;
        console.log('User info:', user);
        alert('Google Sign-In successful!');
    } catch (error) {
        console.log("kuch to error hai");
        alert(error.message);
    }
};

export { auth };
