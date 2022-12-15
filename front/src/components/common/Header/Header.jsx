import React from "react";
import styles from "./Header.module.scss";
import userImage from "../../../images/header/user.svg";

import Humburger from "./Humburger/Humburger";
const Header = () => {
  return (
    <header className={styles.header}>
      <button type="button">
        <img src={userImage} alt="Auth" />
      </button>
      <Humburger />
    </header>
  );
};

export default Header;
