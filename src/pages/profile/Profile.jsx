import React from "react";
import { useAuthContext } from "../../hook/userAuth";
import styles from "./Profile.module.scss";
import { TbShoppingCartPlus } from "react-icons/tb";
import { GiZigArrow } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../helpers/firebase.config";

const Profile = () => {
  const { auth } = useAuthContext();
  console.log(auth);
  const navigate = useNavigate();
  const enteredName = useRef(auth?.currentUser?.displayName);
  console.log(enteredName);
  const [changeDetails, setChangeDetails] = useState(false);
  const [name, setName] = useState(auth?.currentUser?.displayName);
  const [email, setEmail] = useState(auth?.currentUser?.email);
  console.log(name);

  const handleSubmit = async () => {
    try {
      if (auth?.currentUser?.displayName !== name) {
        //Update displayName in firebase this returns a promise
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //update in Firestore
        const userRef = doc(db, "users", auth?.currentUser.uuid);
        await updateDoc(userRef, { name });
        toast.success("Your user creditentials succesfully updated!");
      }
    } catch (error) {
      toast.error(error);
    }
  };

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
          <button
            onClick={() => {
              changeDetails && handleSubmit();
              setChangeDetails(!changeDetails);
            }}
          >
            {changeDetails ? "done!" : "change"}
          </button>
        </div>
        <div className={styles["user-info"]}>
          <form>
            <input
              type="text"
              id="name"
              disabled={!changeDetails}
              value={!changeDetails ? auth?.currentUser?.displayName : name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              id="name"
              disabled={!changeDetails}
              value={!changeDetails ? auth?.currentUser?.email : email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </form>
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
