import { useNavigate } from "react-router-dom";

import home from "../assets/home.png";

import style from "./menu.module.css";


export const Menu = ({ option01, option02, option03, onClickCriar }) => {
  const navigate = useNavigate();
  return (
    <nav className={style.navBar}>
      <ul className={style.navMenu}>
        <li className={style.navSpace}>
            <img src={home} alt="home" style={{ width: "40px", cursor: "pointer" }} onClick={() => navigate("/")}/>
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
