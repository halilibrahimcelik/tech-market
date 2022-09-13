import React from "react";
import styles from "./AboutUs.module.scss";
import image from "../../assets/e-commerce-image.png";
import { FaGithub, FaLinkedin, FaMailBulk } from "react-icons/fa";
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
            So as to contact with other vendors,first You need to register in
            our platform.{" "}
          </p>
        </article>
        <img className={styles.image} src={image} alt="e-commerce-logo" />
      </main>

      <div className={styles["developer-info"]}>
        <p>
          This application was designed by <strong>Halil Ibrahim Celik</strong>{" "}
        </p>
        <p>
          for further queries and questions, feel free to contact the developer!
        </p>
        <div className={styles.icons}>
          <a
            href="https://github.com/halilibrahimcelik"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className={styles.icon} />
          </a>

          <a
            href="https://www.linkedin.com/in/halil-ibrahim-celik/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className={styles.icon} />
          </a>
          <a href="mailto:hibrahim.celik@yahoo.com">
            {" "}
            <FaMailBulk className={styles.icon} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
