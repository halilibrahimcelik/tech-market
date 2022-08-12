import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../helpers/firebase.config";
import { toast } from "react-toastify";
import googleIcom from "../../assets/googleIcon.svg";
import styles from "./GoogleAuth.module.scss";
const GoogleAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleAuth = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //?checking if we have a references to that document
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      //?if the user does not exist,create user
      //!second param of setDoc data we want to add to database
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <p>Sign {location.pathname === "/sign-up" ? "Up" : "In"} with</p>
      <button className={styles.button} onClick={onGoogleAuth}>
        <img src={googleIcom} alt="Google Icon" />
      </button>
    </div>
  );
};

export default GoogleAuth;
