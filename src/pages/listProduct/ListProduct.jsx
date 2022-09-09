import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import Spinner from "../../components/spinner/Spinner";
import styles from "./ListProduct.module.scss";
import { db } from "../../helpers/firebase.config";
import { FiShare2 } from "react-icons/fi";
import { useAuthContext } from "../../hook/userAuth";
import { toast } from "react-toastify";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const ListProduct = () => {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [linkCoppied, setLinkCoppied] = useState(false);
  const params = useParams();
  const { auth } = useAuthContext();
  const {
    brand,
    imageUrls,
    name,
    location,
    offer,
    operatingSystem,
    ramMemory,
    regularPrice,
    screentSize,

    discountedPrice,
    geolaction,
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

  return (
    <main className={styles.container}>
      <Swiper
        className={styles["swiper-container"]}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className={styles["swiper-slides"]}
              style={{
                backgroundImage: "url(" + imageUrls[index] + ")",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
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
          <li>SSD-memory {ramMemory} GB </li>
          <li>Operating system {operatingSystem} </li>
        </ul>

        <p className={styles["listing-location-title"]}>Location</p>
        <div className={styles["leaf-container"]}>
          <MapContainer
            style={{ height: "100%", width: "100%", overflow: "hidden" }}
            center={[geolaction?.lat, geolaction?.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />
            <Marker position={[geolaction?.lat, geolaction?.lng]}>
              <Popup>{location} </Popup>
            </Marker>
          </MapContainer>
        </div>
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
