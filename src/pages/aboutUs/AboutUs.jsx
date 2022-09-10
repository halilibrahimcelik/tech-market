import React from "react";
import styles from "./AboutUs.module.scss";
import image from "../../assets/e-commerce-image.png";
const AboutUs = () => {
  return (
    <section className={styles.container}>
      <header>
        <p>Welcome to Tech-Market</p>
      </header>
      <main className={styles["flex-container"]}>
        <article className={styles.text}>
          <p>
            This is an e-commerce website where you are able to sell your mobile
            devices and laptops.
          </p>
          <p>
            In order to contact with other vendors,first You need to register in
            our platform.{" "}
          </p>
        </article>
        <img className={styles.image} src={image} alt="e-commerce-logo" />
      </main>

      <div className={styles["developer-info"]}>
        <span>
          This application was designed by <strong>Halil Ibrahim Celik</strong>{" "}
        </span>
        <span>
          for further queries and question, feel free to contact the developer!
        </span>
      </div>
    </section>
  );
};

export default AboutUs;
