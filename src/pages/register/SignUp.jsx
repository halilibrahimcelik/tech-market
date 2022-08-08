import React from "react";
import styles from "./SignUp.module.scss";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { FaIdCardAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrMail } from "react-icons/gr";
import visibilityIcon from "../../assets/eye-solid.svg";
import inVisibilityIcon from "../../assets/eye-slash-solid.svg";
import { useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../../helpers/firebase.config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const nameInput = useRef();
  const mailInput = useRef();
  const passwordInput = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const enteredName = nameInput.current.value;
      const enteredMail = mailInput.current.value;
      const enteredPassword = passwordInput.current.value;

      const auth = getAuth();
      const userCredential = createUserWithEmailAndPassword(
        auth,
        enteredMail,
        enteredPassword
      );
      const { user } = await userCredential;

      updateProfile(auth.currentUser, { displayName: enteredName }); //?provide current username
      const formData = {
        name: enteredName,
        email: enteredMail,
        timeStamp: serverTimestamp(),
      };
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, formData);

      navigate("/", { replace: false });
    } catch (error) {
      console.log(error);
      console.log(error.message);
      toast.error("Something went wrong with Registration");
    }
    e.target.reset();
  };
  return (
    <section className={styles["signIn-module"]}>
      <h2>Welcome Back!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameInput">
          <FaIdCardAlt className={styles.icon} />
          <input
            type="text"
            id="nameInput"
            placeholder="Name"
            ref={nameInput}
            required
          />
        </label>
        <label htmlFor="emailInput">
          <GrMail className={styles.icon} />
          <input
            type="email"
            id="emailInput"
            placeholder="Email"
            ref={mailInput}
          />
        </label>
        <label htmlFor="passwordInput">
          <RiLockPasswordFill className={styles.icon} />
          <input
            type={showPassword ? "text" : "password"}
            id="passwordInput"
            placeholder="Password"
            ref={passwordInput}
          />
          {showPassword ? (
            <img
              className={styles.image}
              src={inVisibilityIcon}
              alt="visibleIcon"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <img
              className={styles.image}
              src={visibilityIcon}
              alt="invisibilityIcon"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </label>

        <div className={styles["signIn-button"]}>
          <p>Sign Up</p>
          <button type="submit">
            <BsFillArrowRightSquareFill />
          </button>
        </div>
      </form>

      {/*Google Auth*/}
      <Link to="/sign-in" className={styles["sign-up"]}>
        Sign-In Instead{" "}
      </Link>
    </section>
  );
};

export default SignUp;
