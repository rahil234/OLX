import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDeAWe-5GAxg0qfGRN3INnMGQCU6AJVEk",
  authDomain: "olx-2-8f595.firebaseapp.com",
  projectId: "olx-2-8f595",
  storageBucket: "olx-2-8f595.appspot.com",
  messagingSenderId: "490287849577",
  appId: "1:490287849577:web:247868d887dde4fd7582f8",
  measurementId: "G-6TS1N3RJ33"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyBE-j2hxfmsoT-tNoxrjnBbnWxnK83Jby4",
//   authDomain: "olx-fb-26408.firebaseapp.com",
//   projectId: "olx-fb-26408",
//   storageBucket: "olx-fb-26408.appspot.com",
//   messagingSenderId: "377489044446",
//   appId: "1:377489044446:web:7c962d07d308f75877234f",
//   measurementId: "G-SEBXT0Z2P3"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app)

export {auth,db,storage};