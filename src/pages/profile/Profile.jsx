import React from "react";
import { useAuthContext } from "../../hook/userAuth";
import styles from "./Profile.module.scss";
import { TbShoppingCartPlus } from "react-icons/tb";
import { GiZigArrow } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate("/sign-in", { replace: true });
  };

  return (
    <section className={styles.profile}>
      <header>
        <h2>My profile</h2>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <article className={styles["user-details"]}>
        <div className={styles.title}>
          <p>Personal Details</p>
          <button>change</button>
        </div>
        <div className={styles["user-info"]}>
          <p>{auth?.currentUser?.displayName} </p>
          <p>{auth?.currentUser?.email} </p>
        </div>

        <div className={styles["user-sale"]}>
          <div>
            <TbShoppingCartPlus className={styles.icon} />

            <p>Sell your mobile device or laptop</p>
          </div>
          <GiZigArrow className={styles.icon} />
        </div>
      </article>
    </section>
  );
};

export default Profile;
