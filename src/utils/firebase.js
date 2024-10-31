import { initializeApp } from "firebase/app";
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, doc, getDoc , setDoc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDRXgDPe4RVbsYRuketSuHn6wwQwzqxjKg",
  authDomain: "task9d.firebaseapp.com",
  projectId: "task9d",
  storageBucket: "task9d.appspot.com",
  messagingSenderId: "90002183821",
  appId: "1:90002183821:web:70aea87ade8ddf951274c4",
  measurementId: "G-HBJ9WF2NX0"
};
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider(); 
   provider.setCustomParameters ({
    prompt:"select_account"
   });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocFromAuth= async (userAuth, additionalInformation ={}) =>{
  if (!userAuth) return;
  
  const userDocRef = doc (db, 'users', userAuth.uid );
 
  const userSnapshot = await getDoc(userDocRef);

  if (! userSnapshot.exists()){
    const {displayName , email} = userAuth;
    const createdAt = new Date();

  try {
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
      ...additionalInformation
    })
  }
  catch (error){
  console.log('error in creating ', error.message)
  }
}

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
  if (!email || !password) return;
 return await createUserWithEmailAndPassword(auth, email, password)
}

export const signinAuthUserWithEmailAndPassword = async (email, password) =>{
  if (!email || !password) return;
 return await signInWithEmailAndPassword(auth, email, password)
}

