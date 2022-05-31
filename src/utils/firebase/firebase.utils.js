// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnmvH0bP22FeWGABp7iLqnggWts6-9XkY",
  authDomain: "clothomania-c90dd.firebaseapp.com",
  projectId: "clothomania-c90dd",
  storageBucket: "clothomania-c90dd.appspot.com",
  messagingSenderId: "246156131948",
  appId: "1:246156131948:web:2bdd6ea1eff3fb6c3d2249"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    console.log(objectsToAdd);

    objectsToAdd.forEach((obj) => {
        const docRef = doc(collectionRef, obj.title.toLowerCase());
        batch.set(docRef, obj);
    });

    await batch.commit();
    console.log('done');
};

export const getCategoriesandDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
}

export const createUserDocFromAuth = async (userAuth, extraInfo) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt, ...extraInfo});
        }
        catch (err) {
            console.log("An error occurred in creating the user", err.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailPassword = async (email, password) => {
    if (!email || !password)
        return;
    
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const loginAuthUserWithEmailPassword = async (email, password) => {
    if (!email || !password)
        return;
    
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (cb) => onAuthStateChanged(auth, cb);