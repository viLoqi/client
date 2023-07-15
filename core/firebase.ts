import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, collection, query, orderBy } from 'firebase/firestore';
import { getDatabase, ref } from 'firebase/database'
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseStore = getFirestore(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);
const firebaseRtdb = getDatabase(firebaseApp)

// App Exports
export { firebaseApp, firebaseStore, firebaseAuth, firebaseRtdb };


// Firebase Exports
export { ref, doc, collection, query, orderBy }

// Firebase Hook Exports
export { useDocument, useAuthState, useCollection, useSignInWithGoogle }
