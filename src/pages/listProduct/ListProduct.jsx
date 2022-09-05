import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import Spinner from "../../components/spinner/Spinner";
import styles from "./ListProduct.module.scss";
import { db } from "../../helpers/firebase.config";
import { FiShare2 } from "react-icons/fi";
import { useAuthContext } from "../../hook/userAuth";
import { toast } from "react-toastify";

const ListProduct = () => {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [linkCoppied, setLinkCoppied] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { auth } = useAuthContext();
  const {
    id,
    brand,
    imageUrls,
    name,
    location,
    offer,
    operatingSystem,
    ramMemory,
    regularPrice,
    screentSize,
    timeStamp,
    type,
    discountedPrice,
    geoLocation,
    userRef,
  } = listing;
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const docRef = doc(db, "listings", params.listingId);

        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setListing(docSnap.data());
          setLoading(false);
        } else {
          toast.error("Could not fetch the data");
        }

        setLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <Spinner />;
  }
  console.log(auth);
  return (
    <main className={styles.container}>
      {/* <p>Slider</p> */}
      <div
        className={styles.linkCoppied}
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setLinkCoppied(true);
          setTimeout(() => {
            setLinkCoppied(false);
          }, 1000);
        }}
      >
        <FiShare2 />
      </div>
      {linkCoppied && <p className={styles.linkInfo}>Link Coppied!</p>}

      <div className={styles.listingDetails}>
        <p className={styles.listingName}>
          {name} - $
          {offer
            ? discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>

        <p className={styles.listingLocation}>{location} </p>
        <div className={styles["product-list-badge"]}>
          <p className={styles.listingBrand}> {brand}</p>
          <p className={styles.discountedPrice}>
            {regularPrice - discountedPrice}$ Discount
          </p>
        </div>

        <ul className={styles.productDetail}>
          <li>Screen size (inc) {screentSize} </li>
          <li>SSD-memory {ramMemory} </li>
          <li>Operating system {operatingSystem} </li>
        </ul>

        <p className={styles["listing-location-title"]}>Location</p>
        {/* MAP */}
      </div>

      {/* //?checking  whether the list belong to registered user or not  */}

      {auth.currentUser?.uid !== userRef && (
        <Link
          to={`/contact/${userRef}?listingName=${name}`}
          className={styles["contact-button"]}
        >
          Contact the Dealer !
        </Link>
      )}
    </main>
  );
};

export default ListProduct;
