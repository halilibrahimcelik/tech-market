import React from "react";
import styles from "./SignIn.module.scss";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { FaIdCardAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrMail } from "react-icons/gr";
import visibilityIcon from "../../assets/eye-solid.svg";
import inVisibilityIcon from "../../assets/eye-slash-solid.svg";
import { useState } from "react";
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <section className={styles["signIn-module"]}>
      <h2>Welcome Back!</h2>
      <form>
        <label htmlFor="nameInput">
          <FaIdCardAlt />
          <input type="text" id="nameInput" />
        </label>
        <label htmlFor="emailInput">
          <GrMail />
          <input type="email" id="emailInput" />
        </label>
        <label htmlFor="passwordInput">
          <RiLockPasswordFill />
          <input type="password" id="passwordInput" />
        </label>
      </form>
    </section>
  );
};

export default SignIn;
