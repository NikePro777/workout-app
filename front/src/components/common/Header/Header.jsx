import React from "react";
import Humburger from "./Humburger/Humburger";
import styles from "./Header.module.scss";

import userImage from "../../../images/header/user.svg";
import arrowImage from "../../../images/header/arrow.svg";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      {location?.pathname !== "/" ? (
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={arrowImage} alt="Back" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => navigate("/auth", { replace: false })}
        >
          <img src={userImage} alt="Auth" />
        </button>
      )}

      <Humburger />
    </header>
  );
};

export default Header;
