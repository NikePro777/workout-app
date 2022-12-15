import { useState } from "react";
import { Link } from "react-router-dom";
import hamburgerImage from "../../../../images/header/hamburger.svg";
import styles from "./Humburger.module.scss";
import { menu } from "./menuBase";

const Humburger = () => {
  const [show, setShow] = useState(false);
  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <div className={styles.wrapper}>
      <button type="button" onClick={() => setShow(!show)}>
        <img src={hamburgerImage} alt="Auth" />
      </button>
      <nav className={styles.menu}>
        <ul>
          {menu.map((item) => (
            <li>
              <Link to={item.link}>{item.title}</Link>
            </li>
          ))}
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Humburger;
