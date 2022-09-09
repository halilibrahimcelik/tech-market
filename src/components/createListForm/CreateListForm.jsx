import React from "react";
import styles from "./CreateListForm.module.scss";

const CreateListForm = ({
  handleSubmit,
  onMutate,
  formData,
  geolocationEnabled,
}) => {
  const {
    type,
    name,

    brand,

    address,
    regularPrice,
    discountedPrice,
    operatingSystem,
    latitude,
    longitude,
    offer,
  } = formData;

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
        <div>
          <label className={styles["form-label"]}> Description </label>
          <input
            type="text"
            id="name"
            className={styles["form-input"]}
            value={name}
            onChange={onMutate}
            maxLength="32"
            minLength={"10"}
            required
          />
        </div>
        <div>
          <label className={styles["form-label"]}> Brand </label>
          <input
            type="text"
            id="brand"
            className={styles["form-input"]}
            value={brand}
            onChange={onMutate}
            maxLength="32"
            minLength={"5"}
            required
          />
        </div>

        <div className={styles["device-features"]}>
          <div>
            <label className={styles["form-label"]}> (SSD)Ram-Memory </label>
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
              min="5"
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
            id="operatingSystem"
            onChange={onMutate}
            maxLength="50"
            minLength={"2"}
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

        {!geolocationEnabled && (
          <div className={styles["formLatLng"]}>
            <div>
              <label className={styles["form-label"]}>Latitude</label>
              <input
                className={styles["formInputSmall"]}
                type="number"
                id="latitude"
                value={latitude}
                onChange={onMutate}
                required
              />
            </div>
            <div>
              <label className={styles["form-label"]}>Longitude</label>
              <input
                className={styles["formInputSmall"]}
                type="number"
                id="longitude"
                value={longitude}
                onChange={onMutate}
                required
              />
            </div>
          </div>
        )}
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
        <div className={styles["price-div"]}>
          <label className={styles["form-label"]}> Regular Price </label>
          <input
            className={styles["price-input"]}
            type="number"
            id="regularPrice"
            value={regularPrice}
            onChange={onMutate}
            min="50"
            max={"60000"}
            required
          />
          {offer && (
            <>
              <label className={styles["form-label"]}> Discounted Price </label>
              <input
                className={styles["price-input"]}
                type="number"
                id="discountedPrice"
                value={discountedPrice}
                onChange={onMutate}
                min="50"
                max={"60000"}
                required={offer}
              />
            </>
          )}
        </div>

        <div>
          <label className={styles["form-label"]}> Discounted Price </label>
          <p>The first image will be the cover(max 6). </p>
          <input
            type="file"
            className={styles["form-image"] + " " + styles["form-input"]}
            id="imageUrls"
            max="6"
            accept=".jpg,.png,.jpeg"
            onChange={onMutate}
            multiple
            required
          />
        </div>

        <button
          type="submit"
          className={
            styles["primary-button"] + " " + styles["form-button-active"]
          }
        >
          Submit Your Listing
        </button>
      </form>
    </>
  );
};

export default CreateListForm;
