import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import styles from "./ForgotPassword.module.scss";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent, Please check your spam-box 😊");
    } catch (error) {
      toast.error("Could not send reset email");
    }
  };
  return (
    <section className={styles.container}>
      <h3>Forgot Password</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="emailInput">
          <GrMail className={styles.icon} />
          <input
            type="email"
            id="emailInput"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <div className={styles["reset-button"]}>
          <div>
            <p>Reset</p>
            <button type="submit">
              <BsFillArrowRightSquareFill />
            </button>
          </div>
          <Link to="/sign-in">Sign In</Link>
        </div>
      </form>
    </section>
  );
};

export default ForgotPassword;
