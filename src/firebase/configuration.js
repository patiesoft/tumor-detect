import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Configuring and initializing the app
// const app = initializeApp({
//   apiKey: process.env.VUE_APP_API_KEY,
//   authDomain: process.env.VUE_APP_AUTH_DOMAIN,
//   projectId: process.env.VUE_APP_PROJECT_ID,
//   storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
//   appId: process.env.VUE_APP_APP_ID,
// });

const app = initializeApp({
  apiKey: "AIzaSyDORKFISBI3MvELrpaIAOM-D6HoenfGk2I",
  authDomain: "tumour-detection.firebaseapp.com",
  projectId: "tumour-detection",
  storageBucket: "tumour-detection.appspot.com",
  messagingSenderId: "80692611683",
  appId: "1:80692611683:web:73093bf90ead4893a98656",
  measurementId: "G-5ZSL0MZFND",
});
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const connectEmulators = true;
if (connectEmulators === true) {
  connectFirestoreEmulator(db, "localhost", "8090");
  connectAuthEmulator(auth, "http://localhost:9099");
  console.log("Emulators Connected!");
}

export { auth, db, storage };

// This application only uses one firebase project.  Do not really need to make
// and export the app object
