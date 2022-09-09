import styles from "./Slider.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../helpers/firebase.config";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import Spinner from "../spinner/Spinner";
import { toast } from "react-toastify";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const Slider = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingRef = collection(db, "listings");
        const queryRef = query(
          listingRef,
          orderBy("timeStamp", "desc"),
          limit(5)
        );
        const querySnap = await getDocs(queryRef);
        let listingArray = [];
        querySnap.forEach((doc) => {
          return listingArray.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listingArray);
        setLoading(false);
      } catch (error) {
        toast.error("could not get images!");
        setLoading(true);
      }
    };
    fetchListing();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!listings.length === 0) {
    return <></>;
  }
  return (
    listings && (
      <div className={styles["slider-container"]}>
        <header>
          <p>Recomended</p>
        </header>
        <Swiper
          className={styles["swiper-container"]}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {listings.map(({ data, id }) => {
            return (
              <SwiperSlide
                className={styles.swiperSlide}
                key={id}
                onClick={() => navigate(`/category/${data.type}/${id}`)}
              >
                <div
                  className={styles["swiper-slides"]}
                  style={{
                    backgroundImage: "url(" + data.imageUrls[0] + ")",
                  }}
                >
                  <p className={styles["product-name"]}>{data.name} </p>
                  <p className={styles["product-price"]}>
                    {data.regularPrice} $
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    )
  );
};

export default Slider;
