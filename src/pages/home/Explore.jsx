import React from "react";
import { useAuthContext } from "../../hook/userAuth";
import { toast } from "react-toastify";
import CustomToastify from "../../components/toastify/CustomToastify";
import laptopImg from "../../assets/laptop image.jpg";
import phoneImg from "../../assets/phone-image.jpg";
import styles from "./Explore.module.scss";
import { Link } from "react-router-dom";
import Slider from "../../components/slider/Slider";

const Explore = () => {
  const { auth } = useAuthContext();

  if (auth?.currentUser) {
    toast(<CustomToastify />);
  }
  return (
    <section className={styles.explore}>
      <header className={styles.header}>
        <p>Explore</p>
      </header>
      <main>
        <Slider />
        <p className={styles["category-header"]}>Categories</p>
        <div className={styles.categories}>
          <div>
            <Link to="/category/phone" className={styles["category-product"]}>
              <img src={phoneImg} alt="Phone catagory" />
              <p>Phones for Sale</p>
            </Link>
          </div>
          <div className={styles["category-product"]}>
            <Link to="/category/laptop" className={styles["category-product"]}>
              <img src={laptopImg} alt="Phone catagory" />
              <p>Laptops for Sale</p>
            </Link>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Explore;
