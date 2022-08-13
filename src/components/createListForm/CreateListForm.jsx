import React from "react";
import styles from "./CreateListForm.module.scss";

const CreateListForm = ({ handleSubmit, onMutate, formData }) => {
  const {
    type,
    name,
    ramMemory,
    brand,
    imageUrls,
    address,
    regularPrice,
    discountedPrice,
    operatingSystem,
    latitude,
    longitude,
    offer,
    screenSize,
  } = formData;
  console.log(formData);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className={styles["form-label"]}> Phone/Laptop</label>
        <div className={styles["form-buttons"]}>
          <button
            type="button"
            id="type"
            value={"phone"}
            onClick={onMutate}
            className={
              type === "phone"
                ? styles["form-button-active"]
                : styles["form-button"]
            }
          >
            Phone
          </button>
          <button
            type="button"
            id="type"
            value={"laptop"}
            onClick={onMutate}
            className={
              type === "laptop"
                ? styles["form-button-active"]
                : styles["form-button"]
            }
          >
            Laptop
          </button>
        </div>
        <label className={styles["form-label"]}> Name </label>
        <input
          type="text"
          className={styles["form-input"]}
          value={name}
          onChange={onMutate}
          maxLength="32"
          minLength={"10"}
          required
        />

        <div className={styles["device-features"]}>
          <div>
            <label className={styles["form-label"]}> Ram-Memory </label>
            <select required id="ramMemory" onChange={onMutate}>
              <option value="8">8 GB</option>
              <option value="16">16 GB</option>
              <option value="32">32 GB</option>
              <option value="64">64 GB</option>
              <option value="128">128 GB</option>
              <option value="256">256 GB</option>
              <option value="512">512 GB</option>
            </select>
          </div>
          <div>
            <label className={styles["form-label"]}> Screen Size (inch) </label>
            <input
              type="number"
              min="4.5"
              max={"40"}
              required
              id="screenSize"
              onChange={onMutate}
            />
          </div>
        </div>
        <div>
          <label className={styles["form-label"]}> Operation System </label>
          <input
            type="text"
            className={styles["form-input"]}
            value={operatingSystem}
            onChange={onMutate}
            maxLength="50"
            minLength={"10"}
            required
          />
        </div>
        <div>
          <label className={styles["form-label"]}> Address </label>
          <textarea
            type="text"
            className={styles["form-input"]}
            value={address}
            id="address"
            onChange={onMutate}
            maxLength="50"
            minLength={"10"}
            required
          />
        </div>
        <div>
          <label className={styles["form-label"]}> Offer </label>
          <div className={styles["form-buttons"]}>
            <button
              type="button"
              id="offer"
              value={true}
              onClick={onMutate}
              className={
                offer ? styles["form-button-active"] : styles["form-button"]
              }
            >
              Yes
            </button>
            <button
              type="button"
              id="offer"
              value={false}
              onClick={onMutate}
              className={
                !offer && offer !== null
                  ? styles["form-button-active"]
                  : styles["form-button"]
              }
            >
              No
            </button>
          </div>
        </div>
        <div className={styles["regular-priceDiv"]}>
          <label className={styles["form-label"]}> Regular Price </label>
          <input
            className={styles["price-input"]}
            type="number"
            id="regularPrice"
            value={onMutate}
            min="50"
            max={"60000"}
            required
          />
        </div>

        {offer && }
      </form>
    </>
  );
};

export default CreateListForm;
