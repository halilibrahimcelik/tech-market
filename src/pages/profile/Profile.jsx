import React from "react";
import { useAuthContext } from "../../hook/userAuth";
import styles from "./Profile.module.scss";
import { TbShoppingCartPlus } from "react-icons/tb";
import { GiZigArrow } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaIdCardAlt } from "react-icons/fa";

import { GrMail } from "react-icons/gr";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  orderBy,
  where,
  query,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../helpers/firebase.config";
import Spinner from "../../components/spinner/Spinner";
import Listings from "../../components/listings/Listings";

const Profile = () => {
  const { auth, setLoggedIn } = useAuthContext();

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const [changeDetails, setChangeDetails] = useState(false);
  const [name, setName] = useState(
    auth?.currentUser?.displayName || userInfo?.name
  );
  const [email, setEmail] = useState(
    auth?.currentUser?.email || userInfo?.email
  );

  useEffect(() => {
    const fetchUserListing = async () => {
      try {
        const listingRef = collection(db, "listings");
        const queryRef = query(
          listingRef,
          where("userRef", "==", auth.currentUser.uid),
          orderBy("timeStamp", "desc")
        );
        const querySnap = await getDocs(queryRef);
        let listingArray = [];
        querySnap.forEach((doc) => {
          return listingArray.push({ id: doc.id, ...doc.data() });
        });
        setListings(listingArray);
        setLoading(false);
      } catch (error) {
        toast.error("Could not get the listing");
      }
    };
    fetchUserListing();
  }, [auth.currentUser.uid]);
  console.log(listings);
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
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setLoggedIn(false);
  };

  const onDeleteHandler = async (listingId, name) => {
    if (window.confirm(`Are  you sure you want to delete ${name} ?`)) {
      await deleteDoc(doc(db, "listings", listingId));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success("Succesfully Deleted!");
    }
  };
  if (loading) {
    return <Spinner />;
  }

  const onEditHandler = (listindId) => {
    navigate(`/edit-listing/${listindId}`);
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
              setActive(!active);
            }}
          >
            {changeDetails ? "done!" : "change"}
          </button>
        </div>
        <div
          className={
            !active
              ? styles["user-info"]
              : `${styles["user-info"]} ${styles.active}`
          }
        >
          <form>
            <label htmlFor="name">
              <FaIdCardAlt className={styles.icon} />
              <input
                type="text"
                id="name"
                disabled={!changeDetails}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label htmlFor="email">
              <GrMail className={styles.icon} />
              <input
                type="text"
                id="email"
                disabled={!changeDetails}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </form>
        </div>

        <div
          className={styles["user-sale"]}
          onClick={() => navigate("create-list")}
        >
          <div>
            <TbShoppingCartPlus className={styles.icon} />

            <p>Sell your mobile device or laptop</p>
          </div>
          <GiZigArrow className={styles.icon} />
        </div>
      </article>
      {!loading && listings?.length > 0 && (
        <>
          <p className={styles["listing-text"]}>Your List!</p>
          <Listings
            listings={listings}
            onDelete={onDeleteHandler}
            onEdit={onEditHandler}
          />
        </>
      )}
    </section>
  );
};

export default Profile;
