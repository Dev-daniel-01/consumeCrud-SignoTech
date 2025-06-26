import { Link } from "react-router-dom";

import style from "./menu.module.css";
import home from "../assets/home.png";


export const Menu = ({ option01, option02, option03, onClickCriar }) => {
  return (
    <nav className={style.navBar}>
      <ul className={style.navMenu}>
        <li className={style.navSpace}>
          <Link className={style.navLink} to="/">
            <img src={home} alt="home" style={{ width: "40px" }} />
          </Link>
        </li >
        <li className={style.navSpace}>
          <p className={style.navLink} style={{ cursor: "default" }}>
            {option01}
          </p>
        </li >
        <li className={style.navSpace}>
          <button
            className={style.navLink}
            onClick={onClickCriar}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, font: "inherit", color: "inherit" }}>
            {option03}
          </button>
        </li>
      </ul>
    </nav>
  );
};
