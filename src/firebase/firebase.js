import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {initializeApp} from 'firebase/app'
import {getFirestore} from "firebase/firestore"
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyD-eFoA6HhKtrrOeqSjaO3drFMll3samEM",
  authDomain: "pvg-social-media.firebaseapp.com",
  projectId: "pvg-social-media",
  storageBucket: "pvg-social-media.appspot.com",
  messagingSenderId: "388776910351",
  appId: "1:388776910351:web:a31b830f9b65a1c8f28d7a",
  measurementId: "G-F1KTB4FNPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const storage=getStorage(app)
const provider=new GoogleAuthProvider();
export const db = getFirestore(app);
export {auth,provider,getStorage,storage};
