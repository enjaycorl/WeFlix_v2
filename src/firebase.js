import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

/**
 * Firebase is optional at boot time.
 *
 * Without a guard, a missing VITE_FIREBASE_API_KEY makes getAuth() throw
 * `auth/invalid-api-key` while this module is still evaluating. That happens
 * before ReactDOM renders, so the entire app dies and the page paints black.
 * Browsing (TMDB content) does not need Firebase, so degrade instead of crash:
 * auth/db become null and the auth-dependent features stay dormant.
 */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

let app = null;
let auth = null;
let db = null;
let googleProvider = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.warn('[v0] Firebase failed to initialize, running without auth:', error?.message);
    app = null;
    auth = null;
    db = null;
    googleProvider = null;
  }
} else {
  console.warn(
    '[v0] Firebase env vars are missing — sign-in, watchlist, and continue-watching are disabled for this session.'
  );
}

export { app, auth, db, googleProvider };
