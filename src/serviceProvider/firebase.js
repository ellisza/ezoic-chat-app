import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDA4KD7o1Fwhfn6-NN-A2exPYJCANhfGms",
    authDomain: "ezoicchat.firebaseapp.com",
    projectId: "ezoicchat",
    storageBucket: "ezoicchat.appspot.com",
    messagingSenderId: "63086145750",
    appId: "1:63086145750:web:f1bcf1516d1badfa8a1977",
    measurementId: "G-473H0RFLKR",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

export { auth, provider, signInWithGoogle };
export default db;