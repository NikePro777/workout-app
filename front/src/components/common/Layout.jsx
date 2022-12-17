import React from "react";
import Header from "./Header/Header";
import styles from "./Layout.module.scss";

const Layout = ({ children, bgImage, height = "350px", heading = "" }) => {
  return (
    <div
      className={styles.wrapper}
      style={{ height, backgroundImage: `url(${bgImage})` }}
    >
      <Header />
      {heading && <h1>{heading}</h1>}
      {children && <div>{children}</div>}
    </div>
  );
};

export default Layout;
