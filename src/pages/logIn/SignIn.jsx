import React from "react";
import styles from "./SignIn.module.scss";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

import { RiLockPasswordFill } from "react-icons/ri";
import { GrMail } from "react-icons/gr";
import visibilityIcon from "../../assets/eye-solid.svg";
import inVisibilityIcon from "../../assets/eye-slash-solid.svg";
import { useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const mailInput = useRef();
  const passwordInput = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const enteredMail = mailInput.current.value;
      const enteredPassword = passwordInput.current.value;
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        enteredMail,
        enteredPassword
      );
      if (userCredential.user) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
      toast.error("Bad User Credentials 😔");
    }

    e.target.reset();
  };
  return (
    <section className={styles["signIn-module"]}>
      <h2>Welcome Back!</h2>
      <form onSubmit={handleSubmit}>
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
        <Link className={styles["forgot-password"]} to="/forgot-password">
          Forgot Password{" "}
        </Link>
        <div className={styles["signIn-button"]}>
          <p>Sign In</p>
          <button type="submit">
            <BsFillArrowRightSquareFill />
          </button>
        </div>
      </form>

      <GoogleAuth />
      <Link to="/sign-up" className={styles["sign-up"]}>
        Sign Up Instead{" "}
      </Link>
    </section>
  );
};

export default SignIn;
