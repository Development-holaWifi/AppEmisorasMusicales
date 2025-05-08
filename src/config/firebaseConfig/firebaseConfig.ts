import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase
export const firebaseConfig = {
  apiKey: 'AIzaSyAJcOG_g_JoX8EIIDDE3GkWhBugnT4mCJc',
  authDomain: 'comprovar-v.firebaseapp.com',
  projectId: 'comprovar-v',
  storageBucket: 'comprovar-v.appspot.com',
  messagingSenderId: '773027500987',
  appId: '1:773027500987:android:d9dba923be49953602ea9e',
  measurementId: 'G-XXXXXXXXXX',
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const firestoreInstance = getFirestore(app);

export { firestoreInstance };
