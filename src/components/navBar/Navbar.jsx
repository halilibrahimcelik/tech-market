import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { AiOutlineCompass, AiOutlineTags } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };
  return (
    <nav className={styles.navBar}>
      <ul>
        <li className={pathMatchRoute("/") ? styles.active : null}>
          <AiOutlineCompass
            className={styles.icon}
            onClick={() => navigate("/", {})}
          />
          <p>Explore</p>
        </li>
        <li className={pathMatchRoute("/offers") ? styles.active : null}>
          <AiOutlineTags
            className={styles.icon}
            onClick={() => navigate("offers")}
          />
          <p>Offers</p>
        </li>
        <li className={pathMatchRoute("/profile") ? styles.active : null}>
          <CgProfile
            className={styles.icon}
            onClick={() => navigate("profile")}
          />
          <p>Profile</p>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
