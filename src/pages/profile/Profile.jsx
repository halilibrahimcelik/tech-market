import React from "react";
import { useState } from "react";

import { useAuthContext } from "../../hook/userAuth";
import styles from "./Profile.module.scss";
import { TbShoppingCartPlus } from "react-icons/tb";
import { GiZigArrow } from "react-icons/gi";
const Profile = () => {
  const { userInfo } = useAuthContext();
  // const [formData, setFormData] = useState({
  //   name: userInfo?.currentUser.displayName,
  //   email: userInfo?.currentUser.email,
  // });
  console.log(userInfo);

  return (
    <section className={styles.profile}>
      <header>
        <h2>My profile</h2>
        <button>Logout</button>
      </header>
      <article className={styles["user-details"]}>
        <div className={styles.title}>
          <p>Personal Details</p>
          <button>change</button>
        </div>
        <div className={styles["user-info"]}>
          <p>{userInfo?.currentUser.displayName} </p>
          <p>{userInfo?.currentUser.email} </p>
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
