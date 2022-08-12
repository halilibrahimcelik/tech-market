import React from "react";
import { Link } from "react-router-dom";
import styles from "./Listings.module.scss";
import { GrSystem } from "react-icons/gr";
import { MdSystemUpdate } from "react-icons/md";
import { CgSmartphoneRam } from "react-icons/cg";

const Listings = ({ listings }) => {
  console.log(listings);
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
              <p>{location} </p>
              <p>{name} </p>
              <p>{regularPrice} </p>

              <div>
                {type === "laptop" ? <GrSystem /> : <MdSystemUpdate />}
                <span>Operating System: {operatingSystem} </span>
              </div>
              <CgSmartphoneRam />
              <span>Ram-Memory: {ramMemory} </span>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default Listings;
