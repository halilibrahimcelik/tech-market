import React from "react";
import { Link } from "react-router-dom";
import styles from "./Listings.module.scss";
import { GrSystem } from "react-icons/gr";
import { MdSystemUpdate, MdDelete } from "react-icons/md";
import { CgSmartphoneRam } from "react-icons/cg";
import { GrLocation } from "react-icons/gr";
import { HiCurrencyDollar } from "react-icons/hi";
import { BsLaptop, BsPhone } from "react-icons/bs";

const Listings = ({ listings, onDelete }) => {
  console.log(onDelete);
  return (
    <>
      {listings.map((listing) => {
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
        } = listing;
        return (
          <li key={id} className={styles.product}>
            <Link to={`/category/${type}/${id}`}>
              <img src={imageUrls[0]} alt={name} />
            </Link>

            <div className={styles["product-detail"]}>
              <p className={styles.location}>
                {" "}
                <GrLocation className={styles.icon} /> {location}{" "}
              </p>
              <p className={styles.name}>
                {type === "laptop" ? (
                  <BsLaptop className={styles.icon} />
                ) : (
                  <BsPhone className={styles.icon} />
                )}
                {name}{" "}
              </p>
              <p className={styles.price}>
                {" "}
                <HiCurrencyDollar className={styles.icon} />{" "}
                {offer
                  ? discountedPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : regularPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>

              <div className={styles["product-feature"]}>
                {type === "laptop" ? (
                  <GrSystem className={styles.icon} />
                ) : (
                  <MdSystemUpdate className={styles.icon} />
                )}
                <span>Operating System: {operatingSystem} </span>
              </div>
              <div className={styles["product-feature"]}>
                <CgSmartphoneRam className={styles.icon} />
                <span>Ram-Memory: {ramMemory} GB </span>
              </div>
            </div>

            {onDelete && (
              <MdDelete
                className={styles.removeIcon}
                onClick={() => onDelete(id)}
              />
            )}
          </li>
        );
      })}
    </>
  );
};

export default Listings;
